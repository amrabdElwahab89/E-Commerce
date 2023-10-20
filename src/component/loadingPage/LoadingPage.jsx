import React from "react";
import { Helmet } from "react-helmet";

export default function LoadingPage() {
  return (
    <>
      <div className="loadScreen vh-100 bg- bg-opacity-50 d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-spinner fa-spin fa-7x"></i>
      </div>
    </>
  );
}
