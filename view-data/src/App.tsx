import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { HOST } from './utils/utils';

function App() {
  useEffect(()=>{
    fetch("https://agile-depths-71250.herokuapp.com/org-data")
      .then((response) => response.json())
      .then(data => {
        console.log(data)
      })
      .catch((err) => console.log(err));
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
