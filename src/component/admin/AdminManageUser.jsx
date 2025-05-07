import React, { useState } from "react";
import styles from "./AdminManageUser.module.css";
import { Pencil, Trash2, PlusCircle, X } from "lucide-react";

const ADMIN_PASSWORD = "admin123"; // Replace this with your actual password or auth system

const AdminManageUser = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Juan Dela Cruz", email: "juan@email.com", phone: "09123456789", role: "Complaint Handler" },
    { id: 2, name: "Maria Santos", email: "maria@email.com", phone: "09987654321", role: "Logistics Handler" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [currentId, setCurrentId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", role: "Complaint Handler"
  });

  const handleOpenAdd = () => {
    setFormMode("add");
    setFormData({ name: "", email: "", phone: "", role: "Complaint Handler" });
    setShowForm(true);
  };

  const handleOpenEdit = (emp) => {
    setFormMode("edit");
    setFormData({ ...emp });
    setCurrentId(emp.id);
    setShowForm(true);
  };

  const handleOpenDelete = (emp) => {
    setDeleteTarget(emp);
    setAdminPasswordInput("");
    setShowDeleteConfirm(true);
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (formMode === "edit") {
      setEmployees(prev =>
        prev.map(emp => emp.id === currentId ? { ...formData, id: currentId } : emp)
      );
    } else {
      setEmployees(prev => [...prev, { ...formData, id: Date.now() }]);
    }

    setShowForm(false);
    setFormData({ name: "", email: "", phone: "", role: "Complaint Handler" });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (adminPasswordInput !== ADMIN_PASSWORD) {
      alert("Incorrect admin password.");
      return;
    }
    setEmployees(prev => prev.filter(emp => emp.id !== deleteTarget.id));
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.phone.includes(searchTerm)
  );

  return (
    <div className={styles.manageUserContainer}>
      <h2>Manage Employees</h2>

      {/* 🔍 Search + ➕ Add */}
      <div className={styles.topBar}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.addUserBtn} onClick={handleOpenAdd}>
          <PlusCircle size={16} /> Add Employee
        </button>
      </div>

      {/* 📋 Table */}
      <div className={styles.employeeTable}>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.role}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => handleOpenEdit(emp)}>
                    <Pencil size={14} />
                  </button>
                  <button className={styles.deleteBtn} onClick={() => handleOpenDelete(emp)}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➕ Add / ✏️ Edit Modal */}
      {showForm && (
        <div className={styles.popupOverlay}>
          <div className={styles.addUserContent}>
            <button className={styles.closePopup} onClick={() => setShowForm(false)}><X size={18} /></button>
            <h2>{formMode === "edit" ? "Edit Employee" : "Add Employee"}</h2>
            <form className={styles.addUserForm} onSubmit={handleAddOrEdit}>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <label>Phone Number:</label>
              <input
                type="tel"
                placeholder="Enter phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <label>Role:</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="Complaint Handler">Complaint Handler</option>
                <option value="Logistics Handler">Logistics Handler</option>
                <option value="Admin">Admin</option>
              </select>

              <button type="submit">{formMode === "edit" ? "Update" : "Add"} Employee</button>
            </form>
          </div>
        </div>
      )}

      {/* 🗑️ Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className={styles.popupOverlay}>
          <div className={styles.deleteConfirmContent}>
            <button className={styles.closePopup} onClick={() => setShowDeleteConfirm(false)}><X size={18} /></button>
            <h2>Confirm Deletion</h2>
            <form className={styles.deleteForm} onSubmit={handleDelete}>
              <p>Enter admin password to delete <strong>{deleteTarget?.name}</strong>:</p>
              <input
                type="password"
                placeholder="Admin password"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
              />
              <button type="submit">Confirm Delete</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManageUser;
