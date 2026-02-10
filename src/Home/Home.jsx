import React from "react";
import "./Home.css";
import { input } from "../assets/output";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const Home = () => {
  const navigate = useNavigate()
  const {doneAudio,submitAudio,wonAudio,addAudio,timeAudio,url}= useContext(StoreContext)
  return (
    <div className="home">
     
      {/* Center Content */}
      <div className="home-center">
        <img
          src={input.speed}
          alt="Store"
          className="home-img"
        />
        <button onClick={() =>{ wonAudio.play(); navigate("/create")}}className="btn5">Create Store</button>

        <div className="nextpage">
            <p>You Are Alredy Submit Data You Goo <b>Verify Your Data</b></p>
            <button className="nextbtn" onClick={() =>{ wonAudio.play(); navigate("/verify")}}>Verify</button>
          </div>
      </div>
      
       <div className="features">
        <div className="feature-card">
          <h3>⚡ Fast Delivery</h3>
          <p>Get your food in under 30 minutes</p>
        </div>
        <div className="feature-card">
          <h3>🍔 Best Quality</h3>
          <p>Fresh and hygienic food always</p>
        </div>
        <div className="feature-card">
          <h3>💳 Easy Payment</h3>
          <p>Cash on delivery & online payment</p>
        </div>
        
        
      </div>
      
    </div>
  );
};

export default Home;
