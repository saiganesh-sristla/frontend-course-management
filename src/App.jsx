import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import useAuthStore from "./store/authStore";
import CourseDetails from "./pages/CourseDetails";
import EnrolledStudents from "./pages/EnrolledStudents";
import AddStudent from "./pages/AddStudent";
import AddCourse from "./pages/AddCourse";
import AttendancePage from "./pages/AttendancePage";

const App = () => {
  const { user, role } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                user
                  ? role === "admin"
                    ? "/admin/dashboard"
                    : "/student/dashboard"
                  : "/login"
              }
            />
          }
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/admin/dashboard"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/student/dashboard"
          element={
            role === "student" ? <StudentDashboard /> : <Navigate to="/" />
          }
        />
        <Route path="/student/course/:id" element={<CourseDetails />} />
        <Route path="/enrolled-students" element={<EnrolledStudents />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/attendance/:courseId/:studentId" element={<AttendancePage />} />
      </Routes>
    </Router>
  );
};

export default App;
