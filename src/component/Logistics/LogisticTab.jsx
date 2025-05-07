import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./LogisticTab.module.css";
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

function LogisticTab() {
  const [logisticFilterDate, setLogisticFilterDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedLogistic, setSelectedLogistic] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [labelsOpen, setLabelsOpen] = useState(true);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [kebabOpen, setKebabOpen] = useState(false);
  const [logistics, setLogistics] = useState([
    {
      id: "LOG-1001",
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
      id: "LOG-1002",
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
      id: "LOG-1003",
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
      id: "LOG-1004",
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

  const handleLogisticClick = (log) => {
    setSelectedLogistic({ ...log, unread: false });
    setLogistics((prev) =>
      prev.map((l) => (l.id === log.id ? { ...l, unread: false } : l))
    );
  };

  const verifyLogistic = (id) => {
    setLogistics((prev) =>
      prev.map((l) => (l.id === id ? { ...l, verified: true } : l))
    );
    setSelectedLogistic((prev) => (prev ? { ...prev, verified: true } : null));
  };

  const settleLogistic = (id) => {
    setLogistics((prev) =>
      prev.map((l) => (l.id === id ? { ...l, settled: true } : l))
    );
    setSelectedLogistic((prev) => (prev ? { ...prev, settled: true } : null));
  };

  const toggleStarred = (id) => {
    setLogistics((prev) =>
      prev.map((l) => (l.id === id ? { ...l, starred: !l.starred } : l))
    );
  };

  const updateLabel = (id, newLabel) => {
    setLogistics((prev) =>
      prev.map((l) => (l.id === id ? { ...l, label: newLabel } : l))
    );
    setSelectedLogistic((prev) =>
      prev ? { ...prev, label: newLabel } : null
    );
  };

  const markAsSpam = (id) => {
    updateLabel(id, "Spam");
    setSelectedLogistic(null);
  };

  const unreadCount = (filterLabel) =>
    logistics.filter(
      (log) =>
        log.unread &&
        (filterLabel === "All"
          ? true
          : filterLabel === "To verify"
          ? !log.verified
          : filterLabel === "Unsettled"
          ? log.verified && !log.settled
          : filterLabel === "Settled"
          ? log.verified && log.settled
          : filterLabel === "Very important"
          ? log.starred
          : filterLabel === "Spam"
          ? log.label === "Spam"
          : log.label === filterLabel)
    ).length;

  const filteredLogistics = logistics.filter((log) => {
    const matchText =
      log.sender.toLowerCase().includes(searchText.toLowerCase()) ||
      log.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      log.description.toLowerCase().includes(searchText.toLowerCase());

    const matchDate =
      !logisticFilterDate ||
      log.date === logisticFilterDate.toISOString().split("T")[0];

    const matchFilter =
      selectedFilter === "All"
        ? true
        : selectedFilter === "To verify"
        ? !log.verified
        : selectedFilter === "Unsettled"
        ? log.verified && !log.settled
        : selectedFilter === "Settled"
        ? log.verified && log.settled
        : selectedFilter === "Very important"
        ? log.starred
        : selectedFilter === "Spam"
        ? log.label === "Spam"
        : log.label === selectedFilter;

    return matchText && matchDate && matchFilter;
  });

  return (
    <section className={styles.complaintContainer}>
      {!selectedLogistic ? (
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

          <div className={styles.complaintColumn}>
            <div className={styles.header}>
              <div className={styles.searchBar}>
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search logistics..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className={styles.dateFilterWrap}>
                <div className={styles.dateFilter}>
                  <Calendar size={16} />
                  <DatePicker
                    selected={logisticFilterDate}
                    onChange={(date) => setLogisticFilterDate(date)}
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
              {filteredLogistics.map((log) => (
                <div
                  key={log.id}
                  className={`${styles.complaintItem} ${log.unread ? styles.unreadComplaint : ""}`}
                  onClick={() => handleLogisticClick(log)}
                >
                  <div onClick={(e) => { e.stopPropagation(); toggleStarred(log.id); }}>
                    {log.starred ? <Star size={16} color="#f1b400" /> : <StarOff size={16} color="#aaa" />}
                  </div>
                  <div className={styles.statusIcon}>
                    {log.verified
                      ? <CheckCircle2 color="#4caf50" size={16} />
                      : <Circle color="#ff5722" size={16} />}
                  </div>
                  <div className={styles.complaintDetails}>
                    <strong>{log.sender}</strong>
                    <span className={styles.subject}>{log.subject}</span>
                    <span className={styles.preview}>{log.description}</span>
                    <span className={styles.categoryLabel}>{log.label}</span>
                  </div>
                  <div className={styles.date}>{log.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.complaintDetailExpanded}>
          <button className={styles.backBtn} onClick={() => setSelectedLogistic(null)}>
            <ArrowLeftCircle size={18} /> Back
          </button>
          <div className={styles.detailHeader}>
            <h2>{selectedLogistic.subject}</h2>
            <div className={styles.kebabWrap}>
              <MoreVertical onClick={() => setKebabOpen((prev) => !prev)} />
              {kebabOpen && (
                <div className={styles.kebabDropdown}>
                  <div onClick={() => markAsSpam(selectedLogistic.id)}>🗑️ Mark as Spam</div>
                </div>
              )}
            </div>
          </div>
          <p><strong>From:</strong> {selectedLogistic.sender}</p>
          <p className={styles.detailDescription}>{selectedLogistic.description}</p>
          <div className={styles.labelSelector}>
            <label>Label:</label>
            <select
              value={selectedLogistic.label}
              onChange={(e) => updateLabel(selectedLogistic.id, e.target.value)}
            >
              <option value="Fraud">Fraud</option>
              <option value="Threat">Threat</option>
              <option value="Accident">Accident</option>
              <option value="Spam">Spam</option>
            </select>
          </div>
          {!selectedLogistic.verified ? (
            <button className={styles.verifyBtn} onClick={() => verifyLogistic(selectedLogistic.id)}>
              Verify Request
            </button>
          ) : !selectedLogistic.settled ? (
            <button className={styles.verifyBtn} onClick={() => settleLogistic(selectedLogistic.id)}>
              Mark as Settled
            </button>
          ) : (
            <span className={styles.verifiedLabel}>✔️ Request Settled</span>
          )}
        </div>
      )}
    </section>
  );
}

export default LogisticTab;
