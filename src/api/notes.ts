import type { Request, Response } from "express";

import { BadRequestError } from "./errors.js";
import { respondWithJSON } from "./json.js";

let notes: string[] = [];

export async function handlerGetNotes(_: Request, res: Response) {
    res.send(notes.toString());
};

export async function handlerCreateNote(req: Request, res: Response) {
    type parameters = {
        note: string;
    };
    const params: parameters = req.body;

    if (!params.note) {
        throw new BadRequestError(`Create Note missing note`);
    }
    notes.push(params.note);
    respondWithJSON(res, 201, {"note" : params.note});
};