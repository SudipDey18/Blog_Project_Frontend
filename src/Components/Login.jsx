import React, { useEffect, useState } from 'react'
import { loginUser } from '../Api.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { setBrowserCookie } from '../Cookie/Cookie.js'
import { useMutation } from '@tanstack/react-query'
import SucessComp from './SucessComp.jsx'
import Loading from './Loading.jsx'
import ErrorComp from './ErrorComp.jsx'

const Login = ({ setLoginStatus, loginStatus, loginUserData }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (loginStatus) {
            navigate('/blogs');
        }
    }, [loginUserData])
    const [cookie, setCookie] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState({ isLoading: false, isSucess: false, isError: false, message: "", statusCode: null });
    
    useEffect(() => {
        if (cookie) {
            try {
                setBrowserCookie(cookie);
                setLoginStatus(true);
                // setStatus({ ...status, isSucess: true });
            } catch (error) {
                console.log(status);
                setStatus({ ...status, message: "Login unsucessful", isError: true, isSucess: false });
            }
            setStatus({ ...status, isLoading: false });
        }
    }, [cookie])
    
    const loginSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            "Email": email,
            "Password": password,
        }
        try {
            setStatus({ ...status, isLoading: true });
            let loginResponse = await loginUser(formData);
            // console.log(loginResponse);
            setCookie(loginResponse?.data?.jwtToken);
            setStatus({ ...status, statusCode: loginResponse.status, message: loginResponse?.data?.Message, isSucess: true });
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.pageMessage) {
                setErrorMessage(error.response.data.pageMessage);
                setStatus({ ...status, isLoading: false });
            } else {
                setStatus({ ...status, statusCode: error.status, message: error?.response?.data?.Message, isLoading: false, isError: true });
            }
        }
    }
    
    if (status.isLoading) {
        return (<Loading loadingMessage="User verifying..." />)
    }
    if (status.isError) {
        return (
            <ErrorComp errorMessage={status.message ?? "Something went wrong."} code={status.statusCode ?? 404} />
        )
    }
    if (status.isSucess) {
        return (
            <SucessComp SucessMessage={status.message} />
        )
    }

    return (
        <div className='min-h-screen bg-zinc-900 flex justify-center items-center p-4 sm:p-6 md:p-8'>
            <div className="bg-[#2D2C2B] text-base sm:text-lg text-slate-200 p-4 sm:p-6 md:p-8 flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-3xl">
                <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6'>Login</h2>
                <p className={`text-red-500 text-sm mb-3 ${errorMessage ? 'block' : 'hidden'} text-center`}>{errorMessage}</p>
                <form className="flex flex-col gap-3 sm:gap-4 w-full items-center" onSubmit={loginSubmit}>
                    <div className="flex flex-col gap-1 w-full items-center">
                        <label htmlFor="email" className='text-lg sm:text-xl font-semibold w-full text-left pl-2 sm:pl-0'>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-lg sm:rounded-xl text-center"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-full items-center">
                        <label htmlFor="password" className='text-lg sm:text-xl font-semibold w-full text-left pl-2 sm:pl-0'>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-lg sm:rounded-xl text-center'
                        />
                    </div>
                    <button type="submit" className='bg-violet-700 hover:bg-violet-900 p-2.5 sm:p-3 w-full sm:w-2/5 border-2 border-slate-800 rounded-full text-base sm:text-lg font-medium mt-2'>Login</button>
                </form>
                <div className="mt-4 sm:mt-5 w-full text-center">
                    <p className="text-sm sm:text-base">Don't have an account? <Link id='linkTag' to="/createUser" className="text-green-400 hover:text-green-600 font-medium">Create Account</Link></p>
                    <p className="text-sm sm:text-base mt-2"><Link id='linkTag' to="/forgotpass" className="text-blue-400 hover:text-blue-600 font-medium">Forgot Password?</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login