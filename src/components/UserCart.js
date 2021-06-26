import axios from 'axios'
import { useEffect, useState } from 'react'

function UserCart(props){
    let [cartData,setCartData]=useState([])
    console.log("cart Data",cartData)

    useEffect(()=>{
        axios.get(`/user/getcart/${props.username}`)
        .then(res=>{
            let cartObj=res.data.message;
            //console.log("cartObj",cartObj)
            let products=cartObj[0].products;
            //console.log("products",products)
            setCartData({...products})
        })
        .catch(err=>{
            console.log(err)
            alert("something went wrong")
        })
    },[cartData.username])

    return(
        <table className="table">
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Product model</th>
                <th>Date of manf</th>
                <th>Product Img</th>
            </tr>
            </thead>
            <tbody>
                {
                    cartData && cartData.map((data,ind)=>{
                        return(
                            <tr key={ind}>
                                <td>{data.productname}</td>
                                <td>{data.productmodel}</td>
                                <td>{data.dateofmanf}</td>
                                <td><img src={data.ProfileImg} width="80px"/></td>

                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )

}

export default UserCart;