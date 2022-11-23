import React, { useState, useEffect} from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";


export default function Searchbar(props) {
  
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?q=${search}`)
  };
  useEffect(()=> {
    setSearch(props.query || "")
  }, [props.query])
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
