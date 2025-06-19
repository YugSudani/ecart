import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ecomLOGO from "../IMGS/ecomLOGO.jpg"
import { ToastContainer, toast } from "react-toastify";

const Signup =()=>{

        
    const wrong=()=> toast.warning("Something Went Wrong");

    const navigate = useNavigate();

    // State for managing form data
    const[formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    })

    // adding data to state
    const handleChange=(e)=>{
        setFormData({...formData , [e.target.name]:e.target.value})
    }

    const apiUrl=process.env.REACT_APP_API_URL;
    // sending[POST] Signup cradantial to BackEnd & getting response
    const HandelSubmit=async(e)=>{
        e.preventDefault();

        const response = await fetch(`${apiUrl}/signup` , {
            method: "POST",
            credentials: 'include',
             headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formData)
        });

        const data = await response.json(); // getting response
        // console.log(data)

        if(data.result === "succese"){
              navigate('/login'); //Navigating to Login page 
        }else{
            wrong();
        }
    }

    return(
        <>
        <div className="signup_page"></div>
                <div className="signup_main_container">
                    <ToastContainer/>
                    <div className="signup_msg_container">
                            <div className="signup_msg_container_2">
                                <h2>
                                    Looks like you're <br /> New here !
                                </h2>
                                <p>
                                    Sign up with Email ID <br /> To get Started
                                </p>
                                <img src={ecomLOGO} className="signup_logo" alt="img" />
                            </div>
                    </div>
                <div className="signup_form_container">
                    <form onSubmit={HandelSubmit} className="signup_form">
                        <table className="signup_form_table">
                            <tbody>
                            <tr>
                                <td>Name </td>
                                <td><input type="text" required name="name" onChange={handleChange}  placeholder="Full Name"/></td>
                            </tr>
                            <tr>
                                <td>Email </td>
                                <td><input type="Email" required name="email" onChange={handleChange} placeholder="Enter Email"/></td>
                            </tr>
                            <tr>
                                <td>Pwd </td>
                                <td><input type="password" required name="password" onChange={handleChange} placeholder="Create Password"/></td>
                            </tr>
                            </tbody>
                        </table>
                        <button className="btn_signup" type="submit">Signup</button>
                        <br />
                        <button className="btn_signup_login" onClick={()=>{navigate("/login")}}>Alredy Have Account? Log in</button>        
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;
