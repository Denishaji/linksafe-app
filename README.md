# 🔒 LinkSafe – AI-Powered URL Safety Checker

LinkSafe is a full-stack web application designed to detect whether a given URL is safe or malicious.  
The app combines a machine learning model (Random Forest Classifier) and heuristic rules to predict URL safety with high confidence.

---

## 🚀 Live Application

- 🌐 **Frontend (React.js)**: [https://linksafe-app-backend.onrender.com](https://linksafe-app-backend.onrender.com)
- 🛠️ **Backend (Flask API)**: [https://linksafe-app-frontend.onrender.com](https://linksafe-app-frontend.onrender.com)


---

## ✨ Features

- 🔎 Real-time URL safety prediction
- 📊 Confidence score display
- 🛡️ Detection reasons (e.g., suspicious keywords, shady domains)
- 🖥️ Responsive design (Bootstrap 5)
- 🌐 Hosted online using Render.com
- 📦 Organized codebase for easy deployment and scaling

---

## 🛠️ Tech Stack

| Frontend               | Backend             | Machine Learning | Deployment      |
|:------------------------|:--------------------|:-----------------|:----------------|
| React.js (Vite)          | Python (Flask)       | Random Forest (Scikit-Learn) | Render.com |
| Bootstrap 5             | Flask-CORS           | Feature Extraction Techniques | GitHub |

---

## 📂 Folder Structure

```plaintext
linksafe-app/
├── backend/                    
│   ├── app.py                   # Main Flask backend application
│   ├── models/                  # Trained Random Forest model (.pkl file)
│   ├── notebooks/               # Feature extraction scripts
│   │    └── Feature_Extraction.py
│   ├── requirements.txt         # Python backend dependencies
│   └── Procfile                 # Render deployment configuration
│
├── frontend/                   
│   ├── public/                  # Static assets
│   ├── src/                     # React.js source code
│   │    ├── App.jsx             # Main App component
│   │    ├── main.jsx            # React entry point
│   │    ├── URLChecker.jsx      # URL Checker component (API calls)
│   │    └── index.css           # Styling and design
│   ├── package.json             # React project dependencies
│   └── vite.config.js           # Vite bundler configuration
│
└── README.md                    # Project documentation




