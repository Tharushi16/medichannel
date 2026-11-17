
"use client";

import { useState } from "react";
import "./rooms.css";

const initialRooms = [
  { id: 1, roomNumber: "R-101", roomType: "Consultation Room", floor: "1st Floor", status: "Available" },
  { id: 2, roomNumber: "R-102", roomType: "Consultation Room", floor: "1st Floor", status: "Occupied" },
  { id: 3, roomNumber: "R-201", roomType: "Treatment Room", floor: "2nd Floor", status: "Available" },
  { id: 4, roomNumber: "R-202", roomType: "Consultation Room", floor: "2nd Floor", status: "Maintenance" }
];

export default function RoomsPage() {
  const [rooms, setRooms] = useState(initialRooms);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("Consultation Room");
  const [floor, setFloor] = useState("");
  const [status, setStatus] = useState("Available");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const availableCount = rooms.filter(room => room.status === "Available").length;
  const occupiedCount = rooms.filter(room => room.status === "Occupied").length;
  const maintenanceCount = rooms.filter(room => room.status === "Maintenance").length;

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedNumber = roomNumber.trim().toUpperCase();

    if (!normalizedNumber || !floor.trim()) {
      alert("Please enter the room number and floor.");
      return;
    }

    const duplicate = rooms.some(
      room =>
        room.roomNumber.toLowerCase() === normalizedNumber.toLowerCase() &&
        room.id !== editingId
    );

    if (duplicate) {
      alert("This room number already exists.");
      return;
    }

    if (editingId) {
      setRooms(current =>
        current.map(room =>
          room.id === editingId
            ? { ...room, roomNumber: normalizedNumber, roomType, floor: floor.trim(), status }
            : room
        )
      );
      setEditingId(null);
    } else {
      setRooms(current => [
        ...current,
        {
          id: Date.now(),
          roomNumber: normalizedNumber,
          roomType,
          floor: floor.trim(),
          status
        }
      ]);
    }

    clearForm();
  }

  function clearForm() {
    setRoomNumber("");
    setRoomType("Consultation Room");
    setFloor("");
    setStatus("Available");
    setEditingId(null);
  }

  function handleEdit(room) {
    setEditingId(room.id);
    setRoomNumber(room.roomNumber);
    setRoomType(room.roomType);
    setFloor(room.floor);
    setStatus(room.status);
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(current => current.filter(room => room.id !== id));
    }
  }

  function updateRoomStatus(id, newStatus) {
    setRooms(current =>
      current.map(room =>
        room.id === id ? { ...room, status: newStatus } : room
      )
    );
  }

  const filteredRooms = rooms.filter(room =>
    `${room.roomNumber} ${room.roomType} ${room.floor} ${room.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="room-page">
      <header className="room-header">
        <div>
          <p className="room-brand">MEDICHANNEL / MANAGER</p>
          <h1>Room Management</h1>
          <p>Manage hospital rooms and their availability.</p>
        </div>
        <a href="/manager/dashboard" className="room-back-button">
          Back to Dashboard
        </a>
      </header>

      <section className="room-stats">
        <div className="room-stat-card">
          <span>Total Rooms</span>
          <strong>{rooms.length}</strong>
        </div>
        <div className="room-stat-card">
          <span>Available Rooms</span>
          <strong>{availableCount}</strong>
        </div>
        <div className="room-stat-card">
          <span>Occupied Rooms</span>
          <strong>{occupiedCount}</strong>
        </div>
        <div className="room-stat-card">
          <span>Maintenance</span>
          <strong>{maintenanceCount}</strong>
        </div>
      </section>

      <section className="room-panel">
        <h2>{editingId ? "Edit Room" : "Add New Room"}</h2>

        <form className="room-form" onSubmit={handleSubmit}>
          <div className="room-field">
            <label htmlFor="room-number">Room Number</label>
            <input
              id="room-number"
              value={roomNumber}
              onChange={event => setRoomNumber(event.target.value)}
              placeholder="e.g. R-103"
              required
            />
          </div>

          <div className="room-field">
            <label htmlFor="room-type">Room Type</label>
            <select
              id="room-type"
              value={roomType}
              onChange={event => setRoomType(event.target.value)}
            >
              <option>Consultation Room</option>
              <option>Treatment Room</option>
              <option>Emergency Room</option>
              <option>Other</option>
            </select>
          </div>

          <div className="room-field">
            <label htmlFor="room-floor">Floor</label>
            <input
              id="room-floor"
              value={floor}
              onChange={event => setFloor(event.target.value)}
              placeholder="e.g. 1st Floor"
              required
            />
          </div>

          <div className="room-field">
            <label htmlFor="room-status">Status</label>
            <select
              id="room-status"
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              <option>Available</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
          </div>

          <div className="room-form-actions">
            <button type="submit" className="room-primary-button">
              {editingId ? "Update Room" : "Add Room"}
            </button>
            {editingId && (
              <button type="button" className="room-cancel-button" onClick={clearForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="room-panel">
        <div className="room-list-heading">
          <div>
            <h2>Rooms List</h2>
            <p>View and manage registered hospital rooms.</p>
          </div>
          <input
            className="room-search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search rooms..."
          />
        </div>

        <div className="room-table-wrapper">
          <table className="room-table">
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Floor</th>
                <th>Status</th>
                <th>Update Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map(room => (
                  <tr key={room.id}>
                    <td><strong>{room.roomNumber}</strong></td>
                    <td>{room.roomType}</td>
                    <td>{room.floor}</td>
                    <td>
                      <span className={`room-status ${room.status.toLowerCase()}`}>
                        {room.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="room-status-select"
                        value={room.status}
                        onChange={event => updateRoomStatus(room.id, event.target.value)}
                        aria-label={`Update status for ${room.roomNumber}`}
                      >
                        <option>Available</option>
                        <option>Occupied</option>
                        <option>Maintenance</option>
                      </select>
                    </td>
                    <td>
                      <div className="room-actions">
                        <button className="room-edit" onClick={() => handleEdit(room)}>
                          Edit
                        </button>
                        <button className="room-delete" onClick={() => handleDelete(room.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="room-empty">
                    No rooms found.
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
