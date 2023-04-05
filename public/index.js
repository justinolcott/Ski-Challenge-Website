//ALTA API
console.log("Index.js");
class AltaWeather {
    // async getAltaWeather() {
    //   const endpoint = 'https://api.weather.gov/points/40.5884,-111.6374';
    
    //   return fetch(endpoint)
    //     .then(response => response.json())
    //     .then(data => {
    //       // Extract the forecast URL from the response data
    //       const forecastUrl = data.properties.forecast;
    
    //       // Make a second HTTP request to get the weather forecast
    //       return fetch(forecastUrl);
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       // Extract the weather information from the response data
    //       const { temperature, detailedForecast } = data.properties.periods[0];
    
    //       // Return an object containing the weather information
    //       return { temperature, detailedForecast };
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    // }
  
    static async getWeatherData() {
      const response = await fetch("https://api.weather.gov/gridpoints/SLC/108,167/forecast");
      const data = await response.json();
      return data;
    }
    
    static async updateAlertWithWeather() {
      const forecastData = await this.getWeatherData();
      const detailedForecast = forecastData.properties.periods[0].detailedForecast;
    
      const alertElement = document.querySelector("#weather-alert");
      alertElement.innerHTML = "Alta's Weather: " + detailedForecast;
    }
  }

  AltaWeather.updateAlertWithWeather();