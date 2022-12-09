import services.openai as OPENAI
import init as init
import requests

def unsplash_image(tag="", orientation="landscape", query=""):
    url_list = []
    if not query:
        topics = OPENAI.get_query_from_tag(tag)
        for topic in topics:
            if len(topic)>3:
                topic=topic.replace(",","")
                images = requests.get("https://api.unsplash.com/search/photos?query={}&page=1&client_id={}&orientation={}".format(topic, init.UNSPLASH_KEY, orientation))
                if images.status_code != 200:
                    continue
                data = images.json()
                result = data.get("results")
                count = 0
                if len(result) > 0:
                    for u in result:
                        url_list.append(u["urls"]["regular"])
                        count += 1
                        if count>=4:
                            break
    else:
        images = requests.get("https://api.unsplash.com/search/photos?query={}&page=1&client_id={}&orientation={}".format(query, init.UNSPLASH_KEY, orientation))
        data = images.json()
        result = data.get("results")
        if len(result) > 0:
            for u in result:
                url_list.append(u["urls"]["regular"])
    return {"image_list":url_list}