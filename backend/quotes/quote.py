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

category_list = [
            "Anxiety",
            "Change",
            "Choice",
            "Confidence",
            "Courage",
            "Death",
            "Dreams",
            "Excellence",
            "Failure",
            "Fairness",
            "Fear",
            "Forgiveness",
            "Freedom",
            "Future",
            "Happiness",
            "Inspiration",
            "Kindness",
            "Leadership",
            "Life",
            "Living",
            "Love",
            "Pain",
            "Past",
            "Success",
            "Time",
            "Today",
            "Truth",
            "Work",
            "Technology",
            "Naval Ravikant"]

quote = Blueprint('quote', __name__, url_prefix='/quote')

@quote.route('/get_categories', methods=['GET'])
@jwt_required()
def get_categories():
    return {"categories":category_list}

@quote.route('/get_quote', methods=['POST'])
@jwt_required()
@expects_json(SCHEMA.get_quote_schema)
def get_quotes():
    data = g.data
    try:
        if data['category'] not in category_list:
            return {"error":"Invalid category"}
        else:
            quotes = FB.get_quote_from_category(data['category'])
            return {"quotes":quotes}
    except Exception as e:
        return {"error":str(e)}

@quote.route('/get_qotd', methods=['GET'])
@jwt_required()
def get_qotd():
    try:
        qotd = FB.get_quote_of_the_day()
        return qotd
    except Exception as e:
        return {"error":str(e)}
