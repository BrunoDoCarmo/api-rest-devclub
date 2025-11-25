import express from "express";

const app = express();

app.use(express.json());

const port = 9090;

const users = [];

app.post("/users", (request, response) => {
  users.push(request.body);

  users.status(200).json(response.body);

  response.send("OK, aqui deu certo!");
});

app.get("/users", (request, response) => {
  response.status(200).json(users);
});

app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
