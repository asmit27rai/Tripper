import { useState, useEffect } from "react";
import { getPlacesData } from "../api/Inndex";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const URL = "http://localhost:5000/api/auth/plan";

export const Plan = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [attractionData, setAttractionData] = useState(null);
  const [showing, setShowing] = useState(true);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleRestaurantSelect = (name) => {
    setSelectedRestaurants((prevState) =>
      prevState.includes(name)
        ? prevState.filter((restaurant) => restaurant !== name)
        : [...prevState, name]
    );
  };

  const handleAttractionSelection = (name) => {
    setSelectedAttractions((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((item) => item !== name)
        : [...prevSelected, name]
    );
  };

  const handleSubmitWeather = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_WEATHER_API
        }&q=${to}`
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
      const placesDataH = await getPlacesData(
        "hotels",
        (weatherData.location.lat - 0.1).toFixed(2),
        (weatherData.location.lat + 0.1).toFixed(2),
        (weatherData.location.lon - 0.1).toFixed(2),
        (weatherData.location.lon + 0.1).toFixed(2)
      );
      const placesDataR = await getPlacesData(
        "restaurants",
        (weatherData.location.lat - 0.1).toFixed(2),
        (weatherData.location.lat + 0.1).toFixed(2),
        (weatherData.location.lon - 0.1).toFixed(2),
        (weatherData.location.lon + 0.1).toFixed(2)
      );
      const placesDataA = await getPlacesData(
        "attractions",
        (weatherData.location.lat - 0.1).toFixed(2),
        (weatherData.location.lat + 0.1).toFixed(2),
        (weatherData.location.lon - 0.1).toFixed(2),
        (weatherData.location.lon + 0.1).toFixed(2)
      );
      setHotelData(placesDataH);
      setRestaurantData(placesDataR);
      setAttractionData(placesDataA);
      setShowing(false);
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {showing ? (
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
                          <strong>Temperature:</strong>{" "}
                          {weatherData.current.temp_c} °C
                        </p>
                        <p className="mb-2">
                          <strong>Humidity:</strong>{" "}
                          {weatherData.current.humidity} %
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container">
            <h1>Restaurant You Wanna Visit</h1>
            {restaurantData &&
              restaurantData.data &&
              restaurantData.data.data && (
                <Carousel responsive={responsive}>
                  {restaurantData.data.data.map((restaurant) => (
                    <Card
                      key={restaurant.location_id}
                      style={{ width: "18rem", margin: "10px" }}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          restaurant.photo
                            ? restaurant.photo.images.thumbnail.url
                            : "placeholder.jpg"
                        }
                      />
                      <Card.Body>
                        <Form.Check
                          type="checkbox"
                          name="restaurant"
                          id={`restaurant-${restaurant.location_id}`}
                          label=""
                          checked={selectedRestaurants.includes(
                            restaurant.name
                          )}
                          onChange={() =>
                            handleRestaurantSelect(restaurant.name)
                          }
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                          }}
                        />
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>
                          <strong>Rating:</strong> {restaurant.rating} <br />
                          <strong>Reviews:</strong> {restaurant.num_reviews}{" "}
                          <br />
                          <strong>Location:</strong>{" "}
                          {restaurant.location_string}
                        </Card.Text>
                        <Button
                          variant="primary"
                          href={restaurant.web_url}
                          target="_blank"
                        >
                          View More
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                </Carousel>
              )}
          </div>
          <div className="container mt-6">
            <h2>Attractions You Wanna Visit</h2>
            {attractionData && (
              <Carousel responsive={responsive}>
                {attractionData.data.data.map((attraction) => (
                  <Card
                    key={attraction.location_id}
                    style={{ width: "18rem", margin: "10px" }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        attraction.photo
                          ? attraction.photo.images.thumbnail.url
                          : "placeholder.jpg"
                      }
                    />
                    <Card.Body>
                      <Form.Check
                        type="checkbox"
                        name="attraction"
                        id={`attraction-${attraction.location_id}`}
                        label=""
                        checked={selectedAttractions.includes(attraction.name)}
                        onChange={() =>
                          handleAttractionSelection(attraction.name)
                        }
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                      />
                      <Card.Title>{attraction.name}</Card.Title>
                      <Card.Text>
                        <strong>Reviews:</strong> {attraction.num_reviews}{" "}
                        <br />
                        <strong>Location:</strong> {attraction.location_string}
                      </Card.Text>
                      <Button
                        variant="primary"
                        href={attraction.web_url}
                        target="_blank"
                      >
                        View More
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </Carousel>
            )}
          </div>
          <div className="container mt-6">
            <h2>Hotels You Can Stay At</h2>
            {hotelData && (
              <Carousel responsive={responsive}>
                {hotelData.data.data.map((hotel) => (
                  <Card
                    key={hotel.location_id}
                    style={{ width: "18rem", margin: "10px" }}
                  >
                    {/* <Card.Img
                      variant="top"
                      src={hotel.photo.images.thumbnail.url}
                    /> */}
                    <Card.Body>
                      <Form.Check
                        type="radio"
                        name="hotel"
                        id={`hotel-${hotel.location_id}`}
                        label=""
                        checked={selectedHotel === hotel.name}
                        onChange={() => setSelectedHotel(hotel.name)}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                      />
                      <Card.Title>{hotel.name}</Card.Title>
                      <Card.Text>
                        <strong>Rating:</strong> {hotel.rating} <br />
                        <strong>Reviews:</strong> {hotel.num_reviews} <br />
                        <strong>Location:</strong> {hotel.location_string}{" "}
                        <br />
                        <strong>Price:</strong> {hotel.price}
                      </Card.Text>
                      <Button
                        variant="primary"
                        href={hotel.photo.images.thumbnail.url}
                        target="_blank"
                      >
                        View More
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </Carousel>
            )}
          </div>
        </>
      )}
    </>
  );
};
