import React, { useContext, useEffect, useState } from 'react'
import styles from "./UpdateDescription.module.css"
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { homeContext } from './../../Context/homeContext';
import axios from 'axios';
import swal from 'sweetalert';
import { toast } from 'react-hot-toast'

export default function UpdateDescription() {
let {id} = useParams()
  let {getDescription ,baseUrl,headers} = useContext(homeContext)

    const [load, setLoad] = useState(false)
    const [arabic, setArabic] = useState(null)
    const [english, setEnglish] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null);
  useEffect(()=>{
    displayDescription("ar")
    displayDescriptionEn("en")
  },[])

async function displayDescription(lang){
  setLoad(true)
let response = await getDescription(lang)
setArabic(response.data.result[0])

setLoad(false)
}

async function displayDescriptionEn(lang){
  setLoad(true)
let response = await getDescription(lang)
setEnglish(response.data.result[0])
setLoad(false)
}

function submit(e){
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
const data = Object.fromEntries(formData)

updateDescription(data)
}


async function updateDescription(data){
  setLoading(true)
let response = await axios.put(`${baseUrl}/${id}`,
data
,{
  headers:headers
})
if(response.status===200){
  refresh()
  setLoading(false)
}else{
  setLoading(false)
  toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
}

}




const handleImageChange = (event) => {
  const file = event.target.files[0];
  setImageFile(file);

}

function refresh(){
  displayDescription("ar")
  displayDescriptionEn("en")
}

async function addImage(){
  setLoading(true)
  const formData = new FormData()

  formData.append('image', imageFile);

  let response = await axios.post(`https://actitvityv1.onrender.com/addImage/${id}`,
  formData
  ,{
  headers:headers
  })
  if(response.data.message==="add image success"){
    refresh()
    swal("Good job!", "The Image has been successfully Added", "success");
    setLoading(false)
  }else{
    setLoading(false)
    toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
  }

}



async function deleteImage(cloud){
  setLoading(true)
  let response = await axios.post(`${baseUrl}/removeImage/${id}`,
  {
    cloudinary_id:cloud
  }
  ,{
    headers:headers
  })
  if(response.status===200){
    refresh()
    setLoading(false)
  }else{
    toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
    setLoading(false)
  }

  }


  return <>
        <Helmet>
          <title>Update Description</title>
        </Helmet>
<div className="main" >


        <Link to={"/"} >
        <button className="btn btn-primary mx-4 mt-3">Go to HomePage</button>
        </Link>



        <h2 className="content-title text-center ">Update Description</h2>


      {load?<div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-black-50' ></i></div>:<div className='d-flex justify-content-center align-content-center'>
    <form className='w-75' onSubmit={submit}>
      <div className="row mb-4">
        <div className="col-xl-12 col-lg-12">
          <div className="card mb-4 shadow-sm">
            <div className="card-body">

              {english?<div className="mb-4">
           

                <textarea name='description_en' defaultValue={english.description_en} placeholder="Type here"className="form-control" rows="7" id="description" >
                  </textarea>
              </div>:null}

              {arabic?<div className="mb-4">
                  <label className="form-label text-warning">Description in Arabic</label>
                <textarea name='description_ar' defaultValue={arabic.description_ar} placeholder="Type here"className="form-control" rows="7" id="description"  >
                  </textarea>
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
                    <div onClick={()=>deleteImage(image.cloudinary_id)} className=" word p-3 position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center cursor-pointer w-100 ">
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

