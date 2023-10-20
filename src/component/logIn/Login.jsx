import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import $, { error } from "jquery";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../logIn/Login.css";

export default function Login({ decodeUserData, crrUser }) {
  let user = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  async function logInUser(newUser) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",

        newUser
      );
      // console.log(data);

      if (data.message === "success") {
        navigate("/home");
        $(".success-msg").fadeIn(10000, function () {});
        localStorage.setItem("tkn", data.token);
        decodeUserData();
        // console.log(crrUser.name);
      }
    } catch (error) {
      console.log(error);
      $(".error-msg").html(error.response.data.message);
      $(".error-msg").fadeIn(500, function () {
        $(".error-msg").fadeOut(5000);
      });
    }
  }

  let formik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      logInUser(values);
    },

    validate: function (values) {
      let erros = {};

      if (!values.email.includes("@") || !values.email.includes(".com")) {
        erros.email = "Incorrect Email";
      }

      if (
        values.password.includes("@") == false ||
        values.password.length < 3
      ) {
        erros.password = "invalid password";
      }

      return erros;
    },
  });

  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <div className=" py-5">
        <div
          style={{ display: "none" }}
          className="alert alert-danger text-center error-msg"
        ></div>

        <div
          style={{ display: "none" }}
          className="alert alert-success text-center success-msg"
        >
          Log In successfull
        </div>

        <h3 className="fw-bold fs-2 text-main">Sign IN</h3>
        <form
          style={{ textAlign: "left" }}
          className="mt-5 fs-5 fw-bold "
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="email">E-mail</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            id="email"
            className="form-control mb-4"
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger text-center">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            id="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger text-center">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          <button className="btn btn-success mb-5 mt-2" type="submit">
            Log In
          </button>
        </form>
      </div>
    </>
  );
}
