import React from 'react';
import { Link } from 'react-router-dom';

const ErrorComp = ({ errorMessage, code }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white" 
    > 
      <h1 className="text-9xl font-bold mb-8 text-red-500">
        {code}
      </h1>
      <p className="text-2xl mb-8">
        Oops! {errorMessage}
      </p>
      <Link 
        to="/blogs" 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorComp;