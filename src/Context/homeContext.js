import axios from "axios";
import { createContext } from "react";


export let homeContext = createContext()


export default function HomeContextProvider(props){

  let baseUrl =`https://actitvityv1.onrender.com`

  let headers ={
    token:localStorage.getItem("userToken")
  }

  async function getDescription(lang){
return axios.get(`${baseUrl}?lang=${lang}`)
.then((response)=>response)
.catch((error)=>error)
  }

  return <homeContext.Provider value={{headers,baseUrl,getDescription}}>
    {props.children}
  </homeContext.Provider>


}