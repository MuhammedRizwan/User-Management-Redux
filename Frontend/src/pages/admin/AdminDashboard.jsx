import axios from "axios";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../Redux/adminSlice";
import EditUserModal from "./EditUser";
import AddUserModal from "./AddUser";

const AdminDashboard = () => {
  const API = "http://localhost:3005";
  const { admin, userData, loading, error } = useSelector(
    (state) => state.admin
  );
  const [currentView, setCurrentView] = useState("dashboard");
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [slectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const fetchData = async (dispatch) => {
    try {
      const response = await axios.get(`${API}/admin/fetchUserData`);
      dispatch(setUserData(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };
  const handleEditUser = async (updatedUser) => {
    try {
      const { username, email, phone, profilePicture } = updatedUser;
      const response = await axios.post(
        `${API}/admin/updateUser/${updatedUser._id}`,
        { username, email, phone, file: profilePicture },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchData(dispatch);
      setEditModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteUser = async (Id) => {
    const response = await axios.delete(`${API}/admin/deleteUser/${Id}`);
    fetchData(dispatch);
  };
  const handleAddClick=()=>{
      setAddModal(true)
  }
  const handleAddUser = async (userData) => {
    const{username,email,phone,profilePicture}=userData
    const response = await axios.post(`${API}/admin/addUser`,{username,email,phone,file:profilePicture},{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
    console.log(response.data)
    fetchData(dispatch);
    setAddModal(false)
  };
  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    switch (currentView) {
      case "users":
        return (
          <div className="bg-gray-800 rounded-lg p-6">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">User List</h2>
              <button
                onClick={handleAddClick}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
              >
                Add User
              </button>
            </div>
            <table className="min-w-full bg-gray-700">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-600">
                    profile
                  </th>
                  <th className="py-2 px-4 border-b border-gray-600">Name</th>
                  <th className="py-2 px-4 border-b border-gray-600">Email</th>
                  <th className="py-2 px-4 border-b border-gray-600">phone</th>
                  <th className="py-2 px-4 border-b border-gray-600">Update</th>
                  <th className="py-2 px-4 border-b border-gray-600">Delete</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((u) => (
                  <tr key={u._id}>
                    <td className="py-2 px-4 text-center border-b border-gray-600">
                      <img
                        src={`${API}`+`${u.profilePicture}`}
                        alt={`${u.username}'s profile`}
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    </td>
                    <td className="py-2 px-4 text-center border-b border-gray-600">
                      {u.username}
                    </td>
                    <td className="py-2 px-4 text-center border-b border-gray-600">
                      {u.email}
                    </td>
                    <td className="py-2 px-4 text-center border-b border-gray-600">
                      {u.phone}
                    </td>
                    <td className="py-2 px-4 text-center border-b border-gray-600">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                        onClick={() => {
                          handleEditClick(u);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-2 px-4 text-center border-b border-gray-600">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        onClick={() => {
                          handleDeleteUser(u._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return (
          <div>
            <img
              src={admin.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold mb-2 text-center">
              {admin.username}
            </h3>
            <p className="text-gray-300 text-center">{admin.email}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setCurrentView("dashboard")}
                className="block py-2 px-4 rounded-lg hover:bg-gray-700 w-full text-left"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView("users")}
                className="block py-2 px-4 rounded-lg hover:bg-gray-700 w-full text-left"
              >
                Users
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>
        {renderContent()}
      </main>

      <EditUserModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        user={slectedUser}
        onSave={handleEditUser}
      />
      <AddUserModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        onSave={handleAddUser}
      />
    </div>
  );
};

export default AdminDashboard;
