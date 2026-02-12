import React, { createContext } from 'react'
import axios from "axios"
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
export const StoreContext = createContext(null)
const StoreContextProvider = ({children}) => {

    const [cartItems, setCartItems] = useState({})
    /*"https://admin-add.netlify.app/",
    "https://deliver-add.netlify.app/",
    "https://user-ad.netlify.app/",
    "https://store-add.netlify.app/", */




    //const url = "http://localhost:3000"
    const url = "https://backend2-5-2t0w.onrender.com" //last

    //const url ="https://backend2-3-vwf9.onrender.com";
    const Burl ="https://store-add.netlify.app/"; //"http://localhost:5176";


    
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
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [query, setQuery] = useState("");

  // ✅ Backend URL
  const url = "http://localhost:3000";
  const Burl = "http://localhost:5176";

  // ✅ Token
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // ✅ Store data (important for storeId)
  const [storeData, setStoreData] = useState(null);

  // ✅ Audios
  const wonAudio = new Audio("/Audios/done.mp3");
  const doneAudio = new Audio("/Audios/error.mp3");
  const submitAudio = new Audio("/Audios/submit2.mp3");
  const addAudio = new Audio("/Audios/add.mp3");
  const timeAudio = new Audio("/Audios/ontime.mp3");

  // -----------------------------
  // ✅ Load store profile (storeId)
  // -----------------------------
  const loadStoreProfile = async () => {
    try {
      if (!token) return;

      // ⚠️ Change this route if your backend is different
      const res = await axios.get(`${url}/api/store/profile`, {
        headers: { token },
      });

      if (res.data?.success) {
        setStoreData(res.data.store); // must contain _id
      } else {
        setStoreData(null);
      }
    } catch (err) {
      console.log("Store profile error:", err);
      setStoreData(null);
    }
  };

  // -----------------------------
  // Cart functions
  // -----------------------------
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      addAudio.play();
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/card/add",
        { itemId },
        { headers: { token } }
      );
      addAudio.play();
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/card/remove",
        { itemId },
        { headers: { token } }
      );
      doneAudio.play();
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;

    for (const [itemId, quantity] of Object.entries(cartItems)) {
      if (quantity > 0) {
        const itemInfo = food_list.find(
          (product) => product._id.toString() === itemId
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCardData = async (tokenValue) => {
    const response = await axios.post(
      url + "/api/card/get",
      {},
      { headers: { token: tokenValue } }
    );
    setCartItems(response.data.cardData);
  };

  // -----------------------------
  // Load initial data
  // -----------------------------
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      if (localStorage.getItem("token")) {
        const t = localStorage.getItem("token");
        setToken(t);
        await loadCardData(t);
      }
    }

    loadData();
  }, []);

  // ✅ Whenever token changes → load store profile
  useEffect(() => {
    loadStoreProfile();
  }, [token]);

  // ✅ storeId ready for MyOrder.jsx
  const storeId = storeData?._id;

  const contextValue = {
    // cart
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    fetchFoodList,
    loadCardData,

    // store auth
    token,
    setToken,

    // store data
    storeData,
    setStoreData,
    storeId,
    loadStoreProfile,

    // urls
    url,
    Burl,

    // search
    query,
    setQuery,

    // audios
    doneAudio,
    submitAudio,
    wonAudio,
    addAudio,
    timeAudio,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

*/