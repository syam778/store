
/*import React, { useEffect, useRef, useState, useContext } from "react";  // main and core code
import "./MyOrder.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { input } from "../../assets/output";


const MyOrder = () => {
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

export default MyOrder; 


import { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrder.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Replace with your store ID from MongoDB
  const storeId = "697df53ec26ff31e523578e9";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/order/store/${storeId}`
        );

        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          setError(res.data.message || "No orders found for this store");
        }
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
  if (orders.length === 0) return <p className="center-text">No orders for this store</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Orders for Your Store</h2>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID: {order._id.slice(-6)}</h3>
            <p>
              Status:{" "}
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </p>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <p>Payment: {order.payment ? "✅ Paid" : "❌ Pending"}</p>

            <div className="items-list">
              <h4>Items:</h4>
              {order.items.map((item) => (
                <div className="item-card" key={item._id}>
                  <img
                    src={`http://localhost:3000/uploads/${item.image}`}
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
              📍 {order.items[0]?.street}, {order.items[0]?.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
 

*
import { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrder.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storeId = "697df53ec26ff31e523578e9";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/order/store/${storeId}`
        );

        if (res.data?.success) {
          setOrders(res.data.data || []);
        } else {
          setError(res.data?.message || "No orders found");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [storeId]);

  if (loading) return <p className="center-text">Loading orders...</p>;
  if (error) return <p className="center-text">{error}</p>;
  if (!orders.length)
    return <p className="center-text">No orders for this store</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Orders for Your Store</h2>

      <div className="orders-grid">
        {orders.map((order, index) => {
          const items = order.items || [];

          const orderTotal = items.reduce(
            (sum, item) => sum + (item.amount || 0) * (item.quantity || 1),
            0
          );

          return (
            <div className="order-card" key={order._id}>
              <h3>Order #{index + 1}</h3>

              <p>
                <b>Order Id:</b> {order._id}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </p>

              <p>
                <b>Date:</b>{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              <p>
                <b>Payment:</b>{" "}
                {order.payment ? "✅ Paid" : "❌ Pending"}
              </p>

              <div className="items-list">
                <h4>Items (Only this store)</h4>

                {items.map((item, i) => (
                  <div className="item-card" key={i}>
                    <p className="item-name">🍔 {item.name}</p>

                    <img
                      src={`http://localhost:3000/images/${encodeURIComponent(
                        item.image
                      )}`}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />

                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.amount}</p>
                    <p>
                      Total: ₹{(item.amount || 0) * (item.quantity || 1)}
                    </p>

                    <p style={{ fontSize: "12px" }}>
                      StoreId: {item.storeIdRef}
                    </p>
                  </div>
                ))}
              </div>

              <p className="order-total">🧾 Order Total: ₹{orderTotal}</p>

              <p className="order-address">
                📍 {order.address?.street || "N/A"}, {order.address?.city || "N/A"}{" "}
                - {order.address?.zipcode || ""}
              </p>

              <p>
                <b>Customer:</b> {order.address?.firstName}{" "}
                {order.address?.lastName}
              </p>

              <p>📞 Phone: {order.address?.phone || "N/A"}</p>

              {order.assignedTo && typeof order.assignedTo === "object" && (
                <div className="assigned">
                  <p>
                    <b>Assigned To:</b>
                  </p>
                  <p>Name: {order.assignedTo.name}</p>
                  <p>📞 Phone: {order.assignedTo.number}</p>
                  <p>ID: {order.assignedTo.userSpecialId}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder; //not try
*


import { useEffect, useState } from "react";  //good code item problem 
import axios from "axios";
import "./MyOrder.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Store ID (your store)
  const storeId = "697df53ec26ff31e523578e9";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:3000/api/order/store/${storeId}`
        );

        if (res.data?.success) {
          setOrders(res.data.data || []);
        } else {
          setError(res.data?.message || "No orders found");
        }
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
  if (!orders.length) return <p className="center-text">No orders for this store</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Orders for Your Store</h2>

      <div className="orders-grid">
        {orders.map((order, index) => {
          const items = order.items || [];

          // ✅ total calculate
          const orderTotal = items.reduce((sum, item) => {
            const price = item.price || item.amount || 0;
            const qty = item.quantity || 1;
            return sum + price * qty;
          }, 0);

          return (
            <div className="order-card" key={order._id}>
              <h3>Order #{index + 1}</h3>

              <p>
                <b>Order Id:</b> {order._id}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span className={`status ${order.status || "pending"}`}>
                  {order.status || "pending"}
                </span>
              </p>

              <p>
                <b>Date:</b>{" "}
                {order.date ? new Date(order.date).toLocaleString() : "N/A"}
              </p>

              <p>
                <b>Payment:</b>{" "}
                {order.paymentStatus === "SUCCESS" || order.payment === true
                  ? "✅ Paid"
                  : "❌ Pending"}
              </p>

              
              <div className="items-list">
                <h4>Items</h4>

                {items.length > 0 ? (
                  items.map((item, i) => {
                    const price = item.price || item.amount || 0;
                    const qty = item.quantity || 1;

                    return (
                      <div className="item-card" key={i}>
                        <img
                          className="item-img"
                          src={`http://localhost:3000/images/${encodeURIComponent(
                            item.image || ""
                          )}`}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80";
                          }}
                        />

                        <div className="item-info">
                          <p className="item-name">🍔 {item.name}</p>
                          <p>Qty: {qty}</p>
                          <p>Price: ₹ {price}</p>
                          <p>
                            Item Total: ₹ {price * qty}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No items found</p>
                )}
              </div>

              <p className="order-total">🧾 Order Total: ₹{orderTotal}</p>

              
              <p className="order-address">
                📍 {order.address?.address || order.address?.street || "N/A"},{" "}
                {order.address?.city || "N/A"} – {order.address?.zipcode || ""}
              </p>

              <p>
                <b>Customer:</b> {order.address?.firstName || ""}{" "}
                {order.address?.lastName || ""}
              </p>

              <p>📞 Phone: {order.address?.phone || "N/A"}</p>

            
              {order.assignedTo && typeof order.assignedTo === "object" && (
                <div className="assigned">
                  <p>
                    <b>Assigned To:</b>
                  </p>
                  <p>ID: {order.assignedTo._id}</p>
                  <p>Name: {order.assignedTo.name}</p>
                  <p>📞 Phone: {order.assignedTo.number}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;

*/

import { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrder.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Store ID (your store)
  const storeId = "697df53ec26ff31e523578e9";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `http://localhost:3000/api/order/store/${storeId}`
        );

        if (res.data?.success) {
          setOrders(res.data.data || []);
        } else {
          setOrders([]);
          setError(res.data?.message || "No orders found");
        }
      } catch (err) {
        console.error(err);
        setOrders([]);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [storeId]);

  if (loading) return <p className="center-text">Loading orders...</p>;
  if (error) return <p className="center-text">{error}</p>;

  // ✅ Filter orders: show only orders that contain this store items
  const filteredOrders = (orders || [])
    .map((order) => {
      const filteredItems = (order.items || []).filter(
        (item) => item.storeId === storeId
      );

      return {
        ...order,
        items: filteredItems,
      };
    })
    .filter((order) => order.items.length > 0);

  if (!filteredOrders.length)
    return <p className="center-text">No orders for this store</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Orders for Your Store</h2>

      <div className="orders-grid">
        {filteredOrders.map((order, index) => {
          const items = order.items || [];

          // ✅ Total calculate only this store items
          const orderTotal = items.reduce((sum, item) => {
            const price = item.price || item.amount || 0;
            const qty = item.quantity || 1;
            return sum + price * qty;
          }, 0);

          return (
            <div className="order-card" key={order._id}>
              <h3>Order #{index + 1}</h3>

              <p>
                <b>Order Id:</b> {order._id}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span className={`status ${order.status || "pending"}`}>
                  {order.status || "pending"}
                </span>
              </p>

              <p>
                <b>Date:</b>{" "}
                {order.date ? new Date(order.date).toLocaleString() : "N/A"}
              </p>

              <p>
                <b>Payment:</b>{" "}
                {order.paymentStatus === "SUCCESS" || order.payment === true
                  ? "✅ Paid"
                  : "❌ Pending"}
              </p>

              {/* ✅ Items only this store */}
              <div className="items-list">
                <h4>Items (Only Your Store)</h4>

                {items.length > 0 ? (
                  items.map((item, i) => {
                    const price = item.price || item.amount || 0;
                    const qty = item.quantity || 1;

                    return (
                      <div className="item-card" key={i}>
                        <img
                          className="item-img"
                          src={`http://localhost:3000/images/${encodeURIComponent(
                            item.image || ""
                          )}`}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80";
                          }}
                        />

                        <div className="item-info">
                          <p className="item-name">🍔 {item.name}</p>
                          <p>Qty: {qty}</p>
                          <p>Price: ₹ {price}</p>
                          <p>Item Total: ₹ {price * qty}</p>
                          <p>
                            <b>StoreId:</b> {item.storeId}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No items found</p>
                )}
              </div>

              <p className="order-total">🧾 Store Total: ₹{orderTotal}</p>

              {/* ✅ Address */}
              <p className="order-address">
                📍 {order.address?.address || order.address?.street || "N/A"},{" "}
                {order.address?.city || "N/A"} – {order.address?.zipcode || ""}
              </p>

              <p>
                <b>Customer:</b> {order.address?.firstName || ""}{" "}
                {order.address?.lastName || ""}
              </p>

              <p>📞 Phone: {order.address?.phone || "N/A"}</p>

              {/* ✅ Assigned Delivery Boy */}
              {order.assignedTo && typeof order.assignedTo === "object" && (
                <div className="assigned">
                  <p>
                    <b>Assigned To:</b>
                  </p>
                  <p>ID: {order.assignedTo._id}</p>
                  <p>Name: {order.assignedTo.name}</p>
                  {order?.assignedTo?.number && (
                    <a href={`tel:${order.assignedTo.number}`} className="call-btn">
                      📞 Call Customer
                    </a>
                  )}


                  <p>📞 Phone: {order.assignedTo.number}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
