import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom'
import './style.css'



function UserProductList({ products, name, }) {
  console.log(products)
console.log(products._id)
  // <motion.button whileHover={{ scale:1.1}} className='add-to-cart add-to-cart-gradient' onClick={addToCart}>Add to cart</motion.button>
  
    return (
        <div className="user-posts-card-container" >
        
          {products &&
            products.map(product => (
              <div className="card  px-1 py-1 user-posts-card ">
            
              <h4 className="products-username">{product.username}</h4>
              <Link to={`/profile/${product.username}`}></Link>
                <Link to={`/products/${product._id}`} >
                  <img className="product-img"
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

              </div>
            ))}
        </div>
      );
}

export default UserProductList;
