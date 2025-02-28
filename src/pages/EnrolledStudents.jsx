import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/admin/Navbar";

const EnrolledStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/enrollment/all-enrollments");
        const studentsData = await Promise.all(
          response.data.map(async (student) => {
            const studentDetails = await axios.get(`http://localhost:5000/api/courses/student/${student.student}`);
            return { ...student, studentName: studentDetails.data.name };
          })
        );
        setStudents(studentsData);
      } catch (err) {
        setError("Failed to fetch enrolled students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <p className="text-center text-lg font-semibold text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white text-center">Enrolled Students</h2>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm md:text-base font-semibold">
                  <th className="px-4 py-3 text-left">Student Name</th>
                  <th className="px-4 py-3 text-left">Course Title</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                  <th className="px-4 py-3 text-left">Fees</th>
                  <th className="px-4 py-3 text-left">Payment Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b bg-white hover:bg-gray-100 text-sm md:text-base">
                    <td className="px-4 py-3 text-gray-800">{student.studentName}</td>
                    <td className="px-4 py-3 text-gray-600">{student.course?.title}</td>
                    <td className="px-4 py-3 text-gray-600">{student.course?.duration}</td>
                    <td className="px-4 py-3 text-gray-600">₹{student.course?.price}</td>
                    <td className="px-4 py-3 text-gray-600 font-semibold">{student?.paymentStatus}</td>
                    <td className="px-4 py-3 flex justify-center space-x-2">
                      <Link 
                        to={`/attendance/${student.course._id}/${student.student}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium transition-all duration-200 hover:bg-blue-600 transform hover:-translate-y-1 hover:shadow-md"
                      >
                        View Attendance
                      </Link>
                      <button
                        onClick={async () => {
                          const response = await axios.get(
                            `http://localhost:5000/api/certificates/generate/${student.course._id}/${student.student}`
                          );
                          if (response.data) {
                            console.log(response.data);
                          }
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium transition-all duration-200 hover:bg-green-600 transform hover:-translate-y-1 hover:shadow-md"
                      >
                        Generate Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {students.length === 0 && (
              <p className="text-center text-gray-500 font-medium py-8">No enrolled students found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolledStudents;