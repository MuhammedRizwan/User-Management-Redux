import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../../Redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignIn({ email, password })).then((result) => {
      if (userSignIn.fulfilled.match(result)) {
        navigate("/home");
      }
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6 p-2 rounded">
          Login
        </h1>
        {errorMessage ? (
          <div className="flex justify-center mt-4">
            <span className="text-red-500 text-center">{errorMessage}</span>
          </div>
        ) : null}
        <form action="" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-gray-300 text-sm">
          <p>
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="text-blue-400 hover:text-blue-600 cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
