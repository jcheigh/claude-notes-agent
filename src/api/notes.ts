import type { Request, Response } from "express";

import { BadRequestError } from "./errors.js";
import { respondWithJSON } from "./json.js";

type Note = {
    id: number,
    title: string,
    author: string,
    note: string,
    createdAt: string
}

let notes: Note[] = [];
let nextId: number = 1;

export async function handlerGetNotes(_: Request, res: Response) {
    respondWithJSON(res, 200, notes);
};

export async function handlerCreateNote(req: Request, res: Response) {
    type parameters = {
        title: string,
        author: string,
        note: string
    };
    const params: parameters = req.body;

    if (!params.title) {
        throw new BadRequestError("Create Note missing title");
    }

    if (!params.author) {
        throw new BadRequestError("Create Note missing author");
    }

    if (!params.note) {
        throw new BadRequestError("Create Note missing note");
    }

    const newNote: Note = {
        id: nextId,
        title: params.title,
        author: params.author,
        note: params.note,
        createdAt: new Date().toISOString()
    };

    nextId++;

    notes.push(newNote);
    respondWithJSON(res, 201, newNote);
};