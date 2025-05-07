import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ComplaintDashboard.module.css";
import ComplaintTab from "./ComplaintTab";
import {
  Calendar,
  Bell,
  Menu,
  LogOut,
  X,
} from "lucide-react";

function ComplaintDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [dashboardDate, setDashboardDate] = useState(new Date());
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    "New complaint submitted",
    "Complaint status updated",
    "New message received",
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
              <li className={activeSection === "complaint" ? styles.active : ""} onClick={() => handleMenuClick("complaint")}>
                📜 <span className={styles.linkText}>Complaint</span>
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
                  <h2>Welcome, Complaint Handler</h2>
                  <p>Manage and verify complaints efficiently.</p>
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
                <div className={styles.statLarge}>new complaints</div>
                <div className={styles.statSmall}>Complaints<br />settled</div>
                <div className={styles.statSmall}>Complaints<br />unsettled</div>
              </div>
              <div className={styles.reportLegend}>
                <strong>Report:</strong>
                <div className={styles.legendRows}>
                  <span><span className={`${styles.legendColor} ${styles.totalNewComplaints}`}></span> settled</span>
                  <span><span className={`${styles.legendColor} ${styles.settledComplaints}`}></span> unsettled</span>
                </div>
              </div>
              <div className={styles.graphPlaceholder}>graph</div>
            </section>
          )}

          {activeSection === "complaint" && (
            <ComplaintTab />
          )}
        </main>
      </div>
    </div>
  );
}

export default ComplaintDashboard;
