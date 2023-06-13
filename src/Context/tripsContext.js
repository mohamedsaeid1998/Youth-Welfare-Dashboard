import axios from "axios";
import { createContext } from "react";



export let tripsContext = createContext()




export default function TripsContextProvider(props) {

  let baseUrl =`https://actitvityv1.onrender.com`

  let headers ={
    token:localStorage.getItem("userToken")
  }

  async function getTrips(lang){
    return axios.get(`${baseUrl}/trips/?lang=${lang}`)
    .then((response)=>response)
    .catch((error)=>error)
      }

      
      async function getPdf(id){
        return axios.get(`${baseUrl}/trips/report/${id}`,
        {
          headers:headers
        }
        )
        .then((response)=>response)
        .catch((error)=>error)
          }

return <tripsContext.Provider value={{baseUrl,headers,getTrips,getPdf}}>
  {props.children}
</tripsContext.Provider>
}
