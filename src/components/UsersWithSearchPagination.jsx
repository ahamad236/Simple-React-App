import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const UsersWithSearchPagination = () => {
  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [page, setPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(1);
  }, [search, users]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const goToPrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 400, margin: "auto", fontFamily: "Arial" }}>
      <h2>User List with Search & Pagination</h2>

      <input
        type="text"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
      />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {currentUsers.map((user) => (
              <li
                key={user.id}
                style={{ padding: "6px 0", borderBottom: "1px solid #ccc" }}
              >
                <strong>{user.name}</strong> ({user.email})
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button onClick={goToPrevPage} disabled={page === 1}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersWithSearchPagination;
