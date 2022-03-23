import React from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherHome from './WeatherHome'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://www.maatocollection.com/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          About Me
        </a>
      </header>

      <h1>Weather API</h1>
    <WeatherHome/>
    </div>
  );
}

export default App;