import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useGenContext } from "../Context/genContext";
import { ToastContainer, toast } from "react-toastify";


const HomeCat2=()=>{

    const wrong=()=> toast.warning("Something Went Wrong"); 
    const loginNow=()=> toast.warning("Login To View Profile _ _ _");
    
    const navigate = useNavigate();

    const[prds,setPrds]= useState();

    const apiUrl = process.env.REACT_APP_API_URL;
    
    const GetProductByCat=async()=>{

        const products = await fetch(`${apiUrl}/product/getprdbycategory?category=jewelery`,{
            method:"GET",
            credentials: 'include'
        });

        const prdS = await products.json();

        if(prdS.result === "Category prds found"){
            setPrds(prdS.productData)
            // console.log(prdS);
        }else{
            wrong();
        }
    }
    
    useEffect(()=>{
        GetProductByCat();
    },[])
    

        //_________________________ UPDATE UI _____________________________________
        
        const genContext = useGenContext();
          
          
                    const UpdateGenCtxt=async()=>{                 // function that gets user details and set context ct
                        const details = await fetch(`${apiUrl}/surfing/userinfo` , {
                        method:"GET",
                        credentials: 'include'
                    });
                    
                        const datas = await details.json();
                        // console.log("Data : "+datas);
                        if(datas.result === "succese"){         // if user found
                                  const ct = datas.data.cartPrdID?.length || 0;
                                  genContext.setPrdCT(ct);     // using state it updates context API)
                        }else{
                            loginNow();
                            setTimeout(() => {
                                navigate("/login");
                            }, 2000);
                        }
            }
    
        useEffect(()=>{
            UpdateGenCtxt(); // For onLoad update 
        },[]);
    
   
    async function Handle_add_to_cart(prd_id){
        
        const prdid = prd_id

        const response = await fetch(`${apiUrl}/add_to_cart` ,{
            method:"POST",
            credentials: 'include',
            headers:{
                 "Content-Type": "application/json"
            },
            body:JSON.stringify({prdid:prdid})
        });

        const res = await response.json();
        if(res.result === "loginToProcced"){
            loginNow();
            setTimeout(() => {
                    navigate("/login");
            }, 2000);
        }else if(res.result === "succese"){
            UpdateGenCtxt();
        }else if(res.result === "fail"){
            wrong();
        }
    }


    return(
        <div>
                <ToastContainer/>
                <Navbar/>
                
                <div className="prd_card_container">
                  {prds? prds.map((p) =>{
                     return (
                                <div className="prd_card" key={p.prdid}>
                                    <div className="prd_card_left">
                                        <img src={p.image} alt="Loading" className="home_Cat_img"/> 
                                        <h3 >{p.title}</h3>
                                    </div>
                                    <div className="prd_card_right">
                                        <div className="prd_card_right_top">
                                            <p><b>Product Description : </b>{p.description}</p>
                                        </div>
                                        <h3>Price : {p.price}/-Rs.</h3>
                                        <button onClick={()=>{Handle_add_to_cart(p.prdid)}} className="btn_add_to_cart">Add To Cart</button>
                                    </div>
                                </div>
                        )
                     }) : <h2>Loading _ _ _ </h2>
                  }        
                  </div> 

              

        </div>
    )
}

export default HomeCat2;
