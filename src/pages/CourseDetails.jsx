import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { motion } from "framer-motion";

const CourseDetails = () => {
  const { id } = useParams();
  const { token } = useAuthStore();
  const [course, setCourse] = useState(null);
  const [attendance, setAttendance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(res.data);

        const attendanceRes = await axios.get(
          `http://localhost:5000/api/attendance/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAttendance(attendanceRes.data.attendance.percent);
      } catch (err) {
        console.error("Error fetching course details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, token]);

  const handleDownloadCertificate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/certificates/download/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Ensure we get the file as a Blob
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Certificate_${course?.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("certificate not generated yet")
      console.error("Error downloading certificate", error);
    }
  };

  if (loading) return <p className="text-center text-xl font-semibold mt-6">Loading...</p>;
  if (!course) return <p className="text-center text-red-500 text-xl font-semibold mt-6">Course not found.</p>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 flex items-center justify-center p-6"
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-lg text-gray-700 mt-2 leading-relaxed">{course.description}</p>
        <p className="mt-2 font-semibold text-gray-800">Instructor: {course.instructor}</p>
        <p className="text-gray-600">Duration: {course.duration}</p>

        {/* Attendance Tracking */}
        <h2 className="text-2xl font-semibold mt-6 text-gray-900">Attendance</h2>
        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${attendance}%` }} 
            transition={{ duration: 0.8 }}
            className="h-full bg-blue-500 rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">{attendance}% Attendance</p>

        {/* Certificate Download */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <button
            onClick={handleDownloadCertificate}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Download Certificate
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseDetails;
