import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { requestForgotPassOtp, forgotPassword } from '../Api.jsx'
import Loading from './Loading.jsx'
import ErrorComp from './ErrorComp.jsx'
import SucessComp from './SucessComp.jsx'

const ForgotPassword = ({ loginStatus }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (loginStatus) {
            navigate('/blogs');
        }
    }, [loginStatus]);

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState({ isLoading: false, isSuccess: false, isError: false, message: "" });
    const [otpTimer, setOtpTimer] = useState(0);
    const [errorMessage, setErrorMessage] = useState({ Message: '', status: null });
    const [step, setStep] = useState(1);

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

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            alert("Please enter your email first.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email");
            return;
        }

        setOtpTimer(180);
        try {
            let requestOtpRes = await requestForgotPassOtp(email);
            setStep(2);
            setErrorMessage({ Message: requestOtpRes?.data?.pageMessage, status: requestOtpRes.status });
        } catch (error) {
            setErrorMessage({ Message: error?.response?.data?.pageMessage, status: error.status });
            setOtpTimer(0);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage({ Message: "Passwords do not match", status: 400 });
            return;
        }

        const formData = {
            "Email": email,
            "Otp": otp,
            "Password": newPassword
        }

        setStatus({ ...status, isLoading: true });
        try {
            let forgotPasswordRes = await forgotPassword(formData)
            setStatus({ ...status, message: forgotPasswordRes?.data?.pageMessage, isLoading: false, isSuccess: true });
        } catch (error) {
            if (error.response.data.pageMessage) {
                setErrorMessage({ Message: error?.response?.data?.pageMessage, status: error.status });
                setStatus({ ...status, isLoading: false });
            }
            setStatus({ ...status, message: error?.response?.data?.Message, isLoading: false, isError: true });
        }
    }

    if (status.isLoading) {
        return (<Loading loadingMessage="Resetting Password..." />)
    }
    if (status.isSuccess) {
        return (
            <SucessComp SucessMessage={status.message} />
        )
    }
    if (status.isError) {
        return (<ErrorComp errorMessage={status.message} code={res?.status ?? 404} />)
    }

    return (
        <div className='min-h-screen bg-zinc-900 flex justify-center items-center p-4 sm:p-6 md:p-8'>
            <div className="bg-[#2D2C2B] text-base sm:text-lg text-slate-200 p-4 sm:p-6 md:p-8 flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-3xl">
                <h2 className='text-3xl sm:text-4xl font-bold mb-4 sm:mb-6'>Forgot Password</h2>
                <p className={`${errorMessage.status > 201 ? "text-red-500" : "text-green-500"} text-sm mb-3 ${errorMessage.Message ? 'block' : 'hidden'}`}>{errorMessage.Message}</p>

                {step === 1 ? (
                    // Step 1: Request OTP
                    <div className="w-full">
                        <div className="flex flex-col gap-1 w-full items-center mb-4">
                            <label htmlFor="email" className='text-lg font-semibold w-full text-left pl-2 sm:pl-0'>Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-xl text-center"
                            />
                        </div>
                        <button
                            onClick={handleGetOtp}
                            className='bg-blue-600 hover:bg-blue-800 p-3 w-full border-2 border-slate-800 rounded-full font-medium'
                        >
                            Get OTP
                        </button>
                    </div>
                ) : (
                    // Step 2: Reset Password
                    <form onSubmit={handleResetPassword} className='w-full flex flex-col items-center gap-3'>
                        <div className="flex flex-col gap-1 w-full items-center">
                            <label htmlFor="otp" className='text-lg font-semibold w-full text-left pl-2 sm:pl-0'>OTP:</label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                placeholder="Enter OTP"
                                required
                                onChange={(e) => setOtp(e.target.value)}
                                className="p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-xl text-center"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-full items-center">
                            <label htmlFor="newPassword" className='text-lg font-semibold w-full text-left pl-2 sm:pl-0'>New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                placeholder="Enter new password"
                                required
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-xl text-center"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-full items-center">
                            <label htmlFor="confirmPassword" className='text-lg font-semibold w-full text-left pl-2 sm:pl-0'>Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="p-2 w-full bg-transparent border-4 border-zinc-600 outline-none rounded-xl text-center"
                            />
                        </div>

                        <div className="flex w-full gap-2 mt-2">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className='bg-gray-600 hover:bg-gray-800 p-2 w-1/2 border-2 border-slate-800 rounded-full'
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className='bg-violet-700 hover:bg-violet-900 p-2 w-1/2 border-2 border-slate-800 rounded-full'
                            >
                                Reset Password
                            </button>
                        </div>

                        <div className="w-full mt-2">
                            <button
                                type="button"
                                onClick={handleGetOtp}
                                disabled={otpTimer > 0}
                                className={`w-full p-2 rounded-xl border-2 border-slate-800 text-center ${otpTimer > 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800'}`}
                            >
                                {otpTimer > 0 ? `Resend OTP in ${formatTime(otpTimer)}` : 'Resend OTP'}
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-6 w-full text-center">
                    <p className="text-sm sm:text-base">Remember your password? <Link id='linkTag' to="/" className="text-green-400 hover:text-green-600 font-medium">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword