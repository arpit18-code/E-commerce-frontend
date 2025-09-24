import { createContext, useReducer } from "react";

export const CartContext = createContext()

export const CartContextProvider = ({children})=>{
    let initialState = {
        cart:[],
        no:0
    }
   let reducerFunction = (state,action)=>{
    switch(action.type){
        case 'Add_to_cart':
        return {...state,cart:[...state.cart,action.payload],no:state.cart.length + 1}
        case'Remove_from_cart':
        return {...state,cart:[...state.cart.filter((item)=> item!== action.payload)],no:state.cart.length - 1}
        case 'Reset_cart':
        return {cart:[],no:0}
    }
   
   }
   let [cartDetails,dispatchCartDetails] = useReducer(reducerFunction,initialState)

   return(
    <>
    <CartContext.Provider value={{cartDetails,dispatchCartDetails}}>
        {children}
    </CartContext.Provider>
    </>
   )
}