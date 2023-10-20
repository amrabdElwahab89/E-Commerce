import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";

export default function NavBar({ crrUser, clearDecodedUserData }) {
  const navigate = useNavigate();
  function noteYaPrinceDeTrickToUseclearDecodedUserDataAndNavigateToLoginPage() {
    clearDecodedUserData();
    navigate("/login");
  }

  const { numOfCartItems } = useContext(CartContext);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top mb-5">
        <div className="container">
          <Link className="navbar-brand " to="/">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 px-2 fw-bolder" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fs-5 px-2 fw-bolder" to="/brands">
                  Brands
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link fs-5 px-2 fw-bolder"
                  to="/AllOrders"
                ></Link>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {crrUser ? (
                <>
                  {/* {console.log(crrUser)} */}

                  <li className="nav-item position-relative ">
                    <Link className="nav-link" to="/cart">
                      <i className="fas fa-shopping-cart fa-2x"></i>
                      <span className="badge position-absolute top-0 end-0 bg-main text-black bg-success">
                        {" "}
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link fs-5 fw-bolder" to="Profile">
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <span
                      onClick={
                        noteYaPrinceDeTrickToUseclearDecodedUserDataAndNavigateToLoginPage
                      }
                      className="nav-link fs-5 fw-bolder logout"
                    >
                      {" "}
                      LogOut
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link fs-5 fw-bolder" to="Login">
                      LogIn
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link fs-5 fw-bolder" to="Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
