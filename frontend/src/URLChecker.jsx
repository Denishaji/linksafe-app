import React, { useState } from "react";
import axios from "axios";

export default function URLChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [category, setCategory] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkUrl = async () => {
    setLoading(true);
    setResult(null);
    setConfidence(null);
    setCategory(null);
    setReasons([]);
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/predict", { url });
      setResult(response.data.prediction);
      setConfidence(response.data.confidence);
      setCategory(response.data.category);
      setReasons(response.data.reasons);
    } catch (err) {
      setError("Error checking URL. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="w-100 mx-auto" style={{ maxWidth: "500px" }}>
      {/* INPUT */}
      <div className="input-group mb-3">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
          className="form-control"
          required
        />
        <button
          onClick={checkUrl}
          disabled={loading || !url}
          className="btn btn-primary"
        >
          {loading ? "Checking..." : "Check URL"}
        </button>
      </div>

      {/* RESULT CARD */}
      {result && (
        <div
          className={`alert d-flex align-items-center justify-content-between shadow-sm border rounded-3 px-4 py-3 ${
            result === "Malicious" ? "alert-danger" : "alert-success"
          }`}
          role="alert"
        >
          <div className="d-flex flex-column text-start">
            <div className="fw-bold fs-5">
              {result === "Malicious" ? "⚠️ Malicious URL Detected!" : "✅ This URL is Safe"}
            </div>
            {category && <small className="text-muted">Category: {category}</small>}
          </div>
        </div>
      )}

      {/* CONFIDENCE BAR */}
      {confidence !== null && (
        <div className="progress mb-3 shadow-sm" style={{ height: "22px", fontWeight: "500" }}>
          <div
            className={`progress-bar ${
              result === "Malicious" ? "bg-danger" : "bg-primary"
            }`}
            role="progressbar"
            style={{ width: `${confidence}%` }}
            aria-valuenow={confidence}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {confidence}% Confidence
          </div>
        </div>
      )}

      {/* WHY FLAGGED */}
      {reasons.length > 0 && (
        <div className="card border-0 shadow-sm bg-light mb-3">
          <div className="card-body p-3">
            <h6 className="fw-bold mb-2 text-dark">🔍 Why flagged:</h6>
            <ul className="mb-0 ps-3 text-dark">
              {reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* FAVICON */}
      {url && (
        <div className="mt-3 text-center">
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${url}`}
            alt="favicon"
            className="rounded shadow-sm"
          />
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}
    </div>
  );
}





