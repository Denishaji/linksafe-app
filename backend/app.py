from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
import sys

# Import feature extraction
sys.path.append(os.path.join(os.path.dirname(__file__), "notebooks"))
from notebooks.Feature_Extraction import FeatureExtraction

# Load trained model
with open("models/random_forest.pkl", "rb") as model_file:
    forest = pickle.load(model_file)

app = Flask(__name__)
CORS(app)
@app.route("/", methods=["GET"])
def home():
    return "✅ LinkSafe Flask backend is running!"

@app.route('/predict', methods=['POST'])
def predict_url():
    try:
        data = request.json
        url = data.get("url", "")

        if not url:
            return jsonify({"error": "No URL provided"}), 400

        # Feature extraction
        features = np.array(FeatureExtraction(url).getFeaturesList()).reshape(1, -1)
        prediction = forest.predict(features)[0]
        confidence_score = forest.predict_proba(features)[0][1]  # prob for class '1' (safe)

        # Invert prediction logic to match result (1 = Safe, 0 = Malicious)
        result = "Safe" if prediction == 1 else "Malicious"
        confidence = confidence_score if prediction == 1 else 1 - confidence_score

        # Category
        url_lower = url.lower()
        if "bank" in url_lower:
            category = "Banking"
        elif "amazon" in url_lower:
            category = "E-commerce"
        elif "login" in url_lower:
            category = "Login Page"
        else:
            category = "General"

        # Reasons (heuristic explanations)
        reasons = []
        if url.count('.') > 5:
            reasons.append("Too many subdomains")
        if "login" in url_lower:
            reasons.append("Contains 'login'")
        if "verify" in url_lower:
            reasons.append("May impersonate verification page")
        if url_lower.endswith(".tk") or any(tld in url_lower for tld in [".ml", ".ga", ".cf", ".gq"]):
            reasons.append("Suspicious domain extension")

        return jsonify({
            "prediction": result,
            "confidence": round(confidence * 100, 2),
            "category": category,
            "reasons": reasons
        })

    except Exception as e:
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

