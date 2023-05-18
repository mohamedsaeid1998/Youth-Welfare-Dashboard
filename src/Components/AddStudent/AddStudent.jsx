
import styles from "./AddStudent.module.css"
import React, { useContext,useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import swal from 'sweetalert';
import { toast } from 'react-hot-toast'
import * as Yup from "yup"
import { useFormik } from 'formik';
import { studentContext } from './../../Context/studentContext';


export default function AddStudent() {

  let navigate = useNavigate()

  let {baseUrl,headers} = useContext(studentContext)



    const [Loading, setLoading] = useState(false)



function submit(e){
  e.preventDefault()
const formData = new FormData(e.currentTarget)
const data = Object.fromEntries(formData)
addTripsDetails(data)

}


async function addTripsDetails(data){
  setLoading(true)
let response = await axios.post(`${baseUrl}/students`,
data
,{
  headers:headers
})
if(response.status===200){
  swal("Good job!", "A new student has been added successfully", "success");
  setLoading(false)
  navigate("/student")
}else{
  setLoading(false)
  toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
}

}



let validation =Yup.object({
  fullName:Yup.string().required("fullName is required").min(3,"fullName minLength is 3").max(50,"fullName maxLength is 50"),
  email:Yup.string().required("Email is required").email("this Email is invalid"),
  password:Yup.string().required("Password is required").matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,"password start with a capital char and write between 5 to 10 numbers or char"),
  code:Yup.number().required("code is required").min(200000000, 'Code must start with the number 20').max(209999999, 'Code must be exactly 9 digits long').integer('Code must be an integer'),
  phone:Yup.string().required("phone is required"),
  Specialization:Yup.string().required("Specialization is required"),
})


let formik =useFormik({
  initialValues:{
    fullName:"",
    email:"",
    password:"",
    code:"",
    phone:"",
    Specialization:"",
  },
  validationSchema:validation,
  onSubmit:submit
})

  return <>
<Helmet>
          <title> Add Student</title>
        </Helmet>
        <div className="main" >


<Link to={"/student"} >
<button className="btn btn-primary mx-4 mt-3">Go to Student</button>
</Link>



<h2 className="content-title text-center ">Add New Student </h2>


<div className='d-flex justify-content-center align-content-center'>
<form className='w-75'  onSubmit={submit} >
<div className="row mb-4">
<div className="col-xl-12 col-lg-12">
  <div className="card mb-4 shadow-sm">
    <div className="card-body">

<div className="mb-4">

      <label htmlFor='fullName' className="form-label text-primary">Student Name</label>
<input className="form-control mb-3" type="text" name='fullName' placeholder="Type here" id="fullName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.fullName} />   
  {formik.errors.fullName && formik.touched.fullName?<div className='alert alert-danger'>{formik.errors.fullName}</div> :null}

      <label htmlFor='email' className="form-label text-primary">Email</label>
<input className="form-control mb-3" type="text" name='email' placeholder="Type here" id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />   
  {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div> :null}

      <label htmlFor='password' className="form-label text-primary">Password</label>
<input className="form-control mb-3" type="password" name='password' placeholder="Type here" id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />   
  {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div> :null}

  <label className="form-label text-primary">Code </label>
<input className="form-control mb-3" type="number" name='code' placeholder="Type here" id="code"  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.code}/>
{formik.errors.code && formik.touched.code?<div className='alert alert-danger'>{formik.errors.code}</div> :null}  

  <label className="form-label text-primary">phone </label>
<input className="form-control mb-3" type="tel" name='phone' placeholder="Type here" id="phone"  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}/>
{formik.errors.phone && formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div> :null}  

  <label className="form-label text-primary">Specialization </label>
<input className="form-control mb-3" type="text" name='Specialization' placeholder="Type here" id="Specialization"  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Specialization}/>
{formik.errors.Specialization && formik.touched.Specialization?<div className='alert alert-danger'>{formik.errors.Specialization}</div> :null}  

          </div>

        <div className='d-flex justify-content-center align-items-center'>

        {Loading?<button type="button" className="btn btn-primary mt-2"><i className='fas fa-spinner fa-spin'></i></button>:
                <button disabled={!(formik.dirty)} type="submit" className="btn btn-primary mt-2">Publish now</button>} 

        </div>
    </div>
  </div>
</div>
</div>
</form>
</div>
</div>

  </>
}
