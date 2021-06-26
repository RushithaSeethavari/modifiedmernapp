import axios from 'axios'
import { useEffect, useState } from 'react'

function UserCart(props){
    console.log(props)
    // let [cartData,setCartData]=useState([])
    // console.log("cart Data",cartData)

    // useEffect(()=>{
    //     axios.get(`/user/getcart/${props.username}`)
    //     .then(res=>{
    //         let cartObj=res.data.message;
    //         //console.log("cartObj",cartObj)
    //         let products=cartObj[0].products;
    //         //console.log("products",products)
    //         setCartData({...products})
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //         alert("something went wrong")
    //     })
    // },[cartData.username])

    return(
        <div>
        <table className="table text-center w-75 mx-auto">
            <thead>
            
                <th>Product Name</th>
                <th>Model</th>
                <th>Image</th>
            
            </thead>
            <tbody>
                
                    {props.cartObj &&
                         props.cartObj.products.map((product,index)=>{
                             return <tr>
                                 <td>{product.productname}</td>
                                 <td>{product.model}</td>
                                 <td>
                                     <img src={product.productImage} width="60px" alt=""/>
                                 </td>
                             </tr>
                         })
                         }
                
            </tbody>
        </table>

         </div>
    )

}

export default UserCart;