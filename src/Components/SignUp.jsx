import React, { useEffect, useState } from 'react'
import { createUser, requestSignupOtp } from '../Api.jsx'
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';
import ErrorComp from './ErrorComp.jsx';
import SucessComp from './SucessComp.jsx';

const SignUp = ({ loginStatus }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (loginStatus) {
            navigate('/blogs');
        }
    }, [loginStatus]);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [otp, setOtp] = useState('');
    const [status, setStatus] = useState({ isLoading: false, isSucess: false, isError: false, message: "" });
    const [otpTimer, setOtpTimer] = useState(0); // seconds left
    const [errorMessage, setErrorMessage] = useState({ Message: '', status: null });
    let res = {};

    // Countdown effect
    useEffect(() => {
        let timer;
        if (otpTimer > 0) {
            timer = setInterval(() => {
                setOtpTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [otpTimer]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleGetOtp = async () => {
        if (!email) {
            alert("Please enter your email first.");
            return;
        }
        setOtpTimer(180);
        try {
            let requestOtpRes = await requestSignupOtp(email);
            // console.log(requestOtpRes);
            setErrorMessage({ Message: requestOtpRes?.data?.pageMessage, status: requestOtpRes.status });
        } catch (error) {
            setErrorMessage({ Message: error?.response?.data?.pageMessage, status: error.status });
            setOtpTimer(0);
        }
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            "Name": name,
            "Email": email,
            "Password": password,
            "Role": role,
            "Otp": otp
        }
        setStatus({ ...status, isLoading: true });
        try {
            res = await createUser(formData);
            // console.log(res);
            setStatus({ ...status, message: res?.data?.Message, isLoading: false, isSucess: true });
        } catch (error) {
            
            if (error.response?.data?.pageMessage) {
                setErrorMessage({ Message: error?.response?.data?.pageMessage, status: error.status});
                setStatus({ ...status,isLoading: false});
            } else {
                setStatus({ ...status, message: error?.response?.data?.Message, isLoading: false, isError: true });
            }
        }
    }

    if (status.isLoading) {
        return (<Loading loadingMessage="User Creating..." />)
    }
    if (status.isSucess) {
        return (
            <SucessComp SucessMessage={status.message} />
        )
    }
    if (status.isError) {
        return (<ErrorComp errorMessage={status.message} code={res?.status ?? 404} />)
    }

    return (
        <div className='min-h-screen bg-zinc-900 flex justify-center items-center p-4 pt-12 sm:p-6 md:p-8'>
            <div className="flex flex-col bg-[#2D2C2B] text-base text-slate-200 p-4 sm:p-6 md:p-8 items-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-3xl my-4 sm:my-6 md:my-8">
                <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6'>SignUp</h2>
                <p className={`${errorMessage.status > 201 ? "text-red-500" : "text-green-500"} text-sm mb-3 ${errorMessage.Message ? 'block' : 'hidden'} text-center`}>{errorMessage.Message}</p>
                <form onSubmit={handelSubmit} className='w-full flex flex-col items-center gap-2 sm:gap-3'>
                    <label htmlFor="name" className='text-lg font-semibold w-full text-left pl-2 sm:pl-0'>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        placeholder='Enter Your Name'
                        className="min-h-10 sm:min-h-11 p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-xl mb-1 sm:mb-2 text-center"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="email" className='text-lg font-semibold w-full text-left pl-2 sm:pl-0'>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder='Enter your Email'
                        className="min-h-10 sm:min-h-11 p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-xl mb-1 sm:mb-2 text-center"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* OTP Input + Button */}
                    <div className="flex flex-col sm:flex-row w-full gap-2 mb-1 sm:mb-2">
                        <div className="w-full sm:w-3/5">
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                value={otp}
                                required
                                placeholder='OTP valid 10 min'
                                className="min-h-10 sm:min-h-11 p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-xl text-center"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className={`min-h-10 sm:w-2/5 sm:min-h-11 px-4 rounded-xl border-2 border-slate-800 text-center text-sm sm:text-base ${otpTimer > 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800'}`}
                            onClick={handleGetOtp}
                            disabled={otpTimer > 0}
                        >
                            {otpTimer > 0 ? `Resend in ${formatTime(otpTimer)}` : 'Get OTP'}
                        </button>
                    </div>

                    <label htmlFor="password" className='text-lg font-semibold w-full text-left pl-2 sm:pl-0'>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder='Enter Your Password'
                        className="min-h-10 sm:min-h-11 p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-xl mb-1 sm:mb-2 text-center"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className='text-lg font-semibold w-full text-left pl-2 sm:pl-0'>Role:</label>
                    <div className="flex gap-4 sm:gap-6 mb-3 sm:mb-4">
                        <label htmlFor="reader" className='text-zinc-950 font-semibold flex items-center gap-1 sm:gap-2'>
                            <input
                                type="radio"
                                id="reader"
                                name="role"
                                defaultChecked={role === "reader"}
                                value="reader"
                                required
                                onClick={(e) => setRole(e.target.value)}
                                className="scale-110 sm:scale-125"
                            />
                            <span className="text-sm sm:text-base">Reader</span>
                        </label>
                        <label htmlFor="writer" className='text-zinc-950 font-semibold flex items-center gap-1 sm:gap-2'>
                            <input
                                type="radio"
                                id="writer"
                                name="role"
                                defaultChecked={role === "writer"}
                                value="writer"
                                onClick={(e) => setRole(e.target.value)}
                                className="scale-110 sm:scale-125"
                            />
                            <span className="text-sm sm:text-base">Writer</span>
                        </label>
                    </div>

                    <button type="submit" className='bg-violet-700 hover:bg-violet-900 p-3 w-full sm:w-3/5 md:w-2/5 border-2 border-slate-800 rounded-full text-base sm:text-lg font-medium mt-2'>Submit</button>
                </form>
                <div className="login-container mt-4 sm:mt-6 w-full text-center">
                    <p className="text-sm sm:text-base">Already have account? <Link id='linkTag' to='/' className="text-green-400 hover:text-green-600 font-medium">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;