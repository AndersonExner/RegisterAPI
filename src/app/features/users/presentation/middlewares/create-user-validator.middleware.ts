import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { UserRepository } from "../../repository";
import { badRequest } from "../../../../shared/domain";

function defineBaseSchema(body: Request){
    const baseSchema = z.object({
        name: z.string().min(2),
        telefone: z.string().min(6).nullable()
    });

    return baseSchema;
}

export const createUserValidator = async (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;
    const {name, telefone} = body;

    const repository = new UserRepository();

    const schema = defineBaseSchema(body);

    try{
        const data = schema.parse(body);
        Object.assign(
            req.body,
            data
        );
        return next();

    } catch (error: any) {

        if (error instanceof ZodError) {
        return badRequest(res, {
            success: false,
            error: error.issues.map((issue) => ({
            campo: issue.path[0],
            mensagem: issue.message,
            codigo: issue.code
            }))
        })
        }
        throw error;
    }    
}