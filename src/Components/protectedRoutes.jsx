import { AuthContext } from "../Context/auth"
import {useContext} from 'react'
import { Navigate } from "react-router-dom"
const ProtectedRoutes = ({children})=>{
  const {IsLoggedIn} = useContext(AuthContext)
  return IsLoggedIn ? children : <Navigate to="/login"/>
}

export default ProtectedRoutes