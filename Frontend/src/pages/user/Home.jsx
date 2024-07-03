import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchUserData} from "../../Redux/userSlice";

const UserProfile = () => {
  const { user, errorMessage, error, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
    const userId = localStorage.getItem("userId");
    dispatch(fetchUserData(userId));
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white">
        <div className="flex justify-center">
          {user.profilePicture ? (
            <img
              src={`http://localhost:3005${user.profilePicture}`}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 mb-4">
              No Image
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-center text-blue-400 mb-6">
          Welcome, {user.username}!
        </h1>
        <div className="text-center mb-4">
          <p className="text-gray-300">Email: {user.email}</p>
          <p className="text-gray-300">Phone: {user.phone}</p>
        </div>
        <div className="flex justify-center">
          <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
