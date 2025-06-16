import React, { useEffect ,useState } from "react";
import Navbar from "./Navbar";
import { useGenContext } from "../Context/genContext";
import { useNavigate } from "react-router-dom";
import emptyCart from "../IMGS/emptyCart.png"
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const Cart=()=>{

    const wrong=()=> toast.warning("Something Went Wrong");
    const loginNow=()=> toast.warning("Login To View Profile _ _ _");


    const navigate = useNavigate();
    const[cartIsEmpty,setCartIsEmpty] = useState(true);
    
    const get_user_cart_products=async()=>{

        const response = await fetch("https://ecart-backend-dczo.onrender.com/surfing/getprdbyuser" ,{
            method:"get",
        });

        const productIds = await response.json();
        if(productIds.result === "succese"){
            console.log(productIds.user_cart_prd_ids); // use this prd ids to find product in prdmodel(dont use state)
            if(productIds.user_cart_prd_ids.length <1){
                setCartIsEmpty(true);
            }else{
                setCartIsEmpty(false);
            }
            get_products_by_IDs(productIds.user_cart_prd_ids);
        }else{
            wrong();
        }
    }

    useEffect(()=>{
        get_user_cart_products();
    },[])

//above taking ids from user accound
//below taking products with that ids into cart

const genContext = useGenContext();  //declared alredy

    const get_products_by_IDs=async(IDs)=>{

        const query = IDs.join(","); 
        // console.log("IDs: "+IDs);
        const response = await fetch(`https://ecart-backend-dczo.onrender.com/product/getprdbyprdid?idData=${query}`, {
            method:"GET"
        });

        const cartProducts = await response.json();
        if(cartProducts.result === "succese"){
                genContext.setPrds(cartProducts.products);
                //set in contex so can be used while placing order
        }else {
            wrong();
        }
    }



    //_________________________ UPDATE UI CT _____________________________________
      
      
                const UpdateGenCtxt=async()=>{                 // function that gets user details and set context ct
                    const details = await fetch("https://ecart-backend-dczo.onrender.com/surfing/userinfo" , {
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




    const Handle_remove_from_cart=async(prdId)=>{

        const response = await fetch(`https://ecart-backend-dczo.onrender.com/surfing/removefromcart?prdid=${prdId}` , {
            method:"POST",
            headers:
                     {"Content-Type": "application/json"},
        });

        // console.log(response);
        const answer = await response.json();

        if(answer.result === "succese"){
            await UpdateGenCtxt();
            window.location.reload();
        }else{
            wrong();
        }
    }

const Total=(()=>{

    const totalPrice = genContext.prds?.reduce((acc, item) => {
        return acc + parseFloat(item.price);
    }, 0);
    genContext.setTotal(totalPrice);
});

   useEffect(()=>{
        Total(); // For onLoad update 
    },[genContext.prds]);





    return(
        <>
        <ToastContainer/>
        <Navbar/>
        <div className="cart_main_container">
            <div className="cart_left_container">
                <h3>Item Summary :</h3>

                                                <table className="item_summary_table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="td_idx">Index</td>
                                                            <td className="td_title" >Item Name</td>
                                                            <td className="td_price" >Price(Rs)</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                 {genContext.prds?.length>0? genContext.prds.map((p ,idx) =>{
                     return (
                                
                                    <div >
                                        <table className="item_summary_table">
                                                <tbody>
                                                <tr>
                                                    <td className="td_idx" >{idx+1}</td>
                                                    <td className="td_title" > {p.title} </td>
                                                    <td className="td_price"><p> {p.price}</p></td>
                                                </tr>
                                                </tbody>
                                        </table>
                                    </div>
                                
                        )
                     }) : <p style={{marginLeft:"35%"}}>No Items</p>}


                                    <table className="item_summary_table">
                                        <tbody>
                                            <tr>
                                                <td  className="td_idx"></td>
                                                <td className="td_title"> <b>Total Amount</b></td>
                                                <td className="td_price"><b>{genContext.total} /-</b></td>
                                            </tr>
                                        </tbody>
                                    </table>

                    {genContext.prds?.length>0? 
                                         <NavLink to={"/Payment"}><button className="btn_checkout">Check Out</button></NavLink>
                                     : null
                    }

            </div>


            <div className="cart_right_container">
                {cartIsEmpty? <h2><img className="img_empty_cart" src={emptyCart} alt="Cart is Empty" /> <hr /> <h3 style={{marginLeft:"19%"}}>Your Cart Is Empty</h3></h2> : null }
                  {genContext.prds? genContext.prds.map((p) =>{
                     return (
                                <div className="prd_card_cart" key={p.prdid}>
                                    <div className="prd_card_left">
                                        <img src={p.image} alt="Loading" className="home_Cat_img"/> 
                                        <h4 >{p.title}</h4>
                                    </div>
                                    <div className="prd_card_right">
                                       <h3 style={{marginLeft:"10%"}}>Price : {p.price}/- Rs.</h3>
                                        <button className="btn_remove" onClick={()=>Handle_remove_from_cart(p.prdid)}>Remove</button>
                                    </div>
                                </div>
                        )
                     }) : <h2>Loading _ _ _ </h2>
                  }        
                  </div> 
        </div>
         {genContext.prds?.length>0? 
                            <NavLink to={"/Payment"}><button className="btn_checkout_at_end">Check Out</button></NavLink>: null
                    }
    </>
    )
}

export default Cart;
