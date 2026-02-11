
/*import { useEffect, useState } from "react"; //list main code one id
import axios from "axios";
import "./List.css";
import { input } from "../../assets/output";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

const List = () => {
  const [foods, setFoods] = useState([]);
  const [store, setStore] = useState(null);
  const { url } = useContext(StoreContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storeId = "697df53ec26ff31e523578e9";

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${url}/api/food/store/${storeId}`
        );

        // ✅ if backend returns {foods, store}
        if (res.data?.success) {
          setFoods(res.data.foods || res.data.data || []);
          setStore(res.data.store || null);
        } else {
          setError(res.data?.message || "No food found");
        }
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to load food");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [storeId]);

  if (loading) return <p className="center-text">Loading food...</p>;
  if (error) return <p className="center-text">{error}</p>;

  return (
    <div className="store-page">
      <h2 className="store-title">🍽️ Store Food List</h2>

      
      {store && (
        <div className="store-info-card">
          <h3 className="store-name">🏪 {store.name}</h3>

          <p>
            <b>📞 Phone:</b> {store.phone || "N/A"}
          </p>

          <p>
            <b>📍 City:</b> {store.city || "N/A"}
          </p>

          <p>
            <b>🛣️ Street:</b> {store.street || "N/A"}
          </p>

          {store.linkData && (
            <p>
              <b>🔗 Link:</b>{" "}
              <a href={store.linkData} target="_blank" rel="noreferrer">
                Open Store Link
              </a>
            </p>
          )}
        </div>
      )}

   
      <div className="food-grid">
        {foods.map((item) => (
          <div className="food-card" key={item._id}>
            <span className="food-category">{item.category}</span>

            {item?.phone && (
              <a href={`tel:${item.phone}`} className="call-btn">
                📞 Call Customer
              </a>
            )}


            <img
              src={`http://localhost:3000/images/${item.image}`}
              alt={item.name}
              className="food-img"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200";
              }}
            />

            <h3 className="food-name">Name :{item.name}</h3>

            <p className="food-price">Price : ₹{item.price}</p>

            <p className="food-desc">Description : {item.description}</p>
            <p className="food-desc">Street : {item.street ? ` ${item.street}` : ""}</p>

           
            <p className="food-location">City :
              📍 {item.city || store?.city || "N/A"}{" "}

            </p>
            {item.linkdata && (
              <p className="food-location">
                <a href={item.linkdata} target="_blank" rel="noreferrer">
                  <img
                    src={input.speed}
                    alt="link"
                    width="22"
                    height="22"
                    style={{ cursor: "pointer" }}
                  />
                </a>
              </p>
            )}



         
            {store && (
              <div className="food-store-details">
                <p>
                  <b>Store:</b> {store.name}
                </p>
                <p>
                  <b>Phone:</b> {store.phone}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
/*
import { useEffect, useState, useContext } from "react"; // exlent code
import axios from "axios";
import "./List.css";
import { input } from "../../assets/output";
import { StoreContext } from "../../Context/StoreContext";

const List = () => {
  const [foods, setFoods] = useState([]);
  const [store, setStore] = useState(null);
  const { url } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ storeId saved like MyOrder
  const [storeId, setStoreId] = useState(() => {
    return localStorage.getItem("storeId") || "";
  });

  // ✅ save storeId when user changes
  useEffect(() => {
    if (storeId) {
      localStorage.setItem("storeId", storeId);
    }
  }, [storeId]);

  useEffect(() => {
    if (!storeId) return;

    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${url}/api/food/store/${storeId}`);

        if (res.data?.success) {
          setFoods(res.data.foods || res.data.data || []);
          setStore(res.data.store || null);
        } else {
          setFoods([]);
          setStore(null);
          setError(res.data?.message || "No food found");
        }
      } catch (err) {
        console.log(err);
        setFoods([]);
        setStore(null);
        setError(err.response?.data?.message || "Failed to load food");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [storeId, url]);

  return (
    <div className="store-page">
      <h2 className="store-title">🍽️ Store Food List</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Store ID"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          style={{ padding: "8px", width: "320px" }}
        />

        <button
          style={{ marginLeft: "10px", padding: "8px" }}
          onClick={() => {
            localStorage.removeItem("storeId");
            setStoreId("");
            setFoods([]);
            setStore(null);
          }}
        >
          Clear
        </button>
      </div>

      {loading && <p className="center-text">Loading food...</p>}
      {error && <p className="center-text">{error}</p>}

      {store && (
        <div className="store-info-card">
          <h3 className="store-name">🏪 {store.name}</h3>

          <p>
            <b>📞 Phone:</b> {store.phone || "N/A"}
          </p>

          <p>
            <b>📍 City:</b> {store.city || "N/A"}
          </p>

          <p>
            <b>🛣️ Street:</b> {store.street || "N/A"}
          </p>

          {store.linkData && (
            <p>
              <b>🔗 Link:</b>{" "}
              <a href={store.linkData} target="_blank" rel="noreferrer">
                Open Store Link
              </a>
            </p>
          )}
        </div>
      )}

     
      <div className="food-grid">
        {foods.map((item) => (
          <div className="food-card" key={item._id}>
            <span className="food-category">{item.category}</span>

            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="food-img"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200";
              }}
            />

            <h3 className="food-name">Name : {item.name}</h3>
            <p className="food-price">Price : ₹{item.price}</p>
            <p className="food-desc">Description : {item.description}</p>

            <p className="food-desc">
              Street : {item.street ? ` ${item.street}` : ""}
            </p>

            <p className="food-location">
              City : 📍 {item.city || store?.city || "N/A"}
            </p>

            
            {item.linkdata && (
              <p className="food-location">
                <a href={item.linkdata} target="_blank" rel="noreferrer">
                  <img
                    src={input.speed}
                    alt="link"
                    width="22"
                    height="22"
                    style={{ cursor: "pointer" }}
                  />
                </a>
              </p>
            )}

            
            {store && (
              <div className="food-store-details">
                <p>
                  <b>Store:</b> {store.name}
                </p>
                <p>
                  <b>Phone:</b> {store.phone}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
*
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./List.css";
import { input } from "../../assets/output";
import { StoreContext } from "../../Context/StoreContext";
import { useLocation } from "react-router-dom";

const List = () => {
  const [foods, setFoods] = useState([]);
  const [store, setStore] = useState(null);
  const { url } = useContext(StoreContext);

  const location = useLocation();

  // ✅ get storeId from Add.jsx navigate state
  const storeId = location.state?.storeId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!storeId) {
      setLoading(false);
      setError("StoreId not found. Please go from Add page.");
      return;
    }

    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${url}/api/food/store/${storeId}`);

        if (res.data?.success) {
          setFoods(res.data.foods || res.data.data || []);
          setStore(res.data.store || null);
        } else {
          setFoods([]);
          setStore(null);
          setError(res.data?.message || "No food found");
        }
      } catch (err) {
        console.log(err);
        setFoods([]);
        setStore(null);
        setError(err.response?.data?.message || "Failed to load food");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [storeId, url]);

  if (loading) return <p className="center-text">Loading food...</p>;
  if (error) return <p className="center-text">{error}</p>;

  return (
    <div className="store-page">
      <h2 className="store-title">🍽️ Store Food List</h2>

     
      {store && (
        <div className="store-info-card">
          <h3 className="store-name">🏪 {store.name}</h3>
          <p><b>📞 Phone:</b> {store.phone || "N/A"}</p>
          <p><b>📍 City:</b> {store.city || "N/A"}</p>
          <p><b>🛣️ Street:</b> {store.street || "N/A"}</p>
        </div>
      )}

      
      <div className="food-grid">
        {foods.map((item) => (
          <div className="food-card" key={item._id}>
            <span className="food-category">{item.category}</span>

            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="food-img"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200";
              }}
            />

            <h3 className="food-name">Name : {item.name}</h3>
            <p className="food-price">Price : ₹{item.price}</p>
            <p className="food-desc">Description : {item.description}</p>

            {item.linkdata && (
              <p className="food-location">
                <a href={item.linkdata} target="_blank" rel="noreferrer">
                  <img
                    src={input.speed}
                    alt="link"
                    width="22"
                    height="22"
                    style={{ cursor: "pointer" }}
                  />
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
*/
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./List.css";
import { input } from "../../assets/output";
import { StoreContext } from "../../Context/StoreContext";

