import React from 'react'
import axios from 'axios'

function Test(){


    let token=localStorage.getItem("token")

    //create new axios req obj
    let apiUrl = "http://localhost:4000"

    const axiosReq = axios.create({

        baseUrl : apiUrl,
        headers :{
            Authorization: `Bearer ${token}`
        }
    })

    const makeReqToProtectedRoute=()=>{
        axiosReq.get("/user/testing")
        .then(res=>{
            alert(res.data.message)
        })
    }

    return(
        <div>
            <h1 className="text-center">Test</h1>
            <button onClick={()=>makeReqToProtectedRoute()}>Make req</button>
        </div>
    )
}

export default Test;