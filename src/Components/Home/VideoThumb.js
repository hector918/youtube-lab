import React from "react";
import { Link } from "react-router-dom";

export default function VideoThumb(props) {
  return (
    <Link to={`/video/${props.videoID}`}>
        <img src={props.thumbnail}/> 
        <h3>{props.title}</h3>
    </Link>
  );
}
