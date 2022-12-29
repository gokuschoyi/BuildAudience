import json
import requests
from PIL import Image, ImageDraw, ImageChops
import random
from gcloud import storage
import datetime
from text_utils import write_text
import string
import io
import math
from services.gcp import upload_generated_image_to_cloud
from gcloud import storage

import base64
from collections import defaultdict
import re

def create_image_post(request_data, n_post):
    # Set orientation
    orientation = get_orientation(request_data["type"])

    # load all template data file
    with open('assets/template_data/raw.json') as f:
        TEMPLATE_DATA_DICT = json.load(f)

    template_data_list = random.sample(TEMPLATE_DATA_DICT[orientation], n_post)
    public_url = render_image(request_data, template_data_list)

    return public_url

def get_orientation(post_type):
    # Set type
    orientation = ""
    if post_type == "facebook":
        orientation = "landscape"
    elif post_type == "instagram":
        orientation = "square"
    elif post_type == "story":
        orientation = "vertical"
    return orientation

def render_image(request_data, template_data):
    header = request_data['p_name']
    tag = request_data['quote']
    image_url = request_data['url']
    uid = request_data['uid']

    # Download the selected search image
    img_data = requests.get(image_url).content
    search_image = Image.open(io.BytesIO(img_data))
    
    # Add selected image to template
    # Get base template and initialize mask
    base_aplha = None
    post_url = []
    for template in template_data:
        base_template = Image.open(template['file']).convert("RGBA")
        w,h = base_template.size
        search_image = search_image.resize((w,h), Image.ANTIALIAS)
        base_aplha = Image.new("L", (w,h), 0)
        draw = ImageDraw.Draw(base_aplha)

        # Get all media elements
        media_elements = [element for element in template["canvas_elements"] if element["element_name"] == "media"]

        # Draw Mask
        for media_element in media_elements:
            angle = math.radians(media_element["angle"])
            width = media_element["width"]
            height = media_element["height"]
            # Calculate vertices
            x1 = media_element["x1"]
            y1 = media_element["y1"]
            media_window_shape = calculate_vertices(x1,y1,width,height,angle)
            draw.polygon(media_window_shape, fill=255)

        # Draw text on alpha image
        text_alpha = write_text.draw_text(header_text=header, tag_text=tag, data=template, mode="RGBA", background=(0,0,0,0), size=(w,h))

        # Apply base_alpha and text_alpha to selected image
        search_image.putalpha(base_aplha)
        base_template.paste(search_image, (0,0), search_image)
        base_template.paste(text_alpha, (0, 0), text_alpha)
        base_template = base_template.convert("RGB")
        output = io.BytesIO()
        base_template.save(output, format="png")
        image_as_string = output.getvalue()

        post_url.append(upload_generated_image_to_cloud(image_as_string, id_generator(), uid))
    return post_url

def calculate_vertices(x1,y1,width,height,angle):
    y2 = y1+(math.sin(angle) * width)
    x2 = x1+(math.cos(angle) * width)
    y3 = y2+(math.cos(angle) * height)
    x3 = x2-(math.sin(angle) * height)
    y4 = y3-(math.sin(angle) * width)
    x4 = x3-(math.cos(angle) * width)
    vertices = [(x1,y1),(x2,y2),(x3, y3),(x4,y4)]
    return vertices

def id_generator(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def custom_mask_image_post_generator(data):
    image_url = data['url']
    template_name = data['template_name']
    
    # Download the selected search image
    img_data = requests.get(image_url).content
    search_image = Image.open(io.BytesIO(img_data))
    
    #converting mask image to 8-bit B/W image and Inverting it to create the final mask
    image_data = base64.b64decode(data['base64Image'])
    image_mask_file = io.BytesIO(image_data)
    imageMask = Image.open(image_mask_file)
    alpha_mask = imageMask.convert('L')
    alpha_mask_inverted = ImageChops.invert(alpha_mask)
    
    # print(template_data[0]['file'])
    base_template = Image.open('assets/canva_templates/{}'.format(str(template_name))).convert("RGBA")
    w,h = base_template.size
    
    alpha_mask = alpha_mask_inverted.resize((w,h), Image.ANTIALIAS)
    search_image = search_image.resize((w,h), Image.ANTIALIAS)
    
    search_image.putalpha(alpha_mask)
    
    base_template.paste(search_image, (0,0), search_image)
    
    base_template = base_template.convert("RGB")
    output = io.BytesIO()
    base_template.save('assets/custom_mask/final.png')
    
    alpha_mask.save('assets/custom_mask/alpha_mask.png')
    
    # imageMask = imageMask.convert('RGB')
    # imageMask.save('assets/custom_mask/image.jpeg', 'JPEG')
    return data

def get_template(data):
    from datetime import timezone, datetime
    url_lifetime = int(datetime.now(tz=timezone.utc).timestamp()) + 36000
    templates = {
        "landscape": ['template_1.jpg', 'template_3.jpg', 'template_10.jpg', 'template_11.jpg', 'template_13.jpg', 'template_14.jpg', 'template_16.jpg'],
        "square" : ['template_17.jpg', 'template_19.jpg', 'template_20.jpg', 'template_29.jpg', 'template_31.jpg'],
        "vertical" : ['template_28.jpg', 'template_30.jpg', 'template_33.jpg']
    }
    orientation = get_orientation(data['template_type'])
    bucket_name = "buildaudience-image-folder"
    storage_client =  storage.Client.from_service_account_json('buildAudienceSAK.json')
    bucket = storage_client.get_bucket(bucket_name)
    
    blobs = bucket.list_blobs(prefix="assets/canva_template")
    
    public_url = [blob.generate_signed_url(url_lifetime) for blob in blobs]
    filtered_url = [url for url in public_url if any(re.search(template, url) for template in templates[orientation])]
    
    result = [{"value":template, "url":url} for url in filtered_url for template in templates[orientation] if template in url]
    return result