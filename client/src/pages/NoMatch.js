import React from "react";
import NOTFOUND from '../assets/notfound.svg'

const NoMatch = () => {
  return (
    <div className="page-not-found-container">
    
       <img src={NOTFOUND} alt="notfound"></img>
        <h1>
          Page not found
        </h1>
    </div>
  );
};

export default NoMatch;
