import styles from "./SentNotifications.module.css"
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { notificationsContext } from './../../Context/notificationsContext';
import { categoryContext } from "../../Context/CategoryContext";

export default function SentNotifications() {

  let {baseUrl,headers} = useContext(notificationsContext)
  let {getCategory} = useContext(categoryContext)

  const [category, setCategory] = useState(null)
    const [load, setLoad] = useState(false)
    const [english, setEnglish] = useState(null)
    const [Loading, setLoading] = useState(false)


useEffect(()=>{
  displayCategoryEn("ar")
  categoryKind("64078f7b04c364c71a432601")
},[])


async function displayCategoryEn(lang){
  let response = await getCategory(lang)
  setEnglish(response.data)
  }


    function categoryKindValue(){
      let category = document.querySelector("#category").value
      categoryKind(category)
    }



    async function categoryKind(categoryId){
      let response = await axios.get(`${baseUrl}/categories/${categoryId}/activities?lang=ar`)
      setCategory(response.data)
    }


function submit(e){
  e.preventDefault()
  let notifications = document.querySelector("#activity").value
  let message = document.querySelector("#message").value


sentNotificationsDescription(notifications,message)
}


async function sentNotificationsDescription(notifications,message){
  setLoading(true)
let response = await axios.post(`${baseUrl}/send-email`,
{
  activity:notifications,
  message:message
}
,{
  headers:headers
}).then((response)=>response)
.catch((error)=>error)
console.log(response);
if(response?.data?.message==="send notification success"){
  toast.success(`send notification success`,{ duration: 3000, position: 'top-center',className: 'bg-success text-white'})
  setLoading(false)
  displayCategoryEn("ar")
  categoryKind("64078f7b04c364c71a432601")
}else{
  console.log(response);
  toast.error(`${response?.response?.data?.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
  setLoading(false)
}

}





  return <>

        <Helmet>
          <title> Notifications</title>
        </Helmet>
<div className="main" >


        <h2 className="content-title text-center py-3  mainHead">Send Notifications</h2>


<div className='d-flex justify-content-center align-content-center'>
    <div className='w-75' >
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">

            <div className='d-flex justify-content-between align-items-center gap-2'>

            <form  className='category mns'>
                <label htmlFor="category">الانشطة</label>
            <select id="category" name='category' onChange={categoryKindValue} className="form-select  ">
            {english?.result?.map((eng,index)=><option key={index} value={eng._id}>{eng.title_ar}</option>
            )}
            </select>
                </form>

            <form  className='category mns' >
                <label htmlFor="activity">نوع النشاط</label>
            <select id="activity" name='activity' className="form-select  ">
            {category?.result?.map((eng,index)=><option key={index} value={eng._id} name="activity">{eng.title_ar}</option>
            )}
            </select>
                </form>
            </div>

              <form className="my-2 mns" onSubmit={submit}>

                  <label className="form-label text-primary">الرسالة :-</label>
                <textarea name='message' placeholder="اكتب رسالتك"className="form-control" rows="7" id="message" required="">
                  </textarea>

                <div className='d-flex justify-content-center align-items-center mt-3'>
                {Loading?<button type="button" className="btn btn-primary"><i className='fas fa-spinner fa-spin'></i></button>:
                <button className="btn btn-primary ">Publish now</button>}
                </div>
                </form>
                </div>
            </div>
          </div>
        </div>
    </div>
    </div>

  </div>
  </>
}
