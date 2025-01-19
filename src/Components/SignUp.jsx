import React, { useEffect, useState } from 'react'
import { createUser } from '../Api.jsx'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Loading from './Loading.jsx';
import ErrorComp from './ErrorComp.jsx';
import SucessComp from './SucessComp.jsx';


const SignUp = ({ loginStatus }) => {

    useEffect(() => {
        if (loginStatus) {
            navigate('/blogs');
        }
    }, [loginStatus]);

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');

    const createUserMutation = useMutation({
        mutationFn: createUser
    })

    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = {
            "Name": name,
            "Email": email,
            "Password": password,
            "Role": role,
            "Gender": gender
        }
        createUserMutation.mutate(formData);
    }

    if (createUserMutation.isPending) {
        return (<Loading loadingMessage="User Creating" />)
    }

    if (createUserMutation.isSuccess) {
        return (
            <SucessComp SucessMessage={createUserMutation.data.data.Message} />
        )
    }

    if (createUserMutation.isError) {
        console.log(createUserMutation.error);

        return (<ErrorComp errorMessage={createUserMutation.error?.response.data.Message ?? createUserMutation.error.message} code={createUserMutation.error?.status ?? 404} />)
    }

    return (
        <div className='h-auto min-h-screen w-screen bg-zinc-900 flex justify-center items-center'>
            <div className="flex flex-col bg-[#2D2C2B] text-base text-slate-200 p-5 items-center w-5/6 sm:w-2/6 mt-10 rounded-3xl">
                <h2 className='text-3xl font-bold mb-5'>SignUp</h2>
                <form onSubmit={handelSubmit} className='w-full flex flex-col items-center gap-1'>
                    <label htmlFor="name" className='text-lg font-semibold'>Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder='Enter Your Name'
                        className="p-1 w-5/6 bg-transparent border-4 border-zinc-600 outline-none rounded-xl mb-2 text-center "
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email" className='text-lg font-semibold'>Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Enter your Email'
                        className="p-1 w-5/6 bg-transparent border-4 border-zinc-600 outline-none rounded-xl mb-2 text-center "
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password" className='text-lg font-semibold'>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Enter Your Password'
                        className="p-1 w-5/6 bg-transparent border-4 border-zinc-600 outline-none rounded-xl mb-2 text-center"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className='text-lg font-semibold'>Gender:</label>
                    <div className="flex gap-5 mb-2">
                        <label htmlFor="male" className='text-zinc-950 font-semibold'>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                required
                                onClick={(e) => setGender(e.target.value)}
                            /> Male
                        </label>
                        <label htmlFor="female" className='text-zinc-950 font-semibold'>
                            <input type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                onClick={(e) => setGender(e.target.value)}
                            /> Female
                        </label>
                    </div>

                    <label className='text-lg font-semibold'>Role:</label>
                    <div className="flex gap-5 mb-2">
                        <label htmlFor="reader" className='text-zinc-950 font-semibold'>
                            <input
                                type="radio"
                                id="reader"
                                name="role"
                                value="reader"
                                required
                                onClick={(e) => setRole(e.target.value)}
                            /> Reader
                        </label>
                        <label htmlFor="writer" className='text-zinc-950 font-semibold'>
                            <input
                                type="radio"
                                id="writer"
                                name="role"
                                value="writer"
                                onClick={(e) => setRole(e.target.value)}
                            /> Writer
                        </label>
                    </div>

                    <button type="submit" className='bg-violet-700 hover:bg-violet-900 p-3 w-2/5 border-2 border-slate-800 rounded-full'>Submit</button>
                </form>
                <div className="login-container">
                    <p>Already have account?<Link id='linkTag' to='/' className="text-green-400 hover:text-green-600">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp