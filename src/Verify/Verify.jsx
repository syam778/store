/*import React, { useState, useContext } from "react";  //main code im
import axios from "axios";
import "./Verify.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const Verify = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

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
        `${url}/api/store/verify`,
        formData
      );

      if (res.data.success) {
        setMessage("✅ User verified successfully");

        // move to dashboard / sidebar
        setTimeout(() => {
          navigate("/add");
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

export default Verify; //old code main
*

import React, { useState, useContext } from "react"; //new code main
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import "./Verify.css"; // reuse your colorful CSS

const Verify = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    username: "",
    storeId: "",
    gmail: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${url}/api/store/quick-verify`, formData);

      if (res.data.success) {
        setMessage(res.data.message);

        // Auto redirect to /add after 1s
        setTimeout(() => {
          navigate("/add");
        }, 1000);
      } else {
        setMessage(res.data.message || "❌ Store not found");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h2>Quick Store Verify</h2>

      <form onSubmit={handleVerify} className="verify-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="storeId"
          placeholder="Store ID"
          value={formData.storeId}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="gmail"
          placeholder="Gmail"
          value={formData.gmail}
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

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {message && <p className="verify-message">{message}</p>}
    </div>
  );
};

export default Verify;
*/

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import "./Verify.css";

const Verify = () => {
  const navigate = useNavigate();
  const { url,doneAudio,submitAudio,wonAudio,addAudio,timeAudio,} = useContext(StoreContext);

  const [formData, setFormData] = useState({
    username: "",
    storeId: "",
    gmail: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    submitAudio.play()

    try {
      const res = await axios.post(`${url}/api/store/quick-verify`, formData);

      if (res.data.success) {
        setMessage(res.data.message);

        // ✅ Navigate to /add and pass store data via state
        setTimeout(() => {
          navigate("/add", { state: { store: res.data.data } });
        }, 1000);

      } else {
        setMessage(res.data.message || "❌ Store not found");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h2>Quick Store Verify</h2>

      <form onSubmit={handleVerify} className="verify-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="storeId"
          placeholder="Store ID"
          value={formData.storeId}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="gmail"
          placeholder="Gmail"
          value={formData.gmail}
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

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {message && <p className="verify-message">{message}</p>}
    </div>
  );
};

export default Verify;
