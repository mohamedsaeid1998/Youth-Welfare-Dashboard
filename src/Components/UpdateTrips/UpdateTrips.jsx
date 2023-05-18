import styles from "./UpdateTrips.module.css"
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import swal from 'sweetalert';
import { toast } from 'react-hot-toast'
import { tripsContext } from './../../Context/tripsContext';

export default function UpdateTrips() {
let navigate = useNavigate()

  let {id} = useParams()
  let {baseUrl,headers} = useContext(tripsContext)

    const [load, setLoad] = useState(false)
    const [arabic, setArabic] = useState(null)
    const [english, setEnglish] = useState(null)
    const [Loading, setLoading] = useState(false)

    function refresh(){
      displayTripsDescription(id)
      displayTripsDescriptionEn(id)
    }

  useEffect(()=>{
    refresh()
  },[])

async function displayTripsDescription(id){
  setLoad(true)
let response = await axios.get(`${baseUrl}/trips/${id}?lang=ar`)

setArabic(response.data.result)
setLoad(false)
}

async function displayTripsDescriptionEn(id){
  setLoad(true)
let response = await axios.get(`${baseUrl}/trips/${id}?lang=en`)
setEnglish(response.data.result)
setLoad(false)
}

function submit(e){
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
const data = Object.fromEntries(formData)

updateTripsDescription(data)
}


async function updateTripsDescription(data){
  setLoading(true)

let response = await axios.put(`${baseUrl}/trips/${id}`,
data
,{
  headers:headers
})
if(response.status===200){
  refresh()
  swal("Good job!", "Trips details has been updated", "success");
  setLoading(false)
  navigate("/trips")
}else{
  setLoading(false)
  toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
}

}




  return <>
        <Helmet>
          <title> Update Trips</title>
        </Helmet>
<div className="main" >


        <Link to={"/trips"} >
        <button className="btn btn-primary mx-4 mt-3">Go to Trips</button>
        </Link>



        <h2 className="content-title text-center ">Update Trips Description</h2>


      {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<div className='d-flex justify-content-center align-content-center'>
    <form className='w-75' onSubmit={submit}>
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">

              {english?<div className="mb-4">
              <label className="form-label text-primary">Title </label>
<input className="form-control mb-3" type="text" name='title_en' defaultValue={english.title_en} placeholder="Type here" id="title_en" />   

              <label className="form-label text-primary">Place </label>
<input className="form-control mb-3" type="text" name='place_en' defaultValue={english.place_en} placeholder="Type here" id="place_en" />   

                  <label className="form-label text-primary">Description</label>
                <textarea name='description_en' defaultValue={english.description_en} placeholder="Type here"className="form-control" rows="7" id="description" required="">
                  </textarea>
                        
                  </div>:null}

              {arabic?<div className="mb-4 mns" >
              <label className="form-label text-warning">اسم النشاط :  </label>
<input className="form-control mb-3" type="text" name='title_ar' defaultValue={arabic.title_ar} placeholder="Type here" id="title_ar" />

              <label className="form-label text-warning">اسم المكان :  </label>
<input className="form-control mb-3" type="text" name='place_ar' defaultValue={arabic.place_ar} placeholder="Type here" id="place_ar" />   

                  <label className="form-label text-warning">وصف النشاط :</label>
                <textarea name='description_ar' defaultValue={arabic.description_ar} placeholder="Type here"className="form-control" rows="7" id="description" required="" >
                  </textarea>
              
                            </div>
:null}





                <div className='d-flex justify-content-center align-items-center'>
                {Loading?<button type="button" className="btn btn-primary"><i className='fas fa-spinner fa-spin'></i></button>:
                <button className="btn btn-primary ">Publish now</button>}
                </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>}


  </div>
  </>
}
