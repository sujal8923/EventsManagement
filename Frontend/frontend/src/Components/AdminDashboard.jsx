import React, { useState } from 'react';
import Navbar from './Navbar';
import DashboardLayout from './DashboardLayout';
import Table from './Table';
import FormModal from './FormModal';

function AdminDashboard({ handleLogout }) {
  const [activeTab, setActiveTab] = useState('events'); // 'events', 'users'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentFormData, setCurrentFormData] = useState(null);

  // Dummy Data for Events
  const [events, setEvents] = useState([
    { id: 'event1', name: 'Community Cleanup', date: '2025-07-20', location: 'Central Park', status: 'Upcoming' },
    { id: 'event2', name: 'Charity Run', date: '2025-08-10', location: 'City Stadium', status: 'Upcoming' },
  ]);

  // Dummy Data for Users (Updated to use username)
  const [users, setUsers] = useState([
    { id: 'userA', username: 'charlie.user' },
    { id: 'userB', username: 'diana.user' },
    { id: 'userC', username: 'eve.user' },
    { id: 'userD', username: 'frank.user' },
  ]);

  // Table Headers
  const eventHeaders = [
    { key: 'sno', label: 'S. No.' },
    { key: 'name', label: 'Event Name' },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },
    // Actions column explicitly removed for events (read-only for admin)
  ];

  // User Headers (Actions column RE-ADDED for users)
  const userHeaders = [
    { key: 'sno', label: 'S. No.' },
    { key: 'username', label: 'Username' },
    { key: 'actions', label: 'Actions' }, // Actions column re-added for users
  ];

  // Form field definitions
  const eventFormFields = [
    { name: 'name', label: 'Event Name', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'status', label: 'Status', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'imageUrl', label: 'Image URL', type: 'text', required: false },
    { name: 'timings', label: 'Timings', type: 'text', required: false },
  ];

  // User form fields (only username, as password is handled by signup)
  const userFormFields = [
    { name: 'username', label: 'Username', type: 'text', required: true },
  ];

  // Handlers for opening modals
  const handleCreate = () => {
    setModalType('create');
    if (activeTab === 'users') {
      setCurrentFormData({ role: 'User', username: '' }); // Default role for new user
      setIsModalOpen(true);
    }
    // Admins cannot create events, so no 'else if (activeTab === 'events')' here
  };

  const handleUpdate = (data) => {
    setModalType('update');
    setCurrentFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = (idToDelete) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'events') {
        // Admins cannot delete events (read-only)
        console.log("Admin cannot delete events (read-only).");
      } else if (activeTab === 'users') {
        // Admins CAN delete users
        setUsers(users.filter(user => user.id !== idToDelete));
      }
    }
  };

  // Handler for form submission from modal
  const handleFormSubmit = (formData) => {
    if (modalType === 'create') {
      const newId = `${activeTab.slice(0, -1)}${Date.now()}`;
      let newItem = { id: newId, ...formData };

      if (activeTab === 'events') {
        // Admins cannot create events
        console.log("Admin cannot create events.");
      } else if (activeTab === 'users') {
        newItem = { ...newItem, role: 'User' }; // Implicitly set role for new user
        setUsers([...users, newItem]);
      }
    } else { // modalType === 'update'
      if (activeTab === 'events') {
        // Admins cannot update events
        console.log("Admin cannot update events.");
      } else if (activeTab === 'users') {
        // Admins CAN update users
        setUsers(users.map(user => user.id === formData.id ? { ...formData, role: 'User' } : user));
      }
    }
    setIsModalOpen(false);
  };

  // Determine which data and headers to display based on activeTab
  let currentData = [];
  let currentHeaders = [];
  let currentFormFields = [];
  let modalTitle = "";
  let showCreateButton = false; // Control visibility of create button

  if (activeTab === 'events') {
    currentData = events;
    currentHeaders = eventHeaders;
    currentFormFields = eventFormFields; // Form fields are still defined for consistency, even if not used for creation
    modalTitle = modalType === 'create' ? 'Create New Event' : 'Update Event';
    showCreateButton = false; // Admins CANNOT create events
  } else if (activeTab === 'users') {
    currentData = users;
    currentHeaders = userHeaders;
    currentFormFields = userFormFields;
    modalTitle = modalType === 'create' ? 'Create New User' : 'Update User';
    showCreateButton = true; // Admins CAN create users
  }

  const tabs = [
    { id: 'events', label: 'Events' },
    { id: 'users', label: 'Users' },
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
        {/* Conditionally render Create button based on activeTab */}
        {showCreateButton && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleCreate}
              className="p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Create New {activeTab === 'events' ? 'Event' : 'User'}
            </button>
          </div>
        )}
        <Table
          headers={currentHeaders}
          data={currentData}
          // Pass onUpdate/onDelete only if activeTab is 'users'
          onUpdate={activeTab === 'users' ? handleUpdate : null}
          onDelete={activeTab === 'users' ? handleDelete : null}
          // showActions controls the column visibility; buttons are controlled by onUpdate/onDelete
          showActions={activeTab === 'users'} // Show actions column ONLY for users tab
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
