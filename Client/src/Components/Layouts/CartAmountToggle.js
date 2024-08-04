import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartAmountToggle = ({ cart }) => {
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    return amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    return amount < cart.quantity
      ? setAmount(amount + 1)
      : setAmount(cart.quantity);
  };

  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <button onClick={() => setDecrease()}>
          <FaMinus />
        </button>
        <div className="amount-style">{amount}</div>
        <button onClick={() => setIncrease()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;
