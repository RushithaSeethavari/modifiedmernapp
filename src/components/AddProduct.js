import { useState } from 'react'
import {useForm } from "react-hook-form"
import axios from 'axios'
import { useHistory } from 'react-router-dom'


function AddProduct(){
    const { register,handleSubmit }=useForm();
    const [file,setFile]=useState(null)
    const history=useHistory();
    const onFormSubmit = (productObj)=> {

        //create FormData obj
        let formData=new FormData();
        //add files to formdata obj
        formData.append('photo',file,file.name) 
        //add userObj to formdata object
        formData.append("productObj",JSON.stringify(productObj))

        //post req
        axios.post("/product/createproduct",formData)
            .then(res =>{
                let resObj = res.data;
                alert(resObj.message)
                //navigate to login
                history.push('/viewproducts')
            })
            .catch(err =>{
                console.log(err);
                alert("something went wrong")
            })

    }


        //to get selected
        const onFileSelect = (e) => {
           // console.log(e.target.files[0])
        setFile(e.target.files[0])
        }


    return(
    <form className=" w-50 mx-auto " onSubmit={ handleSubmit(onFormSubmit)}>
        <input type ="text" id="pn" {...register('productname')} className="form-control mb-3" placeholder="productname"></input>

        <input type ="text" id="m" className="form-control mb-3" {...register("model")} placeholder="model"></input>

        <input type ="number" id="n" className="form-control mb-3" {...register("price")} placeholder="price"></input>

        <input type ="text" id="d" className="form-control mb-3" {...register("description")} placeholder="description"></input>

        <input type ="file" id="m" name="photo" className="form-control mb-3" onChange= {(e)=>{onFileSelect(e)}}></input>

        <button type ="submit" className="btn btn-success mt-3">Add product</button>
    
    </form>
  
    )

}
export default AddProduct;