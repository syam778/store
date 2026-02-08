/*import React, { useState, useContext } from "react"; //main code core old version
import axios from "axios";
import "./input.css";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const navigate = useNavigate();
  const { url, doneAudio, wonAudio } = useContext(StoreContext);

  const [data, setData] = useState({
    storeName: "",
    fullName: "",
    email: "",
    city: "",
    linkdata: "",
    pincode: "", // ✅ renamed from zipcode
    address: "",
    street: "",
    phone: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Call verifyUser API instead of create
       const res = await axios.post(`${url}/api/input/verify`, {    ///api/store/verify      /api/input/verify
         email: data.email,
         phone: data.phone,
         storeName: data.storeName,
       });

      


      if (!res.data.success) {
        alert("User data not matched ❌");
        return;
      }

      // ✅ Match found
      alert("User verified successfully ✅");
      wonAudio.play();

      // ✅ Navigate to next page
      navigate("/verify", {
        state: {
          userId: res.data.userId,
          email: res.data.email,
          phone: res.data.phone,
        },
      });

      // ✅ Clear form
      setData({
        storeName: "",
        fullName: "",
        email: "",
        city: "",
        linkdata: "",
        pincode: "",
        address: "",
        street: "",
        phone: "",
        age: "",
        gender: "",
      });

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "User data not matched ❌"
      );
      doneAudio.play();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      <input
        name="fullName"
        placeholder="Full Name"
        value={data.fullName}
        onChange={handleChange}
      />
      <input
        name="storeName"
        placeholder="Delivery ID Name"
        value={data.storeName}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="City"
        value={data.city}
        onChange={handleChange}
      />
      <input
        name="linkdata"
        placeholder="Website / Link"
        value={data.linkdata}
        onChange={handleChange}
      />
      <input
        name="pincode"
        placeholder="Pincode"
        value={data.pincode}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        value={data.address}
        onChange={handleChange}
      />
      <input
        name="street"
        placeholder="Street"
        value={data.street}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={data.phone}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="Age"
        value={data.age}
        onChange={handleChange}
      />

      <select name="gender" value={data.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Input;
*



import { useState } from "react";
import axios from "axios";
import "./Input.css";

const Input = () => {
  const [formData, setFormData] = useState({
    username: "",
    storeName: "",
    storeId: "",
    gmail: "",
    phone: "",
    age: "",
    city: "",
    address: "",
    street: "",
    pincode: "",
    linkdata: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Inline API call
  const createStoreData = async (data) => {
    return axios.post("http://localhost:3000/api/homestore/create", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await createStoreData(formData);
      setMessage(res.data.message || "Store created successfully");

      setFormData({
        username: "",
        storeName: "",
        storeId: "",
        gmail: "",
        phone: "",
        age: "",
        city: "",
        address: "",
        street: "",
        pincode: "",
        linkdata: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Store creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create Store</h2>

      <form onSubmit={handleSubmit} className="form">
        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input name="storeName" placeholder="Store Name" value={formData.storeName} onChange={handleChange} required />
        <input name="storeId" placeholder="Store ID" value={formData.storeId} onChange={handleChange} required />
        <input type="email" name="gmail" placeholder="Gmail" value={formData.gmail} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Store"}
        </button>
      </form>

      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default Input;
*

import { useState, } from "react"; //main
import axios from "axios";
import "./Input.css";

const API_BASE = "http://localhost:3000";

const Input = () => {
//const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    storeName: "",
    storeId: "",
    gmail: "",
    phone: "",
    age: "",
    city: "",
    address: "",
    street: "",
    pincode: "",
    linkdata: "",
  });

  const [storeData, setStoreData] = useState(null); // store returned from backend
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Create Store
  const handleCreateStore = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE}/api/homestore/create`, formData);
      setStoreData(res.data.data); // save store info
      setMessage("Store created successfully! Your data is not verified yet.");
      

      // optionally reset form
      setFormData({
        username: "",
        storeName: "",
        storeId: "",
        gmail: "",
        phone: "",
        age: "",
        city: "",
        address: "",
        street: "",
        pincode: "",
        linkdata: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Store creation failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Store
  const handleVerifyStore = async () => {
    if (!storeData) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE}/api/store/verify`, {
        username: storeData.username,
        storeId: storeData.storeId,
        gmail: storeData.gmail,
        phone: storeData.phone,
        address: storeData.address,
        street: storeData.street,
        pincode: storeData.pincode,
      });

      setStoreData(res.data.data); // update store info with verification
      setMessage("✅ Your data verified successfully! Welcome to Speed-Del.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="store-manager-container">
      <h2>Store Manager</h2>

      {!storeData || storeData.status !== "verified" ? (
        <form onSubmit={handleCreateStore} className="store-form">
          <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input name="storeName" placeholder="Store Name" value={formData.storeName} onChange={handleChange} required />
          <input name="storeId" placeholder="Store ID" value={formData.storeId} onChange={handleChange} required />
          <input type="email" name="gmail" placeholder="Gmail" value={formData.gmail} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
          <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Store"}
          </button>
        </form>
      ) : null}

      {storeData && (
        <div className={`store-info ${storeData.status === "verified" ? "verified" : "not-verified"}`}>
          <h3>Store Info</h3>
          <p><strong>Username:</strong> {storeData.username}</p>
          <p><strong>Store Name:</strong> {storeData.storeName}</p>
          <p><strong>Store ID:</strong> {storeData.storeId}</p>
          <p><strong>Status:</strong> {storeData.status || "Not Verified"}</p>

          {storeData.status !== "verified" && (
            <button onClick={handleVerifyStore} disabled={loading}>
              {loading ? "Verifying..." : "Verify Your Store"}
            </button>
          )}
        </div>
      )}

      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default Input;
*

import { useState } from "react"; // main but try code
import axios from "axios";
import "./Input.css";

const API_BASE = "http://localhost:3000";

const Input = () => {
  const [formData, setFormData] = useState({
    username: "",
    storeName: "",
    storeId: "",
    gmail: "",
    phone: "",
    age: "",
    city: "",
    address: "",
    street: "",
    pincode: "",
    linkdata: "",
  });

  const [storeData, setStoreData] = useState(null); // store returned from backend
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create store
  const handleCreateStore = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Logic 1: Check if all fields filled
    const allFieldsFilled = Object.values(formData).every((val) => val !== "");
    if (!allFieldsFilled) {
      setMessage("⚠️ Please enter all data.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/homestore/create`, formData);
      setStoreData(res.data.data); // save store info
      setMessage("ℹ️ Your data is submitted but not verified yet.");
      setFormData({
        username: "",
        storeName: "",
        storeId: "",
        gmail: "",
        phone: "",
        age: "",
        city: "",
        address: "",
        street: "",
        pincode: "",
        linkdata: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Store creation failed");
    } finally {
      setLoading(false);
    }
  };

  // Verify store
  const handleVerifyStore = async () => {
    if (!storeData) {
      setMessage("⚠️ Please submit your data first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE}/api/store/verify`, {
        username: storeData.username,
        storeId: storeData.storeId,
        gmail: storeData.gmail,
        phone: storeData.phone,
        address: storeData.address,
        street: storeData.street,
        pincode: storeData.pincode,
      });

      setStoreData(res.data.data); // update store info with verification
      setMessage(`✅ Welcome ${res.data.data.username}! Your store is verified.`);
    } catch (err) {
      setMessage(err.response?.data?.message || "Your data is not verified yet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="store-manager-container">
      <h2>Store Manager</h2>

      
      {!storeData || storeData.status !== "verified" ? (
        <form onSubmit={handleCreateStore} className="store-form">
          <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <input name="storeName" placeholder="Store Name" value={formData.storeName} onChange={handleChange} />
          <input name="storeId" placeholder="Store ID" value={formData.storeId} onChange={handleChange} />
          <input type="email" name="gmail" placeholder="Gmail" value={formData.gmail} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
          <input name="linkdata" placeholder="Map Link Data Add" value={formData.linkdata} onChange={handleChange} />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Store Data"}
          </button>
        </form>
      ) : null}

      
      {storeData && (
        <div className={`store-info ${storeData.status === "verified" ? "verified" : "not-verified"}`}>
          <h3>Store Info</h3>
          <p><strong>Username:</strong> {storeData.username}</p>
          <p><strong>Store Name:</strong> {storeData.storeName}</p>
          <p><strong>Store ID:</strong> {storeData.storeId}</p>
          <p>
            <strong>Status:</strong>{" "}
            {storeData.status === "verified" ? "✅ Verified" : "❌ Not Verified"}
          </p>

          {storeData.status !== "verified" && (
            <button onClick={handleVerifyStore} disabled={loading}>
              {loading ? "Verifying..." : "Verify Your Store"}
            </button>
          )}
        </div>
      )}

      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default Input;

*

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Input.css";

const API_BASE = "http://localhost:3000";

const Input = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    storeName: "",
    storeId: "",
    gmail: "",
    phone: "",
    age: "",
    city: "",
    address: "",
    street: "",
    pincode: "",
    linkdata: "",
  });

  const [storeData, setStoreData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user already exists on mount
  useEffect(() => {
    const checkExistingUser = async () => {
      if (!formData.username && !formData.gmail) return;

      try {
        const res = await axios.post(`${API_BASE}/api/store/check`, {
          username: formData.username,
          gmail: formData.gmail,
        });

        if (res.data.data?.status === "verified") {
          navigate("/verify"); // already verified → go next page
        } else if (res.data.data) {
          setStoreData(res.data.data); // exists but not verified
        }
      } catch (err) {
        console.log("User check error", err);
      }
    };

    checkExistingUser();
  }, []); // runs once

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit store data
  const handleCreateStore = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const allFieldsFilled = Object.values(formData).every((val) => val !== "");
    if (!allFieldsFilled) {
      setMessage("⚠️ Please enter all data.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/homestore/create`, formData);
      setStoreData(res.data.data);
      setMessage("ℹ️ Your data is submitted but not verified yet.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Store creation failed");
    } finally {
      setLoading(false);
    }
  };

  // Verify store
  const handleVerifyStore = async () => {
    if (!storeData) {
      setMessage("⚠️ Please submit your data first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_BASE}/api/store/verify`, {
        username: storeData.username,
        storeId: storeData.storeId,
        gmail: storeData.gmail,
        phone: storeData.phone,
        address: storeData.address,
        street: storeData.street,
        pincode: storeData.pincode,
      });

      setStoreData(res.data.data);
      setMessage(`✅ Welcome ${res.data.data.username}! Your store is verified.`);

      // Go to next page after verification
      if (res.data.data.status === "verified") {
        navigate("/verify");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Your data is not verified yet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="store-manager-container">
      <h2>Store Manager</h2>

      {!storeData || storeData.status !== "verified" ? (
        <form onSubmit={handleCreateStore} className="store-form">
          <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <input name="storeName" placeholder="Store Name" value={formData.storeName} onChange={handleChange} />
          <input name="storeId" placeholder="Store ID" value={formData.storeId} onChange={handleChange} />
          <input type="email" name="gmail" placeholder="Gmail" value={formData.gmail} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
          <input name="linkdata" placeholder="Map Link Data Add" value={formData.linkdata} onChange={handleChange} />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Store Data"}
          </button>
        </form>
      ) : null}

      {storeData && (
        <div className={`store-info ${storeData.status === "verified" ? "verified" : "not-verified"}`}>
          <h3>Store Info</h3>
          <p><strong>Username:</strong> {storeData.username}</p>
          <p><strong>Store Name:</strong> {storeData.storeName}</p>
          <p><strong>Store ID:</strong> {storeData.storeId}</p>
          <p>
            <strong>Status:</strong>{" "}
            {storeData.status === "verified" ? "✅ Verified" : "❌ Not Verified"}
          </p>

          {storeData.status !== "verified" && (
            <button onClick={handleVerifyStore} disabled={loading}>
              {loading ? "Verifying..." : "Verify Your Store"}
            </button>
          )}
        </div>
      )}

      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default Input;

*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Input.css";

const API_BASE = "http://localhost:3000";

const Input = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    storeName: "",
    storeId: "",
    gmail: "",
    phone: "",
    age: "",
    city: "",
    address: "",
    street: "",
    pincode: "",
    linkdata: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT BUTTON ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 🔹 STEP 1: CHECK USERNAME
      const checkRes = await axios.post(`${API_BASE}/api/homestore/check`, {
        username: formData.username,
        gmail: formData.gmail,
      });

      // ✅ USER EXISTS → GO NEXT PAGE
      if (checkRes.data?.data) {
        navigate("/verify");
        return;
      }
    } catch (err) {
      // ❌ user not found → continue to create
    }

    try {
      // 🔹 STEP 2: CREATE STORE (ONLY IF NOT EXISTS)
      await axios.post(`${API_BASE}/api/homestore/create`, formData);

      // ✅ AFTER CREATE → NEXT PAGE
      navigate("/verify");
    } catch (err) {
      console.log("Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="store-manager-container">
      <h2>Store Manager</h2>

      <form onSubmit={handleSubmit} className="store-form">
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="storeName" placeholder="Store Name" onChange={handleChange} required />
        <input name="storeId" placeholder="Store ID" onChange={handleChange} required />
        <input type="email" name="gmail" placeholder="Gmail" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="street" placeholder="Street" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
        <input name="linkdata" placeholder="Map Link Data Add" onChange={handleChange} required />

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Continue"}
        </button>
      </form>

      {message && <p className="msg">{message}</p>}
    </div>
  );
};

export default Input;
