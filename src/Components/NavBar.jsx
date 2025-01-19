import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({loginUser,loginStatus}) => {
  const [name, setName] = useState('');
  useEffect( ()=> {
    if (loginUser.Name) {
      let arr = loginUser.Name.split(' ');
      setName(arr[0]);
    }
  },[loginUser])
  

  return (
    <>
        <nav className="bg-slate-900 flex justify-between fixed w-full p-2 text-slate-200">
            <div className="text-lg sm:text-xl font-semibold font-mono">
              Hi {name ? name : "Guest"}
              </div>
            <ul className="flex gap-3">
                <li><Link to="/blogs">Home</Link></li>

                { loginUser.Role === "writer" ? (
                  <li><Link to="/createBlog">Create Blog</Link></li>
                ): null }

                {loginStatus ? (
                    <li id='logout'><Link to="/logout">Logout</Link></li>
                  ): (
                    <li><Link to="/">Login</Link></li>
                  )}
            </ul>
        </nav>
    </>
  )
}

export default NavBar