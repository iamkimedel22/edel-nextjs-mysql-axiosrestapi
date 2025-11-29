"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Axios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-3">User List (Axios)</h2>
      {loading ? (
        <div className="text-sm text-gray-500">Loading...</div>
      ) : users.length === 0 ? (
        <div className="text-sm text-gray-500">No users found.</div>
      ) : (
        <ul className="divide-y divide-gray-100 bg-white shadow-sm rounded-md">
          {users.map((u) => (
            <li key={u.id} className="p-3 flex justify-between">
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-sm text-gray-500">{u.email}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Axios;
