import React, { useState } from "react";
import QRcode from "../IMGS/QRcode.png"
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useGenContext } from "../Context/genContext";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";


const Payment=()=>{

    const wrong=()=> toast.warning("Something Went Wrong");
    const done=()=> toast.success("Order Placed Succesefuly");
    const dont=()=> toast.warning("Do Not Refresh this Page");

    const Navigate = useNavigate();

    const[formData,setFormData]=useState({
        paymentMode:"",
    });

    const handleChange=(e)=>{
        setFormData({...formData , [e.target.name]:e.target.value});
        if(e.target.value === "UPI"){
            RunTimeOut();
        }
    }


    const[timer,setTimer]=useState(120);
    const RunTimeOut=()=>{
    const intervalId = setInterval(() => {
        setTimer((prev) => {
            if (prev < 1) {
            clearInterval(intervalId);
        return alert("UPI Season Timeout ! Refresh to try again");
      }
        return prev - 1;
    });
    }, 1000);
    }


    //create order

    const genContext = useGenContext()

    
    const[order,setOrder]=useState({
        adrs:"",
        prds:[],
        total:"",
        status:"pending",
        title:[]
    });
    
    // useEffect(() => {
    // if (order && typeof order === 'object') {
    //     genContext.setOrder({ ...order });
    // }
    // }, [order]);

    const handleADRSChange=(e)=>{
        setOrder({...order , [e.target.name]:e.target.value})
    }

    useEffect(()=>{    
        // setting product array & total
        const len = genContext.prds?.length;
        const products = [];
        let TL = 0;
        let titles =[];

        for (let i = 0; i < len; i++) {
        products.push(genContext.prds[i]?.prdid);
        TL += parseInt(genContext.prds[i]?.price);
        titles.push(genContext.prds[i]?.title)
    }
        setOrder(prev => ({             //setting final order
            ...prev,
            prds: products,
            total: TL,
            title:titles
        }));
    },[]);

    useEffect(()=>{
        dont();
    },[])


    const removed_placed_order_item_from_cart=async()=>{ 


            const response = await fetch("https://ecart-backend-dczo.onrender.com/surfing/del_multiple_from_cart" , {
                method:"POST",
                headers:
                        {"Content-Type": "application/json"},
                    
                body:JSON.stringify({prdids:order.prds})
            });
            // console.log(response);
            const answer = await response.json();

            if(answer.result === "succese"){
                // console.log("removed_placed_order_item_from_cart");
            }else{
                // alert("Product not removed");
            }
    }


    const HandleSubmit=async(e)=>{
        e.preventDefault();

        console.log(order);
            const response = await fetch("https://ecart-backend-dczo.onrender.com/surfing/placedorder" ,{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(order)
            });
            const res = await response.json(response);
            if(res.result === "failed"){
                wrong()
            }else{
                done();
                setTimeout(() => {
                    Navigate("/Profile");
                }, 2000);
            }

            removed_placed_order_item_from_cart();
    }

    return(
        <>
        <ToastContainer/>
        <Navbar/>
        <div className="payment_main_div">
          
                     <div className="payment_addres_main_container">
                            <h2>Delivery Address</h2>
                            
                            <form onSubmit={HandleSubmit} className="address_form">
                                    <table className="address_table">
                                        <tbody>
                                             <tr>
                                                <td>City :</td>
                                                <td><select className="payment_select_tag" name="city" id="">
                                                        <option value="">Select City</option>
                                                        <option value="">Mumbai</option>
                                                        <option value="">Delhi</option>
                                                        <option value="">Navsari</option>
                                                        <option value="">Surat</option>
                                                        <option value="">Ahmedabad</option>
                                                        <option value="">Chandigadh</option>
                                                    </select>
                                                </td>
                                            </tr>
                                             <tr>
                                                <td>Pincode :</td>
                                                <td><input name="pincode" required className="payment_in_txt" type="text" placeholder="Enter Pincode" /></td>
                                            </tr>
                                             <tr>
                                                <td>Landmark :</td>
                                                <td><input name="landmark" className="payment_in_txt" type="text" placeholder="Enter Landmark(optional)" /></td>
                                            </tr>
                                            <tr>
                                                <td>Address :</td>
                                                <td><input name="adrs" onChange={handleADRSChange} required className="payment_in_txt" type="text" placeholder="Enter Address" /></td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                            </form>

                    </div>


                    <div className="payment_form_div">
                                <h2>Payment Gateway</h2>  
                            <form className="Payment">
                                <table className="payment_form_table">
                                    <tbody>
                                    <tr>
                                        <td>Payment Method : </td>
                                        <td><select className="payment_select_tag" onChange={handleChange} name="paymentMode" id="">
                                            <option value="">Select Payment Mode</option>
                                                <option value="UPI">UPI</option>
                                                <option value="netBanking">Net Banking</option>
                                                <option value="COD">Cash On Delivery</option>
                                            </select></td>
                                    </tr>

                                        {formData.paymentMode === "UPI"? 
                                        <>
                                        <tr>
                                        <p>Pay Within : {timer} Seconds</p>
                                        </tr>
                                        <tr>
                                        <img src={QRcode} className="QRimg" alt="QR Code" />
                                        </tr>
                                        </> : null}
                                        
                                        {formData.paymentMode === "netBanking" ?
                                        <>
                                            <tr>
                                                <td>Account Number : </td>
                                                <td><input type="password" required name="password"  placeholder="Enter Bank Account Num"/></td>
                                            </tr>
                                            <tr>
                                                <td>IFSC Code: </td>
                                                <td><input type="text"  required name="password" placeholder="Enter IFSC Code"/></td>
                                            </tr>
                                        </>
                                        : null}

                                        {formData.paymentMode === "COD" ?
                                        <>
                                            <tr>
                                                <td>Note :</td>
                                                <td>Cash Handeling Fees 15/- Rs Will Be Applied on COD</td>
                                            </tr>
                                        </>
                                        : null}

                                        <span style={{color:"green"}}>Pay Rs : {genContext.total}</span>
                                        </tbody>
                                    </table>
                                    <br />
                            </form>
                    </div>
                
                    
                            <button className="btn_signup" style={{marginTop:"3%"}} onClick={HandleSubmit} >Place Order</button>
        </div>
        </>
    )
}

export default Payment;
