from flask import Blueprint, jsonify, request
from utils import run_simulation_step, get_simulation_state, get_all_posts
from socket_manager import emit_agent_action
from flask_cors import CORS

api_bp = Blueprint('api', __name__)
CORS(api_bp, supports_credentials=True) 

@api_bp.route('/simulate', methods=['POST'])
def simulate_step():
    """
    Run one step of the simulation.
    """
    data = request.get_json()
    iterations = data.get('iterations', 1)

    for i in range(iterations):
        print("Running simulation step", i + 1)
        run_simulation_step()
    return jsonify({"message": "Simulation step completed."})

@api_bp.route('/state', methods=['GET', 'OPTIONS'])
def get_state():
    """
    Get the current state of the simulation.
    """
    if request.method == 'OPTIONS':
        return '', 200
    state = get_simulation_state()
    return jsonify(state)

@api_bp.route('/posts', methods=['GET'])
def get_posts():
    """
    Get all social media posts.
    """
    posts = get_all_posts()
    return jsonify(posts)

@api_bp.route('/crown_summary', methods=['GET'])
def crown_summary():
    from collections import Counter
    from model import request_ollama
    from utils import citizens

    # Gathering votes and reasons from citizen memories
    vote_reasons = {}

    for citizen in citizens:
        for mem in citizen.recall():
            if isinstance(mem, dict) and mem.get("vote") and mem.get("because"):
                vote = mem["vote"]
                reason = mem["because"]
                if vote != "No Vote":
                    vote_reasons.setdefault(vote, []).append(reason)

    if not vote_reasons:
        return jsonify({"winner": None, "summary": "No votes have been cast yet."})

    # Finding the winner
    vote_counts = Counter([vote for vote, reasons in vote_reasons.items() for _ in reasons])
    winner, _ = vote_counts.most_common(1)[0]

    # LLM call to summarize the reasons for the winner
    reasons = vote_reasons[winner]
    prompt = f"""The following are reasons why citizens voted for {winner}:\n\n""" + \
             "\n".join(f"- {reason}" for reason in reasons) + \
             f"\n\nSummarize in 3-4 lines why {winner} won based on these reasons."

    try:
        summary = request_ollama(prompt).strip()
    except Exception as e:
        return jsonify({"winner": winner, "summary": f"LLM error: {str(e)}"})

    return jsonify({
        "winner": winner,
        "summary": summary
    })
