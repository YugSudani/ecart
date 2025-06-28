import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Home_slider from "./Home_slider";
import menfashion from "../IMGS/menfashion.jpg"
import womenclothing from "../IMGS/womenclothing.png"
import jewelryicon from "../IMGS/jewelryicon.png"
import electroIcon from "../IMGS/electroIcon.png"
import kidsicon from "../IMGS/kidsicon.jpg"
import mobileIcon from "../IMGS/mobileIcon.png"

const Home =()=>{



    return(
        <>
                    <Navbar/>
                    <Home_slider/> 

                    {/* <NavLink to={"/PrdListing"}>List New Product</NavLink> */}
                    <hr />
                    <div className="home_category_bar">

                        <div className="home_cat_container">
                                <NavLink className={"home_cat_link"} to={"/HomeCat1"}>
                                    <img className="home_cat_img" src={menfashion} alt="" />
                                <br />Men's Clothing</NavLink> <br />
                        </div>

                        <div className="home_cat_container">
                                <NavLink className={"home_cat_link"} to={"/HomeCat2"}>
                                    <img className="home_cat_img_women" src={womenclothing} alt="" />
                                <br />Women's Wear</NavLink> <br />                       
                        </div>

                        <div className="home_cat_container">
                                <NavLink className={"home_cat_link"} to={"/HomeCat2"}>
                                    <img className="home_cat_img" src={jewelryicon} alt="" />
                                <br />Jewelery</NavLink> <br />                        
                        </div>

                        <div className="home_cat_container">
                                <NavLink className={"home_cat_link"} to={"/HomeCat1"}>
                                    <img  className="home_cat_img" src={electroIcon} alt="" />
                                <br />Electronics</NavLink> <br />                        
                        </div>

                        <div className="home_cat_container">
                                <NavLink className={"home_cat_link"} to={"/HomeCat1"}>
                                    <img className="home_cat_img_kids" src={kidsicon} alt="" />
                                <br />Kid's Wear</NavLink> <br />                        
                        </div>

                        <div className="home_cat_container">
                                <NavLink className={"home_cat_link"} to={"/HomeCat1"}>
                                    <img className="home_cat_img" src={mobileIcon} alt="" />
                                <br />Mobiles</NavLink> <br />                        
                        </div>

                    </div>
                    <hr />
        </>
    )
}

export default Home;
