import {NavLink} from "react-router-dom"
import { getStylesForLink } from "../services/styles"

let About= ()=>{
   
    return(
        <>
        <div className="text-center">
        <NavLink to="/cart" style={getStylesForLink}>Go to cart page</NavLink> ||
        <NavLink to="/home" style={getStylesForLink}>Go to home page</NavLink> ||
        <NavLink to="/about" style={getStylesForLink}>About page</NavLink> ||
        <NavLink to="/login" style={getStylesForLink}>Go to login page</NavLink>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Welcome to <span className="font-semibold">ShopEasy</span>, a simple
        e-commerce frontend project built with <span className="font-semibold">React.js</span>.  
        This project was created to practice modern web development concepts such as 
        component-based architecture, routing, and state management using React Hooks 
        like <code>useState</code>, <code>useReducer</code>, <code>useEffect</code>, 
        and the <code>Context API</code>.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        The application includes core features of an online store such as product
        listing, cart management, and seamless navigation with 
        <span className="font-semibold"> React Router</span>. While it focuses on the
        frontend, it lays the foundation for building a complete e-commerce platform.
      </p>

      <p className="text-lg text-gray-700 leading-relaxed">
        This project is part of my learning journey in frontend development, and it’s
        deployed on <span className="font-semibold">GitHub Pages</span> so anyone can
        explore it online. Feedback and contributions are always welcome!
      </p>
    </div>
        </>
    )

}

export default About