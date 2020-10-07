import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { HOST } from './utils/utils';

function App() {
  
   useEffect(() => {
     async function fetchData(url: string) {
       const r = await fetch(url);
       const inJSON = (await r.json()) as any;
       console.warn("fgfgfgfgfg", inJSON);
     }
     fetchData(`${HOST}/org-data`);
   }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
