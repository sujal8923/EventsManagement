import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import DashboardLayout from './DashboardLayout';
import Table from './Table';
import FormModal from './FormModal';
import axios from 'axios';

function AdminDashboard({ handleLogout }) {
  const [activeTab, setActiveTab] = useState('events');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentFormData, setCurrentFormData] = useState(null);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (activeTab === 'events') {
      axios.get('http://localhost:8080/admin/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => setEvents(res.data))
        .catch((err) => console.error('Error fetching events:', err));
    } else if (activeTab === 'users') {
      axios.get('http://localhost:8080/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => setUsers(res.data))
        .catch((err) => console.error('Error fetching users:', err));
    }
  }, [activeTab]);

  const eventHeaders = [
    { key: 'sno', label: 'S. No.' },
    { key: 'title', label: 'Event Name' },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' }
  ];

  const userHeaders = [
    { key: 'sno', label: 'S. No.' },
    { key: 'userName', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'actions', label: 'Actions' },
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

  const userFormFields = [
    { name: 'userName', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'role', label: 'Role', type: 'text', required: true },
  ];

  const handleCreate = () => {
    setModalType('create');
    if (activeTab === 'users') {
      setCurrentFormData({ role: 'User', userName: '', email: '', password: '' });
      setIsModalOpen(true);
    }
  };

  const handleUpdate = (data) => {
    setModalType('update');
    setCurrentFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = (idToDelete) => {
    const token = localStorage.getItem('token');
    const id = idToDelete.id;

    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'events') {
        console.log("Admin cannot delete events (read-only).");
      } else if (activeTab === 'users') {
        axios.delete(`http://localhost:8080/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => setUsers(users.filter(user => user.id !== id)))
          .catch((err) => console.error('Error deleting user:', err));
      }
    }
  };

  const handleFormSubmit = (formData) => {
    const token = localStorage.getItem('token');

    if (modalType === 'create') {
      const newId = `${activeTab.slice(0, -1)}${Date.now()}`;
      let newItem = { id: newId, ...formData };

      if (activeTab === 'events') {
        console.log("Admin cannot create events.");
      } else if (activeTab === 'users') {
        newItem = { ...newItem, role: 'User' };
        setUsers([...users, newItem]); // Frontend-only for now
      }
    } else {
      if (activeTab === 'events') {
        console.log("Admin cannot update events.");
      } else if (activeTab === 'users') {
        axios.put(`http://localhost:8080/admin/user/${formData.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            setUsers(users.map(user => user.id === formData.id ? res.data : user));
            setIsModalOpen(false);
          })
          .catch((err) => {
            console.error('Update failed:', err);
            alert('Failed to update user.');
          });
        return;
      }
    }

    setIsModalOpen(false);
  };

  let currentData = [];
  let currentHeaders = [];
  let currentFormFields = [];
  let modalTitle = "";
  let showCreateButton = false;

  if (activeTab === 'events') {
    currentData = events;
    currentHeaders = eventHeaders;
    currentFormFields = eventFormFields;
    modalTitle = modalType === 'create' ? 'Create New Event' : 'Update Event';
    showCreateButton = false;
  } else if (activeTab === 'users') {
    currentData = users;
    currentHeaders = userHeaders;
    currentFormFields = userFormFields;
    modalTitle = modalType === 'create' ? 'Create New User' : 'Update User';
    showCreateButton = true;
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
        <Table
          headers={currentHeaders}
          data={currentData}
          onUpdate={activeTab === 'users' ? handleUpdate : null}
          onDelete={activeTab === 'users' ? handleDelete : null}
          showActions={activeTab === 'users'}
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
