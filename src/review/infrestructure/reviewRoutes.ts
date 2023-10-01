import express from "express";
import { addReviewController, deleteReviewController, getReviewByIdController, listAllReviewsController, listReviewByUserController, listInactiveReviewsController, updateReviewController } from "./dependecies";

export const reviewRouter = express.Router();

reviewRouter.post('/',addReviewController.run.bind(addReviewController))
reviewRouter.get('/',listAllReviewsController.run.bind(listAllReviewsController))
reviewRouter.get('/user',listReviewByUserController.run.bind(listReviewByUserController))
reviewRouter.get('/review',getReviewByIdController.run.bind(getReviewByIdController))
reviewRouter.get('/inactive',listInactiveReviewsController.run.bind(listInactiveReviewsController))
reviewRouter.delete('/',deleteReviewController.run.bind(deleteReviewController))
reviewRouter.put('/',updateReviewController.run.bind(updateReviewController))





