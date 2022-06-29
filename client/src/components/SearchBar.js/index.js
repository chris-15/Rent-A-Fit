import React,  {useState} from 'react'
import './style.css'
import { FaSearch} from 'react-icons/fa'
import { motion } from 'framer-motion'
import {FaRegTimesCircle} from 'react-icons/fa'
import { FIND_PRODUCT } from '../../utils/queries'
import { useQuery } from '@apollo/client'


const SearchBar = () => {

  const [input, setInput] = useState("")

  const { loading, data} = useQuery(FIND_PRODUCT, { 
    variables: {  input: { name: input}}
  })

  
  const foundProducts = data?.findProduct || [];
  console.log(foundProducts)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
  

    // try{
    //   const { data } = await FindProduct({
    //     vairables: { input: input}
    //   })
    //   console.log({data})

    // }catch(err){
    //   console.error(error)
    // }
  }

  const clear = () =>{
    setInput("")
  }
  return (
    <div className='searchbar_container'>
    <h1> Search Anything..</h1>
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
   {input && (
    <motion.button type='submit' whileHover={{ scale: 1.2}} className='searchButton'><FaSearch /></motion.button>
   )}
    </form>
     
    </div>
  )
}

export default SearchBar