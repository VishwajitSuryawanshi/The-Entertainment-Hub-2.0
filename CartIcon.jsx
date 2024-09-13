import React from 'react';
import { Link } from 'react-router-dom';

const CartIcon = ({ cartItem }) => {
  return (
    <div className="cart-icon">
      <Link to="/cart">
        <i className="fas fa-shopping-cart"></i>
        {cartItem.length > 0 && (
          <span className="cart-badge">{cartItem.length}</span>
        )}
      </Link>
    </div>
  );
};

export default CartIcon;
