import { Router } from "express";
import  {  getWeatherByCityName,getAllCitiesInWorld } from "../controllers/weather.js";

const router=Router();
router.get("/",getWeatherByCityName);
router.get("/cities",getAllCitiesInWorld)

export default router;