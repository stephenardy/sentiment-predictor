from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import List
from typing import Optional
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
import joblib
from preprocessing import remove_blanks, remove_duplicates, clean_text, normalize_text
from slangwords import fix_slangwords
import pandas as pd
import io


class PredictionResult(BaseModel):
    timestamp: Optional[datetime] = None
    original_text: str
    final_text: str
    prediction: str


vectorizer = joblib.load("./tfidf_vectorizer.pkl")
model = joblib.load("./linear_svm_model.pkl")


app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


tweet_db = []


@app.post("/", response_model=List[PredictionResult])
async def add_tweets(
    file: UploadFile = File(...),
    column_name: str = Form(...),
    time_stamp: Optional[str] = Form(None),
):

    time_stamp = time_stamp or None

    # File type validation
    if file.filename.endswith(".xlsx"):
        content = await file.read()
        xls = pd.read_excel(io.BytesIO(content), sheet_name=None)
        df = None

        for sheet_name, sheet_df in xls.items():
            if column_name in sheet_df.columns:
                df = sheet_df
                break

        if df is None:
            raise HTTPException(
                status_code=400, detail=f"There is no column named {column_name}"
            )
    elif file.filename.endswith(".csv"):
        content = await file.read()
        df = pd.read_csv(io.StringIO(content.decode("utf-8")))

        if column_name not in df.columns:
            raise HTTPException(
                status_code=400, detail=f"There is no column named {column_name}"
            )
    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload a .csv or .xlsx file.",
        )

    # Tweet column name validation
    if column_name not in df.columns:
        raise HTTPException(
            status_code=400, detail=f"There is no column named {column_name}."
        )

    # # Timestamp column (and its name) validation
    if time_stamp:
        df[time_stamp] = pd.to_datetime(df[time_stamp], errors="coerce")
        if time_stamp not in df.columns:
            raise HTTPException(
                status_code=400, detail=f"There is no column named {time_stamp}."
            )

    # Preprocessing and Prediction Process
    try:
        results = []

        for _, row in df.iterrows():
            raw_text = row[column_name]
            raw_time = row[time_stamp] if time_stamp else None

            if pd.isnull(raw_text):
                continue

            text = str(raw_text).strip()
            timestamp = raw_time if pd.notnull(raw_time) else None

            cleaned_text = clean_text(text)
            slang_fixed = fix_slangwords(cleaned_text)
            normalized_text = normalize_text(slang_fixed)

            vectorized = vectorizer.transform([normalized_text])
            prediction = model.predict(vectorized)[0]

            results.append(
                {
                    "timestamp": timestamp,
                    "original_text": text,
                    "final_text": normalized_text,
                    "prediction": prediction,
                }
            )

        return results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
