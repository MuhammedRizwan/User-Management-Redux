import React, { useState, useEffect } from "react";

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setPhone(user.phone);
      setImagePreview(user.profilePicture); // Initialize preview with existing image
    }
  }, [user]);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      username,
      email,
      phone,
      profilePicture,
    };
    onSave(updatedUser);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfilePicture(selectedFile);

    // Image preview handling
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 max-w-full">
        {/* Upper part with profile picture */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative rounded-full overflow-hidden w-32 h-32">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-500 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3.889 6.11a8 8 0 1112.222 7.78 8 8 0 01-12.222-7.78zM2 10a7 7 0 1114 0A7 7 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
        {/* Form for editing user details */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
