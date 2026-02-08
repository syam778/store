import React, { useContext, useState, } from "react";
import axios from "axios";
import "./AdData.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";


const AdData = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext)

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    storeName: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${url}/api/input/verify`,
        formData
      );

      if (res.data.success) {
        setMessage("✅ User verified successfully");

        // move to dashboard / sidebar
        setTimeout(() => {
          navigate("/sidebar");
        }, 1000);
      } else {
        setMessage("❌ User data does not match");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h2>Verify User</h2>

      <form onSubmit={handleVerify} className="verify-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="storeName"
          placeholder="Store Name"
          value={formData.storeName}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {message && <p className="verify-message">{message}</p>}
    </div>
  );
};

export default AdData;
