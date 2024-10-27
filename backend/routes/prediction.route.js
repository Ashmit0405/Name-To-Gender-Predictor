import { Router } from "express";
import { getgender } from "../controllers/prediction.controller.js";

const predictrouter=Router()
predictrouter.route("/predict").post(getgender)
export default predictrouter