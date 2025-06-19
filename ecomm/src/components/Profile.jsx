import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Cookies from "js-cookie"
import { ToastContainer, toast } from "react-toastify";

const Profile=()=>{

        const wrong=()=> toast.warning("Something Went Wrong");
        const orderC=()=> toast.success("Order Cancelled Seccessfuly")
        const loginNow=()=> toast.warning("Login To View Profile")
        const logoutDone=()=> toast.error("Logout Succesefull");
        const updated=()=> toast.success("Info Updated Seccessfuly")

    const apiUrl = process.env.REACT_APP_API_URL;
    
    const navigate = useNavigate()
    
    //gets user Info from database
    const[userDetils,setUserDetails] = useState({});
    const GetUserDetails=async()=>{
        const details = await fetch(`${apiUrl}/surfing/userinfo` , {
            method:"GET",
            credentials: 'include'
        });
        const datas = await details.json();
       // console.log("Data : "+datas);
        if(datas.result === "succese"){
            setUserDetails(datas.data);
        }else{
            loginNow();
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } 
    }
     useEffect(()=>{
        GetUserDetails();
    })

        // Logout feature
        const logout=()=>{
            Cookies.remove("UID", { path: '/' });
            logoutDone();
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }


        //Update Existing Email ID
        const[newEmail,setNewEmail] = useState({
            email:""
        });

        const handleEmailChange=(e)=>{
            setNewEmail({...newEmail , [e.target.name]: e.target.value})
        }
        
        const updateEmail=async(e)=>{
            e.preventDefault();
            
            const response = await fetch(`${apiUrl}/surfing/updateEmail` ,{
                method:"POST",
                credentials: 'include',
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body:JSON.stringify(newEmail)

            });

            const data = await response.json();
            if(data.result === "succese"){
                updated();
                setTimeout(() => {
                    window.location.reload();   
                }, 2000);
            }else{
                wrong();
            }
        }

        //update current password
         const[formData,setFormData]= useState({
            oldPassword:"",
            newPassword:""
        });
      
        const handleChange=(e)=>{
            setFormData({...formData , [e.target.name]:e.target.value });
        }
    
        const updatePassword=async(e)=>{
            e.preventDefault();
            
            const response = await fetch(`${apiUrl}/surfing/updatepwd` , {
                method:"POST",
                credentials: 'include',
                headers:{
                     "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            if(data.result === "success"){
                updated();
                setTimeout(() => {
                    window.location.reload();   
                }, 2000);
            }else{
                wrong();
            }
        }    
        
        
        // take orders from order details 
        
        const[prds,setPrds]=useState([]);
        const get_orders=async()=>{
            
            const response = await fetch(`${apiUrl}/surfing/myorders`,{
                method:"GET",
                credentials: 'include'
            });
            
            const res = await response.json();
            // console.log(res.data)
            if(res.result === "success"){
                setPrds(res.data);
            }
        }
        useEffect(()=>{
            get_orders();
        },[userDetils])
        
        
   
    //cancel Order
    const cancel_order=async(prdid)=>{
        const response = await fetch(`${apiUrl}/surfing/cancelorder`,{
            method:"POST",
            credentials: 'include',
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({prdid:prdid})
        });

        const res = await response.json();
        if(res.result === "succese"){
            orderC();
        }else{
            wrong();
        }
    }



    return(
        <>
            <ToastContainer/>
            <Navbar/>
            <div className="profile_main_container">
                

              <div className="profile_1st_container">
                <div className="profile_1_hello_user">
                        <p>👤</p>
                        <div>
                            <p>Hello, {userDetils.name}</p>
                            <h3>You'r Welcome</h3>
                        </div>
                </div>

                <div className="profile_2_orders">

                    {/* gete product details using prdids */}
                    <p>Your Orders</p><hr />

                                                <table className="order_item_table">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{width:"3vw"}}>Ord.No</td>
                                                            <td style={{width:"16vw"}}>Item </td>
                                                            <td style={{width:"3vw"}}>Total(Rs)</td>
                                                            <td style={{width:"5vw"}}>Status</td>
                                                        </tr>
                                                    </tbody>
                                                </table>


                    {prds?.length>0? prds?.map((p,idx)=>{
                            return(
                                <>
                                     <div >
                                        <table className="order_item_table">
                                                <tbody>
                                                <tr>
                                                    <td style={{width:"3vw"}}>{idx+1}</td>
                                                    <td  className="ord_title_td" > 
                                                        {p.title? p.title.map((t,idx)=>{
                                                            return (<>  <p className="ord_title_td">{(idx+1) + ". " +t}</p></>)
                                                            }):null
                                                        }
                                                    </td>

                                                    {/* {console.log(p)} */}
                                                    <td style={{width:"3vw"}}>{p.total}/-</td>
                                                    <td style={{width:"5vw"}}>{p.Status === "delivered"? <b style={{color:"green"}}>Delivered</b>: <>{ p.Status === "cancelled"? <b style={{color:"red"}}>Cancelled</b> : <b style={{color:"orange"}}>Delivered Soon</b>  }</>} </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>{p.Status === "pending"? <button className="btn_cancel" onClick={()=>{cancel_order(p._id)}}>Cancel Order</button>  : null}</td>
                                                    <td></td>
                                                </tr>
                                                </tbody>
                                        </table>
                                    </div>
                                </>
                            )
                            }): <p>No Order Yet</p>}
                



                </div>

                 <div className="profile_3_logout">

                    <button onClick={()=>{logout()}}> 【⏻】 : Logout</button>

                </div>
             </div>
    

                <div className="profile_2nd_container">
                        <h3>Personal Information</h3>
                    <form onSubmit={updateEmail} className="profile_cards">
                        <div >
                                Change Email <hr />
                                Email  : {userDetils.email} <br /><br />
                                Edit Email : <input name="email" onChange={handleEmailChange} className="input_profile_update" required placeholder="Enter New Email" type="email" />
                                <button style={{marginLeft:"2%"}} className="btn_profile_update" type="submit">Submit</button>
                        </div>
                    </form>

                     <form onSubmit={updatePassword} className="profile_cards" style={{height:"23vh"}}>
                        <div >
                                Change Password <hr />
                                Old password : <input name="oldPassword" className="input_profile_update" onChange={handleChange} required placeholder="Enter Old password" type="password" /><br /><br />
                                Create password : <input name="newPassword" className="input_profile_update" onChange={handleChange} required placeholder="Enter New password" type="password" />
                                <button style={{marginLeft:"2%"}} className="btn_profile_update" type="submit">Submit</button>
                        </div>
                    </form>

                <div style={{marginLeft:"2%"}}>

                          
                    <h3>FAQs</h3><hr />
                    <p>
                    <b>Q. What happens when I update my email address?</b> <br /><br />
                    A. Your login email id changes, likewise. You'll receive all your account related communication on your updated email address. 
                    </p><hr />
                    <p>
                    <b>Q. When will my account be updated with the new email address ? </b><br /><br />
                    A. It happens as soon as you your email and save the changes.  
                    </p><hr />
                    <p>
                    <b>Q. What happens to my existing account when I update my email address?</b> <br /><br />
                    A. Updating your email address doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.
                    </p>
                    
                </div>

                </div>
            
            </div>            
        </>
    )
}

export default Profile;
