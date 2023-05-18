import styles from "./Student.module.css"
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { studentContext } from './../../Context/studentContext';

export default function Student() {

  let {getStudent,baseUrl,headers}= useContext(studentContext)

  const [student, setStudent] = useState(null)
  const [english, setEnglish] = useState(null)
  const [load, setLoad] = useState(false)
  const [Loading, setLoading] = useState(false)

useEffect(()=>{
  displayStudentEn()
},[])



async function displayStudentEn(){
  setLoad(true)
let response = await getStudent()
setStudent(response.data)

setLoad(false)
}

async function deleteStudent(id){
  let response = await axios.delete(`${baseUrl}/students/${id}`,
  {
    headers:headers
  })
  
  if (response.data==="deleted"){
    swal("Good job!", "The Student has been Deleted ", "success");
    displayStudentEn("en")
  }else{
    toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
  }

}

async function activeStudent(id){
  let response = await axios.get(`${baseUrl}/students/active/${id}`,
  {
    headers:headers
  }).catch((error)=>error)

  if(response.data.message ===" student is active successfully"){
    swal("Good job!", "The Student has been active now ", "success")
    displayStudentEn()
  }
  
}


  return <>
        <Helmet>
        <title>Students</title>
        </Helmet>
        <div className="main">
      <div className="details w-100">
            <div className="recentOrders ">
            <div className='text-end'>
              <Link to={"/addStudent"}>
              <button className='btn btn-primary'>Add Student</button>
              </Link>
            </div>

            <h2 className='text-center mainHead'>Students</h2>

            {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<div className="cardHeader">

                  <table>
                  <thead>
                            <tr>
                                <td>Student Name</td>
                                <td>Code</td>
                                <td>Phone</td>
                                <td>Specialization</td>
                                <td>Update </td>
                                <td>Delete</td>
                                <td>Active</td>
                            </tr>
                        </thead>

                        {student?.result?.map((eng,index)=><tbody key={index}>
                            <tr>
                                <td>{eng.fullName}</td>
                                <td>{eng.code}</td>
                                <td>{eng.phone}</td>
                                <td>{eng.Specialization}</td>

                                <td>
                                <Link to={`/updateStudent/${eng._id}`}>
                                <span className="btn btn-warning btn-sm ">Update </span>
                                </Link>
                                </td>



                                <td><span onClick={()=>deleteStudent(eng._id)} className="btn btn-danger btn-sm">Delete</span></td>

                                <td>{eng.active?<i className="fa-solid fa-thumbs-up fs-3 text-green me-2 "></i>:<button onClick={()=>activeStudent(eng._id)} className="btn btn-info">Active</button>}</td>
                            </tr>
                        </tbody>)}



                    </table>
        </div>}
        </div>
        </div>
        </div>
  </>
}
