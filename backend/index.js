import express from "express";
import bodyParser from "body-parser";
import { connectDb } from "./db/connectDB.js";
import router from "./routes/Auth.js";
const app = express();
const PORT = process.env.PORT || 5000;

//midel ware use to parse incoming
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/auth", router);
//0oYMHjRxEfakNHnj
app.listen(PORT, () => {
  connectDb();
  console.log(`this is server is runing on port http://localhost:${PORT}`);
});
