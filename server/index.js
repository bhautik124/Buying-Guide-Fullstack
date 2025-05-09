import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import aiRoutes from "./router/aiRouter.js";
import connect from "./utils/db.js";
import reviewRoutes from "./router/ReviewRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api", reviewRoutes);

connect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
