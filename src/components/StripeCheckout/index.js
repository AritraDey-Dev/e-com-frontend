import React, { useState } from 'react';
import Wrapper from './styles';
import axios from 'axios';
import { useCartContext } from '../../context/cart_context';
import { useUserContext } from '../../context/user_context';
import { useOrderContext } from '../../context/order_context';
import { formatPrice } from '../../utils/helpers';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { payment_url as url } from '../../utils/constants';

const CheckoutForm = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { shipping, placeOrder } = useOrderContext();
  const { currentUser } = useUserContext();
  const history = useHistory();

  const [orderId, setOrderId] = useState('');

  const createOrder = async () => {
    try {
      const { data } = await axios.post(url, {
        cart,
        shipping_fee,
        total_amount,
        shipping: {
          name: shipping.name,
          address: shipping.address,
        },
      });
      setOrderId(data.order_id);
    } catch (error) {
      toast.error('Some error occurred while connecting to the payment gateway');
    }
  };

  const handlePayment = async () => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: (shipping_fee + total_amount) * 100,
      currency: 'INR',
      name: 'Your Store',
      description: 'Order Payment',
      order_id: orderId,
      handler: async (response) => {
        try {
          await placeOrder();
          clearCart();
          history.push('/orders');
        } catch (error) {
          toast.error('Error processing order');
        }
      },
      prefill: {
        name: currentUser?.displayName || currentUser?.email,
        email: currentUser?.email,
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <article>
        <h4>
          Hello, {currentUser && (currentUser?.displayName ? currentUser.displayName : currentUser.email)}
        </h4>
        <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
      </article>
      <button onClick={createOrder} disabled={!orderId}>
        Generate Order ID
      </button>
      <button onClick={handlePayment} disabled={!orderId}>
        Pay with Razorpay
      </button>
    </div>
  );
};

const RazorpayCheckout = () => {
  return (
    <Wrapper>
      <CheckoutForm />
    </Wrapper>
  );
};

export default RazorpayCheckout;