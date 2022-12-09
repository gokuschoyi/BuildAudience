from flask import Blueprint, render_template, g
from flask_expects_json import expects_json
from schema import data_schema as SCHEMA
import init as init
from firebase_admin import firestore
from firebase_admin import auth as fb_auth
from flask_jwt_extended import create_access_token
import json
import requests
from logger import LOG
import datetime

signup = Blueprint('signup', __name__, url_prefix='/user')

@signup.route('/signup', methods=['POST'])
@expects_json(SCHEMA.signup_schema)
def user_signup():
    data = g.data

    headers = {}
    json_data = {
        'email': data['email'],
        "password":data['password'],
        "displayName":data["display_name"],
        "returnSecureToken": True,
    }

    response = requests.post(init.FB_REST_API_SIGNUP_BASE, headers=headers, json=json_data)

    if "error" in response.json():
        LOG("{} : ERROR {}: SIGNUP : {}".format(datetime.datetime.now(), data['email'] ,response.json()["error"]["message"]))
        return {"error":response.json()["error"]["message"]}
    else:
        user = fb_auth.get_user_by_email(data["email"])
        uid = user.uid
        headers = {}
        json_data = {
            'requestType': 'VERIFY_EMAIL',
            "idToken":response.json()['idToken'],
        }
        response = requests.post(init.FB_REST_API_OOB_BASE, headers=headers, json=json_data)
        jwt_token = create_access_token(identity={'uid': uid, 'email': data["email"]})
        upload_data={"metadata":{"company_name": data["company_name"]}}
        db = firestore.client()
        doc_ref = db.collection("user_data").document(data["email"])
        doc_ref.set(upload_data, merge=True)
        LOG("{} : SIGNUP : {}".format(datetime.datetime.now(), data['email']))
        return {"success":"User Created", "token":jwt_token}
