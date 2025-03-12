Weather App

Overview

This is a React-based weather application that allows users to check the weather conditions of different cities worldwide. The app fetches real-time weather data from an API and provides hourly forecasts.

Features

Search for weather information by city name

Display current temperature, weather conditions, and location details

Show hourly forecasts based on the current time

Provide city suggestions based on user input

Display additional weather details such as humidity, wind speed, and precipitation

Technologies Used

React

Axios (for API requests)

Material-UI (for UI components)

SCSS (for styling)

Installation

Prerequisites

Ensure you have the following installed:

Node.js (latest LTS recommended)

npm or 

Steps to Run Locally

Clone the repository:

git clone https://github.com/TamiWeg/fintek-digital.git

Navigate to the project directory:

cd wheather-react

Install dependencies:

npm install

Start the development server:

npm run dev

Open http://localhost:8080 in your browser.

API Integration

The app fetches weather data using the fetchWeather function located in WeatherService.js. Ensure you have an API key from a weather service provider (such as WeatherAPI) and update the request URL accordingly.

Usage

Enter a city name in the search field.

Select a city from the suggestions or press the "Check" button.

View current weather details and hourly forecasts.

File Structure

weather-app/
│── src/
│   │── components/
│   │   ├── Weather.js (Main weather component)
│   │── styles/
│   │   ├── weather.scss (SCSS styling for the app)
│── public/
│── package.json
│── README.md

Contributing

Feel free to submit pull requests for improvements or new features. Ensure that your changes follow best coding practices and include clear documentation.

License

This project is licensed under the MIT License.

