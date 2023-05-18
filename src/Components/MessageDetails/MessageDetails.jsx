import React, { useContext, useEffect, useState } from 'react'
import styles from "./MessageDetails.module.css"
import { Helmet } from 'react-helmet'
import { receiveMessagesContext } from './../../Context/ReceiveMessagesContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MessageDetails() {
let {id}=useParams()
  let {baseUrl,headers} = useContext(receiveMessagesContext)

  const [load, setLoad] = useState(false)
  const [details, setDetails] = useState(null)


useEffect(()=>{
  messageDetails(id)
},[])


const messageDetails = async(id) => {
  setLoad(true)
let response = await axios.get(`${baseUrl}/contact/${id}`,{
  headers:headers
}).catch((error)=>error)
setDetails(response.data.result)
setLoad(false)
}

  return <>
          <Helmet>
  <title>Message Details</title>
  </Helmet>
<div className="main">
  {details?<div className="details w-100">
  <div>
            <h2 className='text-center'>Student Data</h2>
  <div className="recentOrder ">
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='mt-3 fs-5'><span className='text-primary fs-5'>Student Name : </span>{details.student.fullName}</h3>
          <h3 className='my-2 fs-5'>Phone : {details.student.phone}</h3>
        </div>
</div>

            <h2 className='text-center mt-5'>Message</h2>
            <div className="recentOrder mt-3 ">
            <div>

          <p className='p-2 fs-5'>{details.message}</p>

</div>
</div>
  </div>

</div>:null}
</div>

  </>

}
