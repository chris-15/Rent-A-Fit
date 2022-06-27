import React from "react";
import { MdCancel} from "react-icons/md";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";

import { idbPromise } from "../../utils/helpers";
import './style.css'

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;

    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
    
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
    
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="flex-row cart-item-body">
      <div>
        <img src={item.image} alt="" className="cart-img"/>
      </div>
      <div>
        <div>
          {item.name},  <span className="cartItemPrice">${item.price}</span> 
        </div>

        <div className="cart-item-input-container">
          <span>Days: </span>
          <input
      className="cart-item-input"
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            <MdCancel />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
