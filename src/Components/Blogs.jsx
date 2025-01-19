import React, { useEffect, useState } from 'react'
import { viewBlogs } from '../Api.jsx';
import { useQuery } from '@tanstack/react-query'
import { HiHeart } from "react-icons/hi";
import Loading from './Loading.jsx';
import { useNavigate } from 'react-router-dom';


const Blogs = () => {

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    const getBlogs = useQuery({
        queryKey: ["blogs"],
        queryFn: viewBlogs
    });

    useEffect(() => {
        if (getBlogs.data?.data?.Blogs) {
            setBlogs(getBlogs.data?.data?.Blogs);
        }
    }, [getBlogs.data]);


    const handelReadMore = (id) => {
        navigate(`/blog/${id}`);
    }

    if (getBlogs.isPending) {
        return (<Loading loadingMessage="Blog Loading" />)
    }

    return (
        <>
            <div className='h-auto min-h-screen w-screen bg-zinc-900 flex flex-col justify-center items-center'>
                    <h1 className='text-5xl text-zinc-500 font-bold mt-14'>All Blogs</h1>
                    <hr className='w-56' />
                        {blogs.map((element, index) => (
                            <div className="flex flex-col bg-[#2D2C2B] text-base text-slate-200 p-5 items-center w-5/6 sm:w-4/5 mt-10 rounded-3xl" key={index} >
                                <h2 className="font-serif text-2xl text-rose-500">{element.Title}</h2>
                                <div className="w-5/6 h-12 overflow-hidden font-mono" id="content">{element.Content}</div>
                                <div className='flex gap-10 w-full sm:w-2/4 justify-center'>
                                <button className="bg-violet-700 hover:bg-violet-900 p-2 w-3/6 sm:w-2/6 border-2 border-slate-800 rounded-2xl" onClick={() => handelReadMore(element.BlogId)} >Read More</button>
                                <div className='flex items-center'>
                                <button className="text-3xl" onClick={() => alert("like is now under development")}><HiHeart /></button>
                                <div className="">100</div>
                                </div>
                                </div>
                            </div>
                        ))}
                </div>
        </>
    )

}

export default Blogs