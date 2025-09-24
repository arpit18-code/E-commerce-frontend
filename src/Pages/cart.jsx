import { CartContext } from '../Context/cartContext'
import { useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { getStylesForLink } from '../services/styles'
export default function Cart(){
    let {cartDetails, dispatchCartDetails} = useContext(CartContext)
    let handleRemoveFromCartButton = (product)=>{
    dispatchCartDetails({type:'Remove_from_cart',payload:product})
  }
  
    return(
        <>
        <div className="text-center">
        <NavLink to="/home" style={getStylesForLink}>Go to Home page</NavLink> ||
        <NavLink to="/cart" style={getStylesForLink}>Cart page</NavLink> ||
        <NavLink to="/about" style={getStylesForLink}>Go to about</NavLink> ||
        <NavLink to="/login" style={getStylesForLink}>Go to login page</NavLink> 
        </div>

        <div className="text-center bg-black text-white p-2 rounded w-60 mx-auto my-2 sm:w-80">Products in Cart : {cartDetails.no}</div>

      <div className="text-center bg-black text-white p-2 rounded w-60 mx-auto my-2 sm:w-80">Product List in Cart :
      <ul>
      {cartDetails.cart.length > 0 && cartDetails.cart.map((productInCart,index)=>{
        return(
          <>
          <div className="flex justify-between m-2" key={index}>
          <li>{index + 1} : {productInCart.title}</li>
          <button className="text-black border-1 bg-white border-white cursor-pointer rounded-2xl active:scale-95 p-1 hover:bg-amber-100" onClick={()=> handleRemoveFromCartButton(productInCart)}>Remove from cart</button>
          </div>
          </>
        )
      }
      )}
      </ul>
      </div>
        </>
    )
}