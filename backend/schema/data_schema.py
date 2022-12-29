signin_schema = {
    'type': 'object',
    'properties': {
        'email': {'type': 'string'},
        'password': {'type': 'string'}
    },
    'required': ['email', 'password']
}

signup_schema = {
    'type': 'object',
    'properties': {
        'email': {'type': 'string'},
        'password': {'type': 'string'},
        'display_name': {'type': 'string'},
        'company_name': {'type': 'string'},
    },
    'required': ['email', 'password', 'display_name', 'company_name']
}

reset_password_schema = {
    'type': 'object',
    'properties': {
        'email': {'type': 'string'}
    },
    'required': ['email']
}

save_project_schema = {
    'type': 'object',
    'properties': {
        'media_type': {'type': 'string'},
        'p_name': {'type': 'string'},
        'tag': {'type': 'string'},
        'post_url': {'type': 'string'},
        'hashtags': {'type': 'string'},
        'quote': {'type': 'string'},
        'quote_author': {'type': 'string'},
        'post_type':{'type': 'string'}
    }
}
delete_project_schema = {
    'type': 'object',
    'properties': {
        'post_uid': {'type': 'string'}
    }
}
get_quote_schema = {
    'type': 'object',
    'properties': {
        'category': {'type': 'string'}
    },
    'required': ['category']
}

query_images_schema = {
    'type': 'object',
    'properties': {
        'type': {'type': 'string'},
        'query': {'type': 'string'}
    },
    'required': ['type','query']
}

generate_image_schema = {
    'type': 'object',
    'properties': {
        'type': {'type': 'string'},
        'tag': {'type': 'string'}
    },
    'required': ['type','tag']
}

query_videos_schema = {
    'type': 'object',
    'properties': {
        'type': {'type': 'string'},
        'query': {'type': 'string'}
    },
    'required': ['type','query']
}

generate_videos_schema = {
    'type': 'object',
    'properties': {
        'type': {'type': 'string'},
        'tag': {'type': 'string'}
    },
    'required': ['type','tag']
}

get_hashtags_schema = {
    'type': 'object',
    'properties': {
        'tag': {'type': 'string'},
    },
    'required': ['tag']
}

image_post_schema = {
    'type': 'object',
    'properties': {
        'quote': {'type': 'string'},
        'p_name': {'type': 'string'},
        'url': {'type': 'string'},
        'type': {'type': 'string'},
    },
    'required': ['quote','p_name','url','type']
}

custom_mask_schema = {
    'type': 'object',
    'properties': {
        'annotation': {'type': 'object'},
        'base64Image': {'type': 'string'},
        'quote': {'type': 'string'},
        'p_name': {'type': 'string'},
        'url': {'type': 'string'},
        'type': {'type': 'string'},
        'template_name': {'type':'string'}
    },
    'required' :['annotation','base64Image','quote','p_name','url','type', 'template_name']
}

template_schema = {
    'type': 'object',
    'properties': {
        'template_type':{'type':'string'}
    },
    'required':['template_type']
}

video_post_schema = {
    'type': 'object',
    'properties': {
        'quote': {'type': 'string'},
        'p_name': {'type': 'string'},
        'url': {'type': 'string'},
        'type': {'type': 'string'},
    },
    'required': ['quote','p_name','url','type']
}

blog_post_schema = {
    'type': 'object',
    'properties': {
        'p_desc': {'type': 'string'},
        'ref_url': {'type': 'string'},
    },
    'required': ['p_desc','ref_url']
}