import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css';

function Home() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
  }, []);

  const fetchPlanets = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setPlanets([...planets, ...data.results]);
    setNextPage(data.next);
  };

  const fetchNextPage = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  return (
    <div className="home-container">
      <div className="Home">
        <h1 className="heading">STAR WAR PLANETS</h1>
        <div className="planets">
          {planets.map((planet, index) => (
            <div key={index} className="planet-card">
              <h2>{planet.name}</h2>
              <p><b>Climate: </b>{planet.climate}</p>
              <p><b>Population: </b> {planet.population}</p>
              <p><b>Terrain: </b>{planet.terrain}</p>
              <Link to={{ pathname: `/planet/${index }`, state: { planet } }}>
              <button >Know More</button>
              </Link>
            </div>
          ))}
        </div>
        <button className="load-more" onClick={fetchNextPage}>Load More</button>
      </div>
    </div>
  );
}

export default Home;
