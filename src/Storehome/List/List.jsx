/*
import { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";

const List = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storeId = "697df53ec26ff31e523578e9";

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/food/store/${storeId}`
        );
        setFoods(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load food");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, []);

  if (loading) return <p className="center-text">Loading food...</p>;
  if (error) return <p className="center-text">{error}</p>;

  return (
    <div className="store-page">
      <h2 className="store-title">🍽️ Store Food List Data</h2>

      <div className="food-grid">
        {foods.map((item) => (
          <div className="food-card" key={item._id}>
            <span className="food-category">{item.category}</span>

            <img
              src={`http://localhost:3000/images/${item.image}`}
              alt={item.name}
              className="food-img"
            />

            <h3 className="food-name">{item.name}</h3>
            <p className="food-price">₹{item.price}</p>
            <p className="food-desc">{item.description}</p>
            <p className="food-location">📍 {item.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
*/
import { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import { input } from "../../assets/output";

const List = () => {
  const [foods, setFoods] = useState([]);
  const [store, setStore] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storeId = "697df53ec26ff31e523578e9";

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `http://localhost:3000/api/food/store/${storeId}`
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

      {/* ✅ Store Info Card */}
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

      {/* ✅ Food Grid */}
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

            {/* ✅ Food Location */}
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

            

            {/* ✅ Store details inside food card */}
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
