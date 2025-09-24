import { AuthContext } from "../Context/auth"
import { useContext, useState} from "react"
import { CartContext } from "../Context/cartContext"
import {NavLink} from 'react-router-dom'
import { getStylesForLink} from "../services/styles"
const Login = ()=>{
    
    let {IsLoggedIn,setIsLoggedIn} = useContext(AuthContext)
    let {dispatchCartDetails} = useContext(CartContext)
    let [number,setNumber] = useState()
    let handleLoginButton = ()=>{
        number && number.length === 10 ? setIsLoggedIn(true) : alert('Enter your full number')
    }
    let handleLogOutButton = ()=>{
        setIsLoggedIn(false)
        dispatchCartDetails({type:'Reset_cart'})
    }
    let handleNumberInput = (e)=>{
        setNumber(e.target.value)
    }
    return(
        <>

        <div className="text-center">
                <NavLink to="/home" style={getStylesForLink}>Go to Home page</NavLink> ||
                <NavLink to="/cart" style={getStylesForLink}>Go to Cart page</NavLink> ||
                <NavLink to="/about" style={getStylesForLink}>Go to about</NavLink> ||
                <NavLink to="/login" style={getStylesForLink}>Login page</NavLink> 
        </div>
        
        <div className="w-60 p-2 m-2 border-1 border-black mx-auto sm:w-80">
            {
                !IsLoggedIn ? 
                <>
                <h2 className="font-bold text-center">You have to first login</h2>
                <input className="border-1 border-black p-1 m-1 mx-auto block" type="number" maxLength={10} placeholder="Enter your number" onChange={handleNumberInput}/> 
                </>
                :
                null
            }
            <button className="bg-black text-white p-2 rounded block mx-auto cursor-pointer" onClick={ !IsLoggedIn ? handleLoginButton : handleLogOutButton}>{ IsLoggedIn ? 'logout' : 'login'}</button>
        </div>
        
        </>
    )
}

export default Login