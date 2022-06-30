import React,  {useState} from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { FaSearch} from 'react-icons/fa'
import { motion } from 'framer-motion'
import {FaRegTimesCircle} from 'react-icons/fa'
import { FIND_PRODUCT } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import Auth from '../../utils/auth.js'



const SearchBar = () => {

  const [filteredProduct, setFilteredProduct] = useState('');

  const [input, setInput] = useState("")

  const { loading, data} = useQuery(FIND_PRODUCT, { 
    variables: {  input: { name: input}}
  })

  
  const foundProducts = data?.findProduct || [];
  console.log(foundProducts)

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if(foundProducts.length){
      setFilteredProduct(foundProducts)
    }
    else{
      return ""
    }
  }

  const clear = () =>{
    setInput("")
  }
  return (
    <>
    <div className='searchbar_container'>
    <h1> Search For a Product...</h1>
    <form id="form" role="search" className='searchForm' onSubmit={handleFormSubmit} >
    <input type="text" id="query" name="q" className='searchInput'
   placeholder="Search..."
   onChange={(event) => setInput(event.target.value)}
   value={input}
   aria-label="Search through site content"></input>
   {input && (
    <motion.button whileHover={{ scale: 1.2}} onClick={clear} className='search-x' >
    <FaRegTimesCircle />
    </motion.button>
   )}

    <motion.button type='submit' whileHover={{ scale: 1.2}} className='searchButton'><FaSearch /></motion.button>
   
    </form>
    </div>


    
    <div className="filtered-posts-card-container flex " >
    {filteredProduct &&
      filteredProduct.map(product => (
        <motion.div  whileHover={{ scale:1.05}} className="flex px-1 py-1 filtered-posts-card ">
        <Link to={`/profile/${product.username}`}><h4 className="products-username">{product.username}</h4></Link>
          <Link to={`/products/${product._id}`} >
            <img className="product-img"
            id="searched-product-img"
              alt={product.name}
              src={product.image}
            />
            <div className="product-stats">
            <h4>{product.name}</h4>
            <span className="product-price">$ {product.price} / day</span>
            </div>
          </Link>
          <div className="" >
            <div>Available </div>
          </div>

         {Auth.loggedIn() ?  <motion.button whileHover={{ scale:1.1}} className='add-to-cart add-to-cart-gradient' >Add to cart</motion.button> : '' }
        </motion.div>
        ))}
        </div>
    </>
  )
}

export default SearchBar;