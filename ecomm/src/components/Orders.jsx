import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";


const Orders=()=>{


    const invalid=()=> toast.error("Admin Privilegde Needed");
    const empty=()=> toast.warning("No Exsting Order Found");
    const wrong=()=> toast.warning("Action Failed");
    const done=()=> toast.success("Product Marked As Delivered");

    const[orders,serOrders]=useState();

    const get_existing_orders=async()=>{


        const response = await fetch("https://ecart-backend-dczo.onrender.com/admin/ordersOfUser",{
            method:"GET"
        });

        const res = await response.json();
        if(res.result === "succese"){
            serOrders(res.data);
        }else if(res.result === "Privilaged Accese Only"){
            invalid();
        }else{
            empty();
        }
    }
    
    useEffect(()=>{
        get_existing_orders();
    },[]);
    
    useEffect(()=>{
        console.log(orders);
    },[orders]);
    
    
    const mark_as_deliverd=async(order_id)=>{
        
        const response = await fetch("https://ecart-backend-dczo.onrender.com/admin/mark_as_delivered",{
            method:"POST",
            headers:
            {"Content-Type": "application/json"},
            
            body:JSON.stringify({order_id})
        });
        
        const res = await response.json(response);
        if(res.result === "succese"){
            done();
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }else{
            wrong();
        }

    }

    return(
        <>
            <ToastContainer/>
            <h3>Total { orders?.length} Individual Users Ordered Till Now </h3>
            <hr />
            
            
    <h2>Pending To Deliver Orders</h2>
    <hr />
    <div className="order_main_container">
    {  
        orders? orders.map((p)=>{
            return(
                <>
                  {
                    p.orders? p.orders?.map((q)=>{
                        return(
                            <>
                                {q.status==="pending"?
                                    <>
                                        <div className="order_card">
                                            <p>Customer Name : <b> {p.name} </b></p>
                                            <p>Email : <b> {p.email} </b></p>
                                                    <div>  
                                                        <hr />
                                                        <span style={{width:"5vw"}}>Order Status : {q.status === "delivered"? <b style={{color:"green"}}>Delivered</b>: <>{ p.status === "cancelled"? <b style={{color:"red"}}>Cancelled</b> : <b style={{color:"orange"}}>Pending</b>  }</>}</span> 
                                                        <p>Order ID: <b> {q._id}</b></p>
                                                        <p>Order Address : <b>{q.adrs}</b></p>
                                                        <p>Ordered Product IDS: <b> {q.prds?.join(" , ")}</b></p>
                                                        <p>Total Order Amount: <b> {q.total}</b></p>

                                                        <button onClick={()=>{mark_as_deliverd(q._id)}} className="btn_delivered">Mark As Delivered</button>
                                                        <hr />
                                                    </div>
                                        </div>
                                </>
                                : null
                                }                                                                          
                            </>
                        )
                    }) : null
                  }
                </>
                    )
                }) : <h3>No Pending Order Found</h3>
    }
    </div>




    
    <hr /><hr />
    <h2>Completed Orders</h2><hr />
    
   
    <div className="order_main_container">
    {  
        orders? orders.map((p)=>{
            return(
                <>
                  {
                    p.orders? p.orders?.map((q)=>{
                        return(
                            <>
                                {q.status==="delivered"?
                                    <>
                                        <div className="order_card">
                                            <p>Customer Name : <b> {p.name} </b></p>
                                            <p>Email : <b> {p.email} </b></p>
                                                    <div>  
                                                        <hr />
                                                        <span style={{width:"5vw"}}>Order Status : {q.status === "delivered"? <b style={{color:"green"}}>Delivered</b>: <>{ p.status === "cancelled"? <b style={{color:"red"}}>Cancelled</b> : <b style={{color:"orange"}}>Pending</b>  }</>}</span> 
                                                        <p>Order ID: <b> {q._id}</b></p>
                                                        <p>Order Address : <b>{q.adrs}</b></p>
                                                        <p>Ordered Product IDS: <b> {q.prds?.join(" , ")}</b></p>
                                                        <p>Total Order Amount: <b> {q.total}</b></p>
                                                        <hr />
                                                    </div>
                                        </div>
                                </>
                                : null
                                }                                                                          
                            </>
                        )
                    }) : null
                  }               
                </>
                    )
                }) : <h3>No Completed Order Found</h3>
    }
    </div>








 <hr /><hr />
    <h2>cancelled Orders</h2><hr />
    
   
    <div className="order_main_container">
    {  
        orders? orders.map((p)=>{
            return(
                <>
                  {
                    p.orders? p.orders?.map((q)=>{
                        return(
                            <>
                                {q.status==="cancelled"?
                                    <>
                                        <div className="order_card">
                                            <p>Customer Name : <b> {p.name} </b></p>
                                            <p>Email : <b> {p.email} </b></p>
                                                    <div>  
                                                        <hr />
                                                        <span style={{width:"5vw"}}>Order Status : {q.status === "delivered"? <b style={{color:"green"}}>Delivered</b>: <>{ q.status === "cancelled"? <b style={{color:"red"}}>Cancelled</b> : <b style={{color:"orange"}}>Pending</b>  }</>}</span> 
                                                        <p>Order ID: <b> {q._id}</b></p>
                                                        <p>Order Address : <b>{q.adrs}</b></p>
                                                        <p>Ordered Product IDS: <b> {q.prds?.join(" , ")}</b></p>
                                                        <p>Total Order Amount: <b> {q.total}</b></p>
                                                        <hr />
                                                    </div>
                                        </div>
                                </>
                                : null
                                }                                                                          
                            </>
                        )
                    }) : null
                  }               
                </>
                    )
                }) : <h3>No Cancelled Order Found</h3>
    }
    </div>

















    
    </>
    )
}

export default Orders;



