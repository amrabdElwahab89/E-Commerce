import React from "react";
export default function Footer() {
  return (
    <>
      <footer className=" footer bg-light ">
        <div className="  fs-4  py-2">
          <li className=" d-flex align-items-center justify-content-end mx-5   ">
            <i className="fab fa-facebook mx-1"></i>
            <i className="fab fa-instagram mx-1"></i>
            <i className="fab fa-twitter mx-1"></i>
            <i className="fab fa-youtube mx-1"></i>
          </li>
        </div>

        {/* <div className="container d-flex justify-content-between">
          <input
            type="text"
            placeholder="Enter your Email"
            className="form-control w-75"
          />
          <button className="btn btn-danger">Enter your Email</button>
        </div> */}

        <div className="container-fluid border-bottom border-top border-2 border-dark py-2 d-flex justify-content-between">
          <div className="leftside">
            <ul className="list-unstyled d-flex align-items-center ">
              <li>
                <h6 className="me-3 my-1 fs-4"> Payment Partners </h6>
              </li>
              <li>
                <i className=" fs-5 fa-brands fa-cc-paypal me-3 text-primary"></i>
              </li>
              <li>
                <i className=" fs-5 fa-brands fa-cc-mastercard me-3 text-primary"></i>
              </li>
              <li>
                <i className=" fs-5 fa-brands fa-cc-mastercard me-3 text-primary"></i>
              </li>
            </ul>
          </div>
          <div className="rightside d-flex align-items-center ">
            <button className="btn btn-dark mx-2">
              <i className="fa-brands fa-apple"></i>
              <span>Avilable on app store</span>{" "}
            </button>

            <button className="btn btn-dark">
              <i className="fa-brands fa-apple"></i>
              <span>Avilable on app store</span>{" "}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
