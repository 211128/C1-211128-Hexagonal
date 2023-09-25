import { Request, Response } from "express"
import { RegisterUseCase } from "../../application/registerUseCase";

export class RegisterController {
  constructor(readonly registerUseCase: RegisterUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        phone,
        password, // Debe almacenarse de forma segura (hash + salt)
        active,
        canlent,
      } = req.body;

      console.log(
        "name: " + name + " phone: " + phone + " email: " + email + " password: " + password + " status: " + active + "canlent: " + canlent
      );

      const active_status = true;
      const canlent_status = true;

      const registerUser = await this.registerUseCase.run(
        name,
        email,
        phone,
        password, // Debe almacenarse de forma segura (hash + salt)
        active || active_status,
        canlent || canlent_status
      );

      if (registerUser) {
        return res.status(201).json({
          status: "success",
          data: {
            name: registerUser.name,
            email: registerUser.email,
          },
        });
      } else {
        // Manejar el caso donde el registro no fue exitoso
        return res.status(400).json({
          status: "error",
          message: "El registro de usuario no fue exitoso.",
        });
      }
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
      });
    }
  }
}
