import express from "express";
import { activateBookController, addBookController, deleteBookController, getBookByIdController, listAllBooksController, listAllBooksInactiveController, filterBookController, listWithReviewsController, updateBookController } from "./dependecies";


export const bookRouter = express.Router();

bookRouter.get('/',listAllBooksController.run.bind(listAllBooksController))

bookRouter.post('/',addBookController.run.bind(addBookController))

bookRouter.get('/inactive',listAllBooksInactiveController.run.bind(listAllBooksInactiveController))

bookRouter.put("/",updateBookController.run.bind(updateBookController))

bookRouter.delete("/",deleteBookController.run.bind(deleteBookController))

bookRouter.get("/id",getBookByIdController.run.bind(getBookByIdController))

bookRouter.put("/id",activateBookController.run.bind(activateBookController))

bookRouter.get("/filter",filterBookController.run.bind(filterBookController))

bookRouter.get("/whit/review",listWithReviewsController.run.bind(listWithReviewsController))








