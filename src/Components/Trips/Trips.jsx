import styles from "./Trips.module.css"
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { tripsContext } from './../../Context/tripsContext';
import { toast } from 'react-hot-toast'

export default function Trips() {


  let {getTrips,baseUrl,headers}= useContext(tripsContext)
  let {getPdf}= useContext(tripsContext)


  const [load, setLoad] = useState(false)

useEffect(()=>{
  // displayTrips("ar")
  displayTripsEn("en")

},[])

async function showPdf(id){
  console.log(id);
let response = await getPdf(id)
console.log(response);
if (response.status===200){
  window.location.href=response.data
}else{
  console.log(response);
  toast.error(`${response?.response?.data?.message}`,{ duration: 2000, position: 'top-center',className: 'border border-danger border-3 text-danger'})
}
}


async function displayTripsEn(lang){
  setLoad(true)
let response = await getTrips(lang)
setTrip(response.data)

setLoad(false)
}

async function deleteCategory(id){
  let response = await axios.delete(`${baseUrl}/trips/${id}`,
  {
    headers:headers
  })
  if (response.data==="deleted"){
    swal("Good job!", "The Trip has been Deleted ", "success");
    displayTripsEn("en")
  }else{
    toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
  }
}

const [trip, setTrip] = useState(null)






  return <>
        <Helmet>
        <title>Trips</title>
        </Helmet>
        <div className="main">
      <div className="details w-100">
            <div className="recentOrders ">
            <div className='text-end'>
              <Link to={"/addTrips"}>
              <button className='btn btn-primary'>Add Trips</button>
              </Link>
            </div>

            <h2 className='text-center mainHead'>Trips</h2>

            {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<div className="cardHeader">

                  <table>
                  <thead>
                            <tr>
                                <td>Title</td>
                                <td>Place</td>
                                <td>NumberRecorded</td>
                                <td>price</td>
                                <td>Report</td>
                                <td>Update</td>
                                <td>Delete</td>
                            </tr>
                        </thead>

                        {trip?.result?.map((eng,index)=><tbody key={index}>
                            <tr>
                                <td>{eng.title_en}</td>
                                <td>{eng.place_en}</td>
                                <td>{eng.numRecorded}</td>
                                <td>{eng.price}</td>
                                <td><button className="btn btn-info ms-3" onClick={()=>showPdf(eng._id)}><i className ="fa-solid fa-file-pdf"></i></button></td>
                                <td>
                                <Link to={`/updateTrips/${eng._id}`}>
                                <span className="btn btn-warning btn-sm ">Update</span>
                                </Link>
                                </td>



                                <td><span onClick={()=>deleteCategory(eng._id)} className="btn btn-danger btn-sm">Delete</span></td>

                            </tr>
                        </tbody>)}



                    </table>
        </div>}
        </div>
        </div>
        </div>
  </>
}
