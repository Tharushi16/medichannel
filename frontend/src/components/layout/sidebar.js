"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./sidebar.css";

const menuItems = [
  {
    title: "Main",
    links: [
      { name: "Home", path: "/" },
      { name: "Doctors", path: "/doctors" },
    ],
  },
  {
    title: "Patient",
    links: [
      { name: "Patient Dashboard", path: "/patient/dashboard" },
    ],
  },
  {
    title: "Doctor",
    links: [
      { name: "Doctor Dashboard", path: "/doctor/dashboard" },
      { name: "Sessions", path: "/doctor/sessions" },
      { name: "Patients", path: "/doctor/patients" },
      { name: "Consultations", path: "/doctor/consultations" },
      { name: "Online Consultations", path: "/doctor/online-consultations" },
    ],
  },
  {
    title: "Manager",
    links: [
      { name: "Manager Dashboard", path: "/manager/dashboard" },
      { name: "Doctors", path: "/manager/doctors" },
      { name: "Specialisations", path: "/manager/specialisations" },
      { name: "Sessions", path: "/manager/sessions" },
    ],
  },
  {
    title: "Admin",
    links: [
      { name: "Admin Dashboard", path: "/admin/dashboard" },
      { name: "User Management", path: "/admin/users" },
      { name: "Audit Logs", path: "/admin/audit-logs" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="mc-sidebar">
      <div className="mc-sidebar-brand">
        <div className="mc-sidebar-logo">M</div>
        <div>
          <h2>MediChannel</h2>
          <p>Hospital Management</p>
        </div>
      </div>

      <nav className="mc-sidebar-nav">
        {menuItems.map((section) => (
          <div className="mc-sidebar-section" key={section.title}>
            <h3>{section.title}</h3>

            {section.links.map((link) => {
              const active =
                pathname === link.path ||
                (link.path !== "/" && pathname.startsWith(link.path + "/"));

              return (
                <Link
                  href={link.path}
                  key={link.path}
                  className={`mc-sidebar-link ${active ? "active" : ""}`}
                >
                  <span>{link.name}</span>
                  <span className="mc-sidebar-arrow">›</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mc-sidebar-footer">
        <p>© 2026 MediChannel</p>
      </div>
    </aside>
  );
}
