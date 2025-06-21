import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Player from "../models/Player";

dotenv.config();

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!mongoose.connection.readyState) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
}

app.get("/api/players", async (req: Request, res: Response) => {
  const players = await Player.find();
  res.json(players);
});

app.post("/api/players", async (req: Request, res: Response) => {
  const newPlayer = new Player({ name: req.body.name });
  await newPlayer.save();
  res.status(201).json(newPlayer);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
