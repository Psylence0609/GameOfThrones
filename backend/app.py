from flask import Flask, send_from_directory
from flask_cors import CORS
from routes import api_bp
from utils import initialize_simulation, run_simulation_regularly
from socket_manager import socketio
import threading
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')  
CORS(app, resources={r"/*": {"origins": "*"}})

socketio.init_app(app)
app.register_blueprint(api_bp, url_prefix='/api')

initialize_simulation()

simulation_thread = threading.Thread(target=run_simulation_regularly)
simulation_thread.daemon = True
simulation_thread.start()

# Optional: Serve React app if deploying full-stack
@app.route('/')
@app.route('/<path:path>')
def serve(path=''):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)
