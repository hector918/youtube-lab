import { useEffect, useState} from "react";
import style from "./index.module.css";
// import { useNavigate } from "react-router-dom";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
// import { useErrorHandler } from 'react-error-boundary';

export default function Searchbar({ query, setVideos }) {
  
  const search_default_setting = {q:"","maxResults":"5" };
  const [search,setSearch] = useState(query?.slice(8)||"");

  useEffect(()=>{
    console.log(search);
    const decode_search = `https://youtube.googleapis.com/youtube/v3/search?q=${base64_decode(search)}part=snippet&type=video&key=${process.env.REACT_APP_API_KEY}`;
    console.log(decode_search);
    

    fetch(decode_search)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data['error']) console.log(data['error'])
        console.log(data["result"]);
      })
      .catch((error) => {
        console.log("123",error);
      })
    // try {
    //   fetch(
    //     `https://youtube.googleapis.com/youtube/v3/search?q=${decode_search}part=snippet&type=video&key=${process.env.REACT_APP_API_KEY}`
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setVideos(data.items);
    //     })
    //     .catch((error) => {
    //       console.log("123",error);
  
    //     })
    // } catch (error) {
    //   console.log("123",error);
    // }
    
  },[search])


  //handle window histroy back and forward event
  window.onpopstate = function(event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  };
  //
  const [searchKeyword, setSearchKeyword] = useState(search_default_setting);
  // const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let search_para = "";
    for(let x of e.target)
    {
      if(x.name&&["SELECT","INPUT"].includes(x.tagName)) search_para+=`${x.name}=${x.value}&`;
    }
    search_para = base64_encode(search_para);
    var url = `${window.location.pathname}?results=${search_para}`;
    window.history.pushState({url: url}, '', url);
    setSearch(search_para);
    // navigate(`/results=${base64_encode(JSON.stringify(searchKeyword))}`)
  };


  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Search"
          value={searchKeyword.q}
          onChange={(e) => setSearchKeyword(pv=>({...pv,"q":e.target.value}))}
          name="q"
        />
        <button>Go</button>
        {/* from hector I add code below from search feature */}
        <div>
          <label>number of content per page
            <select name="maxResults"><option>5</option><option>10</option><option>15</option></select>
          </label>
          <label>Order
            <select name="order"><option>date</option><option>rating</option><option>relevance</option><option>title</option><option>videoCount </option><option>viewCount </option></select>
          </label>
          <label>
            <select name="safeSearch"><option>none</option><option>moderate</option><option>strict</option></select>
          </label>
          <label>Language
            <select name="relevanceLanguage"><option>en</option><option>fr</option><option>zh</option></select>
          </label>
        </div>
      </form>
    </div>
  );
}
