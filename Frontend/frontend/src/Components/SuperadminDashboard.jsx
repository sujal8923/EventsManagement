import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import DashboardLayout from './DashboardLayout';
import Table from './Table';
import FormModal from './FormModal';

function SuperadminDashboard({ handleLogout }) {
  const [activeTab, setActiveTab] = useState('admins');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [currentFormData, setCurrentFormData] = useState(null);

  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    if (activeTab === 'admins') {
      axios.get('http://localhost:8080/superadmin/admins', { headers })
        .then(res => setAdmins(res.data))
        .catch(err => console.error('Error fetching admins:', err));
    } else if (activeTab === 'users') {
      axios.get('http://localhost:8080/admin/users', { headers })
        .then(res => setUsers(res.data))
        .catch(err => console.error('Error fetching users:', err));
    } else if (activeTab === 'events') {
      axios.get('http://localhost:8080/superadmin/events', { headers })
        .then(res => setEvents(res.data))
        .catch(err => console.error('Error fetching events:', err));
    }
  }, [activeTab]);

  const handleActivateToggle = (item) => {
    const headers = { Authorization: `Bearer ${token}` };
    const url = `http://localhost:8080/admin/user/toggle/${item.id}`;

    axios.put(url, {}, { headers })
      .then(() => {
        alert(`${item.userName || item.email} has been ${item.active ? 'deactivated' : 'activated'}`);

        if (activeTab === 'admins') {
          axios.get('http://localhost:8080/superadmin/admins', { headers }).then(res => setAdmins(res.data));
        } else if (activeTab === 'users') {
          axios.get('http://localhost:8080/admin/users', { headers }).then(res => setUsers(res.data));
        }
      })
      .catch(err => {
        console.error('Toggle error:', err);
        alert('Failed to update user status.');
      });
  };

  const adminHeaders = [
    { key: 'sno', label: 'S. No.' },
    { key: 'userName', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'actions', label: 'Actions' },
  ];

  const userHeaders = [...adminHeaders];

  const eventHeaders = [
    { key: 'sno', label: 'S. No.' },
    { key: 'title', label: 'Event Name' },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' },
    { key: 'actions', label: 'Actions' },
  ];

  const adminFormFields = [
    { name: 'userName', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
    { name: 'role', label: 'Role', type: 'text', required: true, defaultValue: 'ADMIN' },
  ];

  const userFormFields = [
    { name: 'userName', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'role', label: 'Role', type: 'text', required: true, defaultValue: 'USER' }
  ];

  const eventFormFields = [
    { name: 'title', label: 'Event Name', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'imageUrl', label: 'Image URL', type: 'text', required: false }
  ];

  const handleCreate = () => {
    setModalType('create');
    if (activeTab === 'admins') {
      setCurrentFormData({ role: 'ADMIN', userName: '', email: '', password: '', confirmPassword: '' });
    } else if (activeTab === 'users') {
      setCurrentFormData({ role: 'USER', userName: '', email: '' });
    } else if (activeTab === 'events') {
      setCurrentFormData({ title: '', date: '', location: '', description: '', imageUrl: '' });
    }
    setIsModalOpen(true);
  };

  const handleUpdate = (data) => {
    setModalType('update');
    setCurrentFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = (item) => {
    const headers = { Authorization: `Bearer ${token}` };
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    if (activeTab === 'events') {
      axios.delete(`http://localhost:8080/superadmin/event/${item.id}`, { headers })
        .then(() => {
          axios.get('http://localhost:8080/superadmin/events', { headers })
            .then(res => setEvents(res.data));
        });
    }
  };

  const handleFormSubmit = (formData) => {
    const headers = { Authorization: `Bearer ${token}` };
    const { confirmPassword, ...dataToSave } = formData;

    if (modalType === 'create') {
      if (activeTab === 'admins') {
        if (formData.password !== formData.confirmPassword) return alert('Passwords do not match!');
        axios.post('http://localhost:8080/superadmin/admin', dataToSave, { headers })
          .then(() => {
            alert("Admin created successfully!");
            axios.get('http://localhost:8080/superadmin/admins', { headers }).then(res => setAdmins(res.data));
            setIsModalOpen(false);
          });
      } else if (activeTab === 'events') {
        axios.post('http://localhost:8080/superadmin/event', dataToSave, { headers })
          .then(() => {
            alert("Event created successfully!");
            axios.get('http://localhost:8080/superadmin/events', { headers }).then(res => setEvents(res.data));
            setIsModalOpen(false);
          });
      }
    } else {
      if (activeTab === 'admins') {
        axios.put(`http://localhost:8080/superadmin/admin/${dataToSave.id}`, dataToSave, { headers })
          .then(res => {
            alert("Admin updated successfully!");
            setAdmins(admins.map(admin => admin.id === res.data.id ? res.data : admin));
            setIsModalOpen(false);
          });
      } else if (activeTab === 'events') {
        axios.put(`http://localhost:8080/superadmin/event/${dataToSave.id}`, dataToSave, { headers })
          .then(res => {
            alert("Event updated successfully!");
            setEvents(events.map(event => event.id === res.data.id ? res.data : event));
            setIsModalOpen(false);
          });
      } else if (activeTab === 'users') {
        axios.put(`http://localhost:8080/admin/user/${dataToSave.id}`, dataToSave, { headers })
          .then(res => {
            alert("User updated successfully!");
            setUsers(users.map(user => user.id === res.data.id ? res.data : user));
            setIsModalOpen(false);
          });
      }
    }
  };

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
        {activeTab !== "users" && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleCreate}
              className="p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Create New {activeTab === 'admins' ? 'Admin' : activeTab === 'events' ? 'Event' : 'Item'}
            </button>
          </div>
        )}

        <Table
          headers={currentHeaders}
          data={currentData}
          onUpdate={handleUpdate}
          onDelete={activeTab === 'events' ? handleDelete : null}
          customAction={activeTab !== 'events' ? handleActivateToggle : null}
          showActions={true}
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

export default SuperadminDashboard;
