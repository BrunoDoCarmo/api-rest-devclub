import axios from "axios";

const apiServer = axios.create({
  baseURL: "http://localhost:9090",
});

apiServer.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //Limpa os dados do storage e redireciona para a página de login
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/login";

      return;
    }

    return Promise.reject(error);
  }
);

export default apiServer;
