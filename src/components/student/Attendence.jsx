import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import axios from "axios";

const Attendance = () => {
  const { user, token, logout } = useAuthStore();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          "https://backend-ruby-five-72.vercel.app/api/attendance/my-attendance",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAttendance(res.data);
      } catch (err) {
        console.error("Error fetching attendance", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [token]);

  const markAttendance = async (courseId) => {
    try {
      await axios.post(
        "https://backend-ruby-five-72.vercel.app/api/attendance/mark",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Attendance marked!");
    } catch (err) {
      console.error("Error marking attendance", err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4">Attendance Records</h2>
      {loading ? (
        <p>Loading attendance...</p>
      ) : attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <ul className="list-disc pl-5">
          {attendance.map((record) => (
            <li key={record._id}>
              <strong>{record.course.title}</strong>: {record.dates.length}{" "}
              sessions attended
              <button
                className="ml-4 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => markAttendance(record.course._id)}
              >
                Mark Today’s Attendance
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Attendance;
