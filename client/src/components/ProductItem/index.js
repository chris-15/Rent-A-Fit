import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext} from '../../utils/GlobalState.js'
import { ADD_TO_CART, UPDATE_CART_QUANTITY} from '../../utils/actions'
import './style.css'
import { motion } from 'framer-motion'

function ProductItem(item) {
  const [state, dispatch] = useStoreContext()


///declare cart as its own variable instead of state.cart
const { cart } = state



  const addToCart = () => {

    //find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)

    //if there was a match, call update with a new purchase quantity
    if(itemInCart){
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    }
    if(!itemInCart){
      dispatch({
        type: ADD_TO_CART,
        product: {...item, purchaseQuantity: 1}
      })
    }
   
  }

  const {
    image,
    name,
    _id,
    price,
username
  } = item;

  return (
    <div className="card px-1 py-1 ">
    <Link to={`/profile/${username}`}>{username}</Link>
      <Link to={`/products/${_id}`} >
        <img className="product-img"
          alt={name}
          src={image}
        />
        <div className="product-stats">
        <h4>{name}</h4>
        <span className="product-price">$ {price} / day</span>
        </div>
      </Link>
      <div className="" >
        <div>Available </div>
      </div>
      <motion.button whileHover={{ scale:1.1}} className='add-to-cart add-to-cart-gradient' onClick={addToCart}>Add to cart</motion.button>
    </div>
  );
}

export default ProductItem ;
