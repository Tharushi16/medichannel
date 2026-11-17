
"use client";

import { useState } from "react";
import "./reception.css";

const initialAppointments = [
  {
    id: 1,
    appointmentId: "APT001",
    patient: "Kamal Perera",
    phone: "0771234567",
    doctor: "Dr. Nimal Perera",
    time: "09:00 AM",
    type: "Regular",
    status: "Waiting"
  },
  {
    id: 2,
    appointmentId: "APT002",
    patient: "Nimali Silva",
    phone: "0712345678",
    doctor: "Dr. Saman Silva",
    time: "09:30 AM",
    type: "Regular",
    status: "Checked-in"
  },
  {
    id: 3,
    appointmentId: "APT003",
    patient: "Amal Fernando",
    phone: "0761234567",
    doctor: "Dr. Amal Fernando",
    time: "10:00 AM",
    type: "Regular",
    status: "In Consultation"
  },
  {
    id: 4,
    appointmentId: "APT004",
    patient: "Sanduni Perera",
    phone: "0751234567",
    doctor: "Dr. Hasitha Lakshan",
    time: "10:30 AM",
    type: "Regular",
    status: "Completed"
  },
  {
    id: 5,
    appointmentId: "APT005",
    patient: "Tharindu Silva",
    phone: "0721234567",
    doctor: "Dr. Nimal Perera",
    time: "11:00 AM",
    type: "Walk-in",
    status: "Waiting"
  }
];

export default function ReceptionPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");

  const [patient, setPatient] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");

  const waitingCount = appointments.filter(
    item => item.status === "Waiting"
  ).length;

  const checkedInCount = appointments.filter(
    item => item.status === "Checked-in"
  ).length;

  const consultationCount = appointments.filter(
    item => item.status === "In Consultation"
  ).length;

  const completedCount = appointments.filter(
    item => item.status === "Completed"
  ).length;

  function handleCheckIn(id) {
    setAppointments(current =>
      current.map(item =>
        item.id === id
          ? { ...item, status: "Checked-in" }
          : item
      )
    );
  }

  function updateStatus(id, newStatus) {
    setAppointments(current =>
      current.map(item =>
        item.id === id
          ? { ...item, status: newStatus }
          : item
      )
    );
  }

  function handleWalkInSubmit(event) {
    event.preventDefault();

    if (!patient.trim() || !phone.trim() || !doctor || !time) {
      alert("Please complete all fields.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      appointmentId: `WALK${String(appointments.length + 1).padStart(3, "0")}`,
      patient: patient.trim(),
      phone: phone.trim(),
      doctor,
      time,
      type: "Walk-in",
      status: "Waiting"
    };

    setAppointments(current => [...current, newAppointment]);

    setPatient("");
    setPhone("");
    setDoctor("");
    setTime("");

    alert("Walk-in patient added successfully.");
  }

  const filteredAppointments = appointments.filter(item =>
    `${item.patient} ${item.appointmentId} ${item.phone} ${item.doctor} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="reception-page">
      <header className="reception-header">
        <div>
          <p className="reception-brand">MEDICHANNEL / MANAGER</p>
          <h1>Reception & Check-in</h1>
          <p>Manage patient arrivals and daily appointments.</p>
        </div>

        <a href="/manager/dashboard" className="reception-back">
          Back to Dashboard
        </a>
      </header>

      <section className="reception-stats">
        <div className="reception-stat-card">
          <span>Total Appointments</span>
          <strong>{appointments.length}</strong>
        </div>

        <div className="reception-stat-card">
          <span>Waiting</span>
          <strong>{waitingCount}</strong>
        </div>

        <div className="reception-stat-card">
          <span>Checked-in</span>
          <strong>{checkedInCount}</strong>
        </div>

        <div className="reception-stat-card">
          <span>In Consultation</span>
          <strong>{consultationCount}</strong>
        </div>

        <div className="reception-stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </section>

      <section className="reception-panel">
        <h2>Register Walk-in Patient</h2>
        <p className="reception-description">
          Register a patient who arrives without a prior appointment.
        </p>

        <form className="reception-form" onSubmit={handleWalkInSubmit}>
          <div className="reception-field">
            <label htmlFor="walkin-patient">Patient Name</label>
            <input
              id="walkin-patient"
              value={patient}
              onChange={event => setPatient(event.target.value)}
              placeholder="Enter patient name"
              required
            />
          </div>

          <div className="reception-field">
            <label htmlFor="walkin-phone">Phone Number</label>
            <input
              id="walkin-phone"
              type="tel"
              value={phone}
              onChange={event => setPhone(event.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="reception-field">
            <label htmlFor="walkin-doctor">Select Doctor</label>
            <select
              id="walkin-doctor"
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

          <div className="reception-field">
            <label htmlFor="walkin-time">Arrival Time</label>
            <input
              id="walkin-time"
              type="time"
              value={time}
              onChange={event => setTime(event.target.value)}
              required
            />
          </div>

          <div className="reception-form-actions">
            <button type="submit" className="reception-primary-button">
              Register Walk-in Patient
            </button>
          </div>
        </form>
      </section>

      <section className="reception-panel">
        <div className="reception-list-heading">
          <div>
            <h2>Today's Appointments</h2>
            <p>View patient appointments and manage check-in status.</p>
          </div>

          <input
            className="reception-search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search patient, ID or doctor..."
          />
        </div>

        <div className="reception-table-wrapper">
          <table className="reception-table">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Check-in</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(item => (
                  <tr key={item.id}>
                    <td><strong>{item.appointmentId}</strong></td>
                    <td>{item.patient}</td>
                    <td>{item.phone}</td>
                    <td>{item.doctor}</td>
                    <td>{item.time}</td>
                    <td>
                      <span className={`reception-type ${item.type.toLowerCase()}`}>
                        {item.type}
                      </span>
                    </td>
                    <td>
                      <span className={`reception-status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {item.status === "Waiting" ? (
                        <button
                          className="reception-checkin-button"
                          onClick={() => handleCheckIn(item.id)}
                        >
                          Check-in
                        </button>
                      ) : (
                        <select
                          className="reception-status-select"
                          value={item.status}
                          onChange={event =>
                            updateStatus(item.id, event.target.value)
                          }
                          aria-label={`Update status for ${item.patient}`}
                        >
                          <option>Waiting</option>
                          <option>Checked-in</option>
                          <option>In Consultation</option>
                          <option>Completed</option>
                          <option>No-show</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="reception-empty">
                    No appointments found.
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
