import React from 'react'
import './Sidebar.css'

import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { input } from '../../assets/output'
const Sidebar = () => {
const {doneAudio,submitAudio,wonAudio,addAudio,timeAudio,} = useContext(StoreContext)
    
  return (
    <div className='sidebar'>
        <div className="sidebar-op">
            <NavLink to='/add' onClick={wonAudio.play()}  className="side-op">
                <div className='icon-wrap'><img src={input.admin} alt="" /></div>
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' onClick={wonAudio.play()}   className="side-op">
                 <div className='icon-wrap' ><img src={input.admin} alt="" /></div>
                <p>List Items</p>
            </NavLink>
            <NavLink to='/order' onClick={wonAudio.play()}   className="side-op">
                <div className='icon-wrap' ><img src={input.admin} alt="" /></div>
                <p>Order</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar

