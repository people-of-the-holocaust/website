from flask import Flask, render_template, jsonify, request
from pynput.keyboard import Key, Controller
import threading
import time
import os
import sys
import subprocess

app = Flask(__name__, template_folder='frontend')
#CORS(app)

# Route to serve the main HTML page
@app.route('/')
def index():
    return render_template('index.html')

# API endpoint to serve data to the frontend
@app.route('/api/data')
def get_data():
    # You can return any data here (e.g., from a database)
    data = {"message": "Hello from the Python backend!"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

