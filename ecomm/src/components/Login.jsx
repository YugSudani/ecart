import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ecomLOGO from "../IMGS/ecomLOGO.jpg"

import { ToastContainer , toast } from 'react-toastify';

const Login=()=>{

    const invalid=()=> toast.error("Invalid Crendentials");

    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        email:"",
        passwod:""
    });

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const HandleSubmit=async(e)=>{
        e.preventDefault();

        const response = await fetch("https://ecart-backend-dczo.onrender.com/login" ,{
            method:"POST",
            headers:{
                    "Content-Type": "application/json"
            },
                body:JSON.stringify(formData)
        });

        const data = await response.json();
        // console.log(data);

        if(data.result === "succese"){            
            navigate("/");
        }else{
            // alert("Something Went wrong _ _ _");
            invalid();
        }
    }

    return(
        <>
            <div className="login_page"></div>
            <div className="login_main_container">
                                    <ToastContainer />
                <div className="login_msg_container">
                            <div className="login_msg_container_2">
                                <h2>
                                    Login 
                                </h2>
                                <p>
                                    <br /> Get access to your Orders <br /> & Cart
                                </p>
                                <img src={ecomLOGO} className="login_logo" alt="img" />
                            </div>
                </div>
                <div className="login_form_container">
                    <form className="login_form" onSubmit={HandleSubmit}>
                        <table className="login_form_table">
                            <tbody>
                                <tr>
                                    <td>Email</td>
                                    <td><input type="email" name="email" required onChange={handleChange} placeholder="Enter Email"/></td>
                                </tr>
                                <tr>
                                    <td>Pwd</td>
                                    <td><input type="password" name="password" required onChange={handleChange} placeholder="Enter Password"/></td>
                                </tr>
                            </tbody>
                        </table>
                                    <button className="btn_login" type="submit">Login</button>
                                    <br />
                                    <button className="btn_login_signup" onClick={()=>{navigate("/signup")}} type="submit">New here? Signup Now !</button>
                    </form>
                </div>  
            </div>
        </>
    )
}

export default Login;
