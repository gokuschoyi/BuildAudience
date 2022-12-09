from random import choice
import openai
from decouple import config
import requests
import init as init

UNSPLASH_KEY = init.UNSPLASH_KEY

# Given a sentence, the function extracts the keywords in the sentence and queries unsplash for images to be used in the blogpost.
def unsplash_image(tag="", orientation="landscape"):
    url_list = []
    url_dict = {}

    # Extract keywords
    response = openai.Completion.create(
                    engine="text-davinci-002",
                    prompt="Extract 20 keywords from this text:\n\n" + tag,
                    temperature=0.3,
                    max_tokens=60,
                    top_p=1.0,
                    frequency_penalty=0.8,
                    presence_penalty=0.0,
                    )
    key = response.choices[0].get("text")
    topics = list(set(key.split()))

    # Query keywords and get images
    for topic in topics:
        if len(topic)>3:
            topic=topic.replace(",","")
            images = requests.get("https://api.unsplash.com/search/photos?query={}&page=1&client_id={}&orientation={}".format(topic, UNSPLASH_KEY, orientation))
            try:
                data = images.json()
                result = data.get("results")
            except:
                continue
            if len(result) > 0:
                for u in result:
                    # Get a landscape image as a main image
                    if orientation=='landscape':
                        url_dict['main_image'] = {'image':u["urls"]["regular"],
                                                  'image_description':u['alt_description'],
                                                  'user_name':u['user']['name'],
                                                  'user_page':u['user']['links']['html']}
                        orientation = 'squarish'
                    # Get square image for blog sections
                    else:
                        image_dict = {'image':u["urls"]["regular"],
                                                  'image_description':u['alt_description'],
                                                  'user_name':u['user']['name'],
                                                  'user_page':u['user']['links']['html']}
                        url_list.append(image_dict)
    url_dict['section_images'] = url_list
    return url_dict

def extract_blog_summary(reference_blog):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt="Summarize the text given below\n {}".format(reference_blog),
        temperature=0.7,
        max_tokens=300,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
    return response['choices'][0]['text']

def extract_blog_title(summary):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt="{} \nWrite a short creative blog title using the text given above.\n ".format(summary),
        temperature=0.7,
        max_tokens=60,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
    return response['choices'][0]['text']

def generateBlogSections(prompt1):
    response = openai.Completion.create(
      engine="text-davinci-002",
      prompt="Expand the blog title into 5 high level blog sections: {} \n\n- Introduction: ".format(prompt1),
      temperature=1.0,
      max_tokens=150,
      frequency_penalty=0,
      presence_penalty=0
    )
    return response['choices'][0]['text']

def blogIntro(title, c_name, c_desc):
    response = openai.Completion.create(
    engine="text-davinci-002",
    prompt="Write a long and detailed blog introduction for the business '{}:{}' for the blog topic '{}'".format(c_name, c_desc, title),
    temperature=0.7,
    max_tokens=200,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    intro = response['choices'][0]['text']
    return intro

def blogSectionExpander(heading):
    response = openai.Completion.create(
    engine="text-davinci-002",
    prompt="{}\nWrite three long and detailed professional paragraphs on the topic given above for a blog post.".format(heading),
    temperature=0.7,
    max_tokens=300,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    section = response['choices'][0]['text']
    return section

# Generate a CTA section for the blog
def cta(email="", website="", phone=""):
    prompt_e = "email: {}".format(email) if email else ""
    prompt_w = "website: {}".format(website) if website else ""
    prompt_p = "phone: {}".format(phone) if phone else ""
    cta = ""
    if prompt_e or prompt_w or prompt_p:
        response = openai.Completion.create(
        engine="text-davinci-002",
        prompt="Write a generic CTA(Call To Action) section for a blog using the details given below.\n{}\n{}\n{}\n".format(prompt_e, prompt_w, prompt_p),
        temperature=0.7,
        max_tokens=100,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
        cta = response['choices'][0]['text']
    return cta

def generate_blog(c_name, c_desc, reference_blog):
    # Get summary of the reference article
    para_list = []
    para = ""
    for chars in reference_blog:
        para += chars
        if len(para) > 3000:
            para_list.append(para)
            para = ""
    summary = extract_blog_summary(para_list[0])

    # Generate a title using the summary
    title = extract_blog_title(summary)
    title = title.strip()

    # Generate abstract sections for the blog using the title
    sections = generateBlogSections(title)
    sections = sections.split('\n')
    while len(sections) < 4:
        sections.append(generateBlogSections(title).split('\n'))
    sections = [{'header':i, 'content':''} for i in sections if i]
    sections = sections[0:4]

    # Generate intro for the blog
    intro = blogIntro(title, c_name, c_desc)

    # Get images for the blog
    images = unsplash_image(tag=summary)
    print(images)

    # Sample images to be used in the blog and generate content for the blog sections
    section_list = []
    for section in sections:
        if section['header'][0] == '-':
            section['header'] = section['header'][1:].strip()
        section['content'] = blogSectionExpander(section['header'])
        if images['section_images']:
            section['image'] = choice(images['section_images'])
        section_list.append(section)

    # Combine all generated data into json response
    blog_data = {'title':title,
                 'intro':intro,
                 'main_image':images['main_image'] if 'main_image' in images else "",
                 'blog_sections': section_list
    }

    return blog_data

