import { useState, useEffect } from "react";
import Error from "./components/Error.jsx";
const key = `7a2f65506b6896e5eed6b97b70bb9655`;
function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    async function weatherGetter() {
      if (city.trim().length < 4) {
        return;
      }
      console.log(city.length);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
        );

        if (!res.ok) {
          throw new Error("City not found");
        }

        setError("");

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
        {temperature && (
          <div>
            <p>
              <strong>{temperature}</strong>
            </p>
          </div>
        )}
      </div>
      {error && <Error>{error}</Error>}
    </>
  );
}

export default App;
