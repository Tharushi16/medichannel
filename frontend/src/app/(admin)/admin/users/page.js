"use client";

import { useState } from "react";
import "./users.css";

const initialUsers = [
  {
    id: 1,
    name: "Dr. Nimal Perera",
    email: "nimal@gmail.com",
    role: "Doctor",
    status: "Active",
  },
  {
    id: 2,
    name: "Saman Silva",
    email: "saman@gmail.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Amal Fernando",
    email: "amal@gmail.com",
    role: "Doctor",
    status: "Inactive",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Doctor");
  const [message, setMessage] = useState("");

  function addUser(event) {
    event.preventDefault();

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      status: "Active",
    };

    setUsers([...users, newUser]);
    setName("");
    setEmail("");
    setRole("Doctor");
    setMessage("Staff account added successfully.");
  }

  function toggleStatus(id) {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  }

  function resetPassword(userName) {
    setMessage(`Password reset requested for ${userName}.`);
  }

  return (
    <main className="users-page">
      <header className="users-header">
        <div>
          <p className="users-brand">MEDICHANNEL / ADMIN</p>
          <h1>User Management</h1>
          <p>Create and manage staff accounts.</p>
        </div>

        <a href="/admin/dashboard" className="users-back">
          Back to Dashboard
        </a>
      </header>

      <section className="users-form-section">
        <h2>Create Staff Account</h2>

        <form onSubmit={addUser} className="users-form">
          <div className="users-field">
            <label>Staff Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter staff name"
              required
            />
          </div>

          <div className="users-field">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="users-field">
            <label>Staff Role</label>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="Doctor">Doctor</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="users-add-button">
            Create Account
          </button>
        </form>

        {message && <p className="users-message">{message}</p>}
      </section>

      <section className="users-list-section">
        <h2>Staff Accounts</h2>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={
                        user.status === "Active"
                          ? "users-status active"
                          : "users-status inactive"
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="users-actions">
                      <button
                        className="users-status-button"
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                      <button
                        className="users-reset-button"
                        onClick={() => resetPassword(user.name)}
                      >
                        Reset Password
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}