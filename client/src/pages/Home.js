import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from '../components/Cart';

const Home = () => {
  console.log('we are testing')
  return (
    <div className="container">
      
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
