import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $, { data, error } from "jquery";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const nav = useNavigate();
  const [numOfCartItems, setnumOfCartItems] = useState(0);

  async function updateProductQuantity(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers: { token: localStorage.getItem("tkn") } }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error.response.data.message);
        return error;
      });
  }

  async function addProductToCart(proId) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: proId },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setnumOfCartItems(response.data.numOfCartItems);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function getLogedUserCart() {
    return await axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/cart",

        { headers: { token: localStorage.getItem("tkn") } }
      )
      .then((response) => {
        console.log(response);
        setnumOfCartItems(response.data.numOfCartItems);
        return response.data;
      })
      .catch((error) => {
        console.error(error.response.data.message);
        return error;
      });
  }

  async function removeCardItem(productId) {
    return await axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

        { headers: { token: localStorage.getItem("tkn") } }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error.response.data.message);
        return error;
      });
  }

  useEffect(() => {
    getLogedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        removeCardItem,
        updateProductQuantity,
        getLogedUserCart,
        addProductToCart,
        setnumOfCartItems,
        numOfCartItems,
      }}
    >
      <div style={{ display: "none" }} className="alert alert-danger errorCart">
        {" "}
        No Cart for this User{" "}
      </div>

      {children}
    </CartContext.Provider>
  );
}
