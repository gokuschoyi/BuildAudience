from flask import Blueprint, render_template, g, request
from flask_expects_json import expects_json
from schema import data_schema as SCHEMA
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
import services.firebase as FB
from blog import blog_generator
import requests
from bs4 import BeautifulSoup
import json
from firebase_admin import firestore
import hashlib

blog_post = Blueprint('blog_post', __name__, url_prefix='/blog_post')

@blog_post.route('/generate', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.blog_post_schema)
def generate_post():
    data = g.data
    uid = get_jwt_identity()['uid']
    p_name = get_jwt_identity()['company_name']
    p_desc = data['p_desc']
    ref_url = data['ref_url']
    ref_text = get_text_from_url(ref_url)
    if not ref_text:
        return {"error": "No text found in the url"}, 400
    blog_data = blog_generator.generate_blog(p_name, p_desc, ref_text)
    return {"data":blog_data}

@blog_post.route('/save', methods=['POST'])
@jwt_required()
def save_post():
    blog_data = request.json['data']
    template = request.json['template']
    uid = get_jwt_identity()['uid']
    user_email = get_jwt_identity()['email']
    project_uid = hashlib.md5((blog_data['title']+uid).encode('utf-8')).hexdigest()
    upload_data={str(project_uid):{"data":blog_data, "post_uid":str(project_uid), "media_type":"blog", "template":template}}
    db = firestore.client()
    doc_ref = db.collection("user_data").document(user_email)
    doc_ref.set(upload_data, merge=True)

    doc_ref = db.collection("public_data").document(project_uid)
    doc_ref.set(upload_data)
    return {"message":"success",
            "uid":str(project_uid)}

@blog_post.route('/get_blog', methods=['POST'])
def get_blog():
    project_uid = request.json['uid']
    db = firestore.client()
    doc_ref = db.collection("public_data").document(project_uid)
    doc = doc_ref.get()
    return doc.to_dict()[project_uid]

@blog_post.route('/get_dummy_1', methods=['GET'])
@jwt_required()
def get_dummy_1():
    dummy_data = None
    with open('blog/blog_dummy_1.json', 'r') as f:
        dummy_data = json.load(f)
    return {"data":dummy_data}

@blog_post.route('/get_dummy_2', methods=['GET'])
@jwt_required()
def get_dummy_2():
    dummy_data = None
    with open('blog/blog_dummy_2.json', 'r') as f:
        dummy_data = json.load(f)
    return {"data":dummy_data}

def get_text_from_url(url):
    r = requests.get(url)
    response_content = r.text
    '''
    This is a fallback function, so that we can always return a value for text content.
    Even for when both Trafilatura and BeautifulSoup are unable to extract the text from a 
    single URL.
    '''
    
    # Create the beautifulsoup object:
    soup = BeautifulSoup(response_content, 'html.parser')
    
    # Finding the text:
    text = soup.find_all(text=True)
    
    # Remove unwanted tag elements:
    cleaned_text = ''
    blacklist = [
        '[document]',
        'noscript',
        'header',
        'html',
        'meta',
        'head', 
        'input',
        'script',
        'style',]

    # Then we will loop over every item in the extract text and make sure that the beautifulsoup4 tag
    # is NOT in the blacklist
    for item in text:
        if item.parent.name not in blacklist:
            cleaned_text += '{} '.format(item)
            
    # Remove any tab separation and strip the text:
    cleaned_text = cleaned_text.replace('\t', '')
    cleaned_text = cleaned_text.strip()
    cleaned_text = cleaned_text.encode('ascii', errors='ignore').decode('ascii')
    cleaned_text = [i.strip() for i in cleaned_text.split('\n') if i.strip()]
    cleaned_text = '.'.join(cleaned_text)
    return cleaned_text