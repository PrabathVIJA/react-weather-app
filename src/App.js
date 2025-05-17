import { useState, useEffect } from "react";
import ErrorMessage from "./components/ErrorMessage.jsx";
import Temperature from "./components/TemperatureShow.jsx";
const key = `7a2f65506b6896e5eed6b97b70bb9655`;
function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    async function weatherGetter() {
      if (city.trim().length < 4) {
        return;
      }

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
        );

        if (!res.ok) {
          setTemperature("");
          throw new Error("City not found");
        }

        if (res.ok) {
          setError("");
        }

        const data = await res.json();

        setTemperature(data.main.temp);
      } catch (e) {
        setError(e.message);
      }
    }
    weatherGetter();
  }, [city]);

  function temperatureHandler(e) {
    setCity(e.target.value);
  }

  return (
    <>
      <div>
        <div>
          <label htmlFor="temp">Enter City:</label>
          <br></br>
          <input
            type="text"
            id="temp"
            name="temp"
            onChange={temperatureHandler}
          />
        </div>
        {temperature && <Temperature>{temperature}</Temperature>}
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

export default App;
