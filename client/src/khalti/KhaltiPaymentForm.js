import React, { useState } from 'react';
import axios from 'axios';

const KhaltiPaymentForm = ({ amount, setPaymentSuccess, setPaymentError }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      // Send request to backend to initiate Khalti payment
      const response = await axios.post('/api/v1/payment/khalti/payment', {
        amount,
        // Include any other necessary payment details
      });
      setLoading(false);
      if (response.data.success) {
        // Payment successful, update parent component state
        setPaymentSuccess(true);
      } else {
        // Payment failed, update parent component state with error message
        setPaymentError('Payment failed');
      }
    } catch (error) {
      console.error('Error processing Khalti payment:', error);
      setLoading(false);
      setPaymentError('An error occurred while processing your request');
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Khalti'}
      </button>
    </div>
  );
};

export default KhaltiPaymentForm;
