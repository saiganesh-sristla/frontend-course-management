import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { user, token, logout } = useAuthStore();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const enrolledRes = await axios.get("http://localhost:5000/api/enrollment/my-courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const availableRes = await axios.get("http://localhost:5000/api/courses/available", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(enrolledRes.data);
        setEnrolledCourses(enrolledRes.data);
        setAvailableCourses(availableRes.data);
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  const enrollInCourse = async () => {
    if (!selectedCourse) return;
    setEnrolling(true);
    try {
      await axios.post(
        "http://localhost:5000/api/enrollment/enroll",
        { courseId: selectedCourse._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(enrolledCourses, {...selectedCourse, course:selectedCourse})
      // Move the enrolled course to the enrolled section
      setEnrolledCourses([...enrolledCourses, {...selectedCourse, course:selectedCourse}]);
      setAvailableCourses(availableCourses.filter(course => course._id !== selectedCourse._id));
      setSelectedCourse(null);
    } catch (err) {
      console.error("Error enrolling in course", err);
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8 font-sans">
    <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-blue-600 to-purple-700 p-6 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-100">
        Welcome, {user?.name}
      </h1>
      <button 
        className="px-6 py-3 bg-white/20 backdrop-blur-lg text-white rounded-xl hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
        onClick={logout}
      >
        Logout
      </button>
    </div>

    {/* Enrolled Courses Section */}
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Enrolled Courses
      </h2>
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 py-6 bg-gray-200 rounded-lg"></div>
        </div>
      ) : enrolledCourses.length === 0 ? (
        <p className="text-gray-600 italic">No courses enrolled yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div 
              key={course._id} 
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{course.course?.title}</h3>
              <p className="text-gray-600 mb-4">{course.course?.description}</p>
              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors duration-200 shadow-md"
                onClick={() => navigate(`/student/course/${course.course._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </section>

    {/* Available Courses Section */}
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
        Available Courses
      </h2>
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 py-6 bg-gray-200 rounded-lg"></div>
        </div>
      ) : availableCourses.length === 0 ? (
        <p className="text-gray-600 italic">All courses are enrolled.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <div 
              key={course._id} 
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <button
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors duration-200 shadow-md"
                onClick={() => setSelectedCourse(course)}
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}
    </section>

    {/* Enrollment Confirmation Modal */}
    {selectedCourse && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scale-in">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Enrollment</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to enroll in <strong className="text-blue-600">{selectedCourse.title}</strong>?
          </p>
          
          <div className="flex justify-end gap-4">
            <button
              className="px-5 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setSelectedCourse(null)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md disabled:opacity-50"
              onClick={enrollInCourse}
              disabled={enrolling}
            >
              {enrolling ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Enrolling...
                </span>
              ) : "Confirm Enrollment"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Courses;
