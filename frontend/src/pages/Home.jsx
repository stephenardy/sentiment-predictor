import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import data from "../data";

function Home({ setResults }) {
  const [tweet, setTweet] = useState("");
  const [tweetList, setTweetList] = useState([]);

  const navigate = useNavigate();

  const fetchTweets = async () => {
    try {
      const res = await api.get("/");
      setTweetList(res.data.tweets);
    } catch (error) {
      console.error("Error fetching tweet list", error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/", { tweet: tweet.trim() });
      await fetchTweets();
      setTweet("");
    } catch (error) {
      console.error("Error posting new tweet", error);
    }
  }

  async function onPredict() {
    try {
      const res = await api.post("/predict", { tweets: tweetList });
      console.log(res.data);
      setResults(res.data.results);
      navigate("/result");
    } catch (error) {
      console.error("Error predict tweets", error);
    }
  }

  async function onClearTweet() {
    try {
      await api.delete("/");
      await fetchTweets();
    } catch (error) {
      console.error("clear tweets failed", error);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex justify-center w-full mt-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="w-64 mr-4 pl-2 border rounded"
          placeholder="Input tweets here"
          type="text"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />

        <button
          disabled={!tweet}
          className={` text-white p-1 rounded ${
            !tweet
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-800 cursor-pointer"
          }`}
        >
          Submit
        </button>
      </form>
      <div className="flex flex-col mt-8 bg-gray-200/50 w-sm min-h-64 rounded">
        <h2 className="flex justify-center font-bold">List of Tweets</h2>
        <ul className="list-decimal pl-8">
          {tweetList.length !== 0 ? (
            tweetList.map((tweet, index) => (
              <li key={index} className="text-wrap">
                <p>{tweet}</p>
              </li>
            ))
          ) : (
            <div>
              <p>No Tweets yet!</p>
            </div>
          )}
        </ul>
      </div>
      <div className="flex gap-2 w-sm">
        <button
          className="w-1/2 mt-4 py-1 text-white bg-red-500 hover:bg-red-700 rounded cursor-pointer"
          onClick={onClearTweet}
        >
          Clear Tweets
        </button>
        <button
          disabled={tweetList.length === 0}
          className={`w-1/2 mt-4 py-1 text-white rounded ${
            tweetList.length === 0
              ? "cursor-not-allowed bg-gray-300"
              : "cursor-pointer bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={onPredict}
        >
          Predict
        </button>
      </div>
    </div>
  );
}

export default Home;
