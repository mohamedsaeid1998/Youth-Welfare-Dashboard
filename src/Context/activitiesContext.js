import axios from "axios";
import { createContext } from "react";



export let activitiesContext = createContext()




export default function ActivitiesContextProvider(props) {

  let baseUrl =`https://actitvityv1.onrender.com`

  let headers ={
    token:localStorage.getItem("userToken")
  }

  async function getActivities(lang){
    return axios.get(`${baseUrl}/activities/?lang=${lang}`)
    .then((response)=>response)
    .catch((error)=>error)
      }

      async function getPdf(id){
        return axios.get(`${baseUrl}/activities/report/${id}`,
        {
          headers:headers
        }
        )
        .then((response)=>response)
        .catch((error)=>error)
          }
    


return <activitiesContext.Provider value={{baseUrl,headers,getActivities,getPdf}}>
  {props.children}
</activitiesContext.Provider>
}
