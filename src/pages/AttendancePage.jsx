import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AttendancePage = () => {
  const { courseId, studentId } = useParams(); // Get courseId & studentId from URL
  const [percent, setPercent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("")
  const [courseName, setCourseName] = useState("")

  useEffect(() => {
    // Fetch existing attendance if available
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/attendance/${studentId}/${courseId}`
        );
        if (response.data.attendance) {
          setPercent(response.data.attendance.percent);
        }
      } catch (error) {
        setMessage("No existing attendance found.");
      }
      setLoading(false);
    };

    fetchAttendance();
  }, [studentId, courseId]);

  useEffect(() => {
    const fetchNames = async () => {
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`)
        const response2 = await axios.get(`http://localhost:5000/api/courses/student/${studentId}`)
        console.log(response.data)
        console.log(response2.data)
        setCourseName(response.data.title)
        setStudentName(response2.data.name)
    }

    fetchNames()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance",
        {
          student: studentId,
          course: courseId,
          percent,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }, // Ensure admin authentication
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating attendance");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Attendance</h2>
      <p className="text-gray-600 mb-2">
        <strong>Student ID:</strong> {studentName}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Course ID:</strong> {courseName}
      </p>

      {message && <p className="mb-4 text-center text-red-500">{message}</p>}

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Attendance %"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition"
          >
            Update Attendance
          </button>
        </form>
      )}
    </div>
  );
};

export default AttendancePage;
