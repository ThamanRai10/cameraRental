import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";

//Config ENV

dotenv.config({ path: "./config.env" });

//connect database
connectDB();

// rest object

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ECOM APP</h1>");
});

//PORT
const PORT = process.env.PORT;

//run listen

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
