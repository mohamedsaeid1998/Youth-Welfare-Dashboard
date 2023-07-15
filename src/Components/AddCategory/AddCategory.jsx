import React, { useContext,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import { categoryContext } from "../../Context/CategoryContext";
import swal from 'sweetalert';
import { toast } from 'react-hot-toast'
import * as Yup from "yup"
import { useFormik } from 'formik';
import styles from "./AddCategory.module.css"

export default function AddCategory() {
let navigate = useNavigate()

  let {baseUrl,headers} = useContext(categoryContext)


    const [Loading, setLoading] = useState(false)
    const [imageFileCover, setImageFileCover] = useState(null);
    const [imageFile, setImageFile] = useState([]);

    const handleImageChange = (e) => {
      const files = Array.from(e.target.files)
      setImageFile(files);
    }

    const handleImageChangeCover = (event) => {
      const file = event.target.files[0];
      setImageFileCover(file);
    }


function submit(values){

  const formData = new FormData()
  for (let i = 0; i < imageFile.length; i++) {
    formData.append('images', imageFile[i]);
  }
  formData.append('title_en', values.title_en);
  formData.append('description_en', values.description_en);
  formData.append('goles_en', values.goles_en);
  formData.append('title_ar', values.title_ar);
  formData.append('description_ar', values.description_ar);
  formData.append('goles_ar', values.goles_ar);
  formData.append('coverImage', imageFileCover);

addCategoryDetails(formData)
}


async function addCategoryDetails(formData){
  setLoading(true)
let response = await axios.post(`${baseUrl}/categories`,
formData
,{
  headers:headers
})
if(response.status===200){
  swal("Good job!", "A new category has been added successfully", "success");
  setLoading(false)
  navigate("/categories")
}else{
  setLoading(false)
  toast.error(`${response.data.message}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
}

}



let validation =Yup.object({
  title_en:Yup.string().required("Title is required").min(2,"Title minLength is 2").max(50,"Title maxLength is 50"),
  description_en:Yup.string().required("Description is required").min(20,"Description minLength is 20").max(10000,"Description maxLength is 10000"),
  goles_en:Yup.string().required("goals is required").min(10,"goals minLength is 10").max(1000,"goals maxLength is 1000"),
  title_ar:Yup.string().required("Title is required").min(2,"Title minLength is 2").max(50,"Title maxLength is 50"),
  description_ar:Yup.string().required("Description is required").min(20,"Description minLength is 20").max(10000,"Description maxLength is 10000"),
  goles_ar:Yup.string().required("goals is required").min(10,"goals minLength is 10").max(1000,"goals maxLength is 1000"),
})


let formik =useFormik({
  initialValues:{
    title_en:"",
    description_en:"",
    goles_en:"",
    title_ar:"",
    description_ar:"",
    goles_ar:"",
  },
  validationSchema:validation,
  onSubmit:submit
})



  return <>
        <Helmet>
          <title> Add Category</title>
        </Helmet>
        <div className="main" >


<Link to={"/categories"} >
<button className="btn btn-primary mx-4 mt-3">Go to Category</button>
</Link>



<h2 className="content-title text-center ">Add New Category </h2>


<div className='d-flex justify-content-center align-content-center'>
<form className='w-75' onSubmit={formik.handleSubmit} >
<div className="row mb-4">
<div className="col-xl-12 col-lg-12">
  <div className="card mb-4 shadow-sm">
    <div className="card-body">

<div className="mb-4">

      <label htmlFor='title_en' className="form-label text-primary">Title</label>
<input className="form-control mb-3" type="text" name='title_en' placeholder="Type here" id="title_en" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title_en} />   
  {formik.errors.title_en && formik.touched.title_en?<div className='alert alert-danger'>{formik.errors.title_en}</div> :null}

          <label htmlFor='description_en' className="form-label text-primary">Description</label>
        <textarea name='description_en'  placeholder="Type here" className="form-control" rows="7" id="description_en" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description_en} ></textarea>
        {formik.errors.description_en && formik.touched.description_en?<div className='alert alert-danger'>{formik.errors.description_en}</div> :null}

          <label htmlFor='goles_en' className="form-label text-primary mt-2">Goals</label>
          <textarea name='goles_en'  placeholder="Type here"className="form-control" rows="7" id="goles_en" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.goles_en}></textarea>
          {formik.errors.goles_en && formik.touched.goles_en?<div className='alert alert-danger'>{formik.errors.goles_en}</div> :null}
                
          </div>

<div className="mb-4 mns" >

<label htmlFor='title_ar' className="form-label text-warning">اسم النشاط :  </label>
<input className="form-control mb-3" type="text" name='title_ar' placeholder="Type here" id="title_ar" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title_ar} />
{formik.errors.title_ar && formik.touched.title_ar?<div className='alert alert-danger'>{formik.errors.title_ar}</div> :null}

          <label htmlFor='description_ar' className="form-label text-warning">وصف النشاط :</label>
        <textarea name='description_ar'  placeholder="Type here"className="form-control" rows="7" id="description_ar" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description_ar}  ></textarea>
        {formik.errors.description_ar && formik.touched.description_ar?<div className='alert alert-danger'>{formik.errors.description_ar}</div> :null}
      
        <label htmlFor='goles_ar' className="form-label text-warning mt-2">اهداف النشاط :</label>
        <textarea name='goles_ar'  placeholder="Type here" className="form-control" rows="7" id="goles_ar"  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.goles_ar} ></textarea>
        {formik.errors.goles_ar && formik.touched.goles_ar?<div className='alert alert-danger'>{formik.errors.goles_ar}</div> :null}

                    </div>

                    <div className='d-flex justify-content-between align-items-center mb-4 gap-2'>
                      <div>
                      <label className="form-label">Images</label>
                      <input className="form-control mt-1 w-100 text-center" type="file" id="image-upload" accept="image/*" multiple onChange={handleImageChange}  name='image' placeholder='image must be less than 3 MB' required/>
                      </div>
                      <div>
                      <label className="form-label">Cover Image</label>
                      <input className="form-control mt-1 w-100 text-center" onChange={handleImageChangeCover}  type="file" id="image" name='image' placeholder='image must be less than 3 MB' required />
                      </div>

</div>




        <div className='d-flex justify-content-center align-items-center'>
        {Loading?<button type="button" className="btn btn-primary"><i className='fas fa-spinner fa-spin'></i></button>:
                <button disabled={!(formik.dirty)} type="submit" className="btn btn-primary">Publish now</button>} 
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




