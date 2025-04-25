import React from "react";
import URLChecker from "./URLChecker";

export default function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand fw-bold" href="#">🔒 LinkSafe</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#">API</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Section: Centered Content */}
      <div style={{ minHeight: "85vh" }} className="d-flex justify-content-center align-items-center w-100">
        <div
          className="text-center p-4 rounded shadow"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            maxWidth: "600px",
            width: "90%",
            margin: "0 auto"
          }}
        >
          <h1 className="display-6 fw-bold text-dark">AI-Powered URL Safety Checker</h1>
          <p className="text-dark mb-4">
            Paste any URL below and we’ll scan it for phishing threats.
          </p>
          <URLChecker />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-light py-3 border-top bg-dark">
        &copy; {new Date().getFullYear()} LinkSafe. Stay safe online!
      </footer>
    </>
  );
}




