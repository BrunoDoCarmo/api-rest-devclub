import express from "express";
import routes from "./routes/routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use(routes);

const port = 9090;

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
