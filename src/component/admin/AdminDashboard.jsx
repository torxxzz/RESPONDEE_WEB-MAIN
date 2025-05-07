import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AdminDashboard.module.css";
import AdminComplaintTab from "./AdminComplaintTab";
import AdminLogisticTab from "./AdminLogisticTab";
import AdminManageUser from "./AdminManageUser";
import { Bell, Menu, LogOut, X, Calendar } from "lucide-react";

function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleMenuClick = (section) => setActiveSection(section);
  const toggleNotifications = () => setNotificationOpen(!isNotificationOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !event.target.closest(".bellIconContainer")
      ) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* 🔹 Top Navbar */}
      <header className={`${styles.navbar} ${isSidebarOpen ? "" : styles.shrinkNavbar}`}>
        <div className={styles.navLeft}>
          <span className={styles.logo}>LOGO</span>
          {isSidebarOpen && <span className={styles.logoText}>with name</span>}
          <Menu className={styles.menuIcon} onClick={toggleSidebar} />
        </div>

        {/* 🔹 Right Navbar Icons */}
        <div className={styles.navRight}>
          <div className={styles.bellIconContainer} onClick={toggleNotifications}>
            <Bell className={styles.bellIcon} />
            <span className={styles.notificationIndicator}>3</span>
          </div>
        </div>
      </header>

      {/* 🔔 Notification Popup */}
      {isNotificationOpen && (
        <div className={styles.notificationPopup} ref={notificationRef}>
          <div className={styles.closeButton} onClick={() => setNotificationOpen(false)}>
            <X size={18} />
          </div>
          <div className={styles.notificationItem}>New complaint submitted</div>
          <div className={styles.notificationItem}>Logistics request approved</div>
          <div className={styles.notificationItem}>System update available</div>
        </div>
      )}

      <div className={styles.mainContainer}>
        {/* 🔹 Sidebar */}
        <aside className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.collapsed}`}>
          <nav>
            <ul>
              <li
                className={activeSection === "dashboard" ? styles.active : ""}
                onClick={() => handleMenuClick("dashboard")}
              >
                <span>📌</span> <span className={styles.linkText}>Dashboard</span>
              </li>
              <li
                className={activeSection === "addUser" ? styles.active : ""}
                onClick={() => handleMenuClick("addUser")}
              >
                <span>👥</span> <span className={styles.linkText}>Manage User</span>
              </li>
              <li
                className={activeSection === "complaint" ? styles.active : ""}
                onClick={() => handleMenuClick("complaint")}
              >
                <span>📜</span> <span className={styles.linkText}>Complaint</span>
              </li>
              <li
                className={activeSection === "logistics" ? styles.active : ""}
                onClick={() => handleMenuClick("logistics")}
              >
                <span>📦</span> <span className={styles.linkText}>Logistics</span>
              </li>
            </ul>
          </nav>

          {/* 🔹 Logout */}
          <button className={styles.logoutBtn} onClick={() => alert("Logging out...")}>
            <LogOut size={20} /> <span className={styles.linkText}>Logout</span>
          </button>
        </aside>

        {/* 🔹 Main Content */}
        <main className={styles.content}>
          {activeSection === "dashboard" && (
            <section className={styles.dashboardContent}>
              <div className={styles.dashboardHeader}>
                <div className={styles.welcomeText}>
                  <h2>Welcome, Admin</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className={styles.dateContainer}>
                  <Calendar size={18} />
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className={styles.customDatePicker}
                  />
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.statLarge}>new complaints</div>
                <div className={styles.statSmall}>Complaints<br />(total ongoing)</div>
                <div className={styles.statSmall}>Complaints<br />(done)</div>
                <div className={styles.statSmall}>Logistics<br />(total ongoing)</div>
                <div className={styles.statSmall}>Logistics<br />(done)</div>
              </div>

              <div className={styles.reportLegend}>
                <strong>Report:</strong>
                <div className={styles.legendRows}>
                  <span>
                    <span className={styles.legendColor} style={{ backgroundColor: "#4caf50" }}></span>
                    total new complaints
                  </span>
                  <span>
                    <span className={styles.legendColor} style={{ backgroundColor: "#2196f3" }}></span>
                    settled complaints
                  </span>
                  <span>
                    <span className={styles.legendColor} style={{ backgroundColor: "#ff9800" }}></span>
                    total new logistics request
                  </span>
                  <span>
                    <span className={styles.legendColor} style={{ backgroundColor: "#f44336" }}></span>
                    settled logistics request
                  </span>
                </div>
              </div>

              <div className={styles.graphPlaceholder}>graph</div>
            </section>
          )}

          {activeSection === "addUser" && (
            <section className={styles.AdminManageUser}>
              <AdminManageUser />
            </section>
          )}

          {activeSection === "complaint" && (
            <section className={styles.complaintContent}>
              <AdminComplaintTab />
            </section>
          )}
          
          {activeSection === "logistics" && (
            <section className={styles.logisticContent}>
              <AdminLogisticTab />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
