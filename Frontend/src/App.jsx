import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/user/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import SignUp from "./pages/user/Signup";
import Home from "./pages/user/Home";
import EditUser from "./pages/admin/EditUser";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./component/protectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
