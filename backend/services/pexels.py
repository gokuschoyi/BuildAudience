import services.openai as OPENAI
import init as init
import requests
from init import PEXEL_KEY
import openai
import services.openai as OPENAI_SERVICE


def pexel_videos(tag="", orientation="landscape", query=""):
        video_url = []
        if not query:
            topics = OPENAI_SERVICE.get_query_from_tag(tag)
            headers = {
            'Authorization': PEXEL_KEY,
            }

            for topic in topics:
                params = {
                    'query': topic,
                    'per_page': '5',
                    'size':'medium',
                    "orientation":orientation
                }

                response = requests.get('https://api.pexels.com/videos/search', params=params, headers=headers)
                response_data = response.json()
                if "videos" in response_data:
                    for videos in response_data["videos"]:
                        files = videos["video_files"]
                        for file in files:
                            if file["width"] is not None and file["height"] is not None:
                                if file["width"] >1000 and file["height"] >1000:
                                    video_url.append(file["link"])
                                    break

        else:
            headers = {
            'Authorization': PEXEL_KEY,
            }

            params = {
                'query': query,
                'per_page': '16',
                'size':'small',
                "orientation":orientation
            }

            response = requests.get('https://api.pexels.com/videos/search', params=params, headers=headers)
            response_data = response.json()
            if "videos" in response_data:
                for videos in response_data["videos"]:
                    files = videos["video_files"]
                    for file in files:
                        if file["width"] is not None and file["height"] is not None:
                            if orientation == 'landscape' or orientation == 'square':
                                print(file['height'], file['width'])
                                if file['height'] == 720:
                                    video_url.append(file["link"])
                                    break

                            elif orientation == 'portrait':
                                if file['width'] == 720:
                                    video_url.append(file["link"])
                                    break
        return {"video_list":video_url}