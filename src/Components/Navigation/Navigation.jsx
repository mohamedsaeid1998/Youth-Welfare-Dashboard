import React from 'react'
import styles from "./Navigation.module.css"
import { Link } from 'react-router-dom'
import logo from "../../Assets/images/ssssss.png"


export default function Navigation({logout}) {


return <>

<div className="navigation">
            <ul className='mx-3'>
                <li className='d-flex align-items-center mb-2'>
                        <img src={logo} className=' w-25' height={60}  alt="" />
                        <span className="title text-white mx-2  mt-3 ">Youth Welfare</span>
                </li>

                <li className='hovered'>
                    <Link className='d-flex align-items-center mx-2' to={"/homePage"}>
                        <i className="fa-solid fa-house  fs-4"></i>
                        <span className="title ">Home</span>
                    </Link>
                </li>

                <li>
                <Link className='d-flex align-items-center mx-1' to={"/categories"}>
                <i className="fa-solid fa-list fs-4"></i>
                        <span className="title">Categories</span>
                    </Link>
                </li>

                <li>
                    <Link className='d-flex align-items-center mx-1' to={"/activities"}>
                    <i className="fa-solid fa-star fs-4"></i>
                        <span className="title">Activities</span>
                    </Link>
                </li>

                <li>
                <Link className='d-flex align-items-center mx-2' to={"/trips"}>
                <i className="fa-solid fa-plane-departure fs-4"></i>
                        <span className="title ">Trips</span>
                    </Link>

                </li>

                <li>
                <Link className='d-flex align-items-center mx-1' to={"/student"}>
                <i className="fa-solid fa-users fs-4"></i>
                        <span className="title">Students</span>
                    </Link>
                </li>

                <li>
                <Link className='d-flex align-items-center mx-1' to={"/SentNotifications"}>
                <i className="fa-solid fa-paper-plane fs-4"></i>
                        <span className="title">SentNotifications</span>
                    </Link>
                </li>

                <li>
                <Link className='d-flex align-items-center mx-1' to={"/receiveMessages"}>
                <i className="fa-regular fa-envelope fs-4"></i>
                        <span className="title">ReceiveMessages</span>
                    </Link>
                </li>


                <li>
                <Link className='d-flex align-items-center mx-1' onClick={()=>logout()}>
                <i className="fa-solid fa-right-from-bracket fs-4"></i>
                        <span className="title">LogOut</span>
                    </Link>
                </li>


            </ul>
        </div>

</>
}
