import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import ecomLOGO from "../IMGS/ecomLOGO.jpg"
import hs1IMG from "../IMGS/hs1IMG.jpg"
import hs2IMG from "../IMGS/hs2IMG.jpg"
import hs3IMG from "../IMGS/hs3IMG.jpg"
import hs4IMG from "../IMGS/hs4IMG.jpg"
import hs5IMG from "../IMGS/hs5IMG.jpg"


const Home_slider=()=>{
    
    const NextArrow=(props)=>{
        return(
            <div onClick={props.onClick} className="slider_next_arrow">▶</div>
        )
    }
    const PrevArrow=(props)=>{
        return(
            <div  onClick={props.onClick} className="slider_prev_arrow">◀</div>
        )
    }
   
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };



    return(
            <>
                <div className="slider_main_container">
                    <Slider {...settings}>

                        <img src={hs1IMG} className="slider_img" alt="img" />
                        <img src={hs2IMG} className="slider_img" alt="img" />
                        <img src={hs3IMG} className="slider_img" alt="img" />
                        <img src={hs4IMG} className="slider_img" alt="img" />
                        <img src={hs5IMG} className="slider_img" alt="img" />

                    </Slider>
                </div>  
            </>
    )
}

export default Home_slider;