import express from "express";
import { registerController } from "./controllers/dependencies";
import { listAllUserController } from "./controllers/dependencies";

export const userRouter = express.Router();

// Ruta para registrar un usuario 
userRouter.post(
    "/",
    registerController.run.bind(registerController)
);

userRouter.get(
    '/',listAllUserController.run.bind(listAllUserController)
);

