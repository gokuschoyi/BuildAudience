from flask import Blueprint, render_template, g
from flask_expects_json import expects_json
from schema import data_schema as SCHEMA
import init as init
from firebase_admin import firestore
import json
import requests
from logger import LOG
import datetime
import services.firebase as FB
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import hashlib

signin = Blueprint('signin', __name__, url_prefix='/user')

@signin.route('/signin', methods=['POST'])
@expects_json(SCHEMA.signin_schema)
def user_signin():
    data = g.data

    payload = json.dumps(
            {"email": data["email"],
             "password": data["password"],
             "returnSecureToken": True}
        )

    r = requests.post(
            init.FB_REST_API_LOGIN_BASE,
            params={"key": init.FIREBASE_WEB_API_KEY},
            data=payload
        )

    user_data = r.json()

    if "error" in user_data:
        message = "{} : ERROR {}: SIGNIN : {}".format(datetime.datetime.now(), data['email'] ,user_data["error"]["message"])
        LOG(message)
        return {"error":user_data["error"]["message"]}
    else:
        payload = json.dumps({"idToken":user_data['idToken']})
        r  = requests.post(init.FB_REST_API_LOOKUP_BASE,
                params={"key": init.FIREBASE_WEB_API_KEY},
                data=payload)
        email_verified = r.json()["users"][0]["emailVerified"]
        uid = user_data["localId"]
        display_name = user_data['displayName']
        db = firestore.client()
        doc_ref = db.collection("user_data").document(data["email"])
        company_name = (doc_ref.get()).to_dict()["metadata"]["company_name"]
        jwt_token = create_access_token(identity={'uid': uid, 'email': data["email"], 'company_name': company_name, 'display_name': display_name})
        LOG("{} : SIGNIN : {}".format(datetime.datetime.now(), data['email']))
        return {"display_name": display_name, "company_name":company_name, "token":jwt_token, "email_verified":email_verified}

@signin.route('/reset_password', methods=['POST'])
@expects_json(SCHEMA.reset_password_schema)
def user_reset_password():
    data = g.data
    try:
        headers = {}
        json_data = {
            'requestType': 'PASSWORD_RESET',
            'email': data["email"],
        }
        response = requests.post(init.FB_REST_API_OOB_BASE, headers=headers, json=json_data)
        LOG("{} : RESET_PASSWORD : {} : {}".format(datetime.datetime.now(), data['email'], response.json()))
        return response.json()
    except Exception as e:
        LOG("{} : ERROR {}: RESET_PASSWORD : {}".format(datetime.datetime.now(), data['email'], str(e)))
        return {"error":str(e)}

@signin.route('/projects', methods=['GET'])
@jwt_required()
def user_projects():
    data = get_jwt_identity()
    db = firestore.client()
    doc_ref = db.collection("user_data").document(data["email"])
    project_data = (doc_ref.get()).to_dict()
    project_list = []
    for key,val in project_data.items():
        if key != "metadata":
            if 'post_uid' not in val:
                project_list.append(project_data[key])
            else:
                uid = val["post_uid"]
                #get public url for serving image
                if val['media_type'] != "blog":
                    public_url = FB.get_image_url_from_gcp_bucket(uid, media_type=val['media_type'])
                    project_data[key]["post_url"] = public_url
                    project_list.append(project_data[key])
                else:
                    blog_project = {}
                    blog_project["post_uid"] = uid
                    blog_project['media_type'] = val['media_type']
                    blog_project['title'] = val['data']['title']
                    blog_project['url_title'] = val['data']['title'].replace(" ", "_")
                    blog_project['image'] = val['data']['main_image']['image']
                    project_list.append(blog_project)
    doc_ref = db.collection(u'common').document('dummy')
    dummy = (doc_ref.get()).to_dict()
    project_data_with_dummy = {"projects":project_list, "dummy":dummy["dummy"]}
    return project_data_with_dummy

@signin.route('/save_project', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.save_project_schema)
def user_save_project():
    user_data = get_jwt_identity()
    data = g.data
    try:
        if data["post_type"] not in ['facebook', 'instagram', 'story']:
            return {"error":"Invalid post type"}, 400
        post_url = data["post_url"]
        project_uid = hashlib.md5(post_url.encode('utf-8')).hexdigest()
        print(project_uid)
        FB.upload_to_gcp_bucket(post_url, project_uid)
        upload_data={str(project_uid):{"tag": data["tag"], "p_name": data["p_name"], "post_uid":str(project_uid), "hashtags":data["hashtags"], "quote":data["quote"], "quote_author":data["quote_author"], "media_type":data["media_type"], "post_type":data["post_type"]}}
        db = firestore.client()
        doc_ref = db.collection("user_data").document(user_data['email'])
        doc_ref.set(upload_data, merge=True)
        LOG("{} : SAVE_PROJECT : {} : {}".format(datetime.datetime.now(), user_data['email'], data))
        return {"success": "Saved project!"}
    except Exception as e:
        return {"error":str(e)}

@signin.route('/delete_project', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.delete_project_schema)
def user_delete_project():
    # Delet project from user_data collection
    user_data = get_jwt_identity()
    user_email = user_data['email']
    data = g.data
    post_uid = data["post_uid"]
    if "type" in data:
        db = firestore.client()
        doc_ref = db.collection(u'public_data').document(post_uid)
        doc = doc_ref.get().to_dict()
        if doc:
            doc_ref.delete()

        if FB.delete_post(post_uid, user_email):
            LOG("{} : DELETE_PROJECT : {} : {}".format(datetime.datetime.now(), user_email, data))
        return {"success": "Deleted project!"}
    if FB.delete_post(post_uid, user_email):
        LOG("{} : DELETE_PROJECT : {} : {}".format(datetime.datetime.now(), user_email, data))
        return {"success": "Deleted project!"}
    else:
        return {"Error": "Cannot find project!"}, 400


