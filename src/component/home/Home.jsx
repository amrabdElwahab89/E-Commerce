import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import img from "../../assets/images/download.png";
import { Link } from "react-router-dom";
import LoadingPage from "./../loadingPage/LoadingPage";
import { Helmet } from "react-helmet";
import { CartContext } from "./../../context/CartContext";
import $ from "jquery";
import { toast } from "react-hot-toast";
import Categories from "../categories/Categories";

export default function Home() {
  const [allProducts, setallProducts] = useState(null);
  const { addProductToCart, numOfCartItems, setnumOfCartItems } =
    useContext(CartContext);

  async function getAllProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );

      setallProducts(data.data);
      console.log(data);
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function addProductToCartKobry(proId) {
    const response = await addProductToCart(proId);
    if (response) {
      toast.success("Product Sent to Your Cart Successfully");

      console.log("addMyProductsSha3l 02");
    }
  }

  async function removeMyProduct(proId) {
    if (await removeCardItem(proId)) {
      toast.success("Product Removed from Your Cart Successfully");
      $("#delButton").fadeOut(500);
      $("#addButton").fadeIn(500);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home </title>
      </Helmet>

      {/* <h1 className="m-5  p-5 bg-primary">
        {" "}
        Number of cart items :{numOfCartItems}{" "}
      </h1> */}

      <Categories />
      {allProducts ? (
        <div className="bg-body-secondary bg-opacity-25">
          <div className="row">
            {allProducts.map(function (product, idx) {
              return (
                <div className="col-md-2 my-2" key={idx}>
                  <div className="product p-2  ">
                    <h5 className="text-muted  text-right d-flex justify-content-end">
                      {" "}
                      <div className="sec">
                        {" "}
                        <span className=" fas fa-star text-warning"></span>{" "}
                        {product.ratingsAverage}
                      </div>
                    </h5>
                    <Link to={`/productDetails/${product.id}`}>
                      <img className="w-100" src={product.imageCover} alt="" />
                      <h4 className="text-muted mb-3">
                        {product.title.split(" ").slice(0, 3).join(" ")}
                      </h4>
                      <h4 className="">{product.price} EGP</h4>
                    </Link>
                    <button
                      id={`addBtn${idx}`}
                      onClick={function () {
                        addProductToCartKobry(product.id, idx);
                      }}
                      className="btn btn-success w-75"
                    >
                      {" "}
                      + Add Product
                    </button>
                    <button
                      id={`removeBtn${idx}`}
                      style={{ display: " none" }}
                      className="btn btn-danger w-75"
                      onClick={function () {
                        removeMyProduct(product.id, idx);
                      }}
                    >
                      {" "}
                      - Remove Product{" "}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
