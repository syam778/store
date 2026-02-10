/*

import { useEffect, useState } from "react"; // main code new
import axios from "axios";
import "./Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 YOUR STORE ID (replace with dynamic if needed)
  const storeId = "697df53ec26ff31e523578e9";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/orders/store/${storeId}`
        );
        setOrders(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="center-text">Loading orders...</p>;
  if (error) return <p className="center-text">{error}</p>;
  if (orders.length === 0)
    return <p className="center-text">No orders for this store</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Orders for Your Store</h2>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id.slice(-6)}</h3>
            <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <p>Payment: {order.payment ? "✅ Paid" : "❌ Pending"}</p>

            <div className="items-list">
              <h4>Items:</h4>
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="item-card"
                >

                   <img
                    src={`http://localhost:3000/images/${item.image}`}
                    alt={item.name}
                  />
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.amount}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="order-address">
              📍 {order.address?.street}, {order.address?.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;






import { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

const Order = () => {
  const storeId = "697df53ec26ff31e523578e9";

  const [orders, setOrders] = useState([]);
  const [knownOrderIds, setKnownOrderIds] = useState([]);
  const [popupOrder, setPopupOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔁 Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/orders/store/${storeId}`
      );

      const fetchedOrders = res.data.data || [];

      // 🔔 detect NEW order
      if (knownOrderIds.length > 0) {
        const newOrder = fetchedOrders.find(
          (o) =>
            !knownOrderIds.includes(o._id) &&
            o.status === "Pending"
        );

        if (newOrder) {
          setPopupOrder(newOrder);
        }
      }

      setOrders(fetchedOrders);
      setKnownOrderIds(fetchedOrders.map((o) => o._id));
      setLoading(false);
    } catch (err) {
      setError("Failed to load orders");
      setLoading(false);
    }
  };

  // 🔁 auto refresh every 8 sec
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 8000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Accept order
  const handleAccept = async () => {
    await axios.put(
      `http://localhost:3000/api/orders/${popupOrder._id}/status`,
      { status: "Accepted" }
    );
    setPopupOrder(null);
    fetchOrders();
  };

  // ❌ Reject order
  const handleReject = async () => {
    await axios.put(
      `http://localhost:3000/api/orders/${popupOrder._id}/status`,
      { status: "Rejected" }
    );
    setPopupOrder(null);
    fetchOrders();
  };

  if (loading) return <p className="center-text">Loading orders...</p>;
  if (error) return <p className="center-text">{error}</p>;
  if (orders.length === 0)
    return <p className="center-text">No orders yet</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Store Orders</h2>

      <div className="orders-grid">
        {orders.map((order, index) => (
          <div className="order-card" key={order._id}>
            <h3>Order #{index + 1}</h3>

            <p>
              Status:{" "}
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </p>

            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <p>Payment: {order.payment ? "✅ Paid" : "❌ Pending"}</p>

            <div className="items-list">
              <h4>Items</h4>

              {order.items.map((item, i) => (
                <div className="item-card" key={i}>
                  <img
                    src={`http://localhost:3000/images/${item.image}`}
                    alt={item.name}
                  />

                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.amount}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="order-address">
              📍 {order.address?.street}, {order.address?.city}
            </p>
          </div>
        ))}
      </div>

      {popupOrder && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <h2>🚨 New Order Received</h2>

            {popupOrder.items.map((item, i) => (
              <div className="popup-item" key={i}>

                <img
                  src={`http://localhost:3000/images/${encodeURIComponent(item.image)}`}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80";
                  }}
                />

                <div>
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.amount}</p>
                </div>
              </div>
            ))}

            <div className="popup-actions">
              <button className="accept-btn" onClick={handleAccept}>
                ✅ Accept
              </button>
              <button className="reject-btn" onClick={handleReject}>
                ❌ Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
*/

import { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

const Order = () => {
  const storeId = "697df53ec26ff31e523578e9";
  const {url} = useContext(StoreContext);

  const [orders, setOrders] = useState([]);
  const [knownOrderIds, setKnownOrderIds] = useState([]);
  const [popupOrder, setPopupOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔁 Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${url}/api/orders/store/${storeId}`
      );

      const fetchedOrders = res.data.data || [];

      // 🔔 Detect new pending order
      if (knownOrderIds.length > 0) {
        const newOrder = fetchedOrders.find(
          (o) => !knownOrderIds.includes(o._id) && o.status === "Pending"
        );
        if (newOrder) setPopupOrder(newOrder);
      }

      setOrders(fetchedOrders);
      setKnownOrderIds(fetchedOrders.map((o) => o._id));
      setLoading(false);
    } catch (err) {
      setError("Failed to load orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 8000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Accept Order
  const handleAccept = async () => {
    await axios.put(
      `${url}/api/orders/${popupOrder._id}/status`,
      { status: "Accepted" }
    );
    setPopupOrder(null);
    fetchOrders();
  };

  // ❌ Reject Order
  const handleReject = async () => {
    await axios.put(
      `${url}/api/orders/${popupOrder._id}/status`,
      { status: "Rejected" }
    );
    setPopupOrder(null);
    fetchOrders();
  };

  if (loading) return <p className="center-text">Loading orders...</p>;
  if (error) return <p className="center-text">{error}</p>;
  if (orders.length === 0)
    return <p className="center-text">No orders yet</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Store Orders</h2>

      {orders.map((order, index) => {
        const orderTotal = order.items.reduce(
          (sum, item) => sum + item.amount * item.quantity,
          0
        );

        return (
          <div className="order-item" key={order._id}>
            <h4 className="order-number">Order #{index + 1}</h4>

            <p>
              Status:
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </p>

            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <p>Payment: {order.payment ? "✅ Paid" : "❌ Pending"}</p>

            {/* ITEMS */}
            <p className="order-item-food">
              <b>Items:</b>{" "}
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? `${item.name} = ${item.quantity}`
                  : `${item.name} = ${item.quantity}, `
              )}
            </p>

            {/* CUSTOMER */}
            <p className="order-item-name">
              <b>Name:</b> {order.address?.firstName}{" "}
              {order.address?.lastName}
            </p>

            <div className="order-item-add">
              <p>Email: {order.address?.email}</p>
              <p>City: {order.address?.city}</p>
              <p>Pincode: {order.address?.zipcode}</p>
            </div>

            <div className="phone">
              <p>Phone: {order.address?.phone}</p>
              <p>Age: {order.address?.age}</p>
              <p>Address: {order.address?.address}</p>
            </div>

            {/* TOTAL */}
            <p className="order-total">
              🧾 Total Amount: ₹{orderTotal}
            </p>

            {/* ASSIGNED DELIVERY */}
            {order.assignedTo && typeof order.assignedTo === "object" && (
              <div className="assigned">
                <p><b>Assigned To:</b></p>
                <p>ID: {order.assignedTo._id}</p>
                <p>Special ID: {order.assignedTo.userSpecialId}</p>
                <p>Name: {order.assignedTo.name}</p>
                <p>Phone: {order.assignedTo.number}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* 🔔 POPUP FOR NEW ORDER */}
      {popupOrder && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <h2>🚨 New Order Received</h2>

            {popupOrder.items.map((item, i) => (
              <p key={i}>
                {item.name} × {item.quantity} — ₹{item.amount}
              </p>
            ))}

            <div className="popup-actions">
              <button className="accept-btn" onClick={handleAccept}>
                ✅ Accept
              </button>
              <button className="reject-btn" onClick={handleReject}>
                ❌ Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
