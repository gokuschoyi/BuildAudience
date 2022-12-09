import openai

def get_query_from_tag(tag):
    response = openai.Completion.create(
                        engine="text-davinci-002",
                        prompt="Extract keywords from this text:\n\n" + tag,
                        temperature=0.3,
                        max_tokens=60,
                        top_p=1.0,
                        frequency_penalty=0.8,
                        presence_penalty=0.0,
                        )
    key = response.choices[0].get("text")
    topics = list(set(key.split()))
    return topics

def generate_hashtags(input_string):
        hashtags = ""
        response = openai.Completion.create(
        engine="text-davinci-002",
        prompt="Write 10 hashtags for social media using the description given below.\n\""+input_string+"\"",
        temperature=0.7,
        max_tokens=64,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
        hashtags = response.choices[0].get("text").strip("\n")
        return hashtags