/*
import React, { useEffect, useRef, useState, useContext } from "react";  // main and core code
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { input } from "../../assets/output";


const Order = () => {
  const {url} = useContext(StoreContext)
  const [orders, setOrders] = useState([]);
  const [newOrderPopup, setNewOrderPopup] = useState(null);

  const navigate = useNavigate();
  //const { orderAudio } = useContext(AdminContext);

  const orderAudioRef = useRef(null);
  const doneAudioRef = useRef(null);
  const submitAudioRef = useRef(null);
  const errorAudioRef = useRef(null);

  const prevIdsRef = useRef(new Set());
  const firstLoadRef = useRef(true);

  // 🔁 Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(url + "/api/order/list");

      if (res.data.success) {
        const newOrders = res.data.data || [];

        const newIds = new Set(newOrders.map((o) => o._id));
        const prevIds = prevIdsRef.current;

        // Detect new order after first load
        if (!firstLoadRef.current) {
          const newlyArrived = newOrders.filter((o) => !prevIds.has(o._id));
          if (newlyArrived.length > 0) {
            orderAudioRef.current?.play().catch(() => { });
            setNewOrderPopup(newlyArrived[0]);
            //orderAudio.play();
          }
        }

        firstLoadRef.current = false;
        prevIdsRef.current = newIds;
        setOrders(newOrders);
      }
    } catch (err) {
      console.error("FETCH ERROR 👉", err);
      toast.error("Server error while fetching orders");
    }
  };

  // 🔽 Update order status (ENUM SAFE)
  const statusHandler = async (event, orderId) => {
    try {
      const res = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });

      if (res.data.success) {
        toast.success("Status updated");
        doneAudioRef.current?.play().catch(() => { });
        fetchAllOrders();
      }
    } catch (err) {
      console.error("STATUS ERROR 👉", err);
      toast.error("Status update failed");
      errorAudioRef.current?.play().catch(() => { });
    }
  };

  // ❌ Remove order
  const removeOrder = async (id) => {
    try {
      const res = await axios.post(`${url}/api/order/remove`, { id });

      if (res.data.success) {
        toast.success("Order removed");
        submitAudioRef.current?.play().catch(() => { });
        fetchAllOrders();
      }
    } catch (err) {
      console.error("REMOVE ERROR 👉", err);
      toast.error("Server error");
      errorAudioRef.current?.play().catch(() => { });
    }
  };

  // ✅ Receive new order (set to Assigned)
  const receiveOrder = async (id) => {
    try {
      const res = await axios.post(url + "/api/order/status", {
        orderId: id,
        status: "Assigned",   // 🔥 must match enum
      });

      if (res.data.success) {
        toast.success("Order Received");
        doneAudioRef.current?.play().catch(() => { });
        setNewOrderPopup(null);
        fetchAllOrders();
        orderAudio.pause();
      }
    } catch (err) {
      console.error("RECEIVE ERROR 👉", err);
      toast.error("Receive failed");
      errorAudioRef.current?.play().catch(() => { });
    }
  };

  // ❌ Cancel order
  const cancelOrder = async (id) => {
    try {
      const res = await axios.post(`${url}/api/order/remove`, { id });

      if (res.data.success) {
        toast.success("Order cancelled");
        submitAudioRef.current?.play().catch(() => { });
        setNewOrderPopup(null);
        fetchAllOrders();
      }
    } catch (err) {
      console.error("CANCEL ERROR 👉", err);
      toast.error("Server error");
      errorAudioRef.current?.play().catch(() => { });
    }
  };

  // 🔊 Unlock audio on first click
  const unlockAudio = () => {
    [orderAudioRef, doneAudioRef, submitAudioRef, errorAudioRef].forEach(
      (ref) => {
        ref.current
          ?.play()
          .then(() => {
            ref.current.pause();
            ref.current.currentTime = 0;
          })
          .catch(() => { });
      }
    );
  };

  // ✅ SEND SINGLE ORDER TO DELIVERY PAGE
  const sendSingleOrder = (order) => {
    if (!order || !order._id) {
      toast.error("Order ID missing");
      return;
    }

    const cleanOrder = {
      _id: order._id,
      address: order.address,
      amount: order.amount,
      status: order.status,
    };

    localStorage.setItem("selectedOrder", JSON.stringify(cleanOrder));
    navigate("/delivery/get");
  };

  // 🔁 Auto refresh
  useEffect(() => {
    fetchAllOrders();
    const interval = setInterval(fetchAllOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="order"
      style={{ padding: "50px", background: "#eee" }}
      onClick={unlockAudio}
    >
      <audio ref={orderAudioRef} src="/Audios/order.mp3" preload="auto" />
      <audio ref={doneAudioRef} src="/Audios/done.mp3" preload="auto" />
      <audio ref={submitAudioRef} src="/Audios/submit2.mp3" preload="auto" />
      <audio ref={errorAudioRef} src="/Audios/error.mp3" preload="auto" />

      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={order._id}>
            <h4 className="order-number">Order #{index + 1}</h4>

            <img src={input.admin} alt="" />

            <div>
              <p className="order-item-food">
                Item Name -{" "}
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} = ${item.quantity}`
                    : `${item.name} = ${item.quantity}, `
                )}
              </p>

              <p className="order-item-name">
                Name - {order.address.firstName} {order.address.lastName}
              </p>

              <div className="order-item-add">
                <p>Gmail - {order.address.email}</p>
                <p>City - {order.address.city}</p>
                <p>Pincode - {order.address.zipcode}</p>
              </div>

              <div className="phone">
                <p>Number - {order.address.phone}</p>
                <p>Age - {order.address.age}</p>
                <p>Address - {order.address.address}</p>
              </div>
            </div>


            
            {order.assignedTo && typeof order.assignedTo === "object" && (
              <div className="assigned">
                <p><b>Assigned To:</b></p>
                <p>ID: {order.assignedTo._id}</p>
                <p>Special ID: {order.assignedTo.userSpecialId}</p>
                <p>Name: {order.assignedTo.name}</p>
                <p>Phone: {order.assignedTo.number}</p>
              </div>
            )}

            <p>
              {order.address.linkdata ? (
                <a
                  href={order.address.linkdata}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className="marker" src={input.admin} alt="" />
                  View Map
                </a>
              ) : (
                "No Map"
              )}
            </p>

            <p className="len">Items : {order.items.length}</p>
            <p className="amount">₹{order.amount}</p>


            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="Pickup">Pickup</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            <div className="topbtn">
              <button
                className="remove"
                onClick={() => removeOrder(order._id)}
              >
                Remove
              </button>

              <button
                className="removem"
                onClick={() => sendSingleOrder(order)}
              >
                Send
              </button>
            </div>
          </div>
        ))}
      </div>


      {newOrderPopup && (
        <div className="order-popup-overlay">
          <div className="order-popup">
            <h3>🆕 New Order</h3>

            <p>
              <b>Name:</b> {newOrderPopup.address.firstName}{" "}
              {newOrderPopup.address.lastName}
            </p>

            <ul>
              {newOrderPopup.items.map((item, i) => (
                <li key={i}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <p>
              <b>Amount:</b> ₹{newOrderPopup.amount}
            </p>

            <button onClick={() => receiveOrder(newOrderPopup._id)}>
              Receive
            </button>
            <button
              className="remove"
              onClick={() => cancelOrder(newOrderPopup._id)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;  //main and core code
*


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

const Order = () => {
  const storeId = "697df53ec26ff31e523578e9";

  const [orders, setOrders] = useState([]);
  const [knownOrderIds, setKnownOrderIds] = useState([]);
  const [popupOrder, setPopupOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔁 Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/orders/store/${storeId}`
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
      `http://localhost:3000/api/orders/${popupOrder._id}/status`,
      { status: "Accepted" }
    );
    setPopupOrder(null);
    fetchOrders();
  };

  // ❌ Reject Order
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
