import { useState } from "react";

const URL = "http://localhost:5000/api/auth/plan";

export const Plan = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelPrice, setHotelPrice] = useState(null)
  const [guideName, setGuideName] = useState("");
  const [type, setType] = useState("");
  const [whetherData, setWhetherData] = useState(null);
  const [swlat, setSwlat] = useState(null);
  const [swlng, setSwlng] = useState(null);
  const [nelat, setNelat] = useState(null);
  const [nelng, setNelng] = useState(null);

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSwlat(whetherData.location.lat - 0.1);
    setSwlng(whetherData.location.lon - 0.1);
    setNelat(whetherData.location.lat + 0.1);
    setNelng(whetherData.location.lon + 0.1);
    console.log(swlat,swlng,nelat,nelng);
  };

  const handleSubmitWhether = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_WHETHER_API
        }&q=${to}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch travel data");
      }
      const data = await response.json();
      setWhetherData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="form-container bg-gradient border rounded p-4">
            <h1 className="text-center mb-4">Plan Your Journey</h1>
            <form onSubmit={handleSubmit}>
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
                className="btn btn-success btn-block"
                onClick={handleSubmitWhether}
              >
                Weather
              </button>
              {whetherData && (
                <button
                  type="submit"
                  className="btn mx-2 btn-outline-primary btn-block"
                >
                  Enjoy Journey..
                </button>
              )}
            </form>
            {whetherData && (
              <div className="mt-4">
                <h2 className="text-center mb-4">Weather Report</h2>
                <div className="weather-info-container bg-dark border rounded p-4 shadow-sm">
                  <div className="weather-condition text-center">
                    <h3 className="mb-3">
                      {whetherData.current.condition.text}
                    </h3>
                    <img
                      src={whetherData.current.condition.icon}
                      alt="Weather Icon"
                      className="weather-icon"
                    />
                  </div>
                  <div className="weather-details">
                    <p className="mb-2">
                      <strong>Temperature:</strong> {whetherData.current.temp_c}{" "}
                      °C
                    </p>
                    <p className="mb-2">
                      <strong>Humidity:</strong> {whetherData.current.humidity}{" "}
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
