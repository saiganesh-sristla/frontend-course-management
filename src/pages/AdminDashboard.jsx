import Courses from "../components/admin/Courses";
import Navbar from "../components/admin/Navbar";
import Students from "../components/admin/Students";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Courses Section */}
          <Courses />
          {/* Students Section */}
          <Students />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
