import React, { useState } from "react";
import Searchbar from "../Home/Searchbar";
import style from "../Home/index.module.css";
import VideoThumb from "../Home/VideoThumb";
import { useParams } from "react-router-dom";

export default function Home() {
  const [videos, setVideos] = useState([]);

  const {results} = useParams();
  
  
  // from hector I altered the code right below.
  // const query = new URLSearchParams(useLocation().search);
  // const search = query.get("q") || "";
  // console.log(search,results);


  return (
    <div className={style.container}>
      <Searchbar query={results} setVideos={setVideos}/>
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
