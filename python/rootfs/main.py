import os

from flask import Flask, request
from utils.text_generator import TextGenerator

api_token = os.environ.get('TOKEN', None)
text_generator = TextGenerator()
app = Flask(__name__)


@app.route('/generate', methods=['GET', 'POST'])
def generate():
    if request.method == 'POST':
        text = request.form['text']
        token = request.headers.get('token')
        if token == api_token:
            return text_generator.generate_text(text)
        else:
            return 'Invalid token'
    elif request.method == 'GET':
        return 'You are not allowed to access this page.'


if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=5000)
