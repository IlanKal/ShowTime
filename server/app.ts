import express from "express";
import cors from "cors";
import contentRouter from "./src/routes/contentRouter";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/content", contentRouter);


export default app;