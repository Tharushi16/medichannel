
"use client";

import { useState } from "react";
import "./specialisations.css";

const initialSpecialisations = [
  { id: 1, name: "Cardiology", description: "Heart and blood vessel treatments", status: "Active" },
  { id: 2, name: "Pediatrics", description: "Medical care for children", status: "Active" },
  { id: 3, name: "Dermatology", description: "Skin, hair and nail treatments", status: "Inactive" },
  { id: 4, name: "Neurology", description: "Brain and nervous system treatments", status: "Active" }
];

export default function SpecialisationsPage() {
  const [specialisations, setSpecialisations] = useState(initialSpecialisations);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const activeCount = specialisations.filter(item => item.status === "Active").length;
  const inactiveCount = specialisations.length - activeCount;

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      alert("Please enter a specialisation name.");
      return;
    }

    if (editingId) {
      setSpecialisations(current =>
        current.map(item =>
          item.id === editingId
            ? { ...item, name: name.trim(), description: description.trim() }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
        status: "Active"
      };
      setSpecialisations(current => [...current, newItem]);
    }

    setName("");
    setDescription("");
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
  }

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this specialisation?");
    if (confirmed) {
      setSpecialisations(current => current.filter(item => item.id !== id));
    }
  }

  function toggleStatus(id) {
    setSpecialisations(current =>
      current.map(item =>
        item.id === id
          ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
          : item
      )
    );
  }

  const filteredItems = specialisations.filter(item =>
    `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="specialisation-page">
      <header className="specialisation-header">
        <div>
          <p className="specialisation-brand">MEDICHANNEL / MANAGER</p>
          <h1>Specialisation Management</h1>
          <p>Manage the medical specialisations available in the hospital.</p>
        </div>
        <a href="/manager/dashboard" className="specialisation-back">
          Back to Dashboard
        </a>
      </header>

      <section className="specialisation-stats">
        <div className="specialisation-stat-card">
          <span>Total Specialisations</span>
          <strong>{specialisations.length}</strong>
        </div>
        <div className="specialisation-stat-card">
          <span>Active Specialisations</span>
          <strong>{activeCount}</strong>
        </div>
        <div className="specialisation-stat-card">
          <span>Inactive Specialisations</span>
          <strong>{inactiveCount}</strong>
        </div>
      </section>

      <section className="specialisation-panel">
        <h2>{editingId ? "Edit Specialisation" : "Add New Specialisation"}</h2>

        <form className="specialisation-form" onSubmit={handleSubmit}>
          <div className="specialisation-field">
            <label htmlFor="specialisation-name">Specialisation Name</label>
            <input
              id="specialisation-name"
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder="e.g. Cardiology"
              required
            />
          </div>

          <div className="specialisation-field">
            <label htmlFor="specialisation-description">Description</label>
            <input
              id="specialisation-description"
              value={description}
              onChange={event => setDescription(event.target.value)}
              placeholder="Enter a short description"
            />
          </div>

          <div className="specialisation-form-actions">
            <button type="submit" className="specialisation-primary-button">
              {editingId ? "Update Specialisation" : "Add Specialisation"}
            </button>
            {editingId && (
              <button
                type="button"
                className="specialisation-cancel-button"
                onClick={() => {
                  setEditingId(null);
                  setName("");
                  setDescription("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="specialisation-panel">
        <div className="specialisation-list-heading">
          <div>
            <h2>Specialisations List</h2>
            <p>View and manage hospital medical specialisations.</p>
          </div>
          <input
            className="specialisation-search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search specialisations..."
          />
        </div>

        <div className="specialisation-table-wrapper">
          <table className="specialisation-table">
            <thead>
              <tr>
                <th>Specialisation</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <tr key={item.id}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.description || "—"}</td>
                    <td>
                      <span className={`specialisation-status ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="specialisation-actions">
                        <button onClick={() => handleEdit(item)} className="specialisation-edit">
                          Edit
                        </button>
                        <button onClick={() => toggleStatus(item.id)} className="specialisation-toggle">
                          {item.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="specialisation-delete">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="specialisation-empty">
                    No specialisations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
