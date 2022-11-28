import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VideoDetailDisplay from "./Components/videoDetailDisplay";
import Home from "./Components/Home";
// import Result from "./Components/Results";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Routes>
          {/* from hector I alter you code a little bit right below */}
          <Route path="/" element={<Home />} />
          <Route path="/:results" element={<Home />} />
          <Route path="video/:id" element={<VideoDetailDisplay />}>
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
