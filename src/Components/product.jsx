import {useState, useEffect} from "react"
let Product = ({product,handleAddToCartButton,cartDetails})=>{
    let [addedToCart,setAddedToCart] = useState("")
    let [available,setAvailable] = useState("")
    
   
    useEffect(()=>{
        let checkIfInCart = cartDetails.cart.find((productInCart)=> productInCart.id === product.id)
        if(product.stock === 0){
            setAvailable('Currently out of stock')
        }else if(product.stock < 10){
            setAvailable('Last few stocks !! Hurry up')
        }else{
            setAvailable('')
        }
        if(checkIfInCart){
            setAddedToCart('Added to cart')
        }else{
            setAddedToCart('')
        }
    },[cartDetails,product])
    return(
        <>
            <div className="border-2 border-black p-2 m-2 rounded w-60 shadow-lg">
                <h3 className="text-center">{product.title}</h3>
                <img src={product.thumbnail} alt={product.title} className="w-40 h-40 object-cover mx-auto"/>
                <p className="text-center">Price: ${product.price}</p>
                <p className="text-center">Rating: {product.rating}+</p>
                <p className="text-center">Category: {product.category}</p>
                <p className="text-center">Stock {product.stock}</p>
                <hr />
                <br />
                <button className="text-black border-1 border-black cursor-pointer active:scale-95 mx-auto p-1" onClick={()=> handleAddToCartButton(product,setAddedToCart)}>Add to cart</button>
                <h4 className="text-center my-1 text-green-400 font-bold">{addedToCart}</h4>
                <h4 className="text-center text-red-600 font-bold">{available}</h4>
              </div>
        </>
    )
}

export default Product