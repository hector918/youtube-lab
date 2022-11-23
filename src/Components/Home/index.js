import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import style from "./index.module.css";
import VideoThumb from "./VideoThumb";


export default function Home() {
  const [videos, setVideos] = useState([]);
   const search = "";
  const getData = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${search}&maxResults=20&part=snippet&type=video&key=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.items);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
   getData();
  }, []);
  return (
    <div className={style.container}>
      <Searchbar query={search} />
      {videos.length === 0 && <p>No Videos Found</p>}
      <div className={style.videos}>
        {videos.map((video) => (
          <VideoThumb
            videoID={video.id.videoId}
            title={video.snippet.title}
            thumbnail={video.snippet.thumbnails.high.url}
            key={video.id.videoId}
          />
        ))}
      </div>
    </div>
  );
}
