import { Request, Response } from "express";
import { BCryptPassword } from "../../../../shared/adapters/crypto";
import { UserRepository } from "../../repository";
import { NewUserDTO } from "../../dto";
import { ok } from "../../../../shared/domain";

export class UserController {
    async createUser(req: Request, res: Response){
        const {name, telefone} = req.body;

        const bcrypt = new BCryptPassword();
        const repository = new UserRepository();

        const newUser: NewUserDTO = {
            name,
            telefone
        }

        await repository.saveUser(newUser);

        return ok(res, { success: true });
    }
}