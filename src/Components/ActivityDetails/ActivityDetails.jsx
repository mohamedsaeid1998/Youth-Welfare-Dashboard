
import styles from "./ActivityDetails.module.css"
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import swal from 'sweetalert';
import { toast } from 'react-hot-toast'
import { activitiesContext } from "../../Context/activitiesContext";
export default function ActivityDetails() {
  let navigate = useNavigate()
  let {id} = useParams()
  let {baseUrl,headers} = useContext(activitiesContext)

    const [load, setLoad] = useState(false)
    const [arabic, setArabic] = useState(null)
    const [english, setEnglish] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null);

    function refresh(){
      displayActivitiesDescription()
      displayActivitiesDescriptionEn()
    }

  useEffect(()=>{
    refresh()
  },[])

async function displayActivitiesDescription(){
  setLoad(true)
let response = await axios.get(`${baseUrl}/activities/${id}?lang=ar`)
setArabic(response.data.result)
setLoad(false)
}

async function displayActivitiesDescriptionEn(lang){
  setLoad(true)
let response = await axios.get(`${baseUrl}/activities/${id}?lang=en`)
setEnglish(response.data.result)
setLoad(false)
}

function submit(e){
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
const data = Object.fromEntries(formData)
updateActivityDescription(data)
}


async function updateActivityDescription(data){
  setLoading(true)
let response = await axios.put(`${baseUrl}/activities/${id}`,
data
,{
  headers:headers
})
if(response.status===200){
  refresh()
  swal("Good job!", "Category details has been updated", "success");
  setLoading(false)
  navigate('/activities')
}else{
  setLoading(false)
  toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
}

}


const handleImageChange = (event) => {
  const file = event.target.files[0];
  setImageFile(file);

}

async function addImage(){
  setLoading(true)
  const formData = new FormData()

  formData.append('image', imageFile);

  let response = await axios.post(`${baseUrl}/activities/addImage/${id}`,
  formData
  ,{
  headers:headers
  })
  if(response.data.message==="add image success"){
    refresh()
    swal("Good job!", "The Image has been successfully Added", "success");
    setLoading(false)
  }else{
    toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
    setLoading(false)
  }

}



async function deleteImage(cloud){
  setLoading(true)
  let response = await axios.post(`${baseUrl}/activities/removeImage/${id}`,
  {
    cloudinary_id:cloud
  }
  ,{
    headers:headers
  })
  if(response.status===200){
    refresh()
    swal("Good job!", "The Image has been Deleted ", "success");
    setLoading(false)
  }else{
    toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
    setLoading(false)
  }

  }

  return <>
        <Helmet>
          <title> Details & Update Activity</title>
        </Helmet>
<div className="main" >


        <Link to={"/activities"} >
        <button className="btn btn-primary mx-4 mt-3">Go to Activities</button>
        </Link>



        <h2 className="content-title text-center ">Update Activities Description</h2>


      {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<div className='d-flex justify-content-center align-content-center'>
    <form className='w-75' onSubmit={submit}>
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">

              {english?<div className="mb-4">
              <label className="form-label text-primary">Title </label>
<input className="form-control mb-3" type="text" name='title_en' defaultValue={english.title_en} placeholder="Type here" id="title_en" />   

                  <label className="form-label text-primary">Description</label>
                <textarea name='description_en' defaultValue={english.description_en} placeholder="Type here"className="form-control" rows="7" id="description" required="">
                  </textarea>

                  
                        
                  </div>:null}

              {arabic?<div className="mb-4 mns" >
              <label className="form-label text-warning">اسم النشاط :  </label>
<input className="form-control mb-3" type="text" name='title_ar' defaultValue={arabic.title_ar} placeholder="Type here" id="title_ar" />   

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



    <h2 className="content-title text-center ">Update Images</h2>

    {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<div className='d-flex justify-content-center align-content-center'>

    <div className="row mb-4">
<div className="col-xl-12 col-lg-12">
  <div className="card mb-4 shadow-sm">
    <div className="card-body">
          <div className='w-100' >
    <div className='d-flex justify-content-center align-items-center mb-4'>
    <input className="form-control mt-2 w-50 text-center" onChange={handleImageChange}  type="file" id="image" name='image' placeholder='image must be less than 3 MB' required />
    {Loading?<button type="button" className="btn btn-primary"><i className='fas fa-spinner fa-spin'></i></button>:
    <button onClick={()=>addImage()} className='btn btn-primary mt-2'>Add Image</button>}
    </div>
    </div>


    <div className="row">


 {arabic?.images?.map((image,index)=><div key={index} className="col-md-3">
            <label className="form-label">Images {index+1}</label>
            <div className='position-relative img overflow-hidden'>

              <img src={image.url} className='w-100' alt="" />
                    <div  className=" word p-3 position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center cursor-pointer w-100 ">
                    <i onClick={()=>deleteImage(image.cloudinary_id)} className="fa-solid fa-xmark fs-2 position-absolute top-0 end-0 text-danger p-3 pointer"></i>
                    </div>

              </div>
            </div>)}

        
          </div>


    </div>
  </div>
</div>
</div>

</div>}

  </div>
  </>
}
