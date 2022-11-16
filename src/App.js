import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  
  useEffect(()=>{
    console.log(process.env.REACT_APP_API_KEY)
    fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_API_KEY}`)
    .then(response=>response.json())
    .then(data=>{console.log(data)})
    .error(error=>console.log(error));
  },[]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
