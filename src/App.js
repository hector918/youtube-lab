import "./App.css";
import { useEffect } from "react";
import Header from "./Components/Header";
import { BrowserRouter, Route ,Routes } from "react-router-dom";
import VideoDetailDisplay from "./Components/videoDetailDisplay";

function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);
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
          <Route path="/" element={<div>home page</div>}></Route>
          <Route path="video/:id" element={<VideoDetailDisplay/>}>test</Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
