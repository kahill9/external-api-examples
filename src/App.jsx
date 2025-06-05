import { useState, useEffect } from "react";
import sunLogo from "./assets/sun.svg";
import "./App.css";

function App() {
  const [todaysWeatherForecast, setTodaysWeatherForecast] = useState();
  const [isTodayVisible, setIsTodayVisible] = useState(false);

  const [tomorrowsWeatherForecast, setTomorrowsWeatherForecast] = useState();
  const [isTomorrowVisible, setIsTomorrowVisible] = useState(false);

  useEffect(() => {}, []); // Empty dependency array, runs only once on initial load

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://api.weather.gov/gridpoints/BMX/59,85/forecast"
      );
      const data = await response.json();

      setTodaysWeatherForecast(
        data.properties.periods.find((obj) => obj.name === "Today")
      );
      setIsTodayVisible(true);

      setTomorrowsWeatherForecast(
        data.properties.periods.find((obj) => obj.number === 3)
      );
      setIsTomorrowVisible(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={sunLogo} className="logo sun" alt="Sun logo" />
        </a>
      </div>
      <h1>Weather Forecast</h1>
      <div>
        <p>Click this button to load weather data for Birmingham, AL!</p>
        <button onClick={handleClick}>Fetch Weather Data</button>

        <div id="todaysWeatherForcast">
          {todaysWeatherForecast && (
            <>
              {isTodayVisible ? (
                <div class="card">
                  <h1 class="temperature">
                    {todaysWeatherForecast.temperature}
                  </h1>
                  <div class="container">
                    <h4>
                      <b>Today's Forecast</b>
                    </h4>
                    <p>{todaysWeatherForecast.detailedForecast}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>

        <div id="tomorrowsWeatherForecast">
          {tomorrowsWeatherForecast && (
            <>
              {isTomorrowVisible ? (
                <div class="card">
                  <h1 class="temperature">
                    {tomorrowsWeatherForecast.temperature}
                  </h1>
                  <div class="container">
                    <h4>
                      <b>Tomorrow's Forecast</b>
                    </h4>
                    <p>{tomorrowsWeatherForecast.detailedForecast}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
