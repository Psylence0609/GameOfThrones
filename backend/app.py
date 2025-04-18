from flask import Flask, send_from_directory
from flask_cors import CORS
from routes import api_bp
from utils import initialize_simulation, run_simulation_regularly
from socket_manager import socketio
import threading

app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'  # Replace with a real secret key in production
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://localhost:3000"}})
socketio.init_app(app)  # Initialize SocketIO with the app

app.register_blueprint(api_bp, url_prefix='/api')

initialize_simulation()

# Start the regular simulation in a separate thread
# simulation_thread = threading.Thread(target=run_simulation_regularly)
# simulation_thread.daemon = True  # Allow the thread to exit when the main thread exits
# simulation_thread.start()

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)
