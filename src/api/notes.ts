import type { Request, Response } from "express";

import { BadRequestError } from "./errors.js";
import { respondWithJSON } from "./json.js";
import { createNote, getNotes } from "./../db/queries/notes.js";

export async function handlerGetNotes(_: Request, res: Response) {
    const notes = await getNotes();
    respondWithJSON(res, 200, notes);
};

export async function handlerCreateNote(req: Request, res: Response) {
    type parameters = {
        title: string,
        body: string
    };
    const params: parameters = req.body;

    if (!params.title) {
        throw new BadRequestError("Create Note missing key = title");
    }

    if (!params.body) {
        throw new BadRequestError("Create Note missing key = body");
    }

    const createdNote = await createNote(params);
    respondWithJSON(res, 201, createdNote);
};