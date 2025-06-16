import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useGenContext } from "../Context/genContext";
import { ToastContainer, toast } from "react-toastify";

const HomeCat1=()=>{

    const wrong=()=> toast.warning("Something Went Wrong"); 
    const loginNow=()=> toast.warning("Login To View Profile _ _ _");


    const navigate = useNavigate()

    const[prds,setPrds]= useState();
    
    
    const GetProductByCat=async()=>{

        const products = await fetch("http://localhost:8000/product/getprdbycategory?category=menclothing",{
            method:"GET",
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
                    const details = await fetch("http://localhost:3000/surfing/userinfo" , {
                    method:"GET"
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

    //____________________________________________________________

                                                // here when ever add to cart clicked this function runs
    async function Handle_add_to_cart(prd_id){
        
            const prdid = prd_id
                                                                            // it sets new prdid into user's cartprdid
            const response = await fetch("http://localhost:3000/add_to_cart" ,{
                                method:"POST",
                                headers:{
                                "Content-Type": "application/json"
                                },
                                body:JSON.stringify({prdid:prdid})
                            });

            const res = await response.json();          // and gives response


                if(res.result === "loginToProcced"){         // if not log in -> got to login
                    loginNow();
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000); 

                 }else if(res.result === "succese"){     // if succese update UI count
                    UpdateGenCtxt();       // calling function 
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
                                        <h3>Price : {p.price}/- Rs.</h3>
                                        <button className="btn_add_to_cart" onClick={()=>Handle_add_to_cart(p.prdid)}>Add To Cart</button>
                                    </div>
                                </div>
                        )
                     }) : <h3>Loading _ _ _ </h3>
                  }        
                  </div> 

              

        </div>
    )
}

export default HomeCat1;