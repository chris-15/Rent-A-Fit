import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ReviewForm from '../components/ReviewForm'
import ReviewList from '../components/ReviewList'
import Auth from '../utils/auth'
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,

} from "../utils/actions";
import REVIEWPHOTO from '../assets/reviews.svg'
import { QUERY_PRODUCTS, QUERY_PRODUCTS_WITH_REVIEWS } from "../utils/queries";
import Cart from "../components/Cart";
import { idbPromise } from "../utils/helpers";


function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS_WITH_REVIEWS);

  const { products, cart , } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
  
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      // if we're updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  }
  

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });
  
    // upon removal from cart, delete the item from IndexedDB using the `currentProduct._id` to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  useEffect(() => {
    // already in global store
    if(data){
      console.log(data.products)

    }
  
    console.log(currentProduct.reviews)

    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
      console.log(currentProduct)
    } 
    else if (data) {
      
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
       data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      }); 
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts
        });
      });
    }
  }, [products, data, loading, dispatch, id, currentProduct]);

  if(loading){
    return <h1>Loading</h1>
  }
  console.log(currentProduct._id)
  console.log(currentProduct.reviews)
  return (
    <>
      {currentProduct !== {} ? (
        <div className="details-body-container">
      
        <div className="details-body">
          <Link to="/" className="back-to-products"> ← Back to Products</Link>

          <div className="details-name-username-container">
          <h2>{currentProduct.name}</h2>
          <Link to={`/profile/${currentProduct.username}`}><h2 id="details-username" className="products-username">{currentProduct.username}</h2></Link>
          </div>
          
          <div className="details-body-img-parent">
          <img
          className="details-body-img-contaier"
          src={`${currentProduct.image}`}
          alt={currentProduct.name}
        />
          </div>
          
          <p className="details-description">{currentProduct.description}</p>

          <div className="details-price-container">
              <div className="details-price">
              ${currentProduct.price}{" "} / Day
              
              </div>
            <div>
            <button onClick={addToCart}
            className='add-to-cart-btn'>Rent</button>
            <button
            className='delete-from-cart-btn'
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
            </div>
          </div>

          

          
        
          
       { currentProduct.reviews ? <ReviewList reviews={currentProduct.reviews } /> : <div className="reviewphoto-container"><img alt='reviewphoto' src={REVIEWPHOTO} className='reviewphoto'></img><p className="no-reviews-yet">No Reviews yet</p></div>}  
          
          {Auth.loggedIn() && <ReviewForm productId={currentProduct._id} />}

        </div>
        </div>
      ) : null}
      {/* {loading ? <img src={} alt="loading" /> : null} */}
      <Cart />
    </>
  );
}

export default Detail;
