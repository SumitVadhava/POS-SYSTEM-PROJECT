import React, { useState } from 'react';
import { Card } from 'antd';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false); // Local state to manage the added status
  const [bgColor, setBgColor] = useState(''); // Local state for background color

  // Update cart handler
  const handleAddToCart = () => {
    if (!added) {
      toast.success('Added to Cart',{ autoClose: 800 });
      setAdded(true); // Set added state to true
      dispatch({
        type: "ADD_TO_CART",
        payload: { ...item, quantity: 1 },
      });

      // Automatically reset the added state and background color after 2 seconds
      setTimeout(() => {
        setAdded(false); // Reset to original state
        setBgColor(''); // Reset background color
      }, 1200);
    }
  };

  const { Meta } = Card;

  return (
    <Card
      hoverable
      style={{
        width: 240,
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: bgColor, // Set background color here
      }}
      cover={<img alt={item.name} src={item.image} style={{ height: 200 }} />}
    >
      <Meta 
        title={item.name} 
        description={`Price: ₹${item.price}`}
      />
      <button
        className="addtocart"
        onClick={handleAddToCart}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: added ? 'white' : 'black', // Change text color for visibility
        }}
      >
        <div className="pretext" style={{
          transform: added ? 'translate(-110%) skew(-40deg)' : 'translate(0px)',
          transition: 'transform 0.3s ease'
        }}>
          <i className="fas fa-cart-plus"></i> Add To Cart
        </div>

        <div className="posttext" style={{
          transform: added ? 'translate(0px)' : 'translate(-110%)',
          transition: 'transform 0.3s ease'
        }}>
          <i className="fas fa-check"></i>
        </div>
      </button>
    </Card>
  );
};

export default ItemList;
