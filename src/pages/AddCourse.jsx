import { useState } from "react";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const { token } = useAuthStore();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post("https://backend-ruby-five-72.vercel.app/api/courses/add", course, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course added successfully");
      setCourse({ title: "", description: "", duration: "", price: "" });
    } catch (err) {
      setError("Failed to add course");
      console.error("Error adding course", err);
    } finally {
      setLoading(false);
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Course</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="text"
          name="duration"
          value={course.duration}
          onChange={handleChange}
          placeholder="Duration (e.g., 4 weeks)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={course.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
