
"use client";

import { useState } from "react";
import "./consultations.css";

const initialRecords = [
  {
    id: 1,
    patient: "Kamal Perera",
    diagnosis: "Common cold",
    medication: "Paracetamol",
    date: "2026-11-13"
  }
];

export default function ConsultationsPage() {
  const [records, setRecords] = useState(initialRecords);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    patient: "",
    reason: "",
    diagnosis: "",
    notes: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newRecord = {
      id: Date.now(),
      patient: form.patient,
      diagnosis: form.diagnosis,
      medication: form.medication,
      date: new Date().toLocaleDateString()
    };

    setRecords((previous) => [newRecord, ...previous]);

    setMessage("Consultation notes and prescription saved successfully!");

    setForm({
      patient: "",
      reason: "",
      diagnosis: "",
      notes: "",
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: ""
    });
  }

  return (
    <main className="consultation-page">
      <header className="consultation-header">
        <div>
          <p className="consultation-brand">MEDICHANNEL / DOCTOR</p>
          <h1>Consultation Notes & Prescriptions</h1>
          <p>Record patient consultation details and prescriptions.</p>
        </div>

        <a href="/doctor/dashboard" className="back-button">
          Back to Dashboard
        </a>
      </header>

      <section className="privacy-notice">
        <strong>Medical Information Privacy</strong>
        <p>
          Consultation notes and prescriptions are confidential medical
          information. Only the treating doctor and the relevant patient
          should be able to access them.
        </p>
      </section>

      <section className="consultation-card">
        <h2>New Consultation</h2>
        <p className="section-description">
          Enter the patient's consultation information below.
        </p>

        {message && (
          <div className="success-message">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patient">Select Patient *</label>
            <select
              id="patient"
              name="patient"
              value={form.patient}
              onChange={handleChange}
              required
            >
              <option value="">Choose a patient</option>
              <option value="Kamal Perera">Kamal Perera - P001</option>
              <option value="Nimali Silva">Nimali Silva - P002</option>
              <option value="Amal Fernando">Amal Fernando - P003</option>
              <option value="Sanduni Perera">Sanduni Perera - P004</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason for Visit *</label>
            <textarea
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Enter the reason for the patient's visit"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="diagnosis">Diagnosis *</label>
            <input
              id="diagnosis"
              name="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              placeholder="Enter diagnosis"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Consultation Notes *</label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Enter consultation notes"
              required
            />
          </div>

          <div className="form-divider" />

          <h3>Prescription Details</h3>

          <div className="form-group">
            <label htmlFor="medication">Medication Name *</label>
            <input
              id="medication"
              name="medication"
              value={form.medication}
              onChange={handleChange}
              placeholder="Enter medication name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dosage">Dosage *</label>
              <input
                id="dosage"
                name="dosage"
                value={form.dosage}
                onChange={handleChange}
                placeholder="e.g. 500mg"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="frequency">Frequency *</label>
              <input
                id="frequency"
                name="frequency"
                value={form.frequency}
                onChange={handleChange}
                placeholder="e.g. Twice daily"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration *</label>
            <input
              id="duration"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g. 5 days"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Additional Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              placeholder="Enter additional instructions"
            />
          </div>

          <button type="submit" className="save-button">
            Save Consultation
          </button>
        </form>
      </section>

      <section className="records-section">
        <h2>Saved Consultation Records</h2>
        <p className="section-description">
          Demonstration records saved during this session.
        </p>

        {records.map((record) => (
          <div className="record-card" key={record.id}>
            <div>
              <h3>{record.patient}</h3>
              <p>Diagnosis: {record.diagnosis}</p>
              <p>Medication: {record.medication}</p>
            </div>

            <span>{record.date}</span>
          </div>
        ))}
      </section>
    </main>
  );
}

