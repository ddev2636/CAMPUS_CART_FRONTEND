import React, { useReducer, useContext, useState, useEffect } from "react";
import reducer from "./reducer.js";
import axios from "axios";
import { TOGGLE_SIDEBAR } from "./action.js";
import { BASE_URL_PRODUCT, BASE_URL_AUTH } from "../config.js";

import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  DISPLAY_ALERT,
  SELL_ITEM_SUCCESS,
  SELL_ITEM_ERROR,
} from "./action";

// Retrieve user and cart from localStorage if available
const user = localStorage.getItem("user");
const savedCart = localStorage.getItem("cart");
const savedWish = localStorage.getItem("wishlist");

const initialState = {
  isLoading: false,
  showSidebar: false,
  user: user ? JSON.parse(user) : null,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [item, setItem] = useState("");
  const [cart, setCart] = useState(savedCart ? JSON.parse(savedCart) : []); // Retrieve cart from localStorage
  const [wish, setWish] = useState(savedWish ? JSON.parse(savedWish) : []);
  const [alert, setAlert] = useState("");

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const addUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const registerUser = async (currentUser) => {
    try {
      console.log("hello");
      const response = await axios.post(
        `${BASE_URL_AUTH}/api/v1/auth/register`,
        currentUser
      );
      const { user } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user },
      });
      addUserToLocalStorage(user);
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response?.data.msg },
      });
    }
  };

  const loginUser = async (currentUser) => {
    try {
      const response = await axios.post(
        `${BASE_URL_AUTH}/api/v1/auth/login`,
        currentUser
      );
      const { user } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user },
      });
      addUserToLocalStorage(user);
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const sellItem = async (allData) => {
    console.log(allData);
    try {
      const response = await axios.post(
        `${BASE_URL_PRODUCT}/api/v1/item/sell`,
        allData,
        { withCredentials: true }
      );
      const { things } = response.data;
      dispatch({ type: SELL_ITEM_SUCCESS, payload: { things } });
    } catch (error) {
      dispatch({
        type: SELL_ITEM_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const buyItem = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL_PRODUCT}/api/v1/item`, {
        withCredentials: true,
      });
      setItem(data);
    } catch (error) {
      console.log("some error");
    }
  };

  const handleCart = (itemToAdd) => {
    const updatedCart = [...cart, itemToAdd];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to localStorage
    setAlert("Item Added to the Cart");
  };

  const delCart = (Id) => {
    const updatedCart = cart.filter((item) => item._id !== Id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to localStorage
    setAlert("Item Added to the Cart");
  };

  const handleWish = (itemToAdd) => {
    const updatedWish = [...wish, itemToAdd];
    setWish(updatedWish);
    localStorage.setItem("wishlist", JSON.stringify(updatedWish)); // Save updated wishlist to localStorage
    setAlert("Item Added to the Wishlist");
  };
  const delWish = (Id) => {
    const updatedWish = wish.filter((item) => item._id !== Id);
    setWish(updatedWish);
    localStorage.setItem("wishlist", JSON.stringify(updatedWish)); // Save updated wishlist to localStorage
    setAlert("Item Removed from the Wishlist");
  };

  var checkoutItems = cart.map((item) => ({
    name: item.name,
    price: item.price,
  }));

  const checkout_func = () => {
    fetch(`${BASE_URL_PRODUCT}/api/v1/stripe/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: checkoutItems,
      }),
    })
      .then(async (res) => {
        if (res.ok) return await res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => setAlert(""), 2000);
    return () => clearTimeout(timer);
  }, [cart, wish]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleSidebar,
        registerUser,
        loginUser,
        logoutUser,
        displayAlert,
        sellItem,
        buyItem,
        item,
        delCart,
        delWish,
        handleCart,
        cart,
        setCart,
        handleWish,
        wish,
        setWish,
        checkout_func,
        alert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
