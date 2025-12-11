interface UserEsqueceuSenhaProps {
  setScreen: (value: "login" | "cadastro" | "esqueceu") => void;
}

const UserEsqueceuSenha = ({ setScreen }: UserEsqueceuSenhaProps) => {
    return ( 
        <>
            <h2 className="text-xl font-bold mb-4">Esqueceu a senha</h2>
            <p>Conteúdo</p>
            <div className="flex items-center justify-center">
              <button
                className="text-blue-600 mt-4"
                onClick={() => setScreen("login")}
              >
                Já tenho conta! (Fazer login)
              </button>
            </div>
        </>
    );
}
 
export default UserEsqueceuSenha;