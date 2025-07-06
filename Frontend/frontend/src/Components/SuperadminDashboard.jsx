import React, { useState } from 'react';
import Navbar from './Navbar';
import DashboardLayout from './DashboardLayout';
import Table from './Table';
import FormModal from './FormModal'; // Import the FormModal component

function SuperadminDashboard({ handleLogout }) {
  const [activeTab, setActiveTab] = useState('admins'); // 'admins', 'users', 'events'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create', 'update'
  const [currentFormData, setCurrentFormData] = useState(null); // Data for update form

  // Dummy Data for Admins (Removed status, role is implied)
  const [admins, setAdmins] = useState([
    { id: 'admin1', username: 'adminuser1', password: 'adminpassword1' }, // Added dummy password
    { id: 'admin2', username: 'adminuser2', password: 'adminpassword2' }, // Added dummy password
  ]);

  // Dummy Data for Users (Removed status, role is implied)
  const [users, setUsers] = useState([
    { id: 'user1', username: 'john.doe' },
    { id: 'user2', username: 'jane.smith' },
    { id: 'user3', username: 'mike.jones' },
  ]);

  // Dummy Data for Events (ensure unique IDs if you add more)
  const [events, setEvents] = useState([
    { id: 'eventA', name: 'Annual Tech Summit', date: '2025-08-15', location: 'Virtual', status: 'Upcoming' },
    { id: 'eventB', name: 'Startup Pitch Fest', date: '2025-09-01', location: 'Conference Hall', status: 'Upcoming' },
    { id: 'eventC', name: 'AI & ML Workshop', date: '2025-10-20', location: 'Online', status: 'Upcoming' },
  ]);

  // Table Headers (Added 'sno' for Serial Number)
  const adminHeaders = [
    { key: 'sno', label: 'S. No.' }, // Added S. No.
    { key: 'username', label: 'Username' },
    { key: 'actions', label: 'Actions' },
  ];

  const userHeaders = [
    { key: 'sno', label: 'S. No.' }, // Added S. No.
    { key: 'username', label: 'Username' },
    { key: 'actions', label: 'Actions' },
  ];

  const eventHeaders = [
    { key: 'sno', label: 'S. No.' }, // Added S. No.
    { key: 'name', label: 'Event Name' },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  // Form field definitions (no change needed here for S. No.)
  const adminFormFields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
  ];

  const userFormFields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
  ];

  const eventFormFields = [
    { name: 'name', label: 'Event Name', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'imageUrl', label: 'Image URL', type: 'text', required: false },
    { name: 'timings', label: 'Timings', type: 'text', required: false },
  ];

  // Handlers for opening modals
  const handleCreate = () => {
    setModalType('create');
    if (activeTab === 'admins') {
      setCurrentFormData({ role: 'Admin', username: '', password: '', confirmPassword: '' });
    } else if (activeTab === 'users') {
      setCurrentFormData({ role: 'User', username: '' });
    } else {
      setCurrentFormData(null);
    }
    setIsModalOpen(true);
  };

  const handleUpdate = (data) => {
    setModalType('update');
    setCurrentFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = (idToDelete) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'admins') {
        setAdmins(admins.filter(admin => admin.id !== idToDelete));
      } else if (activeTab === 'users') {
        setUsers(users.filter(user => user.id !== idToDelete));
      } else if (activeTab === 'events') {
        setEvents(events.filter(event => event.id !== idToDelete));
      }
    }
  };

  // Handler for form submission from modal
  const handleFormSubmit = (formData) => {
    if (activeTab === 'admins' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { confirmPassword, ...dataToSave } = formData;

    if (modalType === 'create') {
      const newId = `${activeTab.slice(0, -1)}${Date.now()}`;
      let newItem = { id: newId, ...dataToSave };

      if (activeTab === 'admins') {
        newItem = { ...newItem, role: 'Admin' };
        setAdmins([...admins, newItem]);
      } else if (activeTab === 'users') {
        newItem = { ...newItem, role: 'User' };
        setUsers([...users, newItem]);
      } else if (activeTab === 'events') {
        setEvents([...events, newItem]);
      }
    } else { // modalType === 'update'
      if (activeTab === 'admins') {
        setAdmins(admins.map(admin => admin.id === dataToSave.id ? { ...dataToSave, role: 'Admin' } : admin));
      } else if (activeTab === 'users') {
        setUsers(users.map(user => user.id === dataToSave.id ? { ...dataToSave, role: 'User' } : user));
      } else if (activeTab === 'events') {
        setEvents(events.map(event => event.id === dataToSave.id ? dataToSave : event));
      }
    }
    setIsModalOpen(false);
  };

  // Determine which data and headers to display based on activeTab
  let currentData = [];
  let currentHeaders = [];
  let currentFormFields = [];
  let modalTitle = "";

  if (activeTab === 'admins') {
    currentData = admins;
    currentHeaders = adminHeaders;
    currentFormFields = adminFormFields;
    modalTitle = modalType === 'create' ? 'Create New Admin' : 'Update Admin';
  } else if (activeTab === 'users') {
    currentData = users;
    currentHeaders = userHeaders;
    currentFormFields = userFormFields;
    modalTitle = modalType === 'create' ? 'Create New User' : 'Update User';
  } else if (activeTab === 'events') {
    currentData = events;
    currentHeaders = eventHeaders;
    currentFormFields = eventFormFields;
    modalTitle = modalType === 'create' ? 'Create New Event' : 'Update Event';
  }

  const tabs = [
    { id: 'admins', label: 'Admins' },
    { id: 'users', label: 'Users' },
    { id: 'events', label: 'Events' },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-tr from-sky-100 to-indigo-100 pt-20">
      <Navbar handleLogout={handleLogout} userRole="superadmin" />
      <DashboardLayout
        title="Superadmin Dashboard"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={handleCreate}
            className="p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Create New {activeTab === 'admins' ? 'Admin' : activeTab === 'users' ? 'User' : 'Event'}
          </button>
        </div>
        <Table
          headers={currentHeaders}
          data={currentData}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          showActions={true}
        />
      </DashboardLayout>

      {/* Form Modal */}
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

export default SuperadminDashboard;
