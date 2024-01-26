import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./connection";
import authRoutes from "./routes/auth.route";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      post: any
    }
  }
}

const PORT = 8000;
const app = express();
dotenv.config();

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// Connect to the database
connectToDatabase(process.env.MONGO_URL as string);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Routes
app.use("/api/auth", authRoutes);














//MONGO_URL=mongodb+srv://abhinavsinha135:abhinavsinha135@cluster0.kaygbwk.mongodb.net/reactReduxAuth?retryWrites=true&w=majority