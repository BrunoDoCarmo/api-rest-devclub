import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Lista from "./pages/Lista";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Listar-usuarios" element={<Lista />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
