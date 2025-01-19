import React from 'react'
import { Link } from 'react-router-dom'

const SucessComp = ({ SucessMessage }) => {
  return (
    <div className="h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-6">
      <div className="text-6xl mb-6 text-green-500">
        <span>✓</span>
      </div>
      <h1 className="text-5xl font-bold mb-4 text-green-400">Success!</h1>
      <p className="text-xl text-center mb-6 text-gray-300">{SucessMessage}User Created Sucessfully</p>
      <Link 
        to="/blogs" 
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md text-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Go Back to Home
      </Link>
    </div>
  )
}

export default SucessComp
