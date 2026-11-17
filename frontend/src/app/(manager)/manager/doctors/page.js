
"use client";

import { useState } from "react";
import "./doctors.css";

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Nimal Perera",
    email: "nimal@gmail.com",
    phone: "0771234567",
    specialization: "Cardiology",
    status: "Active"
  },
  {
    id: 2,
    name: "Dr. Saman Silva",
    email: "saman@gmail.com",
    phone: "0712345678",
    specialization: "Pediatrics",
    status: "Active"
  },
  {
    id: 3,
    name: "Dr. Amal Fernando",
    email: "amal@gmail.com",
    phone: "0761234567",
    specialization: "Dermatology",
    status: "Inactive"
  }
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: ""
  });

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.email} ${doctor.specialization}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function addDoctor(event) {
    event.preventDefault();

    const newDoctor = {
      id: Date.now(),
      ...form,
      status: "Active"
    };

    setDoctors([...doctors, newDoctor]);

    setForm({
      name: "",
      email: "",
      phone: "",
      specialization: ""
    });

    setShowForm(false);
  }

  function toggleStatus(id) {
    setDoctors((previous) =>
      previous.map((doctor) =>
        doctor.id === id
          ? {
              ...doctor,
              status:
                doctor.status === "Active" ? "Inactive" : "Active"
            }
          : doctor
      )
    );
  }

  return (
    <main className="manager-doctors-page">
      <header className="manager-doctors-header">
        <div>
          <p className="manager-brand">MEDICHANNEL / MANAGER</p>
          <h1>Doctor Management</h1>
          <p>Manage hospital doctors and their information.</p>
        </div>

        <a href="/manager/dashboard" className="manager-back-button">
          Back to Dashboard
        </a>
      </header>

      <section className="doctor-summary">
        <div className="doctor-summary-card">
          <span>Total Doctors</span>
          <h2>{doctors.length}</h2>
        </div>

        <div className="doctor-summary-card">
          <span>Active Doctors</span>
          <h2>{doctors.filter((d) => d.status === "Active").length}</h2>
        </div>

        <div className="doctor-summary-card">
          <span>Inactive Doctors</span>
          <h2>{doctors.filter((d) => d.status === "Inactive").length}</h2>
        </div>
      </section>

      <section className="doctor-management-card">
        <div className="doctor-list-header">
          <div>
            <h2>Doctors List</h2>
            <p>View and manage registered doctors.</p>
          </div>

          <button
            className="add-doctor-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "+ Add Doctor"}
          </button>
        </div>

        {showForm && (
          <form className="add-doctor-form" onSubmit={addDoctor}>
            <h3>Add New Doctor</h3>

            <div className="doctor-form-grid">
              <div>
                <label>Doctor Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter doctor name"
                  required
                />
              </div>

              <div>
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <label>Phone Number *</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label>Specialisation *</label>
                <select
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select specialisation</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>
            </div>

            <button type="submit" className="save-doctor-button">
              Save Doctor
            </button>
          </form>
        )}

        <input
          className="doctor-search"
          type="search"
          placeholder="Search by doctor name, email or specialisation..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="doctor-table-wrapper">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialisation</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.specialization}</td>
                  <td>
                    <span
                      className={
                        doctor.status === "Active"
                          ? "doctor-status active"
                          : "doctor-status inactive"
                      }
                    >
                      {doctor.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="status-action-button"
                      onClick={() => toggleStatus(doctor.id)}
                    >
                      {doctor.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}

              {filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan="6" className="no-doctors">
                    No doctors found.
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
