import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LoadingPage from "./../loadingPage/LoadingPage";
export default function AllOrders({ crrUser }) {
  const [clientOrders, setclientOrders] = useState(null);
  

  function getCrruentUserData() {
    console.log(crrUser);
  }

  async function getAllOrders() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/644d4312ecc01400346b84bd`
      );

      console.log(data);
      setclientOrders(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(function () {
    getAllOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>

      <h3 className="bg-danger my-5">All Orders ya {crrUser.name} </h3>

      {clientOrders ? (
        <div className="container my-5">
          <div className="row">
            {clientOrders.map(function (proooo, idx) {
              return (
                <div key={idx} className="col-md-3 bg-light">
                  <div className="item bg-danger rounded-3 my-3 text-center">
                    {clientOrders.cartItems ? (
                      <div className="container">
                        <div className="row">
                          {clientOrders.cartItems.map(function (itemss, idxx) {
                            return (
                              <div key={idxx} className="col-md-3 bg-light">
                                <div className="subItems bg-danger rounded-3 my-3 text-center">
                                  <img
                                    className="w-100"
                                    src={itemss.product.imageCover}
                                    alt={itemss.product.title}
                                  />
                                  <h6>{itemss.product.title}</h6>
                                  <h6>{itemss.count}</h6>
                                  <h6>{itemss.price}</h6>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <LoadingPage />
                    )}

                    <h6 className="text-black">
                      Price: {proooo.totalOrderPrice}
                    </h6>
                    <h6 className="text-black">Order Type :{proooo.id}</h6>
                    <p>
                      this shipping was delivered to (
                      {proooo.shippingAddress.details}) in (
                      {proooo.shippingAddress.city}) with this Phone Number (
                      {proooo.shippingAddress.phone})
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}

      <button onClick={getCrruentUserData} className="btn btn-danger ">
        {" "}
        getCrruentUserData{" "}
      </button>
      <button onClick={getAllOrders} className="btn btn-danger mx-5 ">
        {" "}
        getAllOrders{" "}
      </button>
    </>
  );
}
