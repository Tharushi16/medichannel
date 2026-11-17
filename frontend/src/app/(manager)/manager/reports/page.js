
import "./reports.css";

export default function ReportsPage() {
  return (
    <main className="reports-page">
      <header className="reports-header">
        <div>
          <p className="reports-brand">MEDICHANNEL / MANAGER</p>
          <h1>Reports & Analytics</h1>
          <p>
            View hospital reports and analytics.
          </p>
        </div>

        <a href="/manager/dashboard" className="reports-back">
          Back to Dashboard
        </a>
      </header>

      <section className="reports-content">
        <div className="reports-card">
          <div className="reports-icon">📊</div>
          <h2>Reports & Analytics</h2>
          <p>
            Hospital reports and analytics interface.
          </p>
        </div>
      </section>
    </main>
  );
}
