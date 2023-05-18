import axios from "axios";
import { createContext } from "react";



export let studentContext = createContext()




export default function StudentContextProvider(props) {

  let baseUrl =`https://actitvityv1.onrender.com`

  let headers ={
    token:localStorage.getItem("userToken")
  }

  async function getStudent(lang){
    return axios.get(`${baseUrl}/students`,{
      headers:headers
    })
    .then((response)=>response)
    .catch((error)=>error)
      }

return <studentContext.Provider value={{baseUrl,headers,getStudent}}>
  {props.children}
</studentContext.Provider>
}
