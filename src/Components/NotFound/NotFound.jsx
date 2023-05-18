import React from 'react'
import styles from "./NotFound.module.css"
import image from "../../Assets/images/error.svg"
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return <>
           <Helmet>
        <title>Not Found</title>
        </Helmet>
        <div className='text-center my-5 pt-5'>
  <img src={image} className='text-center' height={700} alt="" />

  </div>
  </>
}
