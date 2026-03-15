import express from "express";
import cors from "cors";

import { middlewareLogResponse, errorMiddleWare } from "./api/middleware.js";
import { handlerCreateNote, handlerGetNotes } from "./api/notes.js";
import { config } from "./config.js";

const app = express();

// for later
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(middlewareLogResponse);
app.use(express.json());

app.use("/app", express.static("./src/app"));
app.get("/api/notes", (req, res, next) => {
    Promise.resolve(handlerGetNotes(req, res)).catch(next);
});
app.post("/api/notes", (req, res, next) => {
    Promise.resolve(handlerCreateNote(req, res)).catch(next);
});

app.use(errorMiddleWare);

app.listen(config.api.port, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
});