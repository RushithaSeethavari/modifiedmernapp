import axios from 'axios';
import {useState} from 'react'
import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom'


function Register() {

    const { register,handleSubmit }=useForm();
    const [file,setFile]=useState(null)
    const history=useHistory();
    

    const onFormSubmit = (userObj)=>{

        //create FormData obj
        let formData=new FormData();
        //add files to formdata obj
        formData.append('photo',file,file.name)
        //add userObj to formdata object
        formData.append("userObj",JSON.stringify(userObj))

        //post req
        axios.post("/user/createuser",formData)
            .then(res =>{
                let resObj = res.data;
                alert(resObj.message)
                //navigate to login
                history.push('/login')
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
        <form className="w-75 mx-auto mt-5" onSubmit={ handleSubmit(onFormSubmit)}>
            <input type="text" className="form-control mb-3" {...register("username")} placeholder="Username"></input>
            <input type="password" className="form-control mb-3" {...register("password")} placeholder="Password"></input>
            <input type="email" className="form-control mb-3" {...register("email")} placeholder="E-mail"></input>
            <input type="date" className="form-control mb-3" {...register("date")} placeholder="Date of birth"></input>
            <input type="file" name="photo" className="form-control mb-3 " onChange={ (e)=>{onFileSelect(e)}}></input>
        
            <button className="btn btn-success">Register</button>
    
    
    
    
    
        </form>
        
    )
    }
    export default Register;