import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


const React = require("react");

const PrdListing=()=>{

    const invalid=()=> toast.error("Admin Privilegde Needed");
    const wrong=()=> toast.warning("Something Went Wrong");
    const done=()=> toast.success("Product Listed Seccessfuly _ _ _")
    const deleted=()=> toast.success("Product Deleted Seccessfuly _ _ _")

    const apiUrl = process.env.REACT_APP_API_URL;
    
        // State for managing form data
        const[formData,setFormData] = useState({
            prdid:"",
            title:"",
            price:"",
            description:"",
            category:"",
            image:"",
            rating:""
        });

    
        // adding data to state
        const handleChange=(e)=>{
            setFormData({...formData , [e.target.name]:e.target.value})
        }
    
        // sending[POST] Signup cradantial to BackEnd & getting response
        const HandelSubmit=async(e)=>{
            e.preventDefault();
    
            const response = await fetch(`${apiUrl}/admin/setPrd` , {
                method: "POST",
                headers: { "Content-Type": "application/json"
                   
                },
                body:JSON.stringify(formData)
            });

            const data = await response.json(); // getting response
            // console.log(data)
    
            if(data.result === "success"){
                done();
            }else if(data.result === "Privilaged Accese Only"){
                invalid();
            }else{
                wrong();
            }
        }
    
    
        const handle_delete=async()=>{ 

            const prdID = formData.prdid;
            const response = await fetch(`${apiUrl}/admin/delprd?prdid=${prdID}` , {
                method:"GET"
            });

            const res = await response?.json();
            if(res.result === "succese"){
                deleted()
            }else if(res.result === "Privilaged Accese Only"){
                invalid();
            }else{
                wrong();
            }
        }


    return(
        <>
            <h3>List New Products</h3>
            <div className="prd_main_container">
                 <ToastContainer/>
                 <div className="prd_form_container">
                    <form onSubmit={HandelSubmit} className="signup_form">
                        <table className="prd_form_table">
                            <tbody>
                            <tr>
                                <td>prdid : </td>
                                <td><input type="text" required name="prdid" onChange={handleChange}  placeholder="enter prd id"/></td>
                            </tr>
                              <tr>
                                <td>title : </td>
                                <td><input type="text" required name="title" onChange={handleChange}  placeholder="title"/></td>
                            </tr>
                              <tr>
                                <td>price : </td>
                                <td><input type="text" required name="price" onChange={handleChange}  placeholder="price"/></td>
                            </tr>
                              <tr>
                                <td>description : </td>
                                <td><input type="text" required name="description" onChange={handleChange}  placeholder="description"/></td>
                            </tr>
                              <tr>
                                <td>category : </td>
                                <td><input type="text" required name="category" onChange={handleChange}  placeholder="category"/></td>
                            </tr>
                             <tr>
                                <td>image : </td>
                                <td><input type="text" required name="image" onChange={handleChange}  placeholder="Enter image URL"/></td>
                            </tr>
                             <tr>
                                <td>rating : </td>
                                <td><input type="text" required name="rating" onChange={handleChange}  placeholder="rating"/></td>
                            </tr>
                           
                            </tbody>
                        </table>
                        <button className="btn_add" type="submit">List New Product</button>
                        <br />
                    </form>
                        <button className="btn_delete" onClick={()=>{handle_delete()}}>Delete Listed Product By PRD ID</button>
                </div>
            </div>
        </>
    )

}

export default PrdListing;
