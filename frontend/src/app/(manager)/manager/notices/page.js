
"use client";

import { useState } from "react";
import "./notices.css";

const initialNotices = [
  {
    id: 1,
    title: "Hospital Opening Hours",
    message: "The hospital operates from 8.00 AM to 8.00 PM.",
    date: "2026-11-13",
    status: "Active",
  },
  {
    id: 2,
    title: "Doctor Session Update",
    message: "Please check the updated doctor session schedules.",
    date: "2026-11-12",
    status: "Active",
  },
  {
    id: 3,
    title: "System Maintenance",
    message: "Scheduled system maintenance will take place.",
    date: "2026-11-10",
    status: "Inactive",
  },
];

export default function NoticesPage() {
  const [notices, setNotices] = useState(initialNotices);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    message: "",
    date: "2026-11-13",
    status: "Active",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openAddForm() {
    setEditingId(null);
    setForm({
      title: "",
      message: "",
      date: "2026-11-13",
      status: "Active",
    });
    setShowForm(true);
  }

  function openEditForm(notice) {
    setEditingId(notice.id);
    setForm({
      title: notice.title,
      message: notice.message,
      date: notice.date,
      status: notice.status,
    });
    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      setNotices((current) =>
        current.map((notice) =>
          notice.id === editingId
            ? { ...notice, ...form }
            : notice
        )
      );
    } else {
      setNotices((current) => [
        {
          id: Date.now(),
          ...form,
        },
        ...current,
      ]);
    }

    setShowForm(false);
    setEditingId(null);
  }

  function deleteNotice(id) {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      setNotices((current) =>
        current.filter((notice) => notice.id !== id)
      );
    }
  }

  function toggleStatus(id) {
    setNotices((current) =>
      current.map((notice) =>
        notice.id === id
          ? {
              ...notice,
              status: notice.status === "Active" ? "Inactive" : "Active",
            }
          : notice
      )
    );
  }

  const filteredNotices = notices.filter((notice) =>
    `${notice.title} ${notice.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const activeCount = notices.filter(
    (notice) => notice.status === "Active"
  ).length;

  const inactiveCount = notices.filter(
    (notice) => notice.status === "Inactive"
  ).length;

  return (
    <div className="notices-page">
      <header className="notices-header">
        <div>
          <p className="notices-brand">MEDICHANNEL / MANAGER</p>
          <h1>Notices & Feedback</h1>
          <p>Manage hospital notices and feedback.</p>
        </div>

        <a href="/manager/dashboard" className="notices-back">
          Back to Dashboard
        </a>
      </header>

      <section className="notices-stats">
        <div className="notices-stat-card">
          <span>Total Notices</span>
          <h2>{notices.length}</h2>
        </div>

        <div className="notices-stat-card">
          <span>Active Notices</span>
          <h2>{activeCount}</h2>
        </div>

        <div className="notices-stat-card">
          <span>Inactive Notices</span>
          <h2>{inactiveCount}</h2>
        </div>
      </section>

      <section className="notices-content">
        <div className="notices-section-header">
          <div>
            <h2>Hospital Notices</h2>
            <p>View and manage published hospital notices.</p>
          </div>

          <button className="notices-add-btn" onClick={openAddForm}>
            + Add Notice
          </button>
        </div>

        {showForm && (
          <form className="notices-form" onSubmit={handleSubmit}>
            <h3>{editingId ? "Edit Notice" : "Add New Notice"}</h3>

            <div className="notices-form-group">
              <label>Notice Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter notice title"
                required
              />
            </div>

            <div className="notices-form-group">
              <label>Notice Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter notice message"
                rows="4"
                required
              />
            </div>

            <div className="notices-form-grid">
              <div className="notices-form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="notices-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="notices-form-actions">
              <button type="submit" className="notices-add-btn">
                {editingId ? "Update Notice" : "Save Notice"}
              </button>

              <button
                type="button"
                className="notices-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <input
          className="notices-search"
          placeholder="Search notices by title or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="notices-list">
          {filteredNotices.map((notice) => (
            <div className="notice-card" key={notice.id}>
              <div className="notice-card-header">
                <div>
                  <h3>{notice.title}</h3>
                  <span className="notice-date">{notice.date}</span>
                </div>

                <span
                  className={`notice-status ${notice.status.toLowerCase()}`}
                >
                  {notice.status}
                </span>
              </div>

              <p className="notice-message">{notice.message}</p>

              <div className="notice-actions">
                <button
                  className="notice-edit-btn"
                  onClick={() => openEditForm(notice)}
                >
                  Edit
                </button>

                <button
                  className="notice-toggle-btn"
                  onClick={() => toggleStatus(notice.id)}
                >
                  {notice.status === "Active" ? "Deactivate" : "Activate"}
                </button>

                <button
                  className="notice-delete-btn"
                  onClick={() => deleteNotice(notice.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <p className="notices-empty">No notices found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
