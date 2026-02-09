/*
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

export default MyOrder; // main and code
*/

import { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrder.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [collapsedOrders, setCollapsedOrders] = useState({});
  const [hiddenOrders, setHiddenOrders] = useState({}); // Track hidden orders

  const storeId = "697df53ec26ff31e523578e9";

  const toggleCollapse = (orderId) => {
    setCollapsedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const hideOrder = (orderId) => {
    setHiddenOrders((prev) => ({
      ...prev,
      [orderId]: true,
    }));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(
          `http://localhost:3000/api/order/store/${storeId}`
        );

        if (res.data?.success) {
          const ordersWithDefaultCollapse = res.data.data.map((order) => ({
            ...order,
            isCollapsed:
              order.status === "DELIVERED" || order.status === "CANCELLED",
          }));
          setOrders(ordersWithDefaultCollapse);
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

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Orders for Your Store</h2>

      <div className="orders-grid">
        {orders
          .filter((order) => !hiddenOrders[order._id]) // hide orders flagged
          .map((order, index) => {
            const items = order.items || [];
            const orderTotal = items.reduce((sum, item) => {
              const price = item.price || item.amount || 0;
              const qty = item.quantity || 1;
              return sum + price * qty;
            }, 0);

            const isCollapsed =
              collapsedOrders[order._id] !== undefined
                ? collapsedOrders[order._id]
                : order.status === "DELIVERED" || order.status === "CANCELLED";

            return (
              <div className="order-card" key={order._id}>
                {/* Header */}
                <div
                  className="order-header"
                  onClick={() => toggleCollapse(order._id)}
                >
                  <h3>Order #{index + 1}</h3>
                  <div>
                    <span className={`status ${order.status || "pending"}`}>
                      {order.status || "pending"}
                    </span>
                    <button className="toggle-btn">
                      {isCollapsed ? "🔽" : "🔼"}
                    </button>
                    <button
                      className="hide-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent collapse toggle
                        hideOrder(order._id);
                      }}
                    >
                      🗑 Hide
                    </button>
                  </div>
                </div>

                {/* Collapsible content */}
                {!isCollapsed && (
                  <div className="order-details">
                    <p>
                      <b>Order Id:</b> {order._id}
                    </p>

                    <p>
                      <b>Date:</b>{" "}
                      {order.date
                        ? new Date(order.date).toLocaleString()
                        : "N/A"}
                    </p>

                    <p>
                      <b>Payment:</b>{" "}
                      {order.paymentStatus === "SUCCESS" ||
                      order.payment === true
                        ? "✅ Paid"
                        : "❌ Pending"}
                    </p>

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
                                  e.target.src =
                                    "https://via.placeholder.com/80";
                                }}
                              />
                              <div className="item-info">
                                <p className="item-name">🍔 {item.name}</p>
                                <p>Qty: {qty}</p>
                                <p>Price: ₹ {price}</p>
                                <p>Item Total: ₹ {price * qty}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p>No items found</p>
                      )}
                    </div>

                    <p className="order-total">🧾 Store Total: ₹{orderTotal}</p>

                    <p className="order-address">
                      📍 {order.address?.address || order.address?.street || "N/A"},{" "}
                      {order.address?.city || "N/A"} –{" "}
                      {order.address?.zipcode || ""}
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
                        {order?.assignedTo?.number && (
                          <a
                            href={`tel:${order.assignedTo.number}`}
                            className="call-btn"
                          >
                            📞 Call
                          </a>
                        )}
                      </div>
                    )}
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
