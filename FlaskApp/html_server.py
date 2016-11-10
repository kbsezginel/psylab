import time
import sys
from flask import Flask, render_template, request
from flask import url_for, redirect


def shutdown_server():
    """ Shutdown Flask server """
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()


def get_response():
    """ Get user response from user using HTTP POST method """
    print("Loading the server...\nWaiting for user response...")
    global response
    app.run(host='0.0.0.0')
    return response

# Flask server functions
app = Flask(__name__)
response = None


@app.route("/")
def home():
    return """... Welcome to Localization Experiments Server ...
              Proceed to ~/Experiment: Localization experiment layout
           """


@app.route('/<string:page_name>/')
def render_static(page_name):
    return render_template('%s.html' % page_name)


@app.route('/postmethod', methods=['POST'])
def get_post_javascript_data():
    global response
    response = request.form['label']
    print(response, '---')
    shutdown_server()
    return response


@app.route('/shutdown', methods=['POST'])
def shutdown():
    shutdown_server()
    return 'Server shutting down...'
