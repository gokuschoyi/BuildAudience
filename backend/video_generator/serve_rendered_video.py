from flask import Blueprint, render_template, g
from flask_expects_json import expects_json
from schema import data_schema as SCHEMA
from flask_jwt_extended import jwt_required
from video_generator import render_video
from tasks import celery_tasks
from flask_jwt_extended import get_jwt_identity
import services.firebase as FB
import services.unsplash as US
import services.pexels as PX
import random
from tasks.celery_tasks import task_generate_video_post

video_post = Blueprint('video_post', __name__, url_prefix='/video_post')

@video_post.route('/generate', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.video_post_schema)
def generate_post():
    data = g.data
    uid = get_jwt_identity()['uid']
    data['uid'] = uid
    data['email'] = get_jwt_identity()['email']
    project_uid = render_video.id_generator()
    task = task_generate_video_post.apply_async((data, project_uid, ) )
    return {"message":"Video is being generated. Please check back later.",
            "project_uid":project_uid}

@video_post.route('/quick_post', methods=['POST'])
@jwt_required()
def quick_post():
    data = get_jwt_identity()
    qotd = FB.get_quote_of_the_day()['qotd']
    comany_name = data['company_name']
    orientation = random.choice(['landscape', 'squarish', 'portrait'])
    p_type = random.choice(['facebook', 'instagram', 'story'])
    video_list = PX.pexel_videos(tag=qotd, orientation=orientation)
    url = random.choice(video_list['video_list'])
    project_uid = render_video.id_generator()
    data = {
        'p_name': comany_name,
        'quote': qotd,
        'url':url,
        'uid':data['uid'],
        'type':p_type,
        'email':data['email']
    }
    task = task_generate_video_post.apply_async((data, project_uid, ) )
    return {"message":"Video is being generated. Please check back later.",
            "project_uid":project_uid}