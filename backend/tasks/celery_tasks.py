from celery import Celery
import os
import json
from gcloud import storage
from logger import LOG
import datetime
from video_generator import render_video
from hashlib import md5
import services.firebase as FB
from firebase_admin import firestore
from services.openai import generate_hashtags


app = Celery('tasks', backend='rpc://', broker='pyamqp://guest@localhost//')

@app.task
def get_templates_from_cloud():
    LOG("Getting templates from cloud: {}".format(datetime.datetime.now()))
    bucket_name = "buildaudience-img"
    storage_client = storage.Client.from_service_account_json('buildaudience-gcp.json')
    bucket = storage_client.get_bucket(bucket_name)

    # Get all template data
    orientation = ['landscape', 'square', 'verticle']
    template_data_dict = {}
    for o in orientation:
        blobs = bucket.list_blobs(prefix="assets/template_data/{}/".format(o))
        blob_list = [blob for blob in blobs]
        template_file_list = []
        if not os.path.exists("assets/canva_templates/"):
            os.makedirs("assets/canva_templates/")
        for curr_blob in blob_list:
            file_name = curr_blob.name.split("/")[-1]
            folder_name = '_'.join(file_name.split('_')[0:2])
            file_dir = "assets/template_data/{}/".format(folder_name)
            file_path = "assets/template_data/{}/{}".format(folder_name, file_name)
            if not os.path.exists(file_dir):
                os.makedirs(file_dir)
            curr_blob.download_to_filename(file_path)
            template_file_list.append(file_path)

        # Open all downloaded data and extract the template base file names
        template_base_list = []
        template_data_list = []
        for template_data in template_file_list:
            f = open(template_data)
            data = json.load(f)
            template_base_list.append(data["file"])
            template_data_list.append(data)

        # Get template images for the template data sampled
        blobs = bucket.list_blobs(prefix="assets/canva_templates/")
        base_blob_list = [blob for blob in blobs if blob.name in template_base_list]
        for base_template in base_blob_list:
            file_name = "assets/canva_templates/{}".format(base_template.name.split("/")[-1])
            base_template.download_to_filename(file_name)
        template_data_dict[o] = template_data_list
    with open('assets/template_data/raw.json', 'w') as outfile:
        json.dump(template_data_dict, outfile)
    LOG("Templates fetched: {}".format(datetime.datetime.now()))
    return template_data_dict

@app.task
def task_generate_video_post(data, project_uid):
    print("Generating video post: {}".format(datetime.datetime.now()))
    print("UID: {}".format(data['uid']))

    # Save to user projects before generating
    upload_data={str(project_uid):{"status":"Running","p_name": data["p_name"], "post_uid":str(project_uid), "quote":data["quote"], "media_type":'video', "post_type":data["type"]}}
    db = firestore.client()
    doc_ref = db.collection("user_data").document(data['email'])
    doc_ref.set(upload_data, merge=True)

    render_video.create_video_post(data, project_uid)
    # Save to user projects after processing
    print("Project UID: ", project_uid)
    hashtags = generate_hashtags(data["quote"])
    upload_data={str(project_uid):{"status":"Processed","p_name": data["p_name"], "post_uid":str(project_uid), "hashtags":hashtags, "quote":data["quote"], "media_type":'video', "post_type":data["type"]}}
    db = firestore.client()
    doc_ref = db.collection("user_data").document(data['email'])
    doc_ref.set(upload_data, merge=True)
    print("Video post generated: {}".format(datetime.datetime.now()))


app.conf.beat_schedule = {
    "routine_template_fetch":{
        "task": "tasks.celery_tasks.get_templates_from_cloud",
        "schedule": 3600*24
    }
}