/*
import React, { useState, useContext } from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { input } from "../../assets/output";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { url,doneAudio,wonAudio,addAudio,timeAudio, } = useContext(StoreContext);

  // Get full store data from Verify page
  const store = location.state?.store;

  if (!store) {
    return <p>No store data found. Please verify first.</p>;
  }

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Vegetable",
    firstName: store.storeName || "",
    phone: store.phone || "",
    street: store.street || "",
    city: store.city || "",
    linkdata: store.linkdata || "",
  });

  const errorAudio = new Audio("/Audios/error.mp3");
  const submitAudio = new Audio("/Audios/submit2.mp3");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const goToListPage = () => {
    navigate("/list");
    
    submitAudio.play();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload product image");
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === "price" ? Number(value) : value);
    });

    formData.append("image", image);
    formData.append("storeIdRef", store._id); // store ID required
    formData.append("createdBy", "store");    // explicitly set store role

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        toast.success(response.data.message);
        submitAudio.play();

        // Reset form
        setData({
          name: "",
          description: "",
          price: "",
          category: "Vegetable",
          firstName: store.storeName || "",
          phone: store.phone || "",
          street: store.street || "",
          city: store.city || "",
          linkdata: store.linkdata || "",
        });
        setImage(null);
        doneAudio.play();
        

      } else {
        toast.error(response.data.message);
        errorAudio.play();
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
      errorAudio.play();
    }
  };

  return (
    <div className="add">
      <div className="store-info">
        <h2>Store Info</h2>
        {Object.entries(store).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {JSON.stringify(value)}
          </p>
        ))}
      </div>
      

      <form className="form1" onSubmit={onSubmitHandler}>
        <button type="button" className="list-btn" onClick={goToListPage}>
          View List Items
        </button>

        <div className="add-img-up">
          <p>Product Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : input.admin}
              alt="upload"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="section">
          <h3>Product Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
          <textarea
            name="description"
            rows="5"
            placeholder="Product Description"
            value={data.description}
            onChange={onChangeHandler}
            required
          />
          <select
            name="category"
            value={data.category}
            onChange={onChangeHandler}
          >
            <option value="Vegetable">Vegetable</option>
            <option value="MilkProduct">Milk Product</option>
            <option value="Oil">Oil</option>
            <option value="NonVeg">Non Veg</option>
            <option value="GroceryItems">Grocery Items</option>
            <option value="FreshProduct">Fresh Product</option>
            <option value="ColdDrinks">Cold Drinks</option>
            <option value="FoodItems">Food Items</option>
            <option value="IceCream">Ice Cream</option>
            <option value="Offers">Offers</option>
            <option value="GarmentsItems">Garments</option>
            <option value="SportsProduct">Sports</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={data.price}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="section">
          <h3>Store Details</h3>
          <input
            type="text"
            name="firstName"
            placeholder="Store Name"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="number"
            name="phone"
            placeholder="Store Phone"
            value={data.phone}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street / Area"
            value={data.street}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="section">
          <h3>Map Navigation</h3>
          <input
            type="text"
            name="linkdata"
            placeholder="Google Map Link"
            value={data.linkdata}
            onChange={onChangeHandler}
            required
          />
          <small>Paste your store Google Map link</small>
        </div>

        <button type="submit" className="add-btn">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;
*/
import React, { useState, useContext } from "react";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { input } from "../../assets/output";
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { url, doneAudio } = useContext(StoreContext);

  // ✅ Get full store data from Verify page
  const store = location.state?.store;

  // ✅ If store not found
  if (!store) {
    return <p>No store data found. Please verify first.</p>;
  }

  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Vegetable",

    // store details
    firstName: store.storeName || store.name || "",
    phone: store.phone || "",
    street: store.street || "",
    city: store.city || "",
    linkdata: store.linkdata || "",
  });

  const errorAudio = new Audio("/Audios/error.mp3");
  const submitAudio = new Audio("/Audios/submit2.mp3");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Go to list page and send storeId
  const goToListPage = () => {
    submitAudio.play();

    navigate("/list", {
      state: {
        storeId: store._id, // ✅ sending storeId
        store: store,       // optional
      },
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload product image");
      errorAudio.play();
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === "price" ? Number(value) : value);
    });

    formData.append("image", image);

    // ✅ IMPORTANT
    formData.append("storeIdRef", store._id);
    formData.append("createdBy", "store");

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        toast.success(response.data.message);
        submitAudio.play();

        // ✅ Reset form but keep store details
        setData({
          name: "",
          description: "",
          price: "",
          category: "Vegetable",

          firstName: store.storeName || store.name || "",
          phone: store.phone || "",
          street: store.street || "",
          city: store.city || "",
          linkdata: store.linkdata || "",
        });

        setImage(null);
        doneAudio.play();
      } else {
        toast.error(response.data.message);
        errorAudio.play();
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
      errorAudio.play();
    }
  };

  return (
    <div className="add">
      {/* ✅ Store Info */}
      <div className="store-info">
        <h2>Store Info</h2>
        {Object.entries(store).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {JSON.stringify(value)}
          </p>
        ))}
      </div>

      <form className="form1" onSubmit={onSubmitHandler}>
        {/* ✅ Go List Button */}
        <button type="button" className="list-btn" onClick={goToListPage}>
          View List Items
        </button>

        {/* Upload Image */}
        <div className="add-img-up">
          <p>Product Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : input.admin}
              alt="upload"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Product Details */}
        <div className="section">
          <h3>Product Details</h3>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />

          <textarea
            name="description"
            rows="5"
            placeholder="Product Description"
            value={data.description}
            onChange={onChangeHandler}
            required
          />

          <select
            name="category"
            value={data.category}
            onChange={onChangeHandler}
          >
            <option value="Vegetable">Vegetable</option>
            <option value="MilkProduct">Milk Product</option>
            <option value="Oil">Oil</option>
            <option value="NonVeg">Non Veg</option>
            <option value="GroceryItems">Grocery Items</option>
            <option value="FreshProduct">Fresh Product</option>
            <option value="ColdDrinks">Cold Drinks</option>
            <option value="FoodItems">Food Items</option>
            <option value="IceCream">Ice Cream</option>
            <option value="Offers">Offers</option>
            <option value="GarmentsItems">Garments</option>
            <option value="SportsProduct">Sports</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={data.price}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Store Details */}
        <div className="section">
          <h3>Store Details</h3>

          <input
            type="text"
            name="firstName"
            placeholder="Store Name"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />

          <input
            type="number"
            name="phone"
            placeholder="Store Phone"
            value={data.phone}
            onChange={onChangeHandler}
            required
          />

          <input
            type="text"
            name="street"
            placeholder="Street / Area"
            value={data.street}
            onChange={onChangeHandler}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Map Link */}
        <div className="section">
          <h3>Map Navigation</h3>

          <input
            type="text"
            name="linkdata"
            placeholder="Google Map Link"
            value={data.linkdata}
            onChange={onChangeHandler}
            required
          />

          <small>Paste your store Google Map link</small>
        </div>

        <button type="submit" className="add-btn">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;
