import express from "express";
import mongoose from "mongoose";
import { DB_URL, APP_PORT } from "./app/config/index.js";
import routes from "./app/routes/tutorial.routes.js";
import cors from "cors";

const app = express();

//database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("DB Connected...");
});

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.use("/", (req, res) => {
  res.send({ Message: " Welcome to tutorials Project Api" });
});

const PORT = process.env.PORT || APP_PORT;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
