import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../../Assets/images/ssssss.png"
import images from "../../Assets/images/thebes.jpg"
import { useFormik } from 'formik';
import * as Yup from "yup"
import { toast } from 'react-hot-toast'
import { Helmet } from 'react-helmet';
import styles from "./Login.module.css"
import { useTypewriter , Cursor } from "react-simple-typewriter";
export default function Login({saveUserData}) {

  let navigate = useNavigate()
  const [ErrorMessage, setErrorMessage] = useState("")
  const [Loading, setLoading] = useState(false)
  


  async function handelLogin(values){

      setLoading(true)
  let {data} = await axios.post("https://actitvityv1.onrender.com/students/signin",values)
  .catch((error)=>{
      setLoading(false)

      setErrorMessage(error.response.data.message)
      toast.error(`${error.response.data.message}`,{ duration: 2000, position: 'top-center',className: 'bg-danger text-white'})

    })
    if (data.token && data.role ==="admin"){

    localStorage.setItem("userToken",data.token)
    saveUserData()

    toast.success(`successfully Login Welcome Back `,{ duration: 3000, position: 'top-center',className: 'bg-success text-white'})
    navigate("/")
  }
  }
  
  let validation =Yup.object({
      email:Yup.string().required("Email is required").email("this email is invalid"),
      password:Yup.string().required("Password is required")
  })

  let formik =useFormik({
      initialValues:{
          email:"",
          password:"",
      },
      validationSchema:validation,
      onSubmit:handelLogin
  })
  

  useEffect(()=>{
    hiding()
  
    return()=>{
      show()
    }
  },[])
  
  function hiding(){
    let navigation = document.querySelector(".navigation")
    let topbar = document.querySelector(".topbar")
    navigation.classList.add("d-none")
    topbar.classList.add("d-none")
  }
  
  function show(){
    let navigation = document.querySelector(".navigation")
    let topbar = document.querySelector(".topbar")
    navigation.classList.remove("d-none")
    topbar.classList.remove("d-none")
  }


  const [text] = useTypewriter({
    words: [ 'Youth Welfare Dashboard' , 'Thebes Academy' ],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
  })

  return <>
    <Helmet>
        <title>Login page</title>
    </Helmet>
<section className='ground'>
<img src={images} alt="" className='images m-2'height={100}  />
<div className=' '>
<span className='text-center fs-2 fw-bold d-block '>
        Welcome To {' '}
        <span className='fw-bold fs-2 typing'>
        {text}
        </span>
        <span className='text-danger fs-2'>
        <Cursor/>
        </span>
        </span>
</div>



    <div className='mt-1 w-100 d-flex justify-content-center align-items-center loginPage '>
    
        <div className="container d-flex justify-content-center align-items-center text-center ">
        
        <div className="login  rounded overflow-hidden loginShadow bg-white mb-5">
          
            <div className="row g-0 " >
                <div className="col-lg-12  ">

                    <div className=" p-2  ">
                    <header className="text-center">
                        <img src={logo} height={150} className='w-25' alt="logo Youth Welfare" />
                        <h1 className='my-1 fw-bold fs-5'>Login To DashBoard</h1>
                  
                    </header>

                    <form  onSubmit={formik.handleSubmit} className="row gap-0 mt-1 mx-auto text-center " id="Login">

                    <div className="col-12 mt-1 mx-auto text-center">
                        <div className="form-floating ">
                        <input className='w-100 form-control ' type="email" placeholder='Enter Your Email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id='email' />
                        <label htmlFor="email ms-5 d-block ">Email</label>
                        {formik.errors.email && formik.touched.email?<div className='alert alert-danger w-100 error mb-1'>{formik.errors.email}</div> :null}
                        {ErrorMessage?<div className='alert alert-danger w-100  error'>{ErrorMessage}</div>:null}
                        </div>
                    </div>

                    <div className="col-12 mt-1">
                        <div className="form-floating">
                        <input className='w-100 form-control mt-2' type="password" placeholder='Enter Your Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' id='password'/>
                        <label htmlFor="email ms-5 d-block ">Password</label>
                        {formik.errors.password && formik.touched.password?<div className='alert alert-danger w-100 error  mb-1'>{formik.errors.password}</div> :null}
                        </div>
                    </div>

                    <div className="col-12 mt-2 text-center">
                        {Loading? <button type="button" className="btn w-100  btn btn-primary typings w-100" id="btnLogin"><i className='fas fa-spinner fa-spin'></i></button>:
                         <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="  btn btn-primary w-100 typings " id="btnLogin">Sign in</button>}
                    </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</section>

  </>
}

