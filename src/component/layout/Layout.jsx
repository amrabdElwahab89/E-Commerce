import React from "react";
NavBar;
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import CartContextProvider, { CartContext } from "../../context/CartContext";

export default function Layout({ crrUser, clearDecodedUserData }) {
  return (
    <>
      <div className="container-fluid">
        <CartContextProvider>
          <NavBar
            crrUser={crrUser}
            clearDecodedUserData={clearDecodedUserData}
          />
        </CartContextProvider>

        <Outlet />

        <Footer />
      </div>
    </>
  );
}
