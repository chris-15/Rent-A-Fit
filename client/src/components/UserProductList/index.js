import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom'


import { UPDATE_PRODUCTS } from "../../utils/actions";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";


function UserProductList({ products, name, image, price,username}) {

    return (
        <div>
          <h3>{name}</h3>
          {products &&
            products.map(product => (
              <div key={product._id} className="card mb-3">
                <p className="card-header">
                  <Link
                    to={`/profile/${username}`}
                    style={{ fontWeight: 700 }}
                    className="text-light"
                  >
                    {product.username}
                  </Link>{' '}
                  product on {product.createdAt}
                </p>
                <div className="card-body">
                  <Link to={`/product/${product._id}`}>
                    <p>{product.productText}</p>
                    <p className="mb-0">
                      Reactions: {product.reactionCount} || Click to{' '}
                      {product.reactionCount ? 'see' : 'start'} the discussion!
                    </p>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      );
}

export default UserProductList;
