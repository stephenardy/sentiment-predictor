# Sentiment-Predictor

## Overview
This project includes a **React-based frontend** and a **FastAPI-powered backend**, offering a streamlined setup for modern web development. The frontend is developed using JavaScript with **npm** for dependency management, while the backend is built in Python, with dependencies handled via **pip**.


## Setup Instructions

### Frontend
To set up the frontend, run the following commands:

```bash
cd frontend
npm install
```

### Backend
If using a virtual environment, create and activate it before installing dependencies:
```bash
cd backend
python -m venv venv
```

```bash
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate  # Windows
```

To set up the backend, run the following commands:

```bash
cd backend
pip install -r requirements.txt
```

## Start the App
To start the React development server:

```bash
npm run dev
```

To start the FastAPI server:

```bash
uvicorn main:app --reload
```
