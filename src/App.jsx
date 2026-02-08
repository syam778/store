/*import React from 'react'
import Home from './Home/Home'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    
    <div className='app'>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      
      </div>
  )
}

export default App*/
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Loginm from "./Loginm/Loginm";
import { useState } from "react";
import Input from "./Input/input";
import Verify from "./Verify/Verify";
import Sidebar from "./Storehome/Sidebar/Sidebar";
import Condition from "./Componet/Condition/Condition";
import Profil from "./Componet/Profil/Profil";
import AdData from "./Componet/AdData/AdData";
import MyOrder from "./Componet/MyOrder/MyOrder";
import Add from "./Storehome/Add/Add";
import List from "./Storehome/List/List";
import Order from "./Storehome/Order/Order";




const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {showLogin ? <Loginm setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route>
            <Route path="/login" element={<Loginm />} />
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Input />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/profile" element={<Profil />} />
            <Route path="/condition" element={<Condition />} />
            <Route path="/addata" element={<AdData />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path='/add' element={<Add />} />
            <Route path='/list' element={<List  />} />
            <Route path='/order' element={<Order  />} />
            
           
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
