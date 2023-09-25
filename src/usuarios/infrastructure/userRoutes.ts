import express from "express";
import { registerController } from "./controllers/dependencies";
import { listAllUserController } from "./controllers/dependencies";
import { getUserByIdController } from "./controllers/dependencies";
import { deleteUserByIdController } from "./controllers/dependencies";
import { updateUserController } from "./controllers/dependencies";
import { filterUserController } from "./controllers/dependencies";
import { updatePasswordController } from "./controllers/dependencies";
import { setAsInactiveController } from "./controllers/dependencies";

export const userRouter = express.Router();

// Ruta para registrar un usuario 
userRouter.post(
    "/",
    registerController.run.bind(registerController)
);

userRouter.get(
    '/',listAllUserController.run.bind(listAllUserController)
);

userRouter.get(
    '/id',getUserByIdController.run.bind(getUserByIdController)
);

userRouter.delete(
    '/id' , deleteUserByIdController.run.bind(deleteUserByIdController)
);

userRouter.get(
    '/',listAllUserController.run.bind(listAllUserController)
);

userRouter.put(
    '/id',updateUserController.run.bind(updateUserController)
);

userRouter.get(
    '/filter',filterUserController.run.bind(filterUserController)
);

userRouter.post(
    '/id', updatePasswordController.run.bind(updatePasswordController)
    );

userRouter.post(
    '/id/user', setAsInactiveController.run.bind(setAsInactiveController) 
)