from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app)

@socketio.on('connect')
def on_connect():
    print('Un nuevo cliente se ha conectado')

@socketio.on('image')
def on_image(message):
    image_b64 = message
    print('Se ha recibido una imagen:')
    emit('retrive_stream', image_b64, broadcast=True)

if __name__ == '__main__':
    logger.info('Running socket IO')
    socketio.run(app, host='localhost', port=4000)