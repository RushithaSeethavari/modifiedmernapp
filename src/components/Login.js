
import {useForm} from "react-hook-form";
import { useHistory } from 'react-router-dom';
import axios from 'axios'

function Login(props){
    let {register,handleSubmit ,formState: {errors}} = useForm();
    let history=useHistory();

    const onFormSubmit = (credentials)=>{

        axios.post(`/${credentials.type}/login`,credentials)
         .then(res =>{
             let resObj = res.data;
             if (resObj.message === "login-success"){
                 //save token in local storage
                 localStorage.setItem("token",resObj.token)
                 localStorage.setItem('username',resObj.username)
                 localStorage.setItem("user",JSON.stringify(resObj.userObj))
                 //update user login state
                 props.setUserLoginStatus(true)

                 if (credentials.type === "user") {
                     //navigate to user profile
                     history.push(`/userprofile/${resObj.username}`)

                 }
                 if (credentials.type === "admin"){
                     history.push(`/adminprofile/${resObj.username}`)

                 }
            }
                

             else{
                 alert(resObj.message)
             }
        
         })
         .catch(err =>{
             console.log(err)
             alert("something went wrong in login")
         })

        
    }
        

    return(
        <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit(onFormSubmit)}>


            <div class="form-check">
                <input class="form-check-input" type="radio" id="admin" {...register("type")} value="admin"/>
                <label class="form-check-label" for="admin">Admin</label>

            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" id="user" {...register("type")} value="user"/>
                <label class="form-check-label" for="user">User</label>

            </div>
            <input type="text"className="form-control mb-3"  {...register("username")} placeholder="Username"></input>
            <input type="password"className="form-control mb-3"  {...register("password")} placeholder="Password"></input>
            <button className="btn btn-success">login</button>
        </form>

    )
}

export default Login;