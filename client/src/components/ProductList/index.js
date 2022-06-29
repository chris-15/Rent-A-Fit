import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { QUERY_PRODUCTS } from "../../utils/queries";
import './style.css'

import { idbPromise } from "../../utils/helpers";

function ProductList() {

  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // store in the global state object
      dispatch({
        type: UPDATE_PRODUCTS,
        products:  data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="product-list-container">
      <h2>Our Products</h2>
  
      {state.products.length ? (
        <div className="flex-row justify-center product-list">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              username={product.username}
            />

          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
     {loading ? <img src='source' alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
