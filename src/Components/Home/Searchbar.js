import { useEffect, useState} from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
// import { useErrorHandler } from 'react-error-boundary';
let _SetVideos;
let fetchStatus=false;
const search_default_setting = {q:"","maxResults":"5",order:"date",safeSearch:"none",relevanceLanguage:"en",pageToken:""};
export default function Searchbar({ query, upliftVideos }) {
  ////variable/////////////////////////////////

  if(Array.isArray(upliftVideos)&&upliftVideos.length===1){
    _SetVideos = upliftVideos.pop();
  } 
  

  
  
  let query_to_obj
  try {
    query_to_obj = query.slice(8);

 
    // query_to_obj = JSON.parse(base64_decode(query_to_obj));
  } catch (error) {
    console.log((error))
    query_to_obj = base64_encode(JSON.stringify({}));
  }
  const [search,setSearch] = useState(query_to_obj);
 
  const [pageTokens, SetPageTokens] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(search_default_setting);
  ///////////////////////////////////////////////////////////////////////
  useEffect(()=>{
    console.log("useeffect -> start");
   
  })
  useEffect(()=>{
    console.log("useeffect -> search",search,base64_decode(search))
    let decode_search =  JSON.parse(base64_decode(search));
    let search_string = "";
    for(let x in decode_search)
    {
      if(Object.keys(search_default_setting).includes(x))
      {
        setSearchKeyword(pv=>({...pv,[x]:decode_search[x]}));
        search_string += `${x}=${decode_search[x]}&`;
      }
    }

    // var url = `${window.location.pathname}?results=${search}`;


    // window.history.replaceState({url: url}, 'home', url);
    //${process.env.REACT_APP_API_KEY}
    
    if(!fetchStatus)
    {
      fetchStatus=true;
      let fetch_url = `https://youtube.googleapis.com/youtube/v3/search?${search_string}&part=snippet&type=video&key=AIzaSyAuS128nENk1_nP-PO2crawo-uBzjmMFZM`;
      console.log("dads",fetch_url);

      fetch(fetch_url)
      .then((response) => response.json())
      .then((data) => {
        fetchStatus=false;

        console.log(data);
        if(data['error']) console.log(data['error']);

        if(_SetVideos) _SetVideos(data["items"]);
        if(data["nextPageToken"]) SetPageTokens(pv=>[...pv,data["nextPageToken"]]);
      })
      .catch((error) => {
        fetchStatus=false;

        //should add a error handling in here
        console.log(error);
      })
    }
    
  },[search])
  

  //handle window histroy back and forward event
  window.onpopstate = function(event) {
    // console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    const decode_search = base64_decode(search);
    
    const keyword_filter = Object.keys(search_default_setting);
    console.log("onhistroy move",window.history,decode_search);

    let new_search_string = "";
    for(let x of decode_search.split("&"))
    {
      let [ key , val ] = x.split("=");
      if(keyword_filter.includes(key)){
        setSearchKeyword(pv=>({...pv,[key]:val||""}));
        new_search_string+=`${key}=${val}&`;
      } 
    }
    setSearch(base64_encode(new_search_string));
  };
  /////event//////////////////////////////////////////////////////////////
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let search_obj = {};
    for(let x of e.target)
    {
      if(x.name&&["SELECT","INPUT"].includes(x.tagName)){
        search_obj[x.name]=x.value;
      } 
    }
    
    setSearch(base64_encode(JSON.stringify(search_obj)));
    SetPageTokens([]);

    navigate(`/results=${base64_encode(JSON.stringify(searchKeyword))}`)
  };
  const on_page_button_click= (evt)=>{
    if(pageTokens.length===0) return;
    const dirction = evt.target.name==="next"?pageTokens.pop():"";
    const decode_search = JSON.parse(base64_decode(search));
    decode_search["pageToken"]=dirction;
    console.log(decode_search);
    setSearch(base64_encode(JSON.stringify(decode_search)));
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
