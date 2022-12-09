from flask import Flask
from user.signup import signup
from quotes.quote import quote
from serve_image.image import image
from serve_video.video import video
import init as init
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from user.signin import signin
from ai.openai import ai
from image_generator.serve_rendered_image import image_post
from blog.create_blog import blog_post
from video_generator.serve_rendered_video import video_post


app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = init.api_key  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False
jwt = JWTManager(app)

app.register_blueprint(signin)
app.register_blueprint(signup)
app.register_blueprint(quote)
app.register_blueprint(image)
app.register_blueprint(video)
app.register_blueprint(ai)
app.register_blueprint(image_post)
app.register_blueprint(blog_post)
app.register_blueprint(video_post)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=9000, debug=True)