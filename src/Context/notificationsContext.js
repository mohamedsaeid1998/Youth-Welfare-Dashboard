import axios from "axios";
import { createContext } from "react";



export let notificationsContext = createContext()




export default function NotificationsContextProvider(props) {

  let baseUrl =`https://actitvityv1.onrender.com`

  let headers ={
    token:localStorage.getItem("userToken")
  }

  async function getNotifications(lang){
    return axios.get(`${baseUrl}/send-Email/?lang=${lang}`)
    .then((response)=>response)
    .catch((error)=>error)
      }

return <notificationsContext.Provider value={{baseUrl,headers,getNotifications}}>
  {props.children}
</notificationsContext.Provider>
}
