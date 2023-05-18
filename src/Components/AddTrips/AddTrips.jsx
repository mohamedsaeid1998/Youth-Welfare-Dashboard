import React, { useContext,useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import swal from 'sweetalert';
import { toast } from 'react-hot-toast'
import * as Yup from "yup"
import { useFormik } from 'formik';
import styles from "./AddTrips.module.css"
import { tripsContext } from './../../Context/tripsContext';
import { categoryContext } from './../../Context/CategoryContext';



export default function AddTrips() {
  let navigate = useNavigate()

  let {baseUrl,headers} = useContext(tripsContext)
  let {getCategory} = useContext(categoryContext)


    const [Loading, setLoading] = useState(false)
    const [imageFileCover, setImageFileCover] = useState(null);


    const handleImageChangeCover = (event) => {
      const file = event.target.files[0];
      setImageFileCover(file);

    }

    const [english, setEnglish] = useState(null)
  
    useEffect(()=>{
      displayCategoryEn("en")
    },[])


    async function displayCategoryEn(lang){
      let response = await getCategory(lang)
      setEnglish(response.data)

      }




function submit(values){
  let category = document.querySelector("#category").value

const formData = new FormData()
formData.append('category', category);
  formData.append('title_en', values.title_en);
  formData.append('description_en', values.description_en);
  formData.append('place_en', values.place_en);
  formData.append('price', values.price);
  formData.append('date', values.date);
  formData.append('title_ar', values.title_ar);
  formData.append('description_ar', values.description_ar);
  formData.append('place_ar', values.place_ar);
  formData.append('image', imageFileCover);


addTripsDetails(formData)
}


async function addTripsDetails(formData){
  setLoading(true)
let response = await axios.post(`${baseUrl}/trips`,
formData
,{
  headers:headers
})
if(response.status===200){
  swal("Good job!", "A new Trips has been added successfully", "success");
  setLoading(false)
  navigate("/trips")
}else{
  setLoading(false)
  toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
}

}



let validation =Yup.object({
  title_en:Yup.string().required("Title is required").min(2,"Title minLength is 2").max(50,"Title maxLength is 50"),
  place_en:Yup.string().required("place is required").min(3,"place minLength is 3").max(20,"place maxLength is 20"),
  price:Yup.string().required("price is required").max(10000,"price maxLength is 10000"),
  date:Yup.string().required("date is required"),
  description_en:Yup.string().required("Description is required").min(20,"Description minLength is 20").max(10000,"Description maxLength is 10000"),
  title_ar:Yup.string().required("Title is required").min(2,"Title minLength is 2").max(50,"Title maxLength is 50"),
  place_ar:Yup.string().required("place is required").min(3,"place minLength is 3").max(20,"place maxLength is 20"),
  description_ar:Yup.string().required("Description is required").min(20,"Description minLength is 20").max(10000,"Description maxLength is 10000"),
})


let formik =useFormik({
  initialValues:{
    title_en:"",
    place_en:"",
    price:"",
    date:"",
    description_en:"",
    title_ar:"",
    place_ar:"",
    description_ar:"",
  },
  validationSchema:validation,
  onSubmit:submit
})

  return <>

<Helmet>
          <title> Add Trips</title>
        </Helmet>
        <div className="main" >


<Link to={"/trips"} >
<button className="btn btn-primary mx-4 mt-3">Go to Trips</button>
</Link>



<h2 className="content-title text-center ">Add New Trips </h2>


<div className='d-flex justify-content-center align-content-center'>
<form className='w-75' onSubmit={formik.handleSubmit} >
<div className="row mb-4">
<div className="col-xl-12 col-lg-12">
  <div className="card mb-4 shadow-sm">
    <div className="card-body">

<div className="mb-4">


<label htmlFor="category">Category</label>
            <select id="category" name='category'  className="form-select  ">
            {english?.result?.map((eng,index)=><option key={index} value={eng._id}>{eng.title_en}</option>
            )}
            </select>



      <label htmlFor='title_en' className="form-label text-primary">Title</label>
<input className="form-control mb-3" type="text" name='title_en' placeholder="Type here" id="title_en" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title_en} />   
  {formik.errors.title_en && formik.touched.title_en?<div className='alert alert-danger'>{formik.errors.title_en}</div> :null}

  <label className="form-label text-primary">Place </label>
<input className="form-control mb-3" type="text" name='place_en' placeholder="Type here" id="place_en"  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.place_en}/>
{formik.errors.place_en && formik.touched.place_en?<div className='alert alert-danger'>{formik.errors.place_en}</div> :null}  

  <label className="form-label text-primary">Price </label>
<input className="form-control mb-3" type="number" name='price' placeholder="Type here" id="price"  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.price}/>
{formik.errors.price && formik.touched.price?<div className='alert alert-danger'>{formik.errors.price}</div> :null}  

  <label className="form-label text-primary">Date </label>
<input className="form-control mb-3" type="date" name='date' placeholder="Type here" id="date"  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.date}/>
{formik.errors.date && formik.touched.date?<div className='alert alert-danger'>{formik.errors.date}</div> :null}  

          <label htmlFor='description_en' className="form-label text-primary">Description</label>
        <textarea name='description_en'  placeholder="Type here" className="form-control" rows="7" id="description_en" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description_en} ></textarea>
        {formik.errors.description_en && formik.touched.description_en?<div className='alert alert-danger'>{formik.errors.description_en}</div> :null}


                
          </div>

<div className="mb-4 mns" >

<label htmlFor='title_ar' className="form-label text-warning">اسم النشاط :  </label>
<input className="form-control mb-3" type="text" name='title_ar' placeholder="Type here" id="title_ar" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title_ar} />
{formik.errors.title_ar && formik.touched.title_ar?<div className='alert alert-danger'>{formik.errors.title_ar}</div> :null}

<label className="form-label text-warning">اسم المكان :  </label>
<input className="form-control mb-3" type="text" name='place_ar'  placeholder="Type here" id="place_ar"  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.place_ar}/>   
{formik.errors.place_ar && formik.touched.place_ar?<div className='alert alert-danger'>{formik.errors.place_ar}</div> :null}  

          <label htmlFor='description_ar' className="form-label text-warning">وصف النشاط :</label>
        <textarea name='description_ar'  placeholder="Type here"className="form-control" rows="7" id="description_ar" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description_ar}  ></textarea>
        {formik.errors.description_ar && formik.touched.description_ar?<div className='alert alert-danger'>{formik.errors.description_ar}</div> :null}
      


                    </div>


                      <div>
                      <label className="form-label">Image</label>
                      <input className="form-control mt-1 w-50 text-center" onChange={handleImageChangeCover}  type="file" id="image" name='image' placeholder='image must be less than 3 MB' required />
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
