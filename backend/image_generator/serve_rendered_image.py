from flask import Blueprint, render_template, g
from flask_expects_json import expects_json
from schema import data_schema as SCHEMA
from flask_jwt_extended import jwt_required
from image_generator import render_image
from tasks import celery_tasks
from flask_jwt_extended import get_jwt_identity
import services.firebase as FB
import services.unsplash as US
import random

image_post = Blueprint('image_post', __name__, url_prefix='/image_post')

@image_post.route('/generate', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.image_post_schema)
def generate_post():
    data = g.data
    uid = get_jwt_identity()['uid']
    data['uid'] = uid
    # celery_tasks.run_task.delay(data)
    url = render_image.create_image_post(data, n_post=3)
    return {"data":url}

@image_post.route('/quick_post', methods=['POST'])
@jwt_required()
def quick_post():
    data = get_jwt_identity()
    qotd = FB.get_quote_of_the_day()['qotd']
    comany_name = data['company_name']
    orientation = random.choice(['landscape', 'squarish', 'portrait'])
    p_type = random.choice(['facebook', 'instagram', 'story'])
    image_list = US.unsplash_image(qotd, orientation=orientation)
    url = random.choice(image_list['image_list'])

    data = {
        'p_name': comany_name,
        'quote': qotd,
        'url':url,
        'uid':data['uid'],
        'type':p_type
    }
    url = render_image.create_image_post(data, n_post=1)
    return {"data":url}