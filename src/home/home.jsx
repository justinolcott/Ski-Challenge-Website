import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { Carousel, Alert } from 'react-bootstrap';

export function Home() {
  const [weatherData, setWeatherData] = useState("");

  async function getWeatherData() {
    const response = await fetch("https://api.weather.gov/gridpoints/SLC/108,167/forecast");
    const data = await response.json();
    const detailedForecast = data.properties.periods[0].detailedForecast;
    setWeatherData(detailedForecast);
  }

  useEffect(() => {
    getWeatherData();
  }, []);
  return (
    <main className="container-fluid index-main bg-dark">

      <Alert variant="dark" id="weather-alert">Alta's Weather: {weatherData}</Alert>

      <Carousel id="carouselExampleIndicators" className="index-main" style={{maxHeight: "80vh"}}>
        <Carousel.Item >
          <img className="d-block w-100" src="assets/images/skiing_background.jpg" alt="First slide" />
          <Carousel.Caption className="d-flex flex-column justify-content-center h-100 text-dark">
            <h2>Skiing Reimagined</h2>
            <h5>Create an account and check out new challenges!</h5>
            <div>
              <a href="login.html"><button type="button" className="btn btn-primary">Sign In</button></a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="assets/images/mountains_background.jpg" alt="Second slide" />
          <Carousel.Caption className="d-flex flex-column justify-content-center h-100 text-dark">
            <h2>Skiing Reimagined</h2>
            <h5>Create an account and check out new challenges!</h5>
            <div>
              <a href="login.html"><button type="button" className="btn btn-primary">Sign In</button></a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="assets/images/groomer_background.jpg" alt="Third slide" />
          <Carousel.Caption className="d-flex flex-column justify-content-center h-100 text-dark">
            <h2>Skiing Reimagined</h2>
            <h5>Create an account and check out new challenges!</h5>
            <div>
              <a href="login.html"><button type="button" className="btn btn-primary">Sign In</button></a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </main>
  );
}
