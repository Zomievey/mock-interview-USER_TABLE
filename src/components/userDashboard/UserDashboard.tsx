import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./UserDashboardStyles.css";
import { getUsers } from "../../services/GetUsers";
import SortUser from "../../common/sortUser/SortUser";
import SearchBar from "../../common/searchBar/SearchBar";

export interface Users {
  name: string;
  email: string;
  username: string;
  id: number;
}

export default function UserDashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [users, setUsers] = useState<Users[]>([]);
  const [searchUser, setSearchUser] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<Users | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
      setIsLoading(false);
    } else {
      getUsers().then((userData) => {
        setUsers(userData);
        localStorage.setItem("users", JSON.stringify(userData));
        setIsLoading(false);
      });
    }
  }, []);

  const handleUserUpdate = (id: number, updatedUser: Users) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingUserId(null);
    setEditedUser(null);
  };

  const handleEditClick = (user: Users) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOption === "name") {
      return isAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    if (sortOption === "username") {
      return isAscending
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username);
    }
    if (sortOption === "email") {
      return isAscending
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    }
    return 0;
  });

  return (
    <>
      <div className='dashboard'>
        <h1>Dashboard</h1>
      </div>
      <br />
      <SearchBar searchUser={searchUser} setSearchUser={setSearchUser} />
      <br />
      {isLoading ? (
        <h4>Content is Loading...</h4>
      ) : (
        <div className='container user-table'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> </th>
                <th>
                  Name{" "}
                  <SortUser
                    sortOption={"name"}
                    setSortOption={(option, asc) => {
                      setSortOption(option);
                      setIsAscending(asc);
                    }}
                  />
                </th>
                <th>
                  Username{" "}
                  <SortUser
                    sortOption={"username"}
                    setSortOption={(option, asc) => {
                      setSortOption(option);
                      setIsAscending(asc);
                    }}
                  />
                </th>
                <th>
                  Email{" "}
                  <SortUser
                    sortOption={"email"}
                    setSortOption={(option, asc) => {
                      setSortOption(option);
                      setIsAscending(asc);
                    }}
                  />
                </th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                sortedUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    {editingUserId === user.id && editedUser ? (
                      <>
                        <td>
                          <input
                            type='text'
                            name='name'
                            value={editedUser.name}
                            placeholder='Name'
                            data-testid={`edit-name-${user.id}`}
                            onChange={(e) =>
                              setEditedUser({
                                ...editedUser,
                                name: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type='text'
                            name='username'
                            value={editedUser.username}
                            placeholder='Username'
                            onChange={(e) =>
                              setEditedUser({
                                ...editedUser,
                                username: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type='email'
                            name='email'
                            value={editedUser.email}
                            placeholder='Email'
                            onChange={(e) =>
                              setEditedUser({
                                ...editedUser,
                                email: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <button
                            className='btn btn-success'
                            onClick={() =>
                              handleUserUpdate(user.id, editedUser)
                            }
                          >
                            Save
                          </button>
                          <button
                            className='btn btn-secondary mx-2'
                            onClick={() => setEditingUserId(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td data-testid={`name-${user.id}`}>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className='btn btn-secondary'
                            onClick={() => handleEditClick(user)}
                            data-testid={`edit-button-${user.id}`}
                          >
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='no-user'>
                    <p>No user found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}
