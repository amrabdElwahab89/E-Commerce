import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import imggg from ".././/../assets/images/slider-image-1.jpeg";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

export default function Categories() {
  const [allCategories, setallCategories] = useState(null);

  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setallCategories(data.data);
    } catch (error) {
      console.log("error:", error);
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="container categoriesss">
        <Slider {...settings}>
          {allCategories?.map((categoriesss, indx) => (
            <div className="main" key={indx}>
              <div className="categoriies">
                <img src={categoriesss.image} />
              </div>
              <h6 className="text-muted mt-3">{categoriesss.name}</h6>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
