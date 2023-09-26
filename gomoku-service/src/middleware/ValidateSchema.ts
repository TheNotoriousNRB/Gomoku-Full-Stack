import { Request, Response, NextFunction } from "express";

import { AnyZodObject } from "zod";

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params:req.params,
        });
        next();
    } catch(exception: any){
        console.log(exception)
        return res.status(400).send(exception.errors);
    }
};

export default validate