import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import FormatPrice from '../Helpers/FormatPrice';
import CartAmountToggle from './CartAmountToggle';
const CartItem = ({id,price,amount,image,color,name,max}) => {

    const {removeItem,setDecrease,setIncrease}=useCartContext();

  return (
    <div className=" cart_heading grid grid-five-column">
      <div className="cart-image--name">
        {/* //div for image */}
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>

        {/* //div for name */}
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>
      {/* // for price */}

      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* // Quantity */}
      <CartAmountToggle
        amount={amount}
        setIncrease={()=>setIncrease(id)}
        setDecrease={()=>setDecrease(id)}
      />

      {/* // subtotal */}
      <div className="cart-hide">
        <p>
         
          <FormatPrice price={price * amount} />
        </p>
      </div>

      {/* // remov-item */}
      <div>
        <FaTrash className="remove_icon" onClick={()=>removeItem(id)}/>
      </div>
    </div>
  );
};

export default CartItem