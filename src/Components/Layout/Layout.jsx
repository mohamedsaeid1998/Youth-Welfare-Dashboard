import React from 'react'
import styles from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
import Header from './../Header/Header';
import Navigation from './../Navigation/Navigation';
import { useNavigate } from 'react-router-dom'
import { Offline } from "react-detect-offline";
import { useEffect } from 'react';
export default function Layout({setSetUserData}) {

  let navigate =useNavigate()

  function logout(){
    localStorage.removeItem("userToken")
    setSetUserData(null)
    navigate("/")
  }


  useEffect(()=>{
    active()

  },)
  
  function active(){
    let list = document.querySelectorAll(".navigation li");
    
    function activeLink() {
        list.forEach((item) => {
            item.classList.remove("hovered");
            
        });
        this.classList.add("hovered");
    }

    
    list.forEach((item) => item.addEventListener("mouseover", activeLink));
    let toggle = document.querySelector(".toggle");
  let navigation = document.querySelector(".navigation");
  let main = document.querySelectorAll(".main");
  
if (main[0].classList.contains("active")){
  main[1].classList.add("active")
}

  toggle.onclick = function () {
  if(main[0].classList.contains("active")){
    navigation.classList.remove("active");
    main[0].classList.remove("active");
    main[1].classList.remove("active");
    

    }else{
      navigation.classList.add("active");
      main[0].classList.add("active");
      main[1].classList.add("active");


    }
  }
  };


  return <>
<Navigation logout={logout} />
<Header logout={logout}/>
<Offline><div className='network'>You are offline <i className='fas fa-wifi-3 text-danger'></i></div></Offline>
<Outlet/>

  </>
}
