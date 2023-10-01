import { Request, Response } from "express";

export class AuthController {
  constructor() {}

  async logout(req: Request, res: Response) {
    
    res.status(200).json({ message: "se cerro sesion" });
  }
}
