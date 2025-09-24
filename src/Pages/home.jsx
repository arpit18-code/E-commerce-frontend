import {NavLink,useNavigate} from 'react-router-dom'
import {useState,useContext,useReducer, useEffect} from 'react'
import { CartContext } from '../Context/cartContext'
import { AuthContext } from '../Context/auth'
import fetchProduct from '../services/fetchProducts'
import Product from '../Components/Product'
import InfiniteScroll from 'react-infinite-scroll-component';
import { getStylesForLink } from '../services/styles'
import cartImage from '../assets/cartImage.jpeg'


export default function Home(){
    // declartaion of hooks and initial values
    let [skip,setSkip] = useState(0)
    let [products,setProducts] = useState([])
    let [realProducts,setRealProducts] = useState([])
    let navigate = useNavigate()
    let {cartDetails, dispatchCartDetails } = useContext(CartContext)
    let {IsLoggedIn} = useContext(AuthContext)
    let initialStateForFilters ={
    price:'',
    rating:'',
    category:' '
    }
    let reducerFunctionForFilters = (state,action)=>{
    switch(action.type){
      case 'price':
        return {...state,price:action.payload}
      case'rating':
      return {...state,rating:action.payload}
      case 'category':
      return {...state,category:action.payload}
      }
      
    }
    let [filters,dispatchFilters] = useReducer(reducerFunctionForFilters,initialStateForFilters)
    let [searchInput,setSearchInput] = useState('')
    let [hasMore, setHasMore] = useState(true)
    let [isSearching,setIsSearching] = useState(false)


   // async operation for fetching products data
    useEffect(()=>{
        let fetchData = async()=>{
        let productArray = await fetchProduct(skip)
        if(productArray.length === 0){
          setHasMore(false)
        }
        setProducts((prev)=> [...prev,...productArray])
        setRealProducts((prev)=> [...prev,...productArray]) 
     }
      fetchData()
    },[skip])
    



    // all supporting functions

    // function for add to cart 
    let handleAddToCartButton = (product,setAddedToCart)=>{
    if(!IsLoggedIn){
      navigate('/login') 
      return
    }
     let ifProductInCart = cartDetails.cart.find((productInCart)=> productInCart === product)
    if(ifProductInCart || product.stock < 1) return 
    dispatchCartDetails({type:'Add_to_cart',payload:product})
    setAddedToCart('Added to cart')
    }

    
    // function for making another api call 
    let handleApiButton = ()=>{
    setSkip((prev)=> prev + 30)
    }
    

    // all functions for filter
    let handlePriceFilter = (e)=>{
    let value = Number(e.target.value)
    dispatchFilters({type:'price',payload:value})
    }
    let handleRatingFilter = (e)=>{
    let value = Number(e.target.value)
    dispatchFilters({type:'rating',payload:value})
    }
    let handleApplyFilter = ()=>{
    if(!filters.price && !filters.rating && filters.category === 'all') return setProducts(products)
    let filteredProduct =  products?.filter(({price,rating})=>price<=filters.price && rating>=filters.rating)
    setIsSearching(true)
    setProducts(filteredProduct)  
    }

    let handleCategoryFilter = (e)=>{
    if(e.target.value === 'all'){
      setProducts(realProducts)
      setIsSearching(false)
    }else{
    let value = e.target.value
    dispatchFilters({type:'category',payload:value})
    dispatchFilters({type:'price',payload:0})
    dispatchFilters({type:'rating',payload:0})
    setIsSearching(true)
    let categoryProduct = realProducts.filter(
      ({ category }) => category === e.target.value
    );
    setIsSearching(true)
    setProducts(categoryProduct)
    }
    
    }
    
    


    // function to clear filters and search result
    let setDefaultProduct = ()=>{
    setProducts(realProducts)
    dispatchFilters({type:'price',payload:''})
    dispatchFilters({type:'rating',payload:''})
    dispatchFilters({type:'category',payload:'all'})
    setIsSearching(false)
    }

    // functions for search feature
    let handleSearchButton = ()=>{
    let value = searchInput.toLowerCase()
    let searchProduct = realProducts.filter(({title})=> title.toLowerCase().includes(value))
    if(!searchProduct){
    alert("No such product found !")
    }
    setIsSearching(true)
    setProducts(searchProduct)
    setSearchInput('')
    }

    let handleSearchInput = (e)=>{
    setSearchInput(e.target.value)
    }

    let handleCartPageClick = ()=>{
      navigate('/cart')
    }
    
    return(
        <>
        <div className="text-center mx-2">
        <img className="object-cover w-8 h-8 inline cursor-pointer hover:scale-102" src={cartImage} alt="cart" onClick={handleCartPageClick}/>
        <NavLink to="/cart" style={getStylesForLink}>Go to cart page</NavLink> ||
        <NavLink to="/home" style={getStylesForLink}>Home</NavLink> ||
        <NavLink to="/about" style={getStylesForLink}>Go to about page</NavLink> ||
        <NavLink to="/login" style={getStylesForLink}>Go to login page</NavLink> 
        
        </div>

       <div className="justify-around">


        <div className="mx-auto sm:w-120">
        <p className="text-center font-extrabold text-2xl">Search</p>
       <div className="sm:flex justify-center">
        <input type="text" className="block border-1 border-black p-1 mx-auto sm:inline sm:mx-0 rounded-3xl h-8 sm:h-12" value={searchInput} onChange={handleSearchInput}/>
        <button onClick={handleSearchButton} className="bg-black text-white p-2 border-2 border-white rounded-2xl cursor-pointer active:scale-95 hover:bg-gray-800 m-1 block mx-auto sm:inline sm:mx-0">Search product</button>
       </div>
      </div>

          
         <div className="text-center bg-black text-white p-2 rounded w-50 mx-auto my-2">
      <p>current price filter : {filters.price}</p>
      <p>current rating filter : {filters.rating}</p>
      <button className="bg-black text-white p-2 border-2 border-white rounded-2xl cursor-pointer active:scale-95 hover:bg-gray-800 m-1" onClick={setDefaultProduct}>Clear filter and search</button>
      </div>


        </div>



       <div className="w-1/2 mx-auto flex flex-col items-center justify-center">
      
      <input type="text" placeholder="Set price filter" onChange={handlePriceFilter} className="border-1 border-black p-1 m-1" value={filters.price}/>
      <input type="text" placeholder="Set rating filter" onChange={handleRatingFilter} className="border-1 border-black p-1 m-1" value={filters.rating}/>
      
      <button className="bg-black text-white p-2 border-2 border-white rounded-2xl cursor-pointer active:scale-95 hover:bg-gray-800 m-1" onClick={handleApplyFilter}>Apply filter</button>
      
      <div className="flex flex-col justify-around w-50">
      <p className="text-left border-1 border-black p-2 rounded">Filter by category</p>
      <select className="border-1 border-black p-2 rounded my-2" onChange={handleCategoryFilter}>
        <option value="all" >All</option>
        <option value="smartphones" >smartphones</option>
        <option value="beauty" >beauty</option>
        <option value="fragrances" >fragrances</option>
        <option value="furniture" >furniture</option>
        <option value="groceries" >groceries</option>
        <option value="home-decoration" >home-decoration</option>
        <option value="kitchen-accessories" >kitchen-accessories</option>
        <option value="laptops" >laptops</option>
        <option value="mens-shirts" >mens-shirts</option>
      </select>
      </div>

      </div>

       <InfiniteScroll
        dataLength={products.length}
        next={ !isSearching && handleApiButton}
        hasMore={hasMore}
        loader={
          !isSearching ? 
          <h4 className="text-center">Loading....</h4>  : <h4 className="text-center"> No more products</h4>
        }
        endMessage={<h4 className="text-center">No more products</h4>}
       >
        <div className="flex flex-wrap justify-evenly">
          {
            products.length > 0 && products?.map((product)=>{
                return(
                    <Product product={product} handleAddToCartButton={handleAddToCartButton} cartDetails={cartDetails}></Product>
                )
            })
          }
        </div>
       </InfiniteScroll>
        
       
      
        </>
    )
}


