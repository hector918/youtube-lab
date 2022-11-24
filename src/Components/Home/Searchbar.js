import { useEffect, useState} from "react";
import style from "./index.module.css";
// import { useNavigate } from "react-router-dom";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
// import { useErrorHandler } from 'react-error-boundary';
let _SetVideos;

export default function Searchbar({ query, setVideos }) {
  ////variable/////////////////////////////////
  _SetVideos = setVideos;
  const search_default_setting = {q:"","maxResults":"5",order:"date",safeSearch:"none",relevanceLanguage:"en"};
  const [search,setSearch] = useState(query?.slice(8)||"");
  const [pageTokens, SetPageTokens] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(search_default_setting);
  ///////////////////////////////////////////////////////////////////////
  useEffect(()=>{
    const decode_search = base64_decode(search);
    fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${decode_search}&part=snippet&type=video&key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {

        // console.log(data);
        if(data['error']) console.log(data['error']);
        if(_SetVideos) _SetVideos(data["items"]);
        if(data["nextPageToken"]) SetPageTokens(pv=>[...pv,data["nextPageToken"]]);
      })
      .catch((error) => {
        //should add a error handling in here
        console.log(error);
      })

    
  },[search])


  //handle window histroy back and forward event
  window.onpopstate = function(event) {
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    console.log(search);
    const decode_search = base64_decode(search);
    const keyword_filter = Object.keys(search_default_setting);
    for(let x of decode_search.split("&"))
    {
      let [ key , val ] = x.split("=");
      if(keyword_filter.includes(key)) setSearchKeyword(pv=>({...pv,[key]:val}));
    }
  };
  /////event//////////////////////////////////////////////////////////////
  
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
    SetPageTokens([]);
    console.log(window.history);
    // navigate(`/results=${base64_encode(JSON.stringify(searchKeyword))}`)
  };
  const on_page_button_click= (evt)=>{
    const dirction = evt.target.name==="next"?pageTokens.pop():"";
    const decode_search = base64_decode(search);
    setSearch(base64_encode(`${decode_search}&pageToken=${dirction}`));
  }
/////////////////////////////////////////////////////////////////////////////////
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
            <select name="maxResults" value={searchKeyword.maxResults} onChange={(e) => setSearchKeyword(pv=>({...pv,[e.target.name]:e.target.value}))}><option>5</option><option>10</option><option>15</option></select>
          </label>
          <label>Order
            <select name="order" value={searchKeyword.order} onChange={(e) => setSearchKeyword(pv=>({...pv,[e.target.name]:e.target.value}))}><option>date</option><option>rating</option><option>relevance</option><option>title</option><option>videoCount </option><option>viewCount </option></select>
          </label>
          <label>
            <select name="safeSearch" value={searchKeyword.safeSearch} onChange={(e) => setSearchKeyword(pv=>({...pv,[e.target.name]:e.target.value}))}><option>none</option><option>moderate</option><option>strict</option></select>
          </label>
          <label>Language
            <select name="relevanceLanguage" value={searchKeyword.relevanceLanguage} onChange={(e) => setSearchKeyword(pv=>({...pv,[e.target.name]:e.target.value}))}><option>en</option><option>fr</option><option>zh</option></select>
          </label>
        </div>
      </form>
      <div><button name="prev" onClick={on_page_button_click}>first page</button><button  name="next" onClick={on_page_button_click}>next page</button></div>
      
    </div>
  );
}
