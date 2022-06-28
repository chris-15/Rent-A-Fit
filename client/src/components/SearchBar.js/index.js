import React,  {useState} from 'react'
import './style.css'
import { FaSearch} from 'react-icons/fa'
import { motion } from 'framer-motion'
import {FaRegTimesCircle} from 'react-icons/fa'


const SearchBar = () => {

  const [input, setInput] = useState("")

  const clear = () =>{
    setInput("")
  }
  return (
    <div className='searchbar_container'>
    <h1> Search Anything..</h1>
    <form id="form" role="search" className='searchForm' >
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
   {!input && (
    <motion.button  whileHover={{ scale: 1.2}} className='searchButton'><FaSearch /></motion.button>
   )}
  
    </form>
     
    </div>
  )
}

export default SearchBar