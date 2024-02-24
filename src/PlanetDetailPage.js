import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './PlanetDetailPage.css';

function PlanetDetailPage() {
  const [planet, setPlanet] = useState(null);
  const [residents, setResidents] = useState([]);

  const { planetId } = useParams();

  useEffect(() => {
    const fetchPlanet = async () => {
      const response = await fetch(`https://swapi.dev/api/planets/${parseInt(planetId) + 1}/`);
      const data = await response.json();
      setPlanet(data);

      const promises = data.residents.map(url => fetch(url).then(res => res.json()));
      const residentsData = await Promise.all(promises);
      setResidents(residentsData);
    };

    fetchPlanet();
  }, [planetId]);

  return (
    <div className='page-container'>
    <div>
      {planet ? (
        <div>
           <div className="planet-card">
          <h1>{planet.name}</h1>
         
          <p><b>Climate: </b> {planet.climate}</p>
          <p><b>Population: </b> {planet.population}</p>
          <p><b>Terrain: </b>{planet.terrain}</p>
          <p><b>Diameter: </b> {planet.diameter}</p>
          <p><b>Gravity: </b> {planet.gravity}</p>
          <p><b>Surface water: </b>{planet.surface_water}</p>
          <p><b>Rotation period: </b>{planet.rotation_period}</p>
          <p><b>Orbital period: </b>{planet.orbital_period}</p>
          <h2>Residents:</h2>
          <ul className="residents-list">
            {residents.map((resident, index) => (
              <li key={index}>
                <b>Name:</b> {resident.name}, <b>Height:</b> {resident.height}, <b>Mass:</b> {resident.mass}, <b>Gender:</b> {resident.gender}
              </li>
            ))}
          </ul>
          </div>
          <Link to="/"><button className='btn'>Back to Home
          </button>
          </Link>
        </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
    
  );
}

export default PlanetDetailPage;
