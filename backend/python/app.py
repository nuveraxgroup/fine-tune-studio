from flask import Flask, jsonify

from work import load

app = Flask(__name__)

# Define a simple route
@app.route('/hello', methods=['GET'])
def hello():
    load()
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(debug=True)
