import React, { useState } from "react";
import style from "./index.module.css";

export default function Searchbar(props) {
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${search}&maxResults=20&part=snippet&type=video&key=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.setVideos(data.items);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Go</button>
      </form>
    </div>
  );
}
