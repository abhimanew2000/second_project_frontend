import React, { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import { AdminSidebar } from "./AdminSidebar";
import { useSelector } from "react-redux";
import { baseUrl } from "../../Utils/urls";
export const UserDetails = () => {
  const adminToken = useSelector((state) => state.admin.token);

  const [users, setUsers] = useState([]);
  const [refetch,setRefetch]=useState(false)

  useEffect(() => {
    axios
      .get(`${baseUrl}customadmin/user-list/`, 
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }

        ) // Update the URL
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [refetch]);
  



  const handleToggleUser = (userId, isActive) => {
    const action = isActive ? "block" : "unblock";
    const path = `${baseUrl}customadmin/admin/user/${userId}/${action}/`;
  
    axios
      .put(path, {})
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, is_active: !isActive } : user
          )
        );
        console.log(response.data);
        setRefetch(!refetch);
      })
      .catch((error) => {
        console.error(`Error ${action}ing user:`, error);
      });
  };
  return (
    <>
    <div className="flex">
    <AdminSidebar/>
    <div className="container   mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">User Details Page</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-2">
                Name
              </th>
              <th scope="col" className="px-3 py-2">
                Email
              </th>
              <th scope="col" className="px-3 py-2">
                Is Active
              </th>
              <th scope="col" className="px-3 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="odd:bg-white bg-gray-100 even:bg-gray-50 border-b dark:border-gray-700"
              >
                <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                  {user.name}
                </td>
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">{String(user.is_active)}</td>
                <td className="px-3 py-2">
                <button
                  onClick={() => handleToggleUser(user.id, user.is_active)}
                  className={`${
                    user.is_active ? "bg-red-500" : "bg-green-500"
                  } text-white px-2 py-1 rounded`}
                >
                  {user.is_active ? "Block" : "Unblock"}
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </div>
    </>
  );
};
