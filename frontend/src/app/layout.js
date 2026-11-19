import "./globals.css";
import Sidebar from "../components/layout/sidebar";

export const metadata = {
  title: "MediChannel",
  description: "Hospital channelling and appointment system"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />

        <main className="mc-main-content">
          {children}
        </main>
      </body>
    </html>
  );
}


