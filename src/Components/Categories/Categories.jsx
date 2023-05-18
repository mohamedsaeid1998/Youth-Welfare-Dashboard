import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';
import { categoryContext } from './../../Context/CategoryContext';
import axios from 'axios';
import styles from "./Categories.module.css"

export default function Categories() {

let {getCategory,baseUrl,headers}= useContext(categoryContext)

  const [arabic, setArabic] = useState(null)
  const [english, setEnglish] = useState(null)

useEffect(()=>{
  refresh()
},[])

function refresh(){
  displayCategory("ar")
  displayCategoryEn("en")
}

async function displayCategory(lang){
let response = await getCategory(lang)
setArabic(response.data)


}
async function displayCategoryEn(lang){
let response = await getCategory(lang)
setEnglish(response.data)

}

async function deleteCategory(id){
  let response = await axios.delete(`${baseUrl}/categories/${id}`,
{
    headers:headers
  })
  if(response.status===200){
    swal("Good job!", "A new category has been deleted successfully", "success");
    refresh()
  }
}
  return <>

        <Helmet>
        <title>Users</title>
        </Helmet>
        <div className="main">
        <div className="details w-100">
            <div className="recentOrders ">
            <h2 className='text-center mainHead'>Categories</h2>

            <div className='me-auto text-end'>
              <Link to={"/addCategory"}>
              <button className='btn btn-primary'> Add Category</button>
              </Link>
            </div>

            {english?<div className="cardHeader">

                  <table>
                  <thead>
                            <tr>
                                <td>Title</td>
                                <td>Update</td>
                                <td>Delete</td>
                            </tr>
                        </thead>

                        {english?.result?.map((eng,index)=><tbody key={index}>
                            <tr>
                                <td>{eng.title_en}</td>

                                <td>
                                <Link to={`/updateDetails/${eng._id}`}>
                                <span className="btn btn-warning btn-sm ">Update</span>
                                </Link>
                                </td>



                                <td><span onClick={()=>deleteCategory(eng._id)} className="btn btn-danger btn-sm">Delete</span></td>

                            </tr>
                        </tbody>)}



                    </table>
        </div>:null}
        </div>
        </div>
        </div>







  
  </>
}
