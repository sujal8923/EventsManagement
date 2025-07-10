import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DashboardLayout from "./DashboardLayout";
import Table from "./Table";
import FormModal from "./FormModal";
import axios from "axios";

function AdminDashboard({ handleLogout }) {
  const [activeTab, setActiveTab] = useState("events");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [currentFormData, setCurrentFormData] = useState(null);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (activeTab === "events") {
      axios
        .get("http://localhost:8080/admin/events", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setEvents(res.data))
        .catch((err) => console.error("Error fetching events:", err));
    } else if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        // Store each user's active status in localStorage
        res.data.forEach((user) => {
          localStorage.setItem(`user_${user.id}_active`, user.active);
        });
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  const eventHeaders = [
    { key: "sno", label: "S. No." },
    { key: "title", label: "Event Name" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
  ];

  const userHeaders = [
    { key: "sno", label: "S. No." },
    { key: "userName", label: "Username" },
    { key: "email", label: "Email" },
    { key: "role", label: "Roles" },
    { key: "action", label: "Action" }, // New header for Edit button
    { key: "statusText", label: "Status" }, // New header for displaying status text
    { key: "statusButton", label: "Status Toggle" }, // Separate header for the toggle button
  ];

  const eventFormFields = [
    { name: "name", label: "Event Name", type: "text", required: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "location", label: "Location", type: "text", required: true },
    { name: "status", label: "Status", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: false },
    { name: "imageUrl", label: "Image URL", type: "text", required: false },
    { name: "timings", label: "Timings", type: "text", required: false },
  ];

  const userFormFields = [
    { name: "userName", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "role", label: "Role", type: "text", required: true },
    // Password field should not be here for update, only for create if needed
  ];

  const handleCreate = () => {
    setModalType("create");
    if (activeTab === "users") {
      setCurrentFormData({
        role: "User",
        userName: "",
        email: "",
        password: "", // Include password for creation if allowed
      });
      setIsModalOpen(true);
    }
  };

  const handleUpdate = (data) => {
    setModalType("update");
    setCurrentFormData(data);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id) => {
    axios
      .put(`http://localhost:8080/admin/user/toggle/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchUsers())
      .catch((err) => console.error("Error toggling user:", err));
  };

  const handleFormSubmit = (formData) => {
    if (modalType === "create") {
      console.log("Admin cannot create users from frontend directly."); // As per your original comment
      // If you decide to allow creation:
      // axios.post("http://localhost:8080/admin/user", formData, { headers: { Authorization: `Bearer ${token}` }})
      //   .then(() => { fetchUsers(); setIsModalOpen(false); })
      //   .catch(err => { console.error("Creation failed:", err); alert("Failed to create user."); });
    } else {
      if (activeTab === "users") {
        axios
          .put(`http://localhost:8080/admin/user/${formData.id}`, formData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setUsers(users.map((user) => (user.id === formData.id ? res.data : user)));
            setIsModalOpen(false);
          })
          .catch((err) => {
            console.error("Update failed:", err);
            alert("Failed to update user.");
          });
      } else if (activeTab === "events") {
        // Implement event update logic here if you enable it later
        // axios.put(`http://localhost:8080/admin/event/${formData.id}`, formData, { headers: { Authorization: `Bearer ${token}` }})
        //   .then(() => { setEvents(events.map(event => event.id === formData.id ? res.data : event)); setIsModalOpen(false); })
        //   .catch(err => { console.error("Event update failed:", err); alert("Failed to update event."); });
      }
    }
    setIsModalOpen(false); // Close modal after submission attempt
  };

  const formatUsersWithButtons = (users) => {
    return users.map((user, index) => ({
      ...user,
      sno: index + 1,
      // Action column with Edit button
      action: (
        <button
          className="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700"
          onClick={() => handleUpdate(user)}
        >
          Edit
        </button>
      ),
      // Status text from local storage or actual user active status
      statusText: localStorage.getItem(`user_${user.id}_active`) === 'true' ? "Active" : "Inactive",
      // Status toggle button
      statusButton: (
        <button
          className={`px-3 py-1 rounded text-white ${
            user.active ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={() => handleToggleStatus(user.id)}
        >
          {user.active ? "Deactivate" : "Activate"}
        </button>
      ),
    }));
  };

  let currentData = [];
  let currentHeaders = [];
  let currentFormFields = [];
  let modalTitle = "";
  let showCreateButton = false; // Admin cannot create users directly from frontend as per console.log

  if (activeTab === "events") {
    currentData = events;
    currentHeaders = eventHeaders;
    currentFormFields = eventFormFields;
    modalTitle = modalType === "create" ? "Create New Event" : "Update Event";
    showCreateButton = false; // Events are not created from this dashboard
  } else if (activeTab === "users") {
    currentData = formatUsersWithButtons(users);
    currentHeaders = userHeaders;
    currentFormFields = userFormFields;
    modalTitle = modalType === "create" ? "Create New User" : "Update User";
    showCreateButton = false; // Admin cannot create users directly from frontend
  }

  const tabs = [
    { id: "events", label: "Events" },
    { id: "users", label: "Users" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} userRole="admin" />
      <DashboardLayout
        title="Admin Dashboard"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <Table
          headers={currentHeaders}
          data={currentData}
          onUpdate={activeTab === "users" ? handleUpdate : null} // Pass handleUpdate for users
          showActions={activeTab === "users"} // Show actions column only for users
          showCreateButton={showCreateButton}
          onCreate={handleCreate}
        />
      </DashboardLayout>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        fields={currentFormFields}
        initialData={currentFormData}
        title={modalTitle}
      />
    </div>
  );
}

export default AdminDashboard;