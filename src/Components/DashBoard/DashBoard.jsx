import React, { useContext, useEffect, useState } from 'react'
import { productContext } from '../../Context/ProductsContext'
import axios from 'axios'
import styles from "./DashBoard.module.css"
import { Helmet } from 'react-helmet';
import moment from "moment"
export default function DashBoard() {

let {headers} = useContext(productContext)
const [load, setLoad] = useState(false)
useEffect(()=>{
    getOrders()
},[])

const [order, setOrder] = useState(null)
async function getOrders(){
    setLoad(true)
    let response= await axios.get(`https://coffee-2pwn.onrender.com/api/v1/orders`,
    {
        headers:headers
    })
    setOrder(response.data)
    setLoad(false)

}



function update(index){

let Paid =document.querySelectorAll("#heres")
let status =document.querySelectorAll(".status")
if (Paid[index].innerHTML==="False" && status[index].innerHTML==="In Progress"){
    Paid[index].innerHTML= "True"
    status[index].innerHTML = "Delivered"
    status[index].classList.remove("inProgress")
    status[index].classList.add("delivered")

}else{
    Paid[index].innerHTML= "False"
    status[index].innerHTML = "In Progress"
    status[index].classList.remove("delivered")
    status[index].classList.add("inProgress")
}
}

  return <>
         <Helmet>
        <title>DashBoard</title>
        </Helmet>
    <div className="main">
  <div className="cardBox">
                <div className="card ">
                    <div className='d-flex justify-content-between align-items-center'>

                        <div>
                        <p className="numbers mb-0 fs-2">1,504</p>
                        <span className="cardName">Daily Views</span>
                        </div>

                        <div className="iconBx">
                            <i className="fa-regular fa-eye "></i>
                        </div>
                        
                    </div>

                </div>

                <div className="card">
                    <div className='d-flex justify-content-between align-items-center'>

                        <div>
                        <p className="numbers mb-0 fs-2">80</p>
                        <span className="cardName">Sales</span>
                        </div>

                        <div className="iconBx">
                        <i className="fa-solid fa-cart-shopping "></i>
                        </div>

                    </div>


                </div>

                <div className="card">
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                        <p className="numbers mb-0 fs-2">284</p>
                        <span className="cardName">Comments</span>
                        </div>

                        <div className="iconBx">
                        <i className="fa-regular fa-comments "></i>
                        </div>

                    </div>
                </div>

                <div className="card">
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                        <p className="numbers mb-0 fs-2">$7,842</p>
                        <span className="cardName">Earning</span>
                        </div>

                        <div className="iconBx">
                            <i className="fa-solid fa-coins "></i>
                        </div>

                    </div>

                </div>
            </div>

            <div className="details w-100">
              <div className="recentOrders ">
                    <div className="cardHeader">
                        <h2>Recent Orders</h2>
                    </div>

                    {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<table>
                        
                        <thead>
                            <tr>
                                <td>Details</td>
                                <td>city</td>
                                <td>Price</td>
                                <td>Phone</td>
                                <td>CreatedAt</td>
                                <td>Payment</td>
                                <td>Status</td>
                                <td>Update</td>
                            </tr>
                        </thead>

                        {order? <tbody>

                            {order?.orders.map((order,index)=><tr key={index}>
                                <td>{order.shippingAddress.details}</td>
                                <td>{order.shippingAddress.city}</td>
                                <td>{order.totalOrderPrice}</td>
                                <td>{order.shippingAddress.phone}</td>
                                <td >{moment(order.createdAt).format(" Do MMM YY")}</td>
                                <td id='heres'>False</td>
                                <td id="there"><span className="status inProgress">In Progress</span></td>
                                <td><span onClick={()=>update(index)} className="btn btn-warning btn-sm">Update Status</span></td>
                                
                            </tr>)}
 
                        </tbody>: null}

                    </table>}
                </div> 
            </div>
            </div>


</>
}


