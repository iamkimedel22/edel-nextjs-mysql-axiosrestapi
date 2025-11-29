"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RestApiCrud = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage({ type: "error", text: "Failed to load users." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", email: "" });
    setEditingId(null);
  };

  const addUser = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setMessage({ type: "error", text: "Name and email are required." });
      return;
    }
    if (!validateEmail(form.email)) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/users", form);
      setMessage({ type: "success", text: "User added." });
      resetForm();
      await loadUsers();
    } catch (err) {
      console.error("Error adding user:", err);
      setMessage({ type: "error", text: "Failed to add user." });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setMessage({ type: "error", text: "Name and email are required." });
      return;
    }
    if (!validateEmail(form.email)) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }
    setLoading(true);
    try {
      await axios.put(`/api/users/${editingId}`, form);
      setMessage({ type: "success", text: "User updated." });
      resetForm();
      await loadUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      setMessage({ type: "error", text: "Failed to update user." });
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/users/${id}`);
      setMessage({ type: "success", text: "User deleted." });
      await loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setMessage({ type: "error", text: "Failed to delete user." });
    } finally {
      setLoading(false);
    }
  };

  const editUser = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditingId(user.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Users (REST CRUD)</h2>
        <p className="text-sm text-gray-600">Add, edit, or remove users from the database.</p>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-200 p-2"
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              type="email"
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-200 p-2"
            />
          </div>
          <div className="md:col-span-1 flex space-x-2">
            <button
              onClick={editingId ? updateUser : addUser}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
            >
              {editingId ? "Update User" : "Add User"}
            </button>
            <button
              onClick={resetForm}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium">User List</h3>
          <div className="text-sm text-gray-500">{loading ? "Loading..." : `${users.length} user(s)`}</div>
        </div>

        <ul className="divide-y divide-gray-100">
          {users.map((u) => (
            <li key={u.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => editUser(u)}
                  className="text-sm px-3 py-1 rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-sm px-3 py-1 rounded-md border border-red-400 text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {!loading && users.length === 0 && (
            <li className="py-6 text-center text-sm text-gray-500">No users found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RestApiCrud;
