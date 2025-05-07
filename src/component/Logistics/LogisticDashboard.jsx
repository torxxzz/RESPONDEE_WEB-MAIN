import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./LogisticDashboard.module.css";
import LogisticTab from "./LogisticTab";
import {
  Calendar,
  Bell,
  Menu,
  LogOut,
  X,
} from "lucide-react";

function LogisticDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [dashboardDate, setDashboardDate] = useState(new Date());
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    "New logistics request submitted",
    "Logistics request approved",
    "Delivery scheduled",
  ]);

  const notificationRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleMenuClick = (section) => setActiveSection(section);
  const toggleNotifications = () => setNotificationOpen(!isNotificationOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.bellIconContainer}`)
      ) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* Navbar */}
      <header className={`${styles.navbar} ${isSidebarOpen ? "" : styles.shrinkNavbar}`}>
        <div className={styles.navLeft}>
          <span className={styles.logo}>LOGO</span>
          {isSidebarOpen && <span className={styles.logoText}>with name</span>}
          <Menu className={styles.menuIcon} onClick={toggleSidebar} />
        </div>
        <div className={styles.navRight}>
          <div className={styles.bellIconContainer} onClick={toggleNotifications}>
            <Bell className={styles.bellIcon} />
            {notifications.length > 0 && (
              <span className={styles.notificationIndicator}>
                {notifications.length}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Notifications */}
      {isNotificationOpen && (
        <div className={styles.notificationPopup} ref={notificationRef}>
          <div className={styles.closeButton} onClick={() => setNotificationOpen(false)}>
            <X size={18} />
          </div>
          {notifications.length > 0 ? (
            notifications.map((note, idx) => (
              <div className={styles.notificationItem} key={idx}>
                {note}
              </div>
            ))
          ) : (
            <div className={styles.noNotifications}>No new notifications</div>
          )}
        </div>
      )}

      <div className={styles.mainContainer}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.collapsed}`}>
          <nav>
            <ul>
              <li className={activeSection === "dashboard" ? styles.active : ""} onClick={() => handleMenuClick("dashboard")}>
                📌 <span className={styles.linkText}>Dashboard</span>
              </li>
              <li className={activeSection === "logistic" ? styles.active : ""} onClick={() => handleMenuClick("logistic")}>
                📦 <span className={styles.linkText}>Logistics</span>
              </li>
            </ul>
          </nav>
          <button className={styles.logoutBtn}>
            <LogOut size={20} /> <span className={styles.linkText}>Logout</span>
          </button>
        </aside>

        {/* Content */}
        <main className={styles.content}>
          {activeSection === "dashboard" && (
            <section className={styles.dashboardContent}>
              <div className={styles.dashboardHeader}>
                <div className={styles.welcomeText}>
                  <h2>Welcome, Logistics Handler</h2>
                  <p>Manage and verify logistics requests efficiently.</p>
                </div>
                <div className={styles.dateContainer}>
                  <Calendar size={18} />
                  <DatePicker
                    selected={dashboardDate}
                    onChange={(date) => setDashboardDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className={styles.customDatePicker}
                    placeholderText="Select date"
                  />
                </div>
              </div>
              <div className={styles.statsComplaint}>
                <div className={styles.statLarge}>New Requests</div>
                <div className={styles.statSmall}>Requests<br />Settled</div>
                <div className={styles.statSmall}>Requests<br />Unsettled</div>
              </div>
              <div className={styles.reportLegend}>
                <strong>Report:</strong>
                <div className={styles.legendRows}>
                  <span><span className={`${styles.legendColor} ${styles.totalNewComplaints}`}></span> Settled</span>
                  <span><span className={`${styles.legendColor} ${styles.settledComplaints}`}></span> Unsettled</span>
                </div>
              </div>
              <div className={styles.graphPlaceholder}>graph</div>
            </section>
          )}

          {activeSection === "logistic" && (
            <LogisticTab />
          )}
        </main>
      </div>
    </div>
  );
}

export default LogisticDashboard;
