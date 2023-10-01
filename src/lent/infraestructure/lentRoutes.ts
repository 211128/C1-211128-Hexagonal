import express from "express";
import { getLentController, listAllLentsController, userLentBookController } from "./dependencies";



export const lentRoutes = express.Router();


lentRoutes.post('/',userLentBookController.run.bind(userLentBookController))
lentRoutes.put('/',getLentController.run.bind(getLentController))
lentRoutes.get('/',listAllLentsController.run.bind(listAllLentsController))