const List = () => {
  const { url } = useContext(StoreContext);

  // Foods and store info
  const [foods, setFoods] = useState([]);
  const [store, setStore] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Store ID saved in localStorage
  const [storeId, setStoreId] = useState(() => {
    return localStorage.getItem("storeId") || "";
  });

  // Save storeId whenever it changes
  useEffect(() => {
    if (storeId) {
      localStorage.setItem("storeId", storeId);
    }
  }, [storeId]);

  // Fetch food & store info whenever storeId or url changes
  useEffect(() => {
    if (!storeId) return;

    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${url}/api/food/store/${storeId}`);

        if (res.data?.success) {
          setFoods(res.data.foods || res.data.data || []);
          setStore(res.data.store || null);
        } else {
          setFoods([]);
          setStore(null);
          setError(res.data?.message || "No food found for this store.");
        }
      } catch (err) {
        console.error(err);
        setFoods([]);
        setStore(null);
        setError(err.response?.data?.message || "Failed to load food.");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [storeId, url]);

  // Clear store ID and reset state
  const clearStore = () => {
    localStorage.removeItem("storeId");
    setStoreId("");
    setFoods([]);
    setStore(null);
  };

  return (
    <div className="store-page">
      <h2 className="store-title">🍽️ Store Food List</h2>

      {/* Store ID Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Store ID"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          style={{ padding: "8px", width: "320px" }}
        />
        <button style={{ marginLeft: "10px", padding: "8px" }} onClick={clearStore}>
          Clear
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p className="center-text">Loading food...</p>}
      {error && <p className="center-text">{error}</p>}

      {/* Store Info */}
      {store && (
        <div className="store-info-card">
          <h3 className="store-name">🏪 {store.name}</h3>
          <p>
            <b>📞 Phone:</b> {store.phone || "N/A"}
          </p>
          <p>
            <b>📍 City:</b> {store.city || "N/A"}
          </p>
          <p>
            <b>🛣️ Street:</b> {store.street || "N/A"}
          </p>
          {store.linkData && (
            <p>
              <b>🔗 Link:</b>{" "}
              <a href={store.linkData} target="_blank" rel="noreferrer">
                Open Store Link
              </a>
            </p>
          )}
        </div>
      )}

      {/* Food List */}
      <div className="food-grid">
        {foods.map((item) => (
          <div className="food-card" key={item._id}>
            <span className="food-category">{item.category}</span>

            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="food-img"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/200";
              }}
            />

            <h3 className="food-name">Name: {item.name}</h3>
            <p className="food-price">Price: ₹{item.price}</p>
            <p className="food-desc">Description: {item.description}</p>

            <p className="food-desc">Street: {item.street || store?.street || "N/A"}</p>
            <p className="food-location">City: 📍 {item.city || store?.city || "N/A"}</p>

            {item.linkdata && (
              <p className="food-location">
                <a href={item.linkdata} target="_blank" rel="noreferrer">
                  <img
                    src={input.speed}
                    alt="link"
                    width="22"
                    height="22"
                    style={{ cursor: "pointer" }}
                  />
                </a>
              </p>
            )}

            {store && (
              <div className="food-store-details">
                <p>
                  <b>Store:</b> {store.name}
                </p>
                <p>
                  <b>Phone:</b> {store.phone}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
