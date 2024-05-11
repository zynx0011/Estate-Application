import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../Config/config";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/admin/get-all-users`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        {users.map((user) => (
          <div className="flex items-center  font-bold p-2 " key={user._id}>
            <h1 className="bg-slate-500 text-white min-w-[30%] p-4">
              {user.username}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
