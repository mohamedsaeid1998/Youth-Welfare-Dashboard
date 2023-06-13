import React, { useContext, useEffect, useState } from 'react'
import styles from "./Activities.module.css"
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import { categoryContext } from './../../Context/CategoryContext';
import axios from 'axios';
import { activitiesContext } from '../../Context/activitiesContext';
import { toast } from 'react-hot-toast';

export default function Activities() {

  let {getCategory,baseUrl,headers}= useContext(categoryContext)
  let {getPdf}= useContext(activitiesContext)


  const [english, setEnglish] = useState(null)
  const [load, setLoad] = useState(false)
  const [category, setCategory] = useState(null)
  
useEffect(()=>{

  displayCategoryEn("en")
  categoryKind("6407a75204c364c71a432612")
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


async function displayCategoryEn(lang){
let response = await getCategory(lang)
setEnglish(response.data)

}

async function deleteCategory(id){
  let response = await axios.delete(`${baseUrl}/activities/${id}`,
{
    headers:headers
  })
  if(response.status===200){
    swal("Good job!", "Activity has been deleted successfully", "success");
    displayCategoryEn("en")
  categoryKind("64078f7b04c364c71a432601")
  }

}




function categoryKindValue(){
  let category = document.querySelector("#category").value
  categoryKind(category)
}



async function categoryKind(categoryId){
  setLoad(true)

  let response = await axios.get(`${baseUrl}/categories/${categoryId}/activities?lang=en`)

  setCategory(response.data)
  setLoad(false)
}



  return <>
        <Helmet>
        <title>Activities</title>
        </Helmet>
        <div className="main">
        {english?<div className="details w-100">
            <div className="recentOrders ">
            <div className='d-flex justify-content-between align-items-center'>
            <form  className='category w-25'>
                <label htmlFor="category">Category</label>
            <select id="category" name='category' onChange={categoryKindValue} className="form-select  ">
            {english?.result?.map((eng,index)=><option key={index} value={eng._id}>{eng.title_en}</option>
            )}
            </select>
                </form>
              <Link to={"/AddActivities"}>
              <button className='btn btn-primary'>Add Activity</button>
              </Link>
            </div>


            <h2 className='text-center mainHead'>Activities</h2>





            {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<div className="cardHeader">

                  <table>
                  <thead>
                            <tr>
                                <td>Title</td>
                                <td>NumberRecorded</td>
                                <td>AverageRating</td>
                                <td>Report</td>
                                <td>Update</td>
                                <td>Delete</td>
                            </tr>
                        </thead>

                        {category?.result?.map((eng,index)=><tbody key={index}>
                            <tr>
                                <td>{eng.title_en}</td>
                                <td>{eng.numRecorded}</td>
                                <td>{eng.averageRating?eng.averageRating:0}</td>
                                <td><button className="btn btn-info ms-3" onClick={()=>showPdf(eng._id)}><i className ="fa-solid fa-file-pdf"></i></button></td>
                                <td>
                                <Link to={`/activityDetails/${eng._id}`}>
                                <span className="btn btn-warning btn-sm ">Update</span>
                                </Link>
                                </td>



                                <td><span onClick={()=>deleteCategory(eng._id)} className="btn btn-danger btn-sm">Delete</span></td>

                            </tr>
                        </tbody>)}



                    </table>
        </div>}
        </div>
        </div>:null}
        </div>







  
  </>
}
