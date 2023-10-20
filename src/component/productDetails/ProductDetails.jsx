import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import $ from "jquery";
import { Helmet } from "react-helmet";
import LoadingPage from "../loadingPage/LoadingPage";
import { toast } from "react-hot-toast";
import Slider from "react-slick";

export default function ProductDetails() {
  const { addProductToCart, removeCardItem } = useContext(CartContext);

  async function addMyProduct(id) {
    if (await addProductToCart(id)) {
      toast.success("Product Sent to Your Cart Successfully");

      $("#delButton").fadeIn(500);
      $("#addButton").fadeOut(500);
    }
  }

  async function removeMyProduct(id) {
    if (await removeCardItem(id)) {
      toast.success("Product Removed from Your Cart Successfully");
      $("#delButton").fadeOut(500);
      $("#addButton").fadeIn(500);
    }
  }

  const { id } = useParams();

  const [productDetails, setproductDetails] = useState(null);

  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      console.log(data);
      setproductDetails(data.data);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(function () {
    getProductDetails();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>

      {productDetails ? (
        <div className="  productDetailss container">
          <div className="row">
            <div className="col-md-3">
              <Slider {...settings}>
                {productDetails?.images.map((img, index) => (
                  <img src={img} key={index} alt={`Image ${index}`} />
                ))}
              </Slider>
            </div>

            <div className="col-md-9">
              <h2 className="fw-bold mb-5"> {productDetails.title} </h2>
              <h4 className="mb-3 text-muted">{productDetails.description}</h4>
              <h4 className="mb-3 text-muted">
                {" "}
                Product Price : {productDetails.price}
              </h4>
              <h4 className="mb-3 text-muted">
                Store quantity: {productDetails.quantity}
              </h4>
              <h4 className="mb-3 text-muted">ID: {productDetails.id}</h4>

              <button
                onClick={function () {
                  addMyProduct(productDetails.id);
                }}
                className="btn btn-success mt-5 w-100"
                id="addButton"
              >
                Add Product to cart
              </button>
              <button
                onClick={function () {
                  removeMyProduct(productDetails.id);
                }}
                style={{ display: "none" }}
                className="btn btn-danger w-100"
                id="delButton"
              >
                {" "}
                Remove Product from cart
              </button>

              <div
                style={{ display: "none" }}
                className="alert alert-success text-center successMsg"
              >
                {" "}
                Product Added Successfully{" "}
              </div>
              <div
                style={{ display: "none" }}
                className="alert alert-danger text-center deleteMsg"
              >
                {" "}
                Product Removed Successfully{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
