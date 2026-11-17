
"use client";

import { useState } from "react";
import "./walk-in.css";

const initialAppointments = [
  {
    id: 1,
    token: "W001",
    patient: "Kamal Perera",
    phone: "0771234567",
    doctor: "Dr. Nimal Perera",
    specialisation: "Cardiology",
    date: "2026-11-13",
    time: "10:30",
    priority: "Normal",
    status: "Waiting",
  },
  {
    id: 2,
    token: "W002",
    patient: "Saman Silva",
    phone: "0712345678",
    doctor: "Dr. Saman Silva",
    specialisation: "Pediatrics",
    date: "2026-11-13",
    time: "11:00",
    priority: "Urgent",
    status: "Checked-in",
  },
];

export default function WalkInAppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    patient: "",
    phone: "",
    doctor: "",
    specialisation: "",
    date: "2026-11-13",
    time: "",
    priority: "Normal",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addAppointment(e) {
    e.preventDefault();

    const newAppointment = {
      id: Date.now(),
      token: `W${String(appointments.length + 1).padStart(3, "0")}`,
      ...form,
      status: "Waiting",
    };

    setAppointments([...appointments, newAppointment]);

    setForm({
      patient: "",
      phone: "",
      doctor: "",
      specialisation: "",
      date: "2026-11-13",
      time: "",
      priority: "Normal",
    });

    setShowForm(false);
  }

  function updateStatus(id, status) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment
      )
    );
  }

  const filteredAppointments = appointments.filter((appointment) =>
    [
      appointment.patient,
      appointment.phone,
      appointment.token,
      appointment.doctor,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const waitingCount = appointments.filter(
    (a) => a.status === "Waiting"
  ).length;

  const checkedInCount = appointments.filter(
    (a) => a.status === "Checked-in"
  ).length;

  const completedCount = appointments.filter(
    (a) => a.status === "Completed"
  ).length;

  return (
    <div className="walkin-page">
      <header className="walkin-header">
        <div>
          <p className="walkin-brand">MEDICHANNEL / MANAGER</p>
          <h1>Walk-in Appointments</h1>
          <p>Register and manage walk-in patient appointments.</p>
        </div>

        <a href="/manager/dashboard" className="walkin-back">
          Back to Dashboard
        </a>
      </header>

      <section className="walkin-stats">
        <div className="walkin-stat-card">
          <span>Total Walk-ins</span>
          <h2>{appointments.length}</h2>
        </div>

        <div className="walkin-stat-card">
          <span>Waiting</span>
          <h2>{waitingCount}</h2>
        </div>

        <div className="walkin-stat-card">
          <span>Checked-in</span>
          <h2>{checkedInCount}</h2>
        </div>

        <div className="walkin-stat-card">
          <span>Completed</span>
          <h2>{completedCount}</h2>
        </div>
      </section>

      <section className="walkin-content">
        <div className="walkin-section-header">
          <div>
            <h2>Walk-in Patient List</h2>
            <p>View and manage registered walk-in appointments.</p>
          </div>

          <button
            className="walkin-add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            + Register Walk-in
          </button>
        </div>

        {showForm && (
          <form className="walkin-form" onSubmit={addAppointment}>
            <h3>Register New Walk-in Appointment</h3>

            <div className="walkin-form-grid">
              <div>
                <label>Patient Name</label>
                <input
                  name="patient"
                  value={form.patient}
                  onChange={handleChange}
                  required
                  placeholder="Enter patient name"
                />
              </div>

              <div>
                <label>Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label>Doctor</label>
                <select
                  name="doctor"
                  value={form.doctor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  <option>Dr. Nimal Perera</option>
                  <option>Dr. Saman Silva</option>
                  <option>Dr. Amal Fernando</option>
                  <option>Dr. Hasitha Lakshan</option>
                </select>
              </div>

              <div>
                <label>Specialisation</label>
                <select
                  name="specialisation"
                  value={form.specialisation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Specialisation</option>
                  <option>Cardiology</option>
                  <option>Pediatrics</option>
                  <option>Dermatology</option>
                  <option>Neurology</option>
                </select>
              </div>

              <div>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >
                  <option>Normal</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            <div className="walkin-form-actions">
              <button type="submit" className="walkin-add-btn">
                Register Appointment
              </button>

              <button
                type="button"
                className="walkin-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <input
          className="walkin-search"
          placeholder="Search by patient name, phone, token or doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="walkin-table-wrapper">
          <table className="walkin-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Patient Name</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Specialisation</th>
                <th>Date & Time</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.token}</td>
                  <td>{appointment.patient}</td>
                  <td>{appointment.phone}</td>
                  <td>{appointment.doctor}</td>
                  <td>{appointment.specialisation}</td>
                  <td>
                    {appointment.date}
                    <br />
                    {appointment.time}
                  </td>
                  <td>
                    <span
                      className={`walkin-priority ${appointment.priority.toLowerCase()}`}
                    >
                      {appointment.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`walkin-status ${appointment.status
                        .toLowerCase()
                        .replace("-", "")}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="walkin-status-select"
                      value={appointment.status}
                      onChange={(e) =>
                        updateStatus(appointment.id, e.target.value)
                      }
                    >
                      <option>Waiting</option>
                      <option>Checked-in</option>
                      <option>Completed</option>
                      <option>No-show</option>
                    </select>
                  </td>
                </tr>
              ))}

              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="9" className="walkin-empty">
                    No walk-in appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
