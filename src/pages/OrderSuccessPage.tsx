import React from 'react';

const OrderSuccessPage: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Order Successful!</h1>
      <div className="bg-white rounded shadow p-4">
        {/* Confirmation number, tracking, and thank-you message will go here */}
        <p className="text-gray-600 mb-2">Thank you for your purchase!</p>
        <p className="text-gray-500">Your order confirmation and tracking info will appear here.</p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
