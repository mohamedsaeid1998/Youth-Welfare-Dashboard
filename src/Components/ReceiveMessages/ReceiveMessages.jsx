import styles from "./ReceiveMessages.module.css"
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { receiveMessagesContext } from '../../Context/ReceiveMessagesContext';
import moment from "moment"


export default function ReceiveMessages() {


  let {getReceiveMessages,baseUrl,headers}= useContext(receiveMessagesContext)


  const [load, setLoad] = useState(false)
  const [user, setUser] = useState(null)

useEffect(()=>{
  displayUsersEn("en")
},[])



async function displayUsersEn(lang){
  setLoad(true)
let response = await getReceiveMessages(lang)
setUser(response.data)

setLoad(false)
}

async function deleteMessage(id){
  let response = await axios.delete(`${baseUrl}/contact/${id}`,
  {
    headers:headers
  })
  if (response.data===true){
    swal("Good job!", "The Message has been Deleted ", "success");
    displayUsersEn("en")
  }else{
    toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
  }

}

async function deleteAllMessage(){
  let response = await axios.delete(`${baseUrl}/contact`,
  {
    headers:headers
  })
  if (response.messge==="Collection dropped successfully"){
    swal("Good job!", "All Messages has been Deleted ", "success");
    displayUsersEn("en")
  }else{
    toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
  }

}



  return <>
        <Helmet>
        <title>Receive Messages</title>
        </Helmet>
        <div className="main">
        {user?<div className="details w-100">
            <div className="recentOrders ">


            <h2 className='text-center mainHead'>Messages</h2>



            <div className=" text-end w-100">
                        <button onClick={()=>deleteAllMessage()} className="btn btn-danger mx-auto">DeleteAll</button>
                        </div>

            {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<div className="cardHeader">

                  <table>
                  <thead>
                            <tr>
                                <td>Name</td>
                                <td>phone</td>
                                <td>code</td>
                                <td>createdAt</td>
                                <td>Details</td>
                                <td>Delete</td>
                            </tr>
                        </thead>

                        {user?.result?.map((eng,index)=><tbody key={index}>
                            <tr>
                                <td>{eng.student.fullName}</td>
                                <td>{eng.student.phone}</td>
                                <td>{eng.student.code}</td>
                                <td >{moment(eng.createdAt).format(" Do MMM YY")}</td>
                                <td>
                                <Link to={`/messageDetails/${eng._id}`}>
                                <span className="btn btn-warning btn-sm ">Details</span>
                                </Link>
                                </td>

                                <td><span onClick={()=>deleteMessage(eng._id)} className="btn btn-danger btn-sm">Delete</span></td>

                            </tr>
                        </tbody>)}



                        
                        

                    </table>

        </div>}
        </div>
        </div>:null}
        </div>
  </>
}
