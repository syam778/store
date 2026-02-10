import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
//import { input } from "../assets/output";
import { StoreContext } from "../Context/StoreContext";
import { input } from "../assets/output";


const Navbar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/")
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <img src={input.speed} alt="logo" className="logo-img" />

        {/* LINKS */}
        <div className={`nav-links ${open ? "active" : ""}`}>
          <Link to="/myorder">My Order</Link>
          <Link to="/">Home</Link>
          <Link to="/addata">Add Data</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/condition">Condition</Link>

          {/* AUTH BUTTON */}
          {!token ? (
            <button onClick={() => setShowLogin(true) || navigate("/login")}>Login</button>
          ) : (
            <div className='navbar-profile' >
                                    <img className="admin" src={input.admin} alt="" />
                                    <ul className='nav-profile-down'>
                                        <li ><img src={input.speed} alt="" /><p>Orders</p></li>
                                        <hr className='more' />
                                        <li onClick={logoutHandler} ><img src={input.admin} alt="" /><p>Logout</p></li>
            
                                        <li  >
                                            <img src={input.admin} alt="" />
                                            <p>Profile</p>
                                        </li>
                                        <li onClick={()=> navigate("/add")} >
                                            <img src={input.admin} alt="" />
                                            <p>Add Items</p>
                                        </li>
                                        <li onClick={()=> navigate("/order")} >
                                            <img src={input.admin} alt="" />
                                            <p>Order Data</p>
                                        </li>
            
                                        <hr className='more' />
            
                                    </ul>
                                </div>
            
          )}
      </div>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>
    </div>
    </nav >
  );
};

export default Navbar;