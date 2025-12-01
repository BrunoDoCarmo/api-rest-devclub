import express from "express";
import routes from "./routes/index";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));
app.use(routes);

const port = 9090;

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
