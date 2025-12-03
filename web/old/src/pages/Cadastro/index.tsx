import { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import api from "../../services/api";

const Cadastro = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await api.post("/public/user/cadastro", {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        user: userRef.current?.value,
        password: passwordRef.current?.value,
      });
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        let msg = "";

        if (typeof data === "string") {
          msg = data;
        } else if (typeof data === "object" && data !== null) {
          msg = data.message || data.error || JSON.stringify(data);
        } else {
          msg = "Erro desconhecido ao cadastrar usuário.";
        }

        alert("Erro ao cadastrar usuário: " + msg);
      } else {
        console.error("Erro inesperado:", error);
        alert("Erro inesperado ao cadastrar usuário.");
      }
    }
  }
  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder="Nome" />
        <input ref={emailRef} type="text" placeholder="Email" />
        <input ref={userRef} type="text" placeholder="Usuário" />
        <input ref={passwordRef} type="password" placeholder="Senha" />
        <button type="submit">Cadastrar</button>
        <Link to="/Login">Já tem uma conta? Faça login</Link>
      </form>
    </div>
  );
};

export default Cadastro;
