import axios from "axios";

// Fetch weather data for a given city
const getWeatherByCityName = async (req, res) => {
    const { city } = req.query;
    if (!city)
        return res.status(400).json({ error: "City parameter is required" });
    try {
        const result = await axios.get(process.env.WEATHER_API_URL, {
            params: { key: process.env.WEATHER_API_KEY, q: city, aqi: "no", day: 2 }
        });
        return res.json(result.data);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

// Fetch all cities from the world's countries
const getAllCitiesInWorld = async (req, res) => {
    try {
        const response = await axios.get(process.env.CITIES_API_URL);
        const cities = response.data.data.flatMap((country) => country.cities);
        return res.json({ cities });
    } catch (err) {
        console.error("Error fetching cities:", err.message);
        return res.status(500).json({ error: "Failed to fetch cities" });
    }
};

export { getWeatherByCityName, getAllCitiesInWorld };
