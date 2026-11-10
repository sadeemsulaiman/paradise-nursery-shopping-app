import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Calculate total number of items dynamically for the cart icon
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // 3 categories with at least 6 unique plants each
  const plantsArray = [
    {
      category: 'Air Purifying',
      plants: [
        { name: 'Snake Plant', cost: 15, image: 'https://images.unsplash.com/photo-1599598425947-330026296906' },
        { name: 'Spider Plant', cost: 12, image: 'https://images.unsplash.com/photo-1615479010041-37d45e0fb145' },
        { name: 'Peace Lily', cost: 20, image: 'https://images.unsplash.com/photo-1593121547492-d6fc71fa9e39' },
        { name: 'Boston Fern', cost: 18, image: 'https://images.unsplash.com/photo-1615147575971-ce9ebdb04d3e' },
        { name: 'Rubber Plant', cost: 25, image: 'https://images.unsplash.com/photo-1595054366667-3e6f9b1b6814' },
        { name: 'Aloe Vera', cost: 10, image: 'https://images.unsplash.com/photo-1596547609652-9cb5b4d7ab7a' }
      ]
    },
    {
      category: 'Succulents',
      plants: [
        { name: 'Jade Plant', cost: 14, image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09' },
        { name: 'Echeveria', cost: 8, image: 'https://images.unsplash.com/photo-1601991471379-373305a415ff' },
        { name: 'Zebra Plant', cost: 11, image: 'https://images.unsplash.com/photo-1570776964177-3e9154f8e5ee' },
        { name: 'Burro\'s Tail', cost: 16, image: 'https://images.unsplash.com/photo-1632733857500-2e4d077b9492' },
        { name: 'String of Pearls', cost: 19, image: 'https://images.unsplash.com/photo-1632314120302-36e2fba50a8b' },
        { name: 'Panda Plant', cost: 9, image: 'https://images.unsplash.com/photo-1617482312217-15ff5df9469e' }
      ]
    },
    {
      category: 'Flowering',
      plants: [
        { name: 'Orchid', cost: 30, image: 'https://images.unsplash.com/photo-1515538561081-30d8977df768' },
        { name: 'African Violet', cost: 15, image: 'https://images.unsplash.com/photo-1634892404179-88f1155057b5' },
        { name: 'Begonia', cost: 13, image: 'https://images.unsplash.com/photo-1596791671991-628d06dc1169' },
        { name: 'Anthurium', cost: 22, image: 'https://images.unsplash.com/photo-1594916892694-8abfc4e24eb2' },
        { name: 'Kalanchoe', cost: 12, image: 'https://images.unsplash.com/photo-1618218683523-a5ff50b86a8f' },
        { name: 'Poinsettia', cost: 18, image: 'https://images.unsplash.com/photo-1544458319-3f044238e55e' }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isAddedToCart = (name) => {
    return cartItems.some(item => item.name === name);
  };

  return (
    <div>
      {/* Navbar appearing on both pages */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white' }}>
        <div style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' }} onClick={() => setShowCart(false)}>
          Paradise Nursery - Home / Plants
        </div>
        <div style={{ cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => setShowCart(true)}>
          🛒 Cart ({totalItems})
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {plantsArray.map((categoryObj, idx) => (
            <div key={idx} style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                {categoryObj.category}
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {categoryObj.plants.map((plant, pIdx) => (
                  <div key={pIdx} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', width: '250px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                    <h3 style={{ margin: '15px 0 10px' }}>{plant.name}</h3>
                    <p style={{ fontSize: '1.1rem', color: '#555', margin: '0 0 15px' }}>${plant.cost}</p>
                    <button
                      disabled={isAddedToCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: isAddedToCart(plant.name) ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isAddedToCart(plant.name) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
