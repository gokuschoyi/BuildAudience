from flask import Blueprint, render_template, g
from flask_expects_json import expects_json
from schema import data_schema as SCHEMA
import services.pexels as PEXEL_SERVICE
from flask_jwt_extended import jwt_required
from logger import LOG
import datetime


video = Blueprint('video', __name__, url_prefix='/video')

@video.route('/query_videos', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.query_videos_schema)
def get_videos():
    data = g.data
    if data['type'] == 'facebook':
        orientation = 'landscape'
    elif data['type'] == 'instagram':
        orientation = 'squarish'
    elif data['type'] == 'story':
        orientation = 'portrait'
    else:
        return {'error':'Invalid type passed. Use facebook, landscape or story for type...'}
    try:
        url = PEXEL_SERVICE.pexel_videos(query=data["query"], orientation=orientation)
    except Exception as e:
        LOG("{} : QUERY VIDEOS : {}".format(datetime.datetime.now(), str(e)))
        return {'error':'Error querying videos'}
    return url

@video.route('/generate_videos', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.generate_videos_schema)
def generate_video_from_tag():
    data = g.data
    if data['type'] == 'facebook':
        orientation = 'landscape'
    elif data['type'] == 'instagram':
        orientation = 'squarish'
    elif data['type'] == 'story':
        orientation = 'portrait'
    else:
        return {'error':'Invalid type passed. Use facebook, landscape or story for type...'}
    try:
        url = PEXEL_SERVICE.pexel_videos(tag=data["tag"], orientation=orientation)
    except Exception as e:
        LOG("{} : GENERATE VIDEOS : {}".format(datetime.datetime.now(), str(e)))
        return {'error':'Error generating videos'}
    return url