import React, { useEffect } from 'react'
import { clearCookie } from '../Cookie/Cookie'
import { useNavigate } from 'react-router-dom'

const Logout = ( {setLoginStatus, setLoginUser, loginStatus } ) => {
    useEffect( ()=> {
        
        if (!loginStatus) {
            // alert('Invalid request');
            navigate('/');
            
        }
    },[])
    const navigate = useNavigate();
    const confirmLogout = () => {
        try {
            clearCookie();
        } catch (error) {
            return alert("Something went wrong");
        }
        setLoginStatus(false);
        setLoginUser({
            Name: '',
            Email: '',
            Role: ''
        });
        navigate('/');
    }

    const cancelLogout = () => {
        navigate('/blogs');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
          <h1 className="text-2xl font-bold text-gray-200 mb-4">
            Confirm Logout
          </h1>
          <p className="text-gray-400 mb-6">
            Are you sure you want to log out?
          </p>
          <div className="flex space-x-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 dark:focus:ring-red-700"
              onClick={confirmLogout}
            >
              Yes, Logout
            </button>
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
              onClick={cancelLogout}
            >
              Cancel
            </button>
          </div>
        </div>
      );
      
}

export default Logout