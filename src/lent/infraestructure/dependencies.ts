import { ListAllLentsUseCase } from "../application/listAllLentsUseCase";
import { GetLentUseCase } from "../application/getLentUseCase";
import { UserLentsBookUseCase } from "../application/userCanLentBookUseCase";
import { ListAllLentsController } from "./controller/listAllLentsController";
import { GetLentController } from "./controller/getreturnLentController";
import { UserLentBookController } from "./controller/userCanLentBookController";
import { MysqlLentRepository } from "./mysqlLentRepository";






export const mysqlLoanRepository = new MysqlLentRepository()
export const userLentBookUseCase = new UserLentsBookUseCase(mysqlLoanRepository)
export const userLentBookController = new UserLentBookController(userLentBookUseCase)

export const getLentUseCase = new GetLentUseCase(mysqlLoanRepository)
export const getLentController  = new GetLentController(getLentUseCase)

export const listAllLentsUseCase = new ListAllLentsUseCase(mysqlLoanRepository)
export const listAllLentsController = new ListAllLentsController(listAllLentsUseCase)