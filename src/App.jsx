import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchUsers(pageNumber) {
    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${pageNumber}`
      );
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>User Directory</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={() => setSearchTerm(event.target.value)}
      />
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="avatar"
            />
            <div className="user-info">
              <p>
                {user.first_name} {user.last_name}
              </p>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
