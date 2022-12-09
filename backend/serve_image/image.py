from flask import Blueprint, render_template, g
from flask_expects_json import expects_json
from schema import data_schema as SCHEMA
import services.unsplash as US
from flask_jwt_extended import jwt_required
import json


image = Blueprint('image', __name__, url_prefix='/image')

@image.route('/query_images', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.query_images_schema)
def get_images():
    data = g.data
    if data['type'] == 'facebook':
        orientation = 'landscape'
    elif data['type'] == 'instagram':
        orientation = 'squarish'
    elif data['type'] == 'story':
        orientation = 'portrait'
    else:
        return {'error':'Invalid type passed. Use facebook, landscape or story for type...'}

    url = US.unsplash_image(query=data["query"], orientation=orientation)
    return url

@image.route('/generate_image', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.generate_image_schema)
def generate_image_from_tag():
    data = g.data
    if data['type'] == 'facebook':
        orientation = 'landscape'
    elif data['type'] == 'instagram':
        orientation = 'squarish'
    elif data['type'] == 'story':
        orientation = 'portrait'
    else:
        return {'error':'Invalid type passed. Use facebook, landscape or story for type...'}

    url = US.unsplash_image(tag=data["tag"], orientation=orientation)
    return url