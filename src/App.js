import { useState, useEffect } from "react";
import ErrorMessage from "./Components/ErrorMessage.jsx";
import Temperature from "./Components/TemperatureShow.jsx";
import Label from "./Components/Label.jsx";
import TextInput from "./Components/TextInput.jsx";
import Loader from "./Components/Loader.jsx";
const API_KEY = `7a2f65506b6896e5eed6b97b70bb9655`;
function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (city.trim().length <= 4) return;
    // Get the weather
    async function fetchWeather() {
      setLoading(true);

      try {
        console.log("fetching weather now...");
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
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
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [city]);

  function handleCityChange(value) {
    setCity(value);
  }

  return (
    <>
      <div>
        <div>
          <Label htmlFor="temp">Enter City:</Label>
          <br />
          <TextInput
            type="text"
            id="temp"
            name="temp"
            value={city}
            placeholder="e.g., London"
            onChange={handleCityChange}
          />
        </div>
        <div>
          {loading && <Loader />}
          {!loading && temperature && <Temperature>{temperature}</Temperature>}
        </div>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
}

export default App;
