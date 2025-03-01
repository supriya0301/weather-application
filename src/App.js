

import  { useEffect, useState } from 'react';
import coldBg from './assets/cold.jpg';
import hotBg from './assets/hot.jpg';
import Descriptions from './components/Descriptions';
import { getFormattedweatherData } from './weatherService';

function App() {
  const [city, setCity]=useState("Patna");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric"); // Added state for units
  const [bg, setBg]=useState(hotBg);


  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedweatherData(city,units);
      setWeather(data);

      //dynamic bg

      const threshold = units === 'metric' ? 20 : 60;
        if(data.temp <=threshold) setBg(coldBg);
        else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units,city]); // Added units to dependency array

  // const handleUnitsClick=(e)=>{
  //   const button = e.currentTarget;
  //   const currentUnit = button.innerText.slice(1);

  //   const isCelsius = currentUnit ==="C";
  //   button.innnerText = isCelsius ? "°F" : "°C";
  //   setUnits(isCelsius ? "metric" : "imperial");
  // };

  const enterKeyPressed = (e)=>{
   if(e.keyCode === 13)
    {
      setCity(e.currentTarget.value);
       e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input onKeyDown={enterKeyPressed}type="text" name="city" placeholder="Enter City..." />

              <button onClick={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}>
                {units === 'metric' ? '°F' : '°C'}
              </button>

              {/* <button onClick={(e)=>handleUnitsClick(e)}>°F</button> */}

            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
