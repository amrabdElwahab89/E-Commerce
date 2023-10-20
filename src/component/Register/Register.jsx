import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import $, { error } from "jquery";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Register() {
  let user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const navigate = useNavigate();
  async function registerNewUser(newUser) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        newUser
      );
      console.log(data);
      if (data.message === "success") {
        $(".success-msg").fadeIn(10000, function () {
          navigate("/login");
        });
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
      registerNewUser(values);
    },
    validate: function (values) {
      let erros = {};
      if (values.name.length > 8 || values.name.length < 3) {
        erros.name = "Invalid Name";
      }
      if (!values.email.includes("@") || !values.email.includes(".com")) {
        erros.email = "Invalid Email";
      }
      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        erros.phone = "invalid phone";
      }

      if (
        values.password.includes("@") == false ||
        values.password.length < 3
      ) {
        erros.password = "invalid password";
      }

      if (values.password !== values.rePassword) {
        erros.rePassword = "Passwords doesnot match";
      }

      return erros;
    },
  });

  return (
    <>
      <Helmet>
        <title>Register </title>
      </Helmet>
      <div className="container-fluid py-5">
        <div
          style={{ display: "none" }}
          className="alert alert-danger text-center error-msg"
        ></div>

        <div
          style={{ display: "none" }}
          className="alert alert-success text-center success-msg"
        >
          Register successfull
        </div>

        <h3 className=" fw-bolder text-muted mt-1 ">Register Now</h3>
        <form className="text-start mt-1" onSubmit={formik.handleSubmit}>
          <label className="fs-5 fw-bolder" htmlFor="name">
            Name
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="text"
            id="name"
            className="form-control mb-3"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger text-center">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label className="fs-5 fw-bolder" htmlFor="email">
            E-mail
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            id="email"
            className="form-control mb-3"
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger text-center">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label className="fs-5 fw-bolder" htmlFor="phone">
            Phone
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="tel"
            id="phone"
            className="form-control mb-3"
          />

          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger text-center">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}

          <label className="fs-5 fw-bolder" htmlFor="password">
            Password
          </label>
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

          <label className="fs-5 fw-bolder" htmlFor="rePassword">
            Re-password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type="password"
            id="rePassword"
            className="form-control mb-3"
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger text-center">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <button className="btn btn-success mt-1" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
