import React, { useEffect, useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import navLogo from "../IMGS/navLogo.jpg"
import Cookies from "js-cookie";
import { useGenContext } from "../Context/genContext";
import { ToastContainer, toast } from "react-toastify";
const menuImg = require("../IMGS/menu.png")


const Navbar =()=>{

    const succes=()=> toast.error("Logout Succesefull");

    const navigate = useNavigate();

    const[accOpen,setAccOpen] = useState(false);
    
    const toggleAccOpen=()=>{
        if(accOpen){
            setAccOpen(false);
        }else{
            setCartOpen(false);
            setAccOpen(true);
        }
    }

    const[cartOpen,setCartOpen] = useState(false);
    
    const toggleCartOpen=()=>{
        if(cartOpen){
            setCartOpen(false);
        }else{
            setSupportOpen(false)
            setAccOpen(false);
            setShowMenu(false);
            setCartOpen(true);

        }
    }

     const[supportOpen,setSupportOpen] = useState(false);
    
    const toggleSupportOpen=()=>{
        if(supportOpen){
            setSupportOpen(false);
        }else{
            setCartOpen(false)
            setSupportOpen(true);
        }
    }

   const logout=async()=>{
    const apiUrl=process.env.REACT_APP_API_URL;

        await fetch(`${apiUrl}/logout`,{
            method:"get",
            credentials: 'include',
        });
        setAccOpen(false);
        setShowMenu(false)
        succes();
       // alert("deleted")
    }


    const[showMenu,setShowMenu]=useState(false);

    const toggleShowMenu=()=>{
        if(showMenu){
            setShowMenu(false);
        }else{
            setCartOpen(false)
            setShowMenu(true);
        }
    }

    //updating cart count

    
    //checking if Login 
    const genContext = useGenContext();

    const[login,setLogin]=useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(()=>{
        fetch(`${apiUrl}/surfing/userinfo` , {
            credentials:'include'
        })
         .then((res)=>{
            if(res.status === 200){
                setLogin(true);
            }else if(res.status === 401){
                setLogin(false);
            }else{
                setLogin(false);
            }
        });
    },[]);

//__________________________________________________________________________________
    return(
        <>
            <div className="navbar_container">
                    <ToastContainer/>
                    <div className="navbar_left">
                          <img src={navLogo} className="nav_logo" alt="logo" />

                          <input type="text" className="nav_searchbar" placeholder="🔍︎ Search for Products , Brands & More"/>
                    </div>

                <div className="navbar_right">

                            

                            <div className="nav_acc_main_container">
                                <button onMouseEnter={()=>{toggleAccOpen()}}  className="btn_acc_nav">👤 Account</button>
                                <div onMouseLeave={()=>{toggleAccOpen()}} className={accOpen? "nav_dropdown_account_open" : "nav_dropdown_account_close"}>
                                            <NavLink to={"/Profile"}>‎ ‎👤 My Profile</NavLink><hr />
                                            {login ? <><div style={{cursor:"pointer", marginLeft:"8px"}} onClick={()=>{logout()}}>【⏻】 Logout</div></>  :
                                              <> <div style={{cursor:"pointer", marginLeft:"8px"}} onClick={()=>{navigate("/login")}}>‎‎ 🔐 : Login</div> </>
                                            }
                                </div>
                            </div>

                            <div className="nav_cart_main_container">
                                <button onClick={()=>{toggleCartOpen()}} onMouseEnter={()=>{toggleCartOpen()}} className="btn_cart_nav">🛒<span>{genContext.prdCT}</span> <br />Cart</button>
                                <div  onMouseLeave={()=>{toggleCartOpen()}} className={cartOpen? "nav_dropdown_cart_open" : "nav_dropdown_cart_close"}>
                                            <NavLink to={"/Cart"}>🛍️ Cart items</NavLink><hr />
                                            <NavLink to={""}>❤️ Whishlist</NavLink>
                                </div>
                            </div>

                             <div className="nav_support_main_container">
                                <button onMouseEnter={()=>{toggleSupportOpen()}}  className="btn_support_nav">Support</button>
                                <div  onMouseLeave={()=>{toggleSupportOpen()}} className={supportOpen? "nav_dropdown_support_open" : "nav_dropdown_support_close"}>
                                           <span >24*7 Customer Support</span>
                                           <hr />
                                           <p>☎︎ Call on : 9510502422</p>
                                           <p>✉︎ Email : support2407@gmail.com</p>
                                </div>
                            </div>


                            <div className="menu_for_phone">
                                    <button  className="btn_menu" onClick={()=>toggleShowMenu()}><img className="menu_icon" src={menuImg} alt="menu"/></button>
                                    
                                    <div className={showMenu? "menu_dropdown_open" : "menu_dropdown_close"}><br/>
                                        <NavLink to={"/Profile"}>‎ ‎👤 My Profile</NavLink>
                                        <br /><br />
                                        {document.cookie.length<1 ? <>  <div style={{cursor:"pointer", marginLeft:"8px"}} onClick={()=>{navigate("/login")}}>‎‎ 🔐 : Login</div> </>:
                                            <><div style={{cursor:"pointer", marginLeft:"8px"}} onClick={()=>{logout()}}>【⏻】 Logout</div></>}
                                        <p> 24X7 Support</p>
                                        <p>☎︎ Call on : </p><p> 9510502422</p>
                                    </div>  

                            </div>
                </div>
                    
            </div>

        </>
    )
}

export default Navbar;
