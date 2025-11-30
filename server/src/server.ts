import express from "express";
import routes from "./routes/index";

const app = express();

app.use(express.json());
app.use(routes);

const port = 9090;

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
