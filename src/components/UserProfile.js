import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
//import axios from 'axios'
import ViewProducts from './ViewProducts';
import { BrowserRouter,Switch,Link,Route } from 'react-router-dom'
//import AddProduct from './AddProduct'
import UserCart from './UserCart'
import axios from 'axios';

function UserProfile(){

    let [user,setUser]=useState('')

    let [usercart,setUserCart]=useState('')

    let [products,setProducts]= useState('')


    //function to make post reqto usercart api
    const addProductToCart=(productObj)=>{
        //get username from localstorage
        let username = localStorage.getItem("username")
        //add username to product object
        //productObj.username=username;

        let newObj={username,productObj}

        console.log("product added by user",newObj)
        //make post req
         axios.post("/user/addtocart",newObj)
         .then(res=>{
             let responceObj=res.data
             alert(responceObj.message)
         })
         .catch(err=>{
             console.log("err in adding cart",err)
             alert("something went wrong")
         })

    }



    //get username from url
    let paramsObj = useParams();

    useEffect(()=>{
        // axios.get(`/user/getuser/${paramsObj.username}`)
        // .then(res=>{
        //     let userObj=res.data.message;
        //     setUser({ ...userObj })
        // })
       let userObj = JSON.parse(localStorage.getItem('user'))
       setUser({...userObj})
    },[paramsObj.username])

    return(
        <div>
            <h5 className="text-end">Welcome ,<span className="text-info">{paramsObj.username}</span>
            <img src={user.profileImage} width="60px" alt=""/>
            </h5>
            <BrowserRouter>
            <ul class="nav nav-pills nav-fill">
            
            <li class="nav-item">
                <Link to="/viewproducts" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">View products</Link>
            </li>
            <li class="nav-item">
                <Link to="/usercart" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Cart</Link>
            </li>

            </ul>
            <Switch>
            <Route path="/usercart">
                <UserCart />
            </Route>
            <Route path="/viewproducts">
                <ViewProducts addProductToCart={addProductToCart} />
            </Route>
        </Switch>
        </BrowserRouter>
            
        </div>
    )
}
export default UserProfile;