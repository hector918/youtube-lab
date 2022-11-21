import React, { useState } from "react";
import Searchbar from "./Searchbar";
import style from "./index.module.css";
import VideoThumb from "./VideoThumb";

export default function Home() {
  const [videos, setVideos] = useState([]);
  console.log(videos);
  return (
    <div className={style.container}>
      <Searchbar setVideos={setVideos} />
      {videos.length === 0 && <p>No Videos Found</p>}
      {videos.map((video) => (
        <VideoThumb
          videoID={video.id.videoId}
          title={video.snippet.title}
          thumbnail={video.snippet.thumbnails.high.url}
          key={video.id.videoId}
        />
      ))}
    </div>
  );
}
