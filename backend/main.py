from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import joblib
from preprocessing import remove_blanks,remove_duplicates,clean_text, normalize_text
from slangwords import fix_slangwords


class InputData(BaseModel):
    tweet: str

class ListData(BaseModel):
    # column: str
    # timestamp: List[str]
    tweets: List[str]
    

vectorizer = joblib.load("./tfidf_vectorizer.pkl")
model = joblib.load("./linear_svm_model.pkl")


app = FastAPI()

origins = [
	"http://localhost:5173"
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


tweet_db = []

@app.get("/", response_model=ListData)
def get_tweets():
    return ListData(tweets=tweet_db)

@app.post("/", response_model=InputData)
def add_comments(tweet_data:InputData):
    tweet_db.append(tweet_data.tweet)
    return tweet_data

@app.post("/predict")
def predict(data:ListData):

    try:

        results = []

        for text in data.tweets:
            cleaned_text = clean_text(text)
            slang_fixed = fix_slangwords(cleaned_text)
            normalized_text = normalize_text(slang_fixed)

            vectorized = vectorizer.transform([normalized_text])
            prediction = model.predict(vectorized)[0]

            results.append({
                "original_text": text,
                "final_text" : normalized_text,
                "sentiment" : prediction 
            })

        return {"results" : results}
    
    except Exception as e:
        print(f"Error during prediction: {e}")
        return {"error": "Internal server error, please check the server logs."}, 500

@app.delete("/")
def clear_tweets():
    tweet_db.clear()

   
