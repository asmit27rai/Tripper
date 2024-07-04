require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methos: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", router);
app.use(errorMiddleware);

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Is Running At ${PORT}`);
  });
});
