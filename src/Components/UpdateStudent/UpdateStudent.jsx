import styles from "./UpdateStudent.module.css"
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import swal from 'sweetalert';
import { toast } from 'react-hot-toast'
import { studentContext } from './../../Context/studentContext';


export default function UpdateStudent() {
  let navigate = useNavigate()
  let {id} = useParams()
  let {baseUrl,headers} = useContext(studentContext)

    const [load, setLoad] = useState(false)
    const [arabic, setArabic] = useState(null)
    const [english, setEnglish] = useState(null)
    const [Loading, setLoading] = useState(false)

    function refresh(){
      displayStudentDescriptionEn(id)
    }

  useEffect(()=>{
    refresh()
  },[])


async function displayStudentDescriptionEn(id){
  setLoad(true)
let response = await axios.get(`${baseUrl}/students/${id}`)
setEnglish(response.data.result)
setLoad(false)
}

function submit(e){
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
const data = Object.fromEntries(formData)

updateStudentDescription(data)
}


async function updateStudentDescription(data){
  setLoading(true)

let response = await axios.put(`${baseUrl}/students/${id}`,
data
,{
  headers:headers
})
if(response.status===200){
  refresh()
  swal("Good job!", "student details has been updated", "success");
  setLoading(false)
  navigate("/student")
}else{
  setLoading(false)
  toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
}

}

  return <>
        <Helmet>
          <title> Update Students Details</title>
        </Helmet>
<div className="main" >


        <Link to={"/student"} >
        <button className="btn btn-primary mx-4 mt-3">Go to Students</button>
        </Link>



        <h2 className="content-title text-center ">Update Students information's</h2>


      {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<div className='d-flex justify-content-center align-content-center'>
    <form className='w-75' onSubmit={submit}>
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">

              {english?<div className="mb-4">
              <label className="form-label text-primary">Student Name </label>
<input className="form-control mb-3" type="text" name='fullName' defaultValue={english.fullName} placeholder="Type here" id="fullName" />   

              <label className="form-label text-primary">Code </label>
<input className="form-control mb-3" type="text" name='code' defaultValue={english.code} placeholder="Type here" id="code" />   

              <label className="form-label text-primary">phone </label>
<input className="form-control mb-3" type="text" name='phone' defaultValue={english.phone} placeholder="Type here" id="phone" />   

              <label className="form-label text-primary">Specialization</label>
<input className="form-control mb-3" type="text" name='Specialization' defaultValue={english.Specialization} placeholder="Type here" id="Specialization" /> 

    <label className="form-label text-primary">Role:</label>
            <select id="role" name='role' defaultValue={english.role} className="form-select w-50 ">
            <option>admin</option>
            <option>student</option>
            </select>
                        
                  </div>:null}

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
