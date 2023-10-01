import { MysqlReviewRepository } from "./mysqlReviewRepository";

import { AddReviewUseCase } from "../application/addReviewUseCase";
import { AddNewReviewController } from "./controllers/addReviewsController";

import { ListAllReviewsUseCase } from "../application/listAllReviewsUseCase";
import { ListAllReviewsController } from "./controllers/listAllReviewController";

import { ListReviewByUserUseCase } from "../application/listReviewsByUserUseCase";
import { ListReviewByUserController } from "./controllers/listReviewByUserController";

import { GetReviewByIdUseCase } from "../application/getReviewByIdUseCase";
import { GetReviewByIdController } from "./controllers/getReviewByIdController";

import { ListInactiveReviewsUseCase } from "../application/listReviewsInactive";
import { ListInactiveReviewsController } from "./controllers/listInactiveReviewsController";

import { DeleteReviewByIdUseCase } from "../application/deleteReviewByIdUseCase";
import { DeleteReviewController } from "./controllers/deleteReviewController";
import { UpdateReviewUseCase } from "../application/updateReviewUseCase";
import { UpdateReviewController } from "./controllers/updateReviewController";



export const mysqlReviewRepository = new MysqlReviewRepository()
export const addReviewUseCase = new AddReviewUseCase(mysqlReviewRepository)
export const addReviewController = new AddNewReviewController(addReviewUseCase)

export const listAllReviewsUseCase = new ListAllReviewsUseCase(mysqlReviewRepository)
export const listAllReviewsController = new ListAllReviewsController(listAllReviewsUseCase)

export const listReviewByUserUseCase = new ListReviewByUserUseCase(mysqlReviewRepository)
export const listReviewByUserController = new ListReviewByUserController(listReviewByUserUseCase)

export const getReviewByIdUseCase = new GetReviewByIdUseCase(mysqlReviewRepository)
export const getReviewByIdController = new GetReviewByIdController(getReviewByIdUseCase)

export const listInactiveReviewsUseCase = new ListInactiveReviewsUseCase(mysqlReviewRepository)
export const listInactiveReviewsController = new ListInactiveReviewsController(listInactiveReviewsUseCase)

export const deleteReviewUseCase = new DeleteReviewByIdUseCase(mysqlReviewRepository)
export const deleteReviewController = new DeleteReviewController(deleteReviewUseCase)

export const updateReviewUseCase = new UpdateReviewUseCase(mysqlReviewRepository)
export const updateReviewController = new UpdateReviewController(updateReviewUseCase)