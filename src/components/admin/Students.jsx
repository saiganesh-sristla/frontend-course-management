import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";

const Students = () => {
  const { user, token, logout } = useAuthStore();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resStudents = await axios.get("http://localhost:5000/api/courses/all-students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(resStudents.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [token]);

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/delete/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(students.filter(student => student._id !== id));
      alert("Student deleted successfully");
    } catch (err) {
      console.error("Error deleting student", err);
      alert("Failed to delete student");
    }
  };
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white tracking-wide">Students Management</h2>
          </div>
          
          <div className="p-6">
            <button
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium mb-6 transition-all duration-200 hover:from-emerald-600 hover:to-teal-600 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
              onClick={() => navigate("/admin/add-student")}
            >
              <FaPlus className="mr-2" /> Add Student
            </button>
            
            {students.length === 0 ? (
              <div className="text-center py-8 text-gray-500 font-medium">
                No students enrolled yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((student) => (
                  <div 
                    key={student._id} 
                    className="border border-gray-300 rounded-lg p-5 transition-all duration-200 hover:shadow-lg bg-white flex flex-col justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{student.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">Email: {student.email}</p>
                    </div>
                    <button
                      className="mt-4 px-4 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-xl font-medium transition-all duration-200 hover:from-rose-600 hover:to-red-600 transform hover:-translate-y-1 hover:shadow-lg flex items-center"
                      onClick={() => handleDeleteStudent(student._id)}
                    >
                      <FaTrash className="mr-2" /> Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
