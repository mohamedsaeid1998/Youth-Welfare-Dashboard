import React, { useContext, useEffect, useState } from 'react'
import styles from "./HomePage.module.css"
import { homeContext } from '../../Context/homeContext'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


export default function HomePage() {

  let {getDescription} = useContext(homeContext)

    const [para, setPara] = useState(null)

  useEffect(()=>{
    changing()
    displayDescription("ar")
  },[])

async function displayDescription(lang){
let response = await getDescription(lang)

setPara(response.data.result[0])
}



async function changing(){
  let data = document.querySelector(".round")
  data?.classList.toggle("active")

  if(data?.classList.contains("active")){
    async function displayDescription(lang){
      let response = await getDescription(lang)

      setPara(response?.data.result[0])
      }
      displayDescription("ar")
  }else {
    async function displayDescription(lang){
      let response = await getDescription(lang)

      setPara(response?.data?.result[0])
      }
      displayDescription("en")
  }
}

  return <>
           <Helmet>
        <title>Home</title>
        </Helmet>

    <div className="main p-3 text-center">
      {para?<div>
        <div className='d-flex justify-content-between align-items-center'>

        <Link to={`/updateDescription/${para._id}`}>
        <button className='btn btn-primary'>Update Description</button>
        </Link>


        <h1  className=' me-5 pe-5 '>{para.name_ar?para.name_ar:para.name_en}</h1>
        <div className='d-flex-align-items-center'>
          <span>AR</span>
        <label  className="switch mx-2">
          <input  type="checkbox"/>
          <span onClick={changing} className="slider round active"></span>
        </label>
        <span>EN</span>
        </div>
        




        </div>
      
        
        <p className='mt-3 px-5  des '>
        {para.description_ar?<p className='text-end'>{para.description_ar}</p>:<p className='text-start'>{para.description_en}</p>}
        </p>
      </div>:null}

    </div>
  </>
}
