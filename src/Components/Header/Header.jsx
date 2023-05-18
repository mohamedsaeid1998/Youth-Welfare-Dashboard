import React from 'react'
import styles from "./Header.module.css"
export default function Header({logout}) {

return <>
<div className="main">
<div className="topbar">
                <div className="toggle">
                <i className="fa-solid fa-bars here"></i>
                </div>

                <div className="search ">
                    <label className='mx-auto'>
                        <input type="search" placeholder="Search here" id="search input"/>
                    </label>
                </div>

                <div>
                    <button onClick={()=>logout()} className='btn btn-danger'>LogOut</button>
                </div>

            </div>
            </div>



</>
}
