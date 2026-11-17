
"use client";

import { useState } from "react";
import "./sessions.css";

const initialSessions = [
  {
    id: 1,
    doctor: "Dr. Nimal Perera",
    specialisation: "Cardiology",
    room: "R-101",
    date: "2026-11-14",
    startTime: "09:00",
    endTime: "12:00",
    status: "Scheduled"
  },
  {
    id: 2,
    doctor: "Dr. Saman Silva",
    specialisation: "Pediatrics",
    room: "R-102",
    date: "2026-11-14",
    startTime: "10:00",
    endTime: "13:00",
    status: "Ongoing"
  },
  {
    id: 3,
    doctor: "Dr. Amal Fernando",
    specialisation: "Dermatology",
    room: "R-201",
    date: "2026-11-15",
    startTime: "08:00",
    endTime: "11:00",
    status: "Completed"
  },
  {
    id: 4,
    doctor: "Dr. Hasitha Lakshan",
    specialisation: "Neurology",
    room: "R-202",
    date: "2026-11-15",
    startTime: "13:00",
    endTime: "16:00",
    status: "Cancelled"
  }
];

export default function ManagerSessionsPage() {
  const [sessions, setSessions] = useState(initialSessions);

  const [doctor, setDoctor] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Scheduled");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const scheduledCount = sessions.filter(
    item => item.status === "Scheduled"
  ).length;

  const ongoingCount = sessions.filter(
    item => item.status === "Ongoing"
  ).length;

  const completedCount = sessions.filter(
    item => item.status === "Completed"
  ).length;

  function clearForm() {
    setDoctor("");
    setSpecialisation("");
    setRoom("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setStatus("Scheduled");
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!doctor || !specialisation || !room || !date || !startTime || !endTime) {
      alert("Please fill in all required fields.");
      return;
    }

    if (endTime <= startTime) {
      alert("End time must be later than start time.");
      return;
    }

    const roomConflict = sessions.some(item =>
      item.id !== editingId &&
      item.room === room &&
      item.date === date &&
      item.status !== "Cancelled" &&
      startTime < item.endTime &&
      endTime > item.startTime
    );

    if (roomConflict) {
      alert("This room already has a session during the selected time.");
      return;
    }

    const sessionData = {
      doctor,
      specialisation,
      room,
      date,
      startTime,
      endTime,
      status
    };

    if (editingId) {
      setSessions(current =>
        current.map(item =>
          item.id === editingId ? { ...item, ...sessionData } : item
        )
      );
    } else {
      setSessions(current => [
        ...current,
        { id: Date.now(), ...sessionData }
      ]);
    }

    clearForm();
  }

  function handleEdit(session) {
    setEditingId(session.id);
    setDoctor(session.doctor);
    setSpecialisation(session.specialisation);
    setRoom(session.room);
    setDate(session.date);
    setStartTime(session.startTime);
    setEndTime(session.endTime);
    setStatus(session.status);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this session?"
    );

    if (confirmed) {
      setSessions(current =>
        current.map(item =>
          item.id === id ? { ...item, status: "Cancelled" } : item
        )
      );
    }
  }

  function updateStatus(id, newStatus) {
    setSessions(current =>
      current.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  }

  const filteredSessions = sessions.filter(item =>
    `${item.doctor} ${item.specialisation} ${item.room} ${item.date} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="manager-session-page">
      <header className="manager-session-header">
        <div>
          <p className="manager-session-brand">MEDICHANNEL / MANAGER</p>
          <h1>Session Management</h1>
          <p>Create and manage doctor sessions in the hospital.</p>
        </div>

        <a href="/manager/dashboard" className="manager-session-back">
          Back to Dashboard
        </a>
      </header>

      <section className="manager-session-stats">
        <div className="manager-session-stat-card">
          <span>Total Sessions</span>
          <strong>{sessions.length}</strong>
        </div>

        <div className="manager-session-stat-card">
          <span>Scheduled</span>
          <strong>{scheduledCount}</strong>
        </div>

        <div className="manager-session-stat-card">
          <span>Ongoing</span>
          <strong>{ongoingCount}</strong>
        </div>

        <div className="manager-session-stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </section>

      <section className="manager-session-panel">
        <h2>{editingId ? "Edit Doctor Session" : "Create New Session"}</h2>

        <form className="manager-session-form" onSubmit={handleSubmit}>
          <div className="manager-session-field">
            <label htmlFor="session-doctor">Doctor</label>
            <select
              id="session-doctor"
              value={doctor}
              onChange={event => setDoctor(event.target.value)}
              required
            >
              <option value="">Select Doctor</option>
              <option>Dr. Nimal Perera</option>
              <option>Dr. Saman Silva</option>
              <option>Dr. Amal Fernando</option>
              <option>Dr. Hasitha Lakshan</option>
            </select>
          </div>

          <div className="manager-session-field">
            <label htmlFor="session-specialisation">Specialisation</label>
            <select
              id="session-specialisation"
              value={specialisation}
              onChange={event => setSpecialisation(event.target.value)}
              required
            >
              <option value="">Select Specialisation</option>
              <option>Cardiology</option>
              <option>Pediatrics</option>
              <option>Dermatology</option>
              <option>Neurology</option>
            </select>
          </div>

          <div className="manager-session-field">
            <label htmlFor="session-room">Room</label>
            <select
              id="session-room"
              value={room}
              onChange={event => setRoom(event.target.value)}
              required
            >
              <option value="">Select Room</option>
              <option>R-101</option>
              <option>R-102</option>
              <option>R-201</option>
              <option>R-202</option>
            </select>
          </div>

          <div className="manager-session-field">
            <label htmlFor="session-date">Session Date</label>
            <input
              id="session-date"
              type="date"
              value={date}
              onChange={event => setDate(event.target.value)}
              required
            />
          </div>

          <div className="manager-session-field">
            <label htmlFor="session-start">Start Time</label>
            <input
              id="session-start"
              type="time"
              value={startTime}
              onChange={event => setStartTime(event.target.value)}
              required
            />
          </div>

          <div className="manager-session-field">
            <label htmlFor="session-end">End Time</label>
            <input
              id="session-end"
              type="time"
              value={endTime}
              onChange={event => setEndTime(event.target.value)}
              required
            />
          </div>

          <div className="manager-session-field">
            <label htmlFor="session-status">Session Status</label>
            <select
              id="session-status"
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              <option>Scheduled</option>
              <option>Ongoing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="manager-session-form-actions">
            <button type="submit" className="manager-session-submit">
              {editingId ? "Update Session" : "Add Session"}
            </button>

            {editingId && (
              <button
                type="button"
                className="manager-session-cancel"
                onClick={clearForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="manager-session-panel">
        <div className="manager-session-list-heading">
          <div>
            <h2>Doctor Sessions</h2>
            <p>View and manage scheduled hospital sessions.</p>
          </div>

          <input
            className="manager-session-search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search doctor, room or date..."
          />
        </div>

        <div className="manager-session-table-wrapper">
          <table className="manager-session-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialisation</th>
                <th>Room</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Update Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSessions.length > 0 ? (
                filteredSessions.map(item => (
                  <tr key={item.id}>
                    <td><strong>{item.doctor}</strong></td>
                    <td>{item.specialisation}</td>
                    <td>{item.room}</td>
                    <td>{item.date}</td>
                    <td>{item.startTime} - {item.endTime}</td>
                    <td>
                      <span className={`manager-session-status ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="manager-session-status-select"
                        value={item.status}
                        onChange={event =>
                          updateStatus(item.id, event.target.value)
                        }
                        aria-label={`Update status for ${item.doctor}`}
                      >
                        <option>Scheduled</option>
                        <option>Ongoing</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <div className="manager-session-actions">
                        <button
                          className="manager-session-edit"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="manager-session-delete"
                          onClick={() => handleDelete(item.id)}
                          disabled={item.status === "Cancelled"}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="manager-session-empty">
                    No sessions found.
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
