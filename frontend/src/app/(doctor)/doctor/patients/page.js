
"use client";

import { useState } from "react";
import "./patients.css";

const initialPatients = [
  {
    id: "P001",
    name: "Kamal Perera",
    age: 35,
    gender: "Male",
    phone: "0771234567",
    appointment: "09:00 AM",
    status: "Waiting"
  },
  {
    id: "P002",
    name: "Nimali Silva",
    age: 28,
    gender: "Female",
    phone: "0712345678",
    appointment: "09:30 AM",
    status: "In Progress"
  },
  {
    id: "P003",
    name: "Amal Fernando",
    age: 42,
    gender: "Male",
    phone: "0761234567",
    appointment: "10:00 AM",
    status: "Completed"
  },
  {
    id: "P004",
    name: "Sanduni Perera",
    age: 31,
    gender: "Female",
    phone: "0751234567",
    appointment: "10:30 AM",
    status: "No-show"
  }
];

export default function DoctorPatientsPage() {
  const [search, setSearch] = useState("");

  const filteredPatients = initialPatients.filter((patient) =>
    `${patient.name} ${patient.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="patients-page">
      <header className="patients-header">
        <div>
          <p className="patients-label">MEDICHANNEL / DOCTOR</p>
          <h1>My Patients</h1>
          <p>View and manage your patient list.</p>
        </div>

        <a href="/doctor/dashboard" className="back-button">
          Back to Dashboard
        </a>
      </header>

      <section className="patients-summary">
        <div>
          <span>Total Patients</span>
          <h2>{initialPatients.length}</h2>
        </div>

        <div>
          <span>Waiting</span>
          <h2>{initialPatients.filter(p => p.status === "Waiting").length}</h2>
        </div>

        <div>
          <span>In Progress</span>
          <h2>{initialPatients.filter(p => p.status === "In Progress").length}</h2>
        </div>

        <div>
          <span>Completed</span>
          <h2>{initialPatients.filter(p => p.status === "Completed").length}</h2>
        </div>
      </section>

      <section className="patients-content">
        <div className="patients-toolbar">
          <div>
            <h2>Patient List</h2>
            <p>Today's registered patients</p>
          </div>

          <input
            type="text"
            placeholder="Search by patient name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="patients-table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Appointment</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.appointment}</td>
                  <td>
                    <span className={`patient-status ${patient.status.toLowerCase().replace(" ", "-")}`}>
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="7" className="no-patients">
                    No patients found.
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
