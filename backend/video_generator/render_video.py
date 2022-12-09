import json
import requests
from PIL import Image, ImageDraw
import random
from gcloud import storage
import datetime
from text_utils import write_text
import string
import io
import math
import os
import urllib.request
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip
import moviepy.editor as mp


def create_video_post(request_data, project_uid):
    # Set orientation
    orientation = get_orientation(request_data["type"])

    # load all template data file
    with open('assets/template_data/raw.json') as f:
        TEMPLATE_DATA_DICT = json.load(f)

    template_data_list = random.sample(TEMPLATE_DATA_DICT[orientation], 1)
    public_url = render_video(request_data, template_data_list, project_uid)

    return public_url

def render_video(request_data, template_data, video_id):
    video_url = request_data['url']
    uid = request_data['uid']
    p_name = request_data['p_name']
    tag = request_data['quote']

    template_data = template_data[0]
    # Download video
    if not os.path.exists("assets/video/"):
        os.makedirs("assets/video/")

    if not os.path.exists("assets/trimmed_video/"):
        os.makedirs("assets/trimmed_video/")
    
    if not os.path.exists("assets/output/"):
        os.makedirs("assets/output/")

    if not os.path.exists("assets/video_base_image/"):
        os.makedirs("assets/video_base_image/")

    file_name = 'assets/video/video_{}.mp4'.format(video_id)
    base_image_dir = 'assets/video_base_image/base_img_{}.png'.format(video_id)
    trimmed_video_dir = "assets/trimmed_video/video_{}.mp4".format(video_id)
    output_dir = "assets/output/video_{}.mp4".format(video_id)
    rsp = urllib.request.urlopen(video_url)
    with open(file_name,'wb') as f:
        f.write(rsp.read())

    # Trim video to 5 seconds
    ffmpeg_extract_subclip(file_name, 0.0, 5.0, targetname=trimmed_video_dir)
    
    # Add selected image to template
    # Get base template and initialize mask
    base_template = Image.open(template_data['file']).convert("RGB")
    w,h = base_template.size
    base_aplha = Image.new("L", base_template.size, 255)
    draw = ImageDraw.Draw(base_aplha)


    # Get all media elements
    media_elements = [element for element in template_data["canvas_elements"] if element["element_name"] == "media"]

    # Draw Mask
    for media_element in media_elements:
        angle = math.radians(media_element["angle"])
        width = media_element["width"]
        height = media_element["height"]
        # Calculate vertices
        x1 = media_element["x1"]
        y1 = media_element["y1"]
        media_window_shape = calculate_vertices(x1,y1,width,height,angle)
        draw.polygon(media_window_shape, fill=0)


    # Draw text on alpha image

    text_alpha = write_text.draw_text(header_text=p_name, tag_text=tag, data=template_data, mode="RGBA", background=(0,0,0,0), size=(w,h))
    text_alpha = text_alpha.convert("RGBA")
    base_template.putalpha(base_aplha)
    base_template.paste(text_alpha, (0, 0), text_alpha)
    base_template.save(base_image_dir)
    video = mp.VideoFileClip(trimmed_video_dir)
    video = video.resize(height=h, width=w)
    logo = mp.ImageClip(base_image_dir).set_duration(video.duration)
    final = mp.CompositeVideoClip([video, logo])
    final.write_videofile(output_dir)
    # url = [upload_video_to_cloud(output_dir, video_id, uid)]

    fileName = "user_images/{}.mp4".format(str(video_id))
    #upload image to gcp bucket
    bucket_name = "buildaudience-img"
    storage_client = storage.Client.from_service_account_json('buildaudience-gcp.json')
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(fileName)
    blob.upload_from_filename(output_dir)
    print("File is uploaded.", )

    os.remove(file_name)
    os.remove(base_image_dir)
    os.remove(trimmed_video_dir)
    os.remove(output_dir)

def upload_video_to_cloud(file, video_id, uid):
    today = datetime.date.today()
    file_name = "user_images/{}.mp4".format(video_id)
    bucket_name = "buildaudience-img"
    storage_client =  storage.Client.from_service_account_json('buildaudience-gcp.json')
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(file_name)
    blob.upload_from_filename(file)
    blob.make_public()
    return blob.public_url

def id_generator(size=20, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def calculate_vertices(x1,y1,width,height,angle):
    y2 = y1+(math.sin(angle) * width)
    x2 = x1+(math.cos(angle) * width)
    y3 = y2+(math.cos(angle) * height)
    x3 = x2-(math.sin(angle) * height)
    y4 = y3-(math.sin(angle) * width)
    x4 = x3-(math.cos(angle) * width)
    vertices = [(x1,y1),(x2,y2),(x3, y3),(x4,y4)]
    return vertices

def get_orientation(post_type):
    # Set type
    orientation = ""
    if post_type == "facebook":
        orientation = "landscape"
    elif post_type == "instagram":
        orientation = "square"
    elif post_type == "story":
        orientation = "verticle"
    return orientation