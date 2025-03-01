import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const { user, role, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">Co-curriculam Course Management</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to={"/enrolled-students"}
                    className="text-gray-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Enrolled Students
                  </Link>
                  <Link
                    to={role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                    className="text-gray-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout} 
                    className="bg-gradient-to-r from-rose-500 to-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-rose-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login1"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-600 shadow-inner">
            {user ? (
              <>
                <Link
                  to={"/enrolled-students"}
                  className="text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enrolled Students
                </Link>
                <Link
                  to={role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                  className="text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left bg-gradient-to-r from-rose-500 to-red-600 text-white px-3 py-2 rounded-md text-base font-medium hover:from-rose-600 hover:to-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:from-emerald-600 hover:to-teal-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;