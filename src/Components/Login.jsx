import React, { useEffect, useState } from 'react'
import { loginUser } from '../Api.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { setCookie } from '../Cookie/Cookie.js'
import { useMutation } from '@tanstack/react-query'
import SucessComp from './SucessComp.jsx'
import Loading from './Loading.jsx'
import ErrorComp from './ErrorComp.jsx'

const Login = ({ setLoginStatus, loginStatus, loginUserData }) => {

    useEffect(() => {

        if (loginStatus) {
            navigate('/blogs');
        }
    }, [loginUserData])

    const navigate = useNavigate();
    const [isCookie, setIsCookie] = useState(false);
    const [cookieError, setCookieError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUserMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            setIsCookie(true);
        },
    });

    useEffect(() => {
        if (isCookie) {
            try {
                setCookie(loginUserMutation.data.data.jwtToken);
            } catch (error) {
                setCookieError(true);
                return 1;
            }
            setLoginStatus(true);
        }
    }, [loginUserMutation.data])

    const settingCookie = () => {
        console.log(loginUserMutation.data);
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            "Email": email,
            "Password": password,
        }
        loginUserMutation.mutate(formData);
    }

    if (loginUserMutation.isSuccess) {
        return (
            <SucessComp SucessMessage={loginUserMutation.data.data.Message} />
        )
    }

    if (loginUserMutation.isError) {
        return (
            <ErrorComp errorMessage={loginUserMutation.error?.response?.data.Message ?? "Something went wrong."} code={loginUserMutation.error?.status ?? 404} />
        )
    }

    if (loginUserMutation.isPending) {
        return (<Loading loadingMessage="User verifying" />)
    }

    return (
        <>
            <div className='w-screen h-screen bg-zinc-900 flex justify-center items-center'>
                <div className=" bg-[#2D2C2B] text-lg text-slate-200 p-3 justify-items-center w-5/6 sm:w-2/5 h-3/5 rounded-3xl" >
                    <h2 className='text-5xl font-bold mb-5'>Login</h2>
                    <form className="flex flex-col gap-3 w-full items-center" onSubmit={loginSubmit}>
                        <div className="flex flex-col gap-1 w-full items-center">
                            <label htmlFor="email" className='text-xl font-semibold'>Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-1 w-5/6 bg-transparent border-4 border-zinc-600 outline-none rounded-xl text-center"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full items-center">
                            <label htmlFor="password" className='text-xl font-semibold'>Password:</label>
                            <input
                                type="password"
                                id="password" name="password"
                                placeholder="Enter your password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className=' p-1 w-5/6 bg-transparent border-4 border-zinc-600 outline-none rounded-xl text-center'
                            />
                        </div>

                        <button type="submit" className='bg-violet-700 hover:bg-violet-900 p-3 w-2/5 border-2 border-slate-800 rounded-full'>Login</button>
                    </form>
                    <p className="text-green-400 hover:text-green-600"><Link id='linkTag' to="/createUser">Create Account</Link></p>
                </div>
            </div>
        </>
    )
}

export default Login