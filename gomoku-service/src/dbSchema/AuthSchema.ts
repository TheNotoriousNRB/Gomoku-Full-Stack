import {object, string, TypeOf} from 'zod';

const payload = {
    body: object({
        username: string({
            required_error: "Username Required!",
        }),
        password: string({
            required_error: "Password Required",
        }),
    })
};

export const SchemaRegister = object({
    ...payload
})

export const SchemaLogin = object({
    ...payload
})

export type InputRegister = TypeOf<typeof SchemaRegister>;
export type InputLogin = TypeOf<typeof SchemaLogin>;