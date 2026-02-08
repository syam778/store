import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./Profil.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Profil = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  // Load profile image
  useEffect(() => {
    const savedImg = localStorage.getItem("profileImg");
    if (savedImg) setProfileImg(savedImg);
  }, []);

  // Upload profile image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profileImg", reader.result);
      setProfileImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Fetch user profile
  const fetchMyData = async () => {
    if (!email.trim()) {
      setError("Please enter email");
      return;
    }

    try {
      const res = await axios.post(
        `${url}/api/order/my-data`,
        { email: email.trim() }
      );

      const data = res.data?.data || [];

      if (res.data.success && data.length > 0) {
        setOrders(data);
        setError("");
      } else {
        setOrders([]);
        setError("No user data found");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  const user = orders[0]?.address;

  return (
    <div className="my-orders">
      <h2>My Profile</h2>

      {/* Profile Image */}
      <div className="profile-img-box">
        <img
          src={
            profileImg ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
        />
        <label className="upload-btn">
          Change Photo
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>
      </div>

      {/* Email Input */}
      <div className="myinput"><input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /></div>
      
      <div className="email-box">
        
        <button type="button" onClick={fetchMyData}>
          View Profile
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* User Details */}
      {user && (
        <div className="order-card">
          <p><b>Name:</b> {user.firstName} {user.lastName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Age:</b> {user.age}</p>
          <p><b>Gender:</b> {user.gender}</p>
          <p><b>State:</b> {user.state}</p>
          <p><b>Zipcode:</b> {user.zipcode}</p>
          <p><b>City:</b> {user.city}</p>
          <p><b>Street:</b> {user.street}</p>
        </div>
      )}

      {/* Support */}
      <div className="customer">
        <p className="support-title">Customer Support</p>
        <p className="support-text">
          Order Payment Issue | Order Cancel
        </p>
        <button type="button" onClick={() => navigate("/myorders")}>
          Support
        </button>
      </div>
    </div>
  );
};

export default Profil;





/*import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import "./Profil.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";


const Profil = () => {
    const { url } = useContext(StoreContext);
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [profileImg, setProfileImg] = useState(null);
    const navigate = useNavigate()

    // Load image from localStorage
    useEffect(() => {
        const savedImg = localStorage.getItem("profileImg");
        if (savedImg) setProfileImg(savedImg);
    }, []);

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImg(reader.result);
            localStorage.setItem("profileImg", reader.result);
        };
        reader.readAsDataURL(file);
    };

    const fetchMyData = async () => {
        try {
            const response = await axios.post(url + "/api/order/my-data", { email });

            if (response.data.success && response.data.data.length > 0) {
                setOrders(response.data.data);
                setError("");
            } else {
                setOrders([]);
                setError("No user data found");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    const user = orders[0]?.address;

    return (
        <div className="my-orders">
            <h2>My Profile</h2>

            {/* Profile Image *
            <div className="profile-img-box">

                <img
                    src={
                        profileImg ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Profile"
                />
                <label className="upload-btn">
                    Change Photo
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
            </div>

            {/* Email Input *
            <div className="email-box">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={fetchMyData}>View Profile</button>
            </div>

            {error && <p className="error">{error}</p>}

            {/* User Data *
            {user && (
                <div className="order-card">
                    <p><b>Name:</b> {user.firstName} {user.lastName}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Phone:</b> {user.phone}</p>
                    <p><b>Age:</b> {user.age}</p>
                    <p><b>Gender:</b> {user.gender}</p>
                    <p><b>Address:</b> {user.state}</p>
                    <p><b>zipcode:</b> {user.zipcode}</p>
                    <p><b>city:</b> {user.city}</p>
                    <p><b>street:</b> {user.street}</p>




                </div>

            )}
            <div className="customer">
                <p style={{ color: "red", textAlign: "center" }}>Customer Support</p>
                <p style={{ color: "red", textAlign: "center" }}>
                    Your Order Related Query
                    <b style={{ color: "black", textAlign: "center" }}>Order Payment Issue</b>
                    <b style={{ color: "black", textAlign: "center" }}>Order Cancel</b>
                </p>
                <button onClick={() => navigate("/myorders")} type="button">Support</button>
            </div>
        </div>
    );
};

export default Profil;*/