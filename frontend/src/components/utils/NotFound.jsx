import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
          >
            Go Home
          </Link>
          <div className="text-sm text-gray-500">
            <p>Or try one of these:</p>
            <div className="mt-2 space-x-4">
              <Link to="/seller" className="text-blue-500 hover:text-blue-600">
                Seller Dashboard
              </Link>
              <Link to="/admin" className="text-blue-500 hover:text-blue-600">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;