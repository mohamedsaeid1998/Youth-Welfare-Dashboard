import axios from "axios";
import { createContext } from "react";



export let categoryContext = createContext()




export default function CategoryContextProvider(props) {

  let baseUrl =`https://actitvityv1.onrender.com`
  

  let headers ={
    token:localStorage.getItem("userToken")
  }

  async function getCategory(lang){
    return axios.get(`${baseUrl}/categories/?lang=${lang}`)
    .then((response)=>response)
    .catch((error)=>error)
      }

return <categoryContext.Provider value={{getCategory,headers,baseUrl}}>
  {props.children}
</categoryContext.Provider>
}
