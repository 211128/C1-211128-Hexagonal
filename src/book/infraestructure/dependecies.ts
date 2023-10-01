import { MysqlBookRepository } from "./mysqlBookRepository"
import { AddNewBookUseCase } from "../application/createNewBookUseCase"
import { AddNewBookController } from "./controllers/addBookController"
import { ListAllInactiveBooksUseCase } from "../application/listAllBooksInactiveUseCase"
import { ListAllInactiveBooksController } from "./controllers/lisAllInactiveBookController"
import { UpdateBookUseCase } from "../application/updateBookUseCase"
import { UpdateBookController } from "./controllers/updateBookController"
import { DeleteBookByIdUseCase } from "../application/deleteBookUseCase"
import { DeleteBookByIdController } from "./controllers/deleteBookController"
import { GetBookByIdUseCase } from "../application/getBookByIdUseCase"
import { GetBookByIdController } from "./controllers/getBookByIdController"
import { ListAllBookUseCase } from "../application/listAllBooksUseCase"
import { ListAllBookController } from "./controllers/listAllBookContrller"
import { ActivatedBookUseCae } from "../application/activeBookUseCase"
import { ActivatedBookController } from "./controllers/activateBookController"
import { FilterBookUseCase } from "../application/listByFilterUseCase"
import { FilterBookController } from "./controllers/filterBookController"
import { ListWithReviewsUseCase } from "../application/listWithReviewsUseCase"
import { ListWithReviewsController } from "./controllers/listWithReviewsController"

export const mysqlBookRepository = new MysqlBookRepository()
export const listAllBooksUseCase = new ListAllBookUseCase(mysqlBookRepository)
export const listAllBooksController = new ListAllBookController(listAllBooksUseCase)

export const addBookUsecase = new AddNewBookUseCase(mysqlBookRepository)
export const addBookController = new AddNewBookController(addBookUsecase)


export const listAllBooksInactive = new ListAllInactiveBooksUseCase(mysqlBookRepository)
export const listAllBooksInactiveController = new ListAllInactiveBooksController(listAllBooksInactive)

export const updateBookUseCase = new UpdateBookUseCase(mysqlBookRepository)
export const updateBookController = new UpdateBookController(updateBookUseCase)


export const deleteBookUseCase = new DeleteBookByIdUseCase(mysqlBookRepository)
export const deleteBookController = new DeleteBookByIdController(deleteBookUseCase)


export const getBookByIdUseCase = new GetBookByIdUseCase(mysqlBookRepository)
export const getBookByIdController = new GetBookByIdController(getBookByIdUseCase)

export const activateBookUseCae = new ActivatedBookUseCae(mysqlBookRepository)
export const activateBookController = new ActivatedBookController(activateBookUseCae)

export const filterBookUseCase = new FilterBookUseCase(mysqlBookRepository)
export const filterBookController = new FilterBookController(filterBookUseCase)

export const listBooksWithReviewsUseCase = new ListWithReviewsUseCase(mysqlBookRepository)
export const listWithReviewsController = new ListWithReviewsController(listBooksWithReviewsUseCase)