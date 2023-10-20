import React from "react";
import { Helmet } from "react-helmet";
import profilePic from "../../assets/images/user.webp";

export default function Profile({ crrUser }) {
  console.log(crrUser);
  return (
    <>
      <Helmet>
        <title>Profile </title>
      </Helmet>
      <h1 className="m-5">Welcome {crrUser.name}</h1>

      <div className="main row bg-light my-5">
        <div className=" col-md-4">
          <img className="w-100 mt-5 " src={profilePic} />
        </div>
        <div className=" col-md-8">
          <form className="text-start  my-5 py-5">
            <label className="fs-5 fw-bolder" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control mb-3"
              value={crrUser.name}
            />

            <label className="fs-5 fw-bolder" htmlFor="email">
              E-mail
            </label>
            <input type="email" id="email" className="form-control mb-3" />

            <label className="fs-5 fw-bolder" htmlFor="phone">
              Phone
            </label>
            <input type="tel" id="phone" className="form-control mb-3" />
          </form>
        </div>
      </div>
    </>
  );
}
