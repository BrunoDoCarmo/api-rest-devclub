import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import api from "../../services/api";

const Login = () => {
  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const { data } = await api.post("/public/user/login", {
        identifier: identifierRef.current?.value,
        password: passwordRef.current?.value,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);

      navigate("/Listar-usuarios");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        let msg = "";

        if (typeof data === "string") {
          msg = data;
        } else if (typeof data === "object" && data !== null) {
          msg = data.message || data.error || JSON.stringify(data);
        } else {
          msg = "Erro desconhecido ao acessar.";
        }

        alert("Erro ao acessar: " + msg);
      } else {
        console.error("Erro inesperado:", error);
        alert("Erro inesperado ao acessar.");
      }
    }
  }
  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input ref={identifierRef} type="text" placeholder="Email ou Usuário" />
        <input ref={passwordRef} type="password" placeholder="Senha" />
        <button type="submit">Acessar</button>
        <Link to="/Cadastro">Criar sua conta!</Link>
      </form>
    </div>
  );
};

export default Login;
