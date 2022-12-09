from gcloud import storage
import datetime
import string

"""
Upload an Image string to gcp bucket.

INPUT:
    image_str: Image string
    image_id: Image id
    uid: User id

OUTPUT:
    Public url of image
"""
def upload_generated_image_to_cloud(image_str, image_id, uid):
    today = datetime.date.today()
    file_name = "assets/serve/{}_{}_{}.jpg".format(uid, image_id, today)
    bucket_name = "buildaudience-img"
    storage_client =  storage.Client.from_service_account_json('buildaudience-gcp.json')
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(file_name)
    blob.upload_from_string(image_str)
    blob.make_public()
    return blob.public_url