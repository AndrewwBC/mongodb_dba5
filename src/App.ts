import express, { Request, Response } from "express";
import { router } from "./routes/routes";

export const app = express();

app.listen(8181, () => console.log("Server On!: 8181"));

app.use(express.json());
app.use(router);
