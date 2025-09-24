import { createContext,useState } from "react";

export let AuthContext = createContext()

export let AuthContextProvider = ({children})=>{
  let [IsLoggedIn,setIsLoggedIn] = useState(false)
  return(
    <>
    <AuthContext.Provider value={{IsLoggedIn,setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
    </>
  )
}