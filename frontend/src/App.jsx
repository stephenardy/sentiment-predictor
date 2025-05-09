import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Visualize from "./pages/Visualize";
import { useState } from "react";

function App() {
  const [results, setResults] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setResults={setResults} />}></Route>
          <Route
            path="/result"
            element={<Visualize results={results} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
