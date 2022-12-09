from gcloud import storage
import datetime
import init as init
import requests
from firebase_admin import firestore
import os
import urllib
from logger import LOG


def get_image_url_from_gcp_bucket(id, media_type):
    from datetime import timezone, datetime
    url_lifetime = int(datetime.now(tz=timezone.utc).timestamp()) + 36000
    bucket_name = "buildaudience-img"
    client = storage.Client.from_service_account_json('buildaudience-gcp.json')  # Implicit environ set-up
    bucket = client.bucket(bucket_name)
    if media_type == "video" or media_type == "Video":
        blob_name = "user_images/{}.mp4".format(str(id))
    elif media_type == 'image' or media_type == 'Image':
        blob_name = "user_images/{}.jpg".format(str(id))
    blob = bucket.blob(blob_name)
    serving_url = blob.generate_signed_url(url_lifetime)
    return serving_url

def upload_to_gcp_bucket(url, id):
        #download image from url and save it in user_data folder
        file_type = url.split(".")[-1]
        fileName = "user_images/{}.{}".format(str(id), file_type)
        if file_type == "jpg":
            img_data = requests.get(url).content
            with open("services/"+fileName, 'wb') as handler:
                handler.write(img_data)
        else:
            urllib.request.urlretrieve(url, fileName)
        #upload image to gcp bucket
        bucket_name = "buildaudience-img"
        file_name = os.path.join(os.path.dirname(__file__), fileName)
        storage_client = storage.Client.from_service_account_json('buildaudience-gcp.json')
        bucket = storage_client.get_bucket(bucket_name)
        blob = bucket.blob(fileName)
        blob.upload_from_filename(file_name)
        print("File is uploaded. : ", )
        os.remove(file_name)
        return blob.public_url

def get_quote_from_category(category):
        if category == "Naval Ravikant":
            author = "Naval Ravikant"
            db = firestore.client()
            doc_ref = db.collection(u'common').document(u'quotes')
            doc = doc_ref.get()
            quote_list = []
            if doc.exists:
                quote_list = doc.to_dict()["naval"]
            r_list = []
            for quote in quote_list:
                r_list.append({"quote":quote,"author":"Naval Ravikant"})
            return r_list
        elif category == "Technology":
            db = firestore.client()
            doc_ref = db.collection(u'common').document(u'quotes')
            doc = doc_ref.get()
            quote_list = []
            if doc.exists:
                quote_list = doc.to_dict()["technology"]
            r_list = []
            for quotes in quote_list:
                quote = ".".join(quotes.split(".")[0:-1])
                author = (quotes.split(".")[-1]).strip()
                r_list.append({"quote":quote,"author":author})
            return r_list
        else:
            url = 'https://zenquotes.io/api/quotes/'+init.QUOTES_API_KEY+"&"+category
            response = requests.get(url)
            q_list = []
            for quotes in response.json():
                q_list.append({"quote":quotes["q"], "author":quotes["a"]})

        return q_list

def get_quote_of_the_day():
    db = firestore.client()
    doc_ref = db.collection(u'common').document(u'quote_of_the_day')
    doc = doc_ref.get()
    qotd = {}
    if doc.exists:
        qotd["qotd"] = doc.to_dict()["qotd"]
        qotd["qotd_author"] = doc.to_dict()["qotd_author"]
    return qotd

def delete_post(post_uid, user_email):
    db = firestore.client()
    doc_ref = db.collection(u'user_data').document(user_email)
    doc = doc_ref.get().to_dict()
    #LOG(doc)
    if doc:
        del doc[post_uid]
        doc_ref.set(doc)
        return True
    else:
        return False
    