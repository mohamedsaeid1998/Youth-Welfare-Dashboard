import axios from "axios";
import { createContext } from "react";



export let receiveMessagesContext = createContext()




export default function ReceiveMessagesContextProvider(props) {

  let baseUrl =`https://actitvityv1.onrender.com`

  let headers ={
    token:localStorage.getItem("userToken")
  }

  async function getReceiveMessages(lang){
    return axios.get(`${baseUrl}/contact/?lang=${lang}`)
    .then((response)=>response)
    .catch((error)=>error)
      }

return <receiveMessagesContext.Provider value={{baseUrl,headers,getReceiveMessages}}>
  {props.children}
</receiveMessagesContext.Provider>
}
