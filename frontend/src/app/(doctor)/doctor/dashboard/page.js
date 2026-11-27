import "./dashboard.css";

const sessions = [
  {
    time: "09:00 AM",
    patient: "Kamal Perera",
    number: "P001",
    status: "Waiting"
  },
  {
    time: "09:30 AM",
    patient: "Nimali Silva",
    number: "P002",
    status: "In Progress"
  },
  {
    time: "10:00 AM",
    patient: "Amal Fernando",
    number: "P003",
    status: "Completed"
  }
];

export default function DoctorDashboard() {
  return (
    <main className="doctor-dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-label">MEDICHANNEL / DOCTOR</p>
          <h1>Doctor Dashboard</h1>
          <p>Welcome back, Doctor. Here is your daily overview.</p>
        </div>

        <div className="doctor-profile">
          <div className="doctor-avatar">DR</div>
          <div>
            <strong>Doctor</strong>
            <span>Medical Specialist</span>
          </div>
        </div>
      </header>

      <section className="summary-cards">
        <div className="summary-card">
          <span>Total Patients</span>
          <h2>24</h2>
          <p>Today's appointments</p>
        </div>

        <div className="summary-card">
          <span>Waiting Patients</span>
          <h2>08</h2>
          <p>Patients in queue</p>
        </div>

        <div className="summary-card">
          <span>Completed Sessions</span>
          <h2>12</h2>
          <p>Completed today</p>
        </div>

        <div className="summary-card">
          <span>Remaining Sessions</span>
          <h2>04</h2>
          <p>Sessions to attend</p>
        </div>
      </section>

      <section className="session-section">
        <div className="section-heading">
          <div>
            <h2>Today's Sessions</h2>
            <p>Overview of your patient appointments</p>
          </div>

          <button className="view-button">View All Sessions</button>
        </div>

        <div className="table-wrapper">
          <table className="session-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Patient Name</th>
                <th>Patient ID</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr key={session.number}>
                  <td>{session.time}</td>
                  <td>{session.patient}</td>
                  <td>{session.number}</td>
                  <td>
                    <span
                      className={`status-badge ${session.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {session.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="action-list">
          <a href="/doctor/patients">View Patients</a>
          <a href="/doctor/sessions">Manage Sessions</a>
        </div>
      </section>
    </main>
  );
}

