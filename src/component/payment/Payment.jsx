import axios from "axios";
import React, { useContext } from "react";
import $ from "jquery";
import { CartContext } from "../../context/CartContext";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingPage from "./../loadingPage/LoadingPage";

export default function Payment() {
  const { cardId } = useContext(CartContext);
  const nav = useNavigate();

  async function confirmCashOrder() {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,
        {
          shippingAddress: {
            details: document.querySelector("#details").value,
            phone: document.querySelector("#phone").value,
            city: document.querySelector("#city").value,
          },
        },
        { headers: { token: localStorage.getItem("tkn") } }
      );

      if (data.status === "success") {
        nav("/allorders");
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  return (
    <>
      {cardId ? (
        <form className="container">
          <label htmlFor="details">Address Details</label>
          <input
            className="form-control mb-3"
            type="text"
            id="details"
            name="details"
            placeholder=" Enter Address Details"
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            className="form-control mb-3"
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter Phone Number"
          />

          <label htmlFor="city">City Name </label>
          <input
            className="form-control mb-3"
            type="text"
            id="city"
            name="city"
            placeholder="Enter City Name"
          />

          <button onClick={confirmCashOrder} className="btn btn-primary mb-5">
            Confirm Order{" "}
          </button>
        </form>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
