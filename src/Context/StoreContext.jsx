import React, { createContext } from 'react'
import axios from "axios"
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
export const StoreContext = createContext(null)
const StoreContextProvider = ({children}) => {

    const [cartItems, setCartItems] = useState({})
    const url = "http://localhost:3000"
    const Burl = "http://localhost:5176";
    //const url = "https://back-ylnd.onrender.com" 
    //const url = "https://backend3-nt7k.onrender.com"
    //const [token, setToken] = useState("")
    const [storeUser, setStoreUser] = useState(null);
    const [food_list, setFoodList] = useState([])
    const [query, setQuery] = useState('')
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    let wonAudio = new Audio('/Audios/done.mp3');
    let doneAudio = new Audio('/Audios/error.mp3');
    let submitAudio = new Audio('/Audios/submit2.mp3');
    let addAudio = new Audio('/Audios/add.mp3');
    let timeAudio = new Audio('/Audios/ontime.mp3');

    


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
            addAudio.play()
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
            
        }
        if (token) {
            await axios.post(url + "/api/card/add", { itemId }, { headers: { token } })
            addAudio.play()

        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/card/remove", { itemId }, { headers: { token } })
            doneAudio.play()
        }
    }

    const getTotalAmount = () => {
    let totalAmount = 0;

    for (const [itemId, quantity] of Object.entries(cartItems)) {
        if (quantity > 0) {
            const itemInfo = food_list.find((product) => product._id.toString() === itemId);
            if (itemInfo) {
                totalAmount += itemInfo.price * quantity;
            }
        }
    }

    return totalAmount;
}

        
        
    

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }
    const loadCardData = async (token) => {
        const response = await axios.post(url + "/api/card/get", {}, { headers: { token } })
        setCartItems(response.data.cardData)

    }
    useEffect(() => {
    
            async function loadData() {
                await fetchFoodList();
                if (localStorage.getItem("token")) {
                    setToken(localStorage.getItem("token"));
                    await loadCardData(localStorage.getItem("token"))
                }
    
            }
            loadData();
            
        }, [])
    const contextValue ={
        storeUser, setStoreUser,food_list,loadCardData, cartItems, setCartItems, addToCart, removeFromCart, getTotalAmount,fetchFoodList, url,Burl, token, setToken, query, setQuery,doneAudio,submitAudio,wonAudio,addAudio,timeAudio,

    }

  return (
    <div>
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    </div>
  )
}

export default StoreContextProvider
/*
import { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:3000";
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const value = {
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
*/