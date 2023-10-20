import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import LoadingPage from "./../loadingPage/LoadingPage";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";

export default function Cart() {
  const [cartProducts, setcartProducts] = useState(null);

  const [numOfEachItemInCart, setnumOfEachItemInCart] = useState(0);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [cardId, setcardId] = useState(null);

  const {
    removeCardItem,
    updateProductQuantity,
    getLogedUserCart,
    setnumOfCartItems,
  } = useContext(CartContext);

  async function getLogedUserCartKobry() {
    const response = await getLogedUserCart();
    console.log(response);
    if (response.status === "success") {
      console.log(response.data.products);
      settotalCartPrice(response.data.totalCartPrice);
      setnumOfCartItems(response.numOfCartItems);
      setcartProducts(response.data.products);
      setcardId(response.data._id);
    }
  }

  async function removeCardItemKobry(productId) {
    const response = await removeCardItem(productId);
    console.log(response);
    if (response.data.status === "success") {
      toast.success("Product Removed from Your Cart Successfully");
      settotalCartPrice(response.data.data.totalCartPrice);
      setnumOfCartItems(response.data.numOfCartItems);
      setcartProducts(response.data.data.products);
      setcardId(response.data._id);
    }
  }

  async function UpdatecartQuantatyIncreaseKobry(productId, count) {
    const response = await updateProductQuantity(productId, count);
    if (response) {
      toast.success("Product Sent to Your Cart Successfully");
      console.log(response);
      setcartProducts(response.data.products);
      setnumOfCartItems(response.numOfCartItems);
      setnumOfEachItemInCart(response.data.products.count);
      settotalCartPrice(response.data.totalCartPrice);
    }
  }

  async function UpdatecartQuantatyDecreaseKobry(productId, count) {
    const response = await updateProductQuantity(productId, count);
    if (response) {
      toast.success("Product Sent to Your Cart Successfully");
      console.log(response);
      setcartProducts(response.data.products);
      setnumOfCartItems(response.numOfCartItems);
      setnumOfEachItemInCart(response.data.products.count);
      settotalCartPrice(response.data.totalCartPrice);
    }
  }

  // check when i open the app if there is a cart or no (the first thing rendered in the App is usecontext)
  useEffect(function () {
    getLogedUserCartKobry();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart </title>
      </Helmet>

      {cartProducts ? (
        <div className="container my-5 py-5">
          <div className="eldaf3 d-flex justify-content-between   ">
            <h2 className="m-2 text-muted ">
              total Card Price : <span>{totalCartPrice}</span> EGP{" "}
            </h2>

            <Link to="/Payment">
              {" "}
              <button className="btn btn-success m-2"> Confirm Payment </button>
            </Link>
          </div>

          {cartProducts.map(function (proooo, idx) {
            return (
              <div key={idx} className=" bg-light">
                <div className="products  row  rounded-3 border-bottom my-5">
                  <div className="img col-md-2 ">
                    <img
                      className="w-100"
                      src={proooo.product.imageCover}
                      alt="proooo.product.title"
                    />
                  </div>
                  <div className="besideImg col-md-8 ">
                    <h2 className="text-start"> {proooo.product.title} </h2>
                    <h5 className="text-start"> count : {proooo.count} </h5>
                    <h5 className="text-start">Price : {proooo.price} </h5>
                    <h6 className="text-start">ID : {proooo.product.id} </h6>
                    <button
                      className="btn m-0 p-0 text-start remove my-5 border"
                      onClick={function () {
                        removeCardItemKobry(proooo.product.id);
                      }}
                    >
                      {" "}
                      <i className="fa-regular fa-trash-can text-main text-start p-2 ">
                        {" "}
                      </i>
                      Remove Item{" "}
                    </button>
                  </div>

                  <div className="buttons col-md-2 d-flex justify-content-center align-items-center  ">
                    {" "}
                    <button
                      onClick={() =>
                        UpdatecartQuantatyIncreaseKobry(
                          proooo.product.id,
                          proooo.count + 1
                        )
                      }
                      className="btn btn-success "
                    >
                      +
                    </button>
                    <span className="mx-3">{proooo.count}</span>
                    <button
                      onClick={() =>
                        UpdatecartQuantatyDecreaseKobry(
                          proooo.product.id,
                          proooo.count - 1
                        )
                      }
                      className="btn btn-danger  "
                    >
                      {" "}
                      -{" "}
                    </button>
                  </div>

                  {/* {console.log(proooo)} */}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
