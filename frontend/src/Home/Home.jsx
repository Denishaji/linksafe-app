import React, { useState } from "react";
import warning from "../assets/warning.png";
import { motion } from "framer-motion";
import "./home.css";

const Home = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckURL = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      console.log("🔵 Sending request to Flask:", url);

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      console.log("🟠 Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("🟢 Response Data:", data);

      setResult(data.prediction);
    } catch (error) {
      console.error("🔴 Fetch Error:", error);
      setResult("Error checking URL");
    }

    setLoading(false);
  };
  return (
    <div className="container">
      <div className="pageContainer">
        <div className="logo">LinkSafe</div>
        <div className="search">
          <input
            type="text"
            className="searchInput"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheckURL()}
          />
          <button
            onClick={handleCheckURL}
            disabled={loading}
            className="checkBtn"
          >
            {loading ? "Checking..." : "Check URL"}
          </button>
        </div>
      </div>

      <div className="resultContainer">
        {loading ? (
          <>
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <div className="loading"> Checking URL...</div>
          </>
        ) : (
          result && (
            <div
              className={`result ${result === "Safe" ? "safe" : "malicious"}`}
            >
              {result === "Safe" ? (
                <span className="safe">✅ Safe</span>
              ) : (
                <span className="malicious">
                  <img src={warning} alt="Warning" />
                  Malicious
                </span>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
