import "./App.css";
import { useEffect } from "react";
import Header from "./Components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoDetailDisplay from "./Components/videoDetailDisplay";
import Home from "./Components/Home";

function App() {
  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="video/:id" element={<VideoDetailDisplay />}>
            test
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
