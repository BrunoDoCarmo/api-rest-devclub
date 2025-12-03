import { useEffect, useState } from "react";
import api from "../../services/api";
import { Pencil, Trash } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  user: string;
  state: string;
}

const Lista = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const loggedUserId = localStorage.getItem("userId");

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado. Usuário não autenticado.");
        return;
      }
      const {
        data: { users },
      } = await api.get("/private/user/list-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllUsers(users);
    }

    loadUsers();

    const interval = setInterval(loadUsers, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este usuário?")) return;
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não encontrado. Usuário não autenticado.");
      return;
    }
    await api.delete(`/private/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAllUsers(allUsers.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>Lista Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Usuário</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.user}</td>
              <td>{user.state}</td>
              <td>
                <Pencil size={24} />
                {user.id !== loggedUserId && (
                  <Trash size={24} onClick={() => handleDeleteUser(user.id)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lista;
