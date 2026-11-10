import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Show total cart amount
  const totalAmount = cartItems.reduce((total, item) => total + (item.cost * item.quantity), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Shopping Cart</h2>
      <h3 style={{ textAlign: 'center', color: '#333' }}>Total Cart Amount: ${totalAmount.toFixed(2)}</h3>

      <div style={{ marginTop: '30px' }}>
        {cartItems.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
            <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
            <div style={{ flex: 1, marginLeft: '20px' }}>
              <h3 style={{ margin: '0 0 10px' }}>{item.name}</h3>
              <p style={{ margin: '0 0 5px' }}>Unit Price: ${item.cost}</p>
              <p style={{ margin: '0 0 10px', fontWeight: 'bold' }}>Total: ${(item.cost * item.quantity).toFixed(2)}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
                <span style={{ fontSize: '1.1rem' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
              </div>
            </div>
            
            <button 
              onClick={() => handleRemove(item.name)} 
              style={{ padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
        <button 
          onClick={onContinueShopping} 
          style={{ padding: '15px 30px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}
        >
          Continue Shopping
        </button>
        <button 
          onClick={() => alert('Coming Soon!')} 
          style={{ padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
