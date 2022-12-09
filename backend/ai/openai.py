from flask import Blueprint, render_template, g
from flask_expects_json import expects_json
from schema import data_schema as SCHEMA
import services.openai as OPENAI_SERVICE
from flask_jwt_extended import jwt_required


ai = Blueprint('ai', __name__, url_prefix='/ai')

@ai.route('/get_hashtags', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.get_hashtags_schema)
def get_hashtags():
    data = g.data
    try:
        hashtags = OPENAI_SERVICE.generate_hashtags(data["tag"])
    except Exception as e:
        LOG("{} : GET HASHTAGS : {}".format(datetime.datetime.now(), str(e)))
        return {'error':'Error getting hashtags'}
    return {"hashtag":hashtags}

