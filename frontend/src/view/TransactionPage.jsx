import React, { useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const TransactionPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(""); // Payment method
  const [address, setAddress] = useState(""); // Address
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success Modal
  const [successMessage, setSuccessMessage] = useState(""); // Success Message

  const handleTransaction = async () => {
    if (!paymentMethod || !address) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('/transaction', {
        paymentMethod,
        address,
      });

      // Handle success response
      setSuccessMessage(response.data.message);
      if (paymentMethod === 'cash_on_delivery') {
        setShowSuccessModal(true); // Show success modal for COD
      }

      setError(''); // Clear any errors
      setAddress(''); // Reset form
      setPaymentMethod('');
    } catch (err) {
      setError('Failed to process transaction. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='bg-green-900 -m-8 pt-8 text-white'>
        <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>
            <Link to='/h'>Plant Care</Link>
          </h1>
          <div className='flex space-x-4'>
            <Link to='/home' className='hover:underline'>
              Home
            </Link>
            <Link to='/research-work' className='hover:underline'>
              Research
            </Link>
            <Link to='/video-tutorials' className='hover:underline'>
              Tutorials
            </Link>
            <Link to='/plants' className='hover:underline'>
              Plants
            </Link>
            <Link to='/marketplace' className='hover:underline'>
              MarketplacePage
            </Link>
            <Link to='/profile' className='hover:underline'>
              User
            </Link>
            <Link to='/session' className='hover:underline'>
              Session
            </Link>
            <Link to='/' className='hover:underline'>
              logout
            </Link>
            {/* add notifiaction bell  */}
            <Link to='/notification' className='hover:underline'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 17h5l-1.405-1.405A2.002 2.002 0 0018 13V8a6 6 0 00-12 0v5a2.002 2.002 0 00-.595 1.595L5 17h5m7 0a3 3 0 11-6 0'
                />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-8 px-4"> {/* Add padding-top to push content below navbar */}
        {/* Success Message */}
        {successMessage && !showSuccessModal && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            {error}
          </div>
        )}

        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Address Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter delivery address"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-gray-700">FAKE Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a payment method</option>
              <option value="google_pay">Google Pay</option>
              <option value="bkash">bKash</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
            </select>
          </div>

          <button
            onClick={handleTransaction}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Payment
          </button>
        </div>
      </div>

      {/* Success Modal for Cash on Delivery */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Order Confirmed!</h2>
            <p>Your order has been placed successfully and will be delivered to your address shortly.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
