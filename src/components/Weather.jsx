import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await (await fetch(url)).json();
      console.log(response);
      setWeatherData({
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        temperature: Math.floor(response.main.temp),
        location: response.name,
        icon: `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Can't fetch weather data");
    }
  };
  useEffect(() => {
    search("London");
  }, []);
  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      search(inputRef.current.value);
      inputRef.current.value = "";
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search-bar">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Location"
            onKeyDown={handleSearch}
          />
          <img
            className="search-img"
            src={search_icon}
            onClick={handleSearch}
            alt=""
          />
        </div>
        {weatherData ? (
          <>
            <img src={weatherData.icon} alt="" className="weather-icon" />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div className="humidity">
                  <p>{weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wind_icon} alt="" />
                <div className="wind">
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Weather;
