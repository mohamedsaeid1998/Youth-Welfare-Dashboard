import React, { useEffect, useState } from 'react'
import { RouterProvider,  createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import ProductContextProvider from './Context/ProductsContext';
import { Toaster } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import AddCategory from './Components/AddCategory/AddCategory';
import HomePage from './Components/HomePage/HomePage';
import Categories from './Components/Categories/Categories';
import HomeContextProvider from './Context/homeContext';
import UpdateDescription from './Components/UpdateDescription/UpdateDescription';
import CategoryContextProvider from './Context/CategoryContext';
import UpdateDetails from './Components/UpdateDetails/UpdateDetails';
import Activities from './Components/Activities/Activities';
import AddActivities from './Components/AddActivities/AddActivities';
import ActivityDetails from './Components/ActivityDetails/ActivityDetails';
import ActivitiesContextProvider from './Context/activitiesContext';
import Trips from './Components/Trips/Trips';
import TripsContextProvider from './Context/tripsContext';
import AddTrips from './Components/AddTrips/AddTrips';
import UpdateTrips from './Components/UpdateTrips/UpdateTrips';
import Student from './Components/Student/Student';
import AddStudent from './Components/AddStudent/AddStudent';
import UpdateStudent from './Components/UpdateStudent/UpdateStudent';
import StudentContextProvider from './Context/studentContext';
import SentNotifications from './Components/SentNotifications/SentNotifications';
import NotificationsContextProvider from './Context/notificationsContext';
import ReceiveMessagesContextProvider from './Context/ReceiveMessagesContext';
import ReceiveMessages from './Components/ReceiveMessages/ReceiveMessages';
import MessageDetails from './Components/MessageDetails/MessageDetails';



export default function App() {

  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      saveUserData()
    }
  },[])
  
  const [SetUserData, setSetUserData] = useState(null)
  
  function saveUserData(){
    let enCodedToken = localStorage.getItem("userToken")
    let decodedToken = jwtDecode(enCodedToken)
    setSetUserData(decodedToken)
  }

let router = createHashRouter([{
  path:"" , element:<Layout SetUserData={SetUserData} setSetUserData={setSetUserData}/>, children:[
    {index:true , element:<Login saveUserData={saveUserData}/>},
    {path:"homePage" , element:<ProtectedRoute><HomePage/></ProtectedRoute>},
    {path:"UpdateDescription/:id" , element:<ProtectedRoute><UpdateDescription/></ProtectedRoute>},
    {path:"categories" , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"addCategory" , element:<ProtectedRoute><AddCategory/></ProtectedRoute>},
    {path:"updateDetails/:id" , element:<ProtectedRoute><UpdateDetails/></ProtectedRoute>}, 
    {path:"activities" , element:<ProtectedRoute><Activities/></ProtectedRoute>},
    {path:"addActivities" , element:<ProtectedRoute><AddActivities/></ProtectedRoute>},
    {path:"activityDetails/:id" , element:<ProtectedRoute><ActivityDetails/></ProtectedRoute>},
    {path:"trips" , element:<ProtectedRoute><Trips/></ProtectedRoute>},
    {path:"addTrips" , element:<ProtectedRoute><AddTrips/></ProtectedRoute>},
    {path:"updateTrips/:id" , element:<ProtectedRoute><UpdateTrips/></ProtectedRoute>},
    {path:"student" , element:<ProtectedRoute><Student/></ProtectedRoute>},
    {path:"addStudent" , element:<ProtectedRoute><AddStudent/></ProtectedRoute>},
    {path:"updateStudent/:id" , element:<ProtectedRoute><UpdateStudent/></ProtectedRoute>},
    {path:"sentNotifications" , element:<ProtectedRoute><SentNotifications/></ProtectedRoute>},
    {path:"receiveMessages" , element:<ProtectedRoute><ReceiveMessages/></ProtectedRoute>},
    {path:"messageDetails/:id" , element:<ProtectedRoute><MessageDetails/></ProtectedRoute>},
    {path:"*" , element:<NotFound/>},

  ]
}])

return<>
<ReceiveMessagesContextProvider>
<NotificationsContextProvider>
<StudentContextProvider>
<TripsContextProvider>
<ActivitiesContextProvider>
<CategoryContextProvider>
<HomeContextProvider>
<ProductContextProvider>
<Toaster/>
<RouterProvider router={router}></RouterProvider>
</ProductContextProvider>
</HomeContextProvider>
</CategoryContextProvider>
</ActivitiesContextProvider>
</TripsContextProvider>
</StudentContextProvider>
</NotificationsContextProvider>
</ReceiveMessagesContextProvider>
  </>
}
