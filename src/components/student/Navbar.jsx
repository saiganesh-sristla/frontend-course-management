import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const { user, role, logout } = useAuthStore();

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Course Management</h1>
      <div className="flex space-x-4">
        {user ? (
          <>
            <Link
              to={"/enrolled-students"}
            >
              Enrolled courses
            </Link>
            <Link
              to={role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
            >
              Dashboard
            </Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
