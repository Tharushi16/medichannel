
"use client";

import "./dashboard.css";

const managementItems = [
  {
    title: "Doctor Management",
    description: "Add, view and manage hospital doctors.",
    icon: "🩺",
    link: "/manager/doctors"
  },
  {
    title: "Specialisation Management",
    description: "Manage available medical specialisations.",
    icon: "📋",
    link: "/manager/specialisations"
  },
  {
    title: "Room Management",
    description: "Manage consultation rooms.",
    icon: "🏥",
    link: "/manager/rooms"
  },
  {
    title: "Session Management",
    description: "Manage doctor sessions and schedules.",
    icon: "🗓️",
    link: "/manager/sessions"
  },
  {
    title: "Reception & Check-in",
    description: "Manage patient arrivals and check-ins.",
    icon: "🧾",
    link: "/manager/reception"
  },
  {
    title: "Payment Management",
    description: "View and manage patient payments.",
    icon: "💳",
    link: "/manager/payments"
  },
  {
    title: "Walk-in Appointments",
    description: "Register patients without prior bookings.",
    icon: "🚶",
    link: "/manager/walk-in"
  },
  {
    title: "Notices & Feedback",
    description: "Manage hospital notices and feedback.",
    icon: "📢",
    link: "/manager/notices"
  },
  {
    title: "Reports & Analytics",
    description: "View hospital activity and reports.",
    icon: "📊",
    link: "/manager/reports"
  }
];

export default function ManagerDashboard() {
  return (
    <main className="manager-dashboard">
      <header className="manager-dashboard-header">
        <div>
          <p className="manager-dashboard-brand">MEDICHANNEL / MANAGER</p>
          <h1>Manager Dashboard</h1>
          <p>Manage hospital operations and daily activities.</p>
        </div>

        <div className="manager-profile">
          <div className="manager-avatar">M</div>
          <div>
            <strong>Hospital Manager</strong>
            <span>Manager Account</span>
          </div>
        </div>
      </header>

      <section className="manager-welcome">
        <h2>Welcome back, Manager!</h2>
        <p>
          Here is an overview of the hospital management system.
        </p>
      </section>

      <section className="manager-statistics">
        <div className="manager-stat-card">
          <div className="manager-stat-icon purple">🩺</div>
          <div>
            <p>Total Doctors</p>
            <h2>4</h2>
          </div>
        </div>

        <div className="manager-stat-card">
          <div className="manager-stat-icon green">👨‍⚕️</div>
          <div>
            <p>Active Doctors</p>
            <h2>3</h2>
          </div>
        </div>

        <div className="manager-stat-card">
          <div className="manager-stat-icon blue">👥</div>
          <div>
            <p>Total Patients</p>
            <h2>24</h2>
          </div>
        </div>

        <div className="manager-stat-card">
          <div className="manager-stat-icon orange">📅</div>
          <div>
            <p>Today's Appointments</p>
            <h2>12</h2>
          </div>
        </div>
      </section>

      <section className="manager-management-section">
        <div className="manager-section-heading">
          <div>
            <h2>Hospital Management</h2>
            <p>Select a section to manage hospital activities.</p>
          </div>
        </div>

        <div className="manager-management-grid">
          {managementItems.map((item) => (
            <a
              href={item.link}
              className="manager-management-card"
              key={item.title}
            >
              <div className="manager-card-icon">{item.icon}</div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <span className="manager-card-link">
                Open section →
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="manager-dashboard-footer">
        <p>© 2026 MediChannel. Hospital Management System.</p>
      </footer>
    </main>
  );
}
