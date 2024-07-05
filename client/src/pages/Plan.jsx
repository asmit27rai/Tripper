import { useState, useEffect } from "react";
import { getPlacesData } from "../api/Inndex";

const URL = "http://localhost:5000/api/auth/plan";

export const Plan = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [attractionData, setAttractionData] = useState(null);
  const [type, setType] = useState("hotels");

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmitWeather = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API}&q=${to}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleEnjoyJourneyClick = async () => {
    if (!weatherData) return;

    try {
      const placesData = await getPlacesData(
        type,
        (weatherData.location.lat - 0.1).toFixed(2),
        (weatherData.location.lat + 0.1).toFixed(2),
        (weatherData.location.lon - 0.1).toFixed(2),
        (weatherData.location.lon + 0.1).toFixed(2)
      );
      if (type === "hotels") {
        setHotelData(placesData);
      }
      if (type === "restaurants") {
        setRestaurantData(placesData);
      }
      if (type === "attractions") {
        setAttractionData(placesData);
      }
    } catch (error) {
      console.log("Error fetching places data:", error);
    }
  };

  useEffect(() => {
    if (hotelData) console.log("Hotel Data:", hotelData);
  }, [hotelData]);

  useEffect(() => {
    if (restaurantData) console.log("Restaurant Data:", restaurantData);
  }, [restaurantData]);

  useEffect(() => {
    if (attractionData) console.log("Attraction Data:", attractionData);
  }, [attractionData]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="form-container bg-gradient border rounded p-4">
            <h1 className="text-center mb-4">Plan Your Journey</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="from" className="form-label">
                  From
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="from"
                  value={from}
                  onChange={handleFromChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="to" className="form-label">
                  To
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="to"
                  value={to}
                  onChange={handleToChange}
                />
              </div>
              <button
                type="button"
                onClick={handleSubmitWeather}
                className="btn btn-success btn-block"
              >
                Weather
              </button>
              {weatherData && (
                <>
                  <div className="mt-3">
                    <label htmlFor="type" className="form-label">
                      Select Type
                    </label>
                    <select
                      className="form-select"
                      id="type"
                      value={type}
                      onChange={handleTypeChange}
                    >
                      <option value="hotels">Hotels</option>
                      <option value="restaurants">Restaurants</option>
                      <option value="attractions">Attractions</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={handleEnjoyJourneyClick}
                    className="btn mx-2 btn-outline-primary btn-block mt-2"
                  >
                    Enjoy Journey..
                  </button>
                </>
              )}
            </form>
            {weatherData && (
              <div className="mt-4">
                <h2 className="text-center mb-4">Weather Report</h2>
                <div className="weather-info-container bg-dark border rounded p-4 shadow-sm">
                  <div className="weather-condition text-center">
                    <h3 className="mb-3">
                      {weatherData.current.condition.text}
                    </h3>
                    <img
                      src={weatherData.current.condition.icon}
                      alt="Weather Icon"
                      className="weather-icon"
                    />
                  </div>
                  <div className="weather-details">
                    <p className="mb-2">
                      <strong>Temperature:</strong> {weatherData.current.temp_c}{" "}
                      °C
                    </p>
                    <p className="mb-2">
                      <strong>Humidity:</strong> {weatherData.current.humidity}{" "}
                      %
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
