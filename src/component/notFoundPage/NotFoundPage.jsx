import React from "react";
import imgg from "../../assets/images/notFound.jpg=.webp";
import { Helmet } from "react-helmet";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="container">
        <img src={imgg} alt="Not Found" />
      </div>
    </>
  );
}
