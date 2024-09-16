import express from "express";
import bodyParser from "body-parser";
import { connectDb } from "./db/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/Auth.js";
const app = express();
const PORT = process.env.PORT || 4000;

//midel ware use to parse incoming
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); //allow paree in comming requestes:req.body
app.use(cookieParser()); // it allow parse incoming cookies
app.use("/api/auth", router);

app.listen(PORT, () => {
  connectDb();
  console.log(`this is server is runing on port http://localhost:${PORT}`);
});
