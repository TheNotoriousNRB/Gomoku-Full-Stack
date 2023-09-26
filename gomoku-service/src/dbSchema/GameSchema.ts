import {string, object, number, array, TypeOf} from 'zod';

const payload = {
    body: object({
        userID: string({
            required_error: "UserID Required!"
        }),
        boardSize: number({
            required_error: "Board Size Required!"
        }),
        moves: array(array(number({
            required_error: "Moves Required!"
        }))),
        date: string({
            required_error: "Date Required!"
        }),
        result: string({
            required_error: "Result Required!"
        })
    })
};

const getParams = {
    params: object({
        id: string({
            required_error: "Game ID Required!"
        })
    })
};

const updateDeleteParams = {
    params: object({
        id: string({
            required_error: "Game ID Required!"
        })
    })
};

export const GetGameByIDSchema = object({
    ...getParams
});
export const CreateGameSchema = object({
    ...payload
});
export const UpdateGameSchema = object({
    ...payload,
    ...updateDeleteParams
});
export const DeleteGameSchema = object({
    ...updateDeleteParams
});

export type GetGameByInputID = TypeOf<typeof GetGameByIDSchema>;
export type CreateGameInput = TypeOf<typeof CreateGameSchema>;
export type UpdateGameInput = TypeOf<typeof UpdateGameSchema>;
export type DeleteGameSchema = TypeOf<typeof DeleteGameSchema>;
