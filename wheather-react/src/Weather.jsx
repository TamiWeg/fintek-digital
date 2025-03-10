import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import logo from './assets/'
import "./weather.scss";

const Weather = () => {
  // State to manage weather data and UI elements
  const [weatherData, setWeatherData] = useState({
    city: "",
    weather: null,
    errors: "",
    loading: false,
    cities: [],
    hourlyForecast: [],
  });
  const { city, weather, errors, loading, cities, hourlyForecast } = weatherData;

  // Get current hour from weather data
  const currentTime = weather ? weather.location.localtime.split(" ")[1] : null;
  const currentHour = currentTime ? Number(currentTime.split(":")[0]) : null;
  const fromHour = currentHour ? currentHour - 3 : null;
  const toHour = currentHour ? currentHour + 1 : null;

  // Filter the hourly forecast based on the current time
  const filteredForecast = hourlyForecast.length > 0
    ? hourlyForecast.filter(hour => {
        const hourTime = Number(hour.time.split(" ")[1].split(":")[0]);
        return hourTime >= fromHour && hourTime <= toHour;
    })
    : [];

  // Fetch list of cities from the backend
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await axios.get("http://localhost:8080/weather/cities");
        const data = response.data;
        if (data?.cities) {
          const allCities = data.cities.flatMap((country) => country);
          setWeatherData((prevData) => ({
            ...prevData,
            cities: allCities.map((city) => ({ title: city })),
          }));
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
    fetchCities();
  }, []);

  // Fetch weather data for the selected city
  const fetchWeather = useCallback(async () => {
    if (!city) {
      setWeatherData((prevData) => ({ ...prevData, errors: "Please enter city name" }));
      return;
    }
    try {
      setWeatherData((prevData) => ({ ...prevData, errors: "", loading: true }));
      const result = await axios.get(`http://localhost:8080/weather?city=${city}`);
      setWeatherData((prevData) => ({
        ...prevData,
        weather: result.data,
        hourlyForecast: result.data.forecast.forecastday[0].hour,
      }));
    } catch (err) {
      setWeatherData((prevData) => ({ ...prevData, errors: "Could not fetch weather data", weather: null }));
    } finally {
      setWeatherData((prevData) => ({ ...prevData, loading: false, city: "" }));
    }
  }, [city]);

  // Handle city selection from suggestions
  const handleCitySelect = (selectedCity) => {
    setWeatherData((prevData) => ({
      ...prevData,
      city: selectedCity,
      showSuggestions: false,
    }));
  };

  // Filter the cities based on the user input
  const filteredCities = cities.filter((c) => c.title.toLowerCase().includes(city.toLowerCase()));

  return (
    <div className="container">
      <div className="left-panel">
        <h1 className="title">Use our weather app to see the weather around the world</h1>
        <div className="input-group">
          <TextField
            id="outlined-basic"
            label="City name"
            variant="outlined"
            value={city}
            onChange={(e) => { 
              setWeatherData((prevData) => ({ ...prevData, city: e.target.value, showSuggestions: true }));
            }}
            className="input-field"
          />
          <Button onClick={fetchWeather} className="check-button" disabled={loading}>
            {loading ? <span className="loader"></span> : "Check"}
          </Button>
          {weatherData.showSuggestions && city && filteredCities.length > 0 && (
            <ul className="city-suggestions">
              {filteredCities.slice(0, 5).map((c, index) => (
                <li key={index} onClick={() => handleCitySelect(c.title)}>
                  {c.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        {errors && <p className="error-text">{errors}</p>}
        {weather ? (
          <div className="location">
            <h3>Latitude: {weather.location.lat}, Longitude: {weather.location.lon}</h3>
            <h3>accurate {weather.location.localtime}</h3>
          </div>
        ) : ""}
      </div>
      <div className="right-panel">
        {weather ? (
          <div className="weather-box">
            <h2>{weather.location.name}</h2>
            <h4>{weather.location.country}</h4>
            <p className="hours">{weather.location.localtime}</p>
            <p className="temp">{weather.current.temp_c}°</p>
            <p className="condition">{weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="Weather icon" />
            <div className="weather-details">
              <p>Precipitation:<br />{weather.current.precip_mm} mm</p>
              <p>Humidity:<br />{weather.current.humidity}%</p>
              <p>Wind:<br />{weather.current.wind_kph} km/h</p>
            </div>
            <div className="hourly-forecast">
              {filteredForecast.map((hour, index) => (
                <div key={index} className="hour-box">
                  <p>{hour.time.split(" ")[1]}</p>
                  <p>{hour.temp_c}°</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="weather-placeholder">Enter a city to see the weather</div>
        )}
      </div>
    </div>
  );
};

export default Weather;
