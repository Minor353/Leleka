import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useUser } from "./UserContext";

const UsersContext = createContext(null);

export const UsersProvider = ({
  children,
}) => {
  const { currentUser } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
        const token = localStorage.getItem("token");

        if (!token || !currentUser) {
        setUsers([]);
        return;
        }

        const response = await fetch(
        "http://localhost:5000/users",
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        const data = await response.json();

        if (!response.ok) {
        setUsers([]);
        return;
        }

        setUsers(data);
    };

    fetchUsers();
    }, [currentUser]);

  return (
    <UsersContext.Provider
      value={{
        users,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () =>
  useContext(UsersContext);