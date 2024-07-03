import React, { useEffect, useState } from "react";

const AddUserModal = ({ isOpen, onClose, onSave }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  useEffect(() => {
    if (!isOpen) {
      setUsername("");
      setEmail("");
      setPhone("");
      setProfilePicture(null);
      setImagePreview(null);
    }
  }, [isOpen]);

  const handleSave = () => {
    const newUser = {
      username,
      email,
      phone,
      profilePicture,
    };
    onSave(newUser);
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
          <div className="mb-4 flex justify-center">
            <div className="rounded-full overflow-hidden w-32 h-32">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        <h2 className="text-xl font-bold mb-4">Add User</h2>
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

export default AddUserModal;
