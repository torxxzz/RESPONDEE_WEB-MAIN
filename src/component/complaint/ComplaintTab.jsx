import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./ComplaintTab.module.css";
import {
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star,
  StarOff,
  Circle,
  CheckCircle2,
  ArrowLeftCircle,
  MoreVertical,
  RefreshCw,
  Filter
} from "lucide-react";

function ComplaintTab() {
  const [complaintFilterDate, setComplaintFilterDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [labelsOpen, setLabelsOpen] = useState(true);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [kebabOpen, setKebabOpen] = useState(false);
  const [complaints, setComplaints] = useState([
    {
      id: "CMP-1001",
      sender: "John Doe",
      subject: "Delayed shipment",
      description: "The shipment was supposed to arrive last week...",
      date: "2025-03-30",
      verified: false,
      settled: false,
      unread: true,
      label: "Fraud",
      starred: false,
    },
    {
      id: "CMP-1002",
      sender: "Jane Smith",
      subject: "Damaged item received",
      description: "The item received is damaged and unusable...",
      date: "2025-03-29",
      verified: true,
      settled: false,
      unread: false,
      label: "Accident",
      starred: true,
    },
    {
      id: "CMP-1003",
      sender: "Michael Brown",
      subject: "Suspicious payment request",
      description: "Request to send money looks fraudulent...",
      date: "2025-03-28",
      verified: false,
      settled: false,
      unread: true,
      label: "Fraud",
      starred: false,
    },
    {
      id: "CMP-1004",
      sender: "Anna White",
      subject: "Threatening messages received",
      description: "Received a threat via email...",
      date: "2025-03-27",
      verified: false,
      settled: false,
      unread: true,
      label: "Threat",
      starred: false,
    },
  ]);

  const handleComplaintClick = (complaint) => {
    setSelectedComplaint({ ...complaint, unread: false });
    setComplaints((prev) =>
      prev.map((comp) =>
        comp.id === complaint.id ? { ...comp, unread: false } : comp
      )
    );
  };

  const verifyComplaint = (id) => {
    setComplaints((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, verified: true } : comp
      )
    );
    setSelectedComplaint((prev) => (prev ? { ...prev, verified: true } : null));
  };

  const settleComplaint = (id) => {
    setComplaints((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, settled: true } : comp
      )
    );
    setSelectedComplaint((prev) => (prev ? { ...prev, settled: true } : null));
  };

  const toggleStarred = (id) => {
    setComplaints((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, starred: !comp.starred } : comp
      )
    );
  };

  const updateLabel = (id, newLabel) => {
    setComplaints((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, label: newLabel } : comp
      )
    );
    setSelectedComplaint((prev) => (prev ? { ...prev, label: newLabel } : null));
  };

  const markAsSpam = (id) => {
    updateLabel(id, "Spam");
    setSelectedComplaint(null);
  };

  const unreadCount = (filterLabel) =>
    complaints.filter(
      (comp) =>
        comp.unread &&
        (filterLabel === "All"
          ? true
          : filterLabel === "To verify"
          ? !comp.verified
          : filterLabel === "Unsettled"
          ? comp.verified && !comp.settled
          : filterLabel === "Settled"
          ? comp.verified && comp.settled
          : filterLabel === "Very important"
          ? comp.starred
          : filterLabel === "Spam"
          ? comp.label === "Spam"
          : comp.label === filterLabel)
    ).length;

  const filteredComplaints = complaints.filter((comp) => {
    const matchText =
      comp.sender.toLowerCase().includes(searchText.toLowerCase()) ||
      comp.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchText.toLowerCase());

    const matchDate =
      !complaintFilterDate ||
      comp.date === complaintFilterDate.toISOString().split("T")[0];

    const matchFilter =
      selectedFilter === "All"
        ? true
        : selectedFilter === "To verify"
        ? !comp.verified
        : selectedFilter === "Unsettled"
        ? comp.verified && !comp.settled
        : selectedFilter === "Settled"
        ? comp.verified && comp.settled
        : selectedFilter === "Very important"
        ? comp.starred
        : selectedFilter === "Spam"
        ? comp.label === "Spam"
        : comp.label === selectedFilter;

    return matchText && matchDate && matchFilter;
  });

  return (
    <section className={styles.complaintContainer}>
      {!selectedComplaint ? (
        <div className={styles.complaintBody}>
          {/* 🔸 Sub Sidebar */}
          <aside className={styles.subSidebar}>
            <ul className={styles.subSidebarList}>
              {["All", "To verify", "Unsettled", "Settled", "Very important", "Spam"].map((item) => (
                <li
                  key={item}
                  onClick={() => setSelectedFilter(item)}
                  className={selectedFilter === item ? styles.activeSub : ""}
                >
                  {item === "All" && "📂 "}
                  {item === "To verify" && "📌 "}
                  {item === "Unsettled" && "🕓 "}
                  {item === "Settled" && "✅ "}
                  {item === "Very important" && "⭐ "}
                  {item === "Spam" && "🗑️ "}
                  {item}
                  {unreadCount(item) > 0 && (
                    <span className={styles.countBadge}>{unreadCount(item)}</span>
                  )}
                </li>
              ))}
              <li className={styles.labelHeader} onClick={() => setLabelsOpen(!labelsOpen)}>
                {labelsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />} Labels
              </li>
              {labelsOpen && (
                <ul className={styles.labelDropdown}>
                  {["Fraud", "Threat", "Accident"].map((label) => (
                    <li
                      key={label}
                      onClick={() => setSelectedFilter(label)}
                      className={selectedFilter === label ? styles.activeSub : ""}
                    >
                      • {label}
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          </aside>

          {/* 🔹 Complaint Column */}
          <div className={styles.complaintColumn}>
            <div className={styles.header}>
              <div className={styles.searchBar}>
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className={styles.dateFilterWrap}>
                <div className={styles.dateFilter}>
                  <Calendar size={16} />
                  <DatePicker
                    selected={complaintFilterDate}
                    onChange={(date) => setComplaintFilterDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Date"
                    className={styles.customDatePicker}
                    isClearable
                  />
                </div>
                <RefreshCw className={styles.refreshIcon} onClick={() => window.location.reload()} />
                <div className={styles.filterIcon} onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}>
                  <Filter size={18} />
                  {filterDropdownOpen && (
                    <div className={styles.filterDropdown}>
                      <div onClick={() => setSelectedFilter("Unread")}>Unread</div>
                      <div onClick={() => setSelectedFilter("Read")}>Read</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.complaintList}>
              {filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className={`${styles.complaintItem} ${complaint.unread ? styles.unreadComplaint : ""}`}
                  onClick={() => handleComplaintClick(complaint)}
                >
                  <div onClick={(e) => { e.stopPropagation(); toggleStarred(complaint.id); }}>
                    {complaint.starred ? <Star size={16} color="#f1b400" /> : <StarOff size={16} color="#aaa" />}
                  </div>
                  <div className={styles.statusIcon}>
                    {complaint.verified
                      ? <CheckCircle2 color="#4caf50" size={16} />
                      : <Circle color="#ff5722" size={16} />}
                  </div>
                  <div className={styles.complaintDetails}>
                    <strong>{complaint.sender}</strong>
                    <span className={styles.subject}>{complaint.subject}</span>
                    <span className={styles.preview}>{complaint.description}</span>
                    <span className={styles.categoryLabel}>{complaint.label}</span>
                  </div>
                  <div className={styles.date}>{complaint.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.complaintDetailExpanded}>
          <button className={styles.backBtn} onClick={() => setSelectedComplaint(null)}>
            <ArrowLeftCircle size={18} /> Back
          </button>
          <div className={styles.detailHeader}>
            <h2>{selectedComplaint.subject}</h2>
            <div className={styles.kebabWrap}>
              <MoreVertical onClick={() => setKebabOpen((prev) => !prev)} />
              {kebabOpen && (
                <div className={styles.kebabDropdown}>
                  <div onClick={() => markAsSpam(selectedComplaint.id)}>🗑️ Mark as Spam</div>
                </div>
              )}
            </div>
          </div>
          <p><strong>From:</strong> {selectedComplaint.sender}</p>
          <p className={styles.detailDescription}>{selectedComplaint.description}</p>
          <div className={styles.labelSelector}>
            <label>Label:</label>
            <select
              value={selectedComplaint.label}
              onChange={(e) => updateLabel(selectedComplaint.id, e.target.value)}
            >
              <option value="Fraud">Fraud</option>
              <option value="Threat">Threat</option>
              <option value="Accident">Accident</option>
              <option value="Spam">Spam</option>
            </select>
          </div>
          {!selectedComplaint.verified ? (
            <button className={styles.verifyBtn} onClick={() => verifyComplaint(selectedComplaint.id)}>
              Verify Complaint
            </button>
          ) : !selectedComplaint.settled ? (
            <button className={styles.verifyBtn} onClick={() => settleComplaint(selectedComplaint.id)}>
              Mark as Settled
            </button>
          ) : (
            <span className={styles.verifiedLabel}>✔️ Complaint Settled</span>
          )}
        </div>
      )}
    </section>
  );
}

export default ComplaintTab;
