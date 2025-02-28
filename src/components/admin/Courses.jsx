import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCourses = await axios.get(
          "http://localhost:5000/api/courses/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourses(resCourses.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(courses.filter((course) => course._id !== id));
      alert("Course deleted successfully");
    } catch (err) {
      console.error("Error deleting course", err);
      alert("Failed to delete course");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white tracking-wide">Courses</h2>
            <button
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium transition-all duration-200 hover:from-emerald-600 hover:to-teal-600 transform hover:-translate-y-1 hover:shadow-md flex items-center"
              onClick={() => navigate("/admin/add-course")}
            >
              <FaPlus className="mr-2" /> Add Course
            </button>
          </div>

          <div className="p-6">
            {courses.length === 0 ? (
              <div className="text-center py-10 text-gray-500 font-medium text-lg">
                No courses available yet.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="border border-gray-200 rounded-lg p-5 bg-white shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                    </div>
                    <button
                      className="mt-4 px-3 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-lg font-medium transition-all duration-200 hover:from-rose-600 hover:to-red-600 transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center"
                      onClick={() => handleDelete(course._id)}
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

export default Courses;