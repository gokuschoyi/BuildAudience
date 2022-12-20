from decouple import config
import openai
import os
import firebase_admin
from firebase_admin import credentials, firestore
import logging

FIREBASE_WEB_API_KEY = config("FIREBASE_WEB_API_KEY")
openai.api_key = config("openai_api_key")
api_key = config("api_key")	
FB_CRED = credentials.Certificate("buildAudienceSAK.json")
UNSPLASH_KEY = config("UNSPLASH_KEY")
PEXEL_KEY = config("PEXEL_KEY")
""" QUOTES_API_KEY = config("QUOTES_KEY") """
""" switchboard_key = config("SWITCHBOARD_KEY") """
""" headers_sb = {'Content-Type': 'application/json','X-API-Key': switchboard_key} """
FB_REST_API_LOGIN_BASE = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword"
FB_REST_API_LOOKUP_BASE = f"https://identitytoolkit.googleapis.com/v1/accounts:lookup"
FB_REST_API_SIGNUP_BASE = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+FIREBASE_WEB_API_KEY
FB_REST_API_OOB_BASE = f"https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key="+FIREBASE_WEB_API_KEY
firebase_admin.initialize_app(FB_CRED)
logging.basicConfig(filename='logs/all.log', level=logging.INFO)
