import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import PlanetDetailPage from './PlanetDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planet/:planetId" element={<PlanetDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
