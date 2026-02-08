/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { input } from "../assets/output";

const Navbar = () => {
  const [opens, setopens] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo"><img src={input.speed} alt="" /></h2>

        <div className={`nav-links ${opens ? "active" : ""}`}>
          <Link to="/" onClick={() => setopens(false)}>Home</Link>
          <Link to="/about" onClick={() => setopens(false)}>About</Link>
          <Link to="/menu" onClick={() => setopens(false)}>Menu</Link>
          <Link to="/contact" onClick={() => setopens(false)}>Contact</Link>
        </div>

        <div className="hamburger" onClick={() => setopens(!opens)}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

.navbar {
    width: 100%;
    background: #0f172a;
    color: #fff;
    padding: 12px 0;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo img {
    width: 70px;
    height: 70px;
    font-size: 22px;
    font-weight: bold;
    color: #38bdf8;
    margin-left: -60px;
}

.nav-links {
    display: flex;
    gap: 20px;
}

.nav-links a {
    text-decoration: none;
    color: #fff;
    font-size: 16px;
    transition: 0.3s;
}

.nav-links a:hover {
    color: #38bdf8;
}

.hamburger {
    display: none;
    font-size: 26px;
    cursor: pointer;
}


@media (max-width: 768px) {
    .nav-links {
        position: relative;
        top: 60px;
        left: 0;
        width: 100%;
        background: #0f172a;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 300px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }

    .nav-links.active {
        max-height: 300px;
        padding: 15px 0;
    }

    .hamburger {
        display: block;
    }
}


import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { input } from "../assets/output"; 
// input.logo , input.home , input.admin (example)

const Navbar = ({ setShowLogin }) => {
  const [opens, setOpens] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* LEFT : LOGO *
        <Link to="/" className="logo" onClick={() => setOpens(false)}>
          <img src={input.speed} alt="Logo" />
          <span>Delivery</span>
        </Link>

        {/* CENTER : LINKS *
        <div className="Navroll">
          <Link to="/" onClick={() => setOpens(false)}>
            <img src={input.home} alt="" />
            Home
          </Link>

          <Link to="/menu" onClick={() => setOpens(false)}>
            Menu
          </Link>

          <Link to="/about" onClick={() => setOpens(false)}>
            About
          </Link>
        </div>

        {/* RIGHT : ADMIN *
        <Link to="/admin" className="admin" onClick={() => setOpens(false)}>
          <img src={input.admin} alt="Admin" />
        </Link>

        {/* MOBILE HAMBURGER *
        <div className="hamburger" onClick={() => setOpens(!opens)}>
          ☰
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

.navbar {
  width: 100%;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  position: sticky;
  margin-top: 20px;
  z-index: 100;
  height: max-content;
}

.nav-container {
  width: 95%;
  margin: auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: -10px;
}

/* LOGO *
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.logo img {
  width: 50px;
  height: 50px;
}

.logo span {
  font-size: 20px;
  font-weight: 700;
  color: #ff5722;
}

/* LINKS *
.nav-links {
  display: flex;
  gap: 25px;
  align-items: center;
}

.nav-links a {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.nav-links img {
  width: 18px;
  height: 18px;
}

/* ADMIN *
.admin img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ff5722;
  padding: 2px;
  cursor: pointer;
}

/* HAMBURGER *
.hamburger {
  display: none;
  font-size: 26px;
  cursor: pointer;
}
.Navroll{
    color: black;
    gap: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: blue;
    font-size: large;
}
.Navroll a{
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
/* MOBILE *
@media (max-width: 768px) {
.nav-container {
  width: 110%;
  margin: auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: -36px;

}
  .nav-links {
    position: absolute;
    top: 65px;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    gap: 15px;
    padding: 20px 0;
    display: none;
  }

  .nav-links.active {
    display: flex;
  }

  .hamburger {
    display: block;
  }
  .Navroll{
    color: black;
    gap: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: blue;
    font-size: small;
    gap: 10px;
}
.Navroll a{
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #333;
  font-weight: 500;

}
  .admin img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ff5722;
  padding: 2px;
  cursor: pointer;
}
}


import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { input } from "../assets/output";
import { StoreContext } from "../Context/StoreContext";


const Navbar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext); // ✅ FIX
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
        {/* LOGO *
        <img src={input.speed} alt="logo" className="logo-img" />

        {/* LINKS *
        <div className={`nav-links ${open ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/admin">Admin</Link>

          {/* AUTH BUTTON *
          {!token ? (
            <button onClick={() => setShowLogin(true)|| useNavigate("/login")}>Login</button>
          ) : (
            <button onClick={logoutHandler}>Logout</button>
          )}
        </div>

        {/* HAMBURGER *
        <div className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
*/
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