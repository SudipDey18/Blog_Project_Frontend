import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { blogData } from '../Api';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import ErrorComp from './ErrorComp';


const ReadMore = () => {
  let {Id} = useParams();
  const [blog, SetBlog] = useState({})
  const navigate = useNavigate();

  const viewBlog = async () => {
    return await blogData(Id);
  }

  const handelClose = ()=>{
    navigate('/blogs');
  }

  const getBlog = useQuery({
    queryKey: ["blog"],
    queryFn: viewBlog
  })

  useEffect( () => {
    if(getBlog.data?.data?.Blog)
    SetBlog(getBlog.data.data.Blog);
  },[getBlog.data])

  if (getBlog.isPending) return <Loading/>

  if (getBlog.isError) return <ErrorComp errorMessage={getBlog.error?.response?.data.Error ?? "Something went wrong."} code={getBlog.error?.status ?? 403} />

  return (
    <div className="w-screen h-auto min-h-screen bg-[#2D2C2B] text-base flex flex-col items-center">
      <div className='w-5/6 flex justify-between'>
        <button className="text-red-700 text-5xl" onClick={handelClose}>&times;</button>
        <p className="text-zinc-400 text-lg font-mono pt-3">Written By: <span className='hover:text-blue-800'>{blog.Writer}</span></p>
        </div>
        <h1 className='font-serif text-2xl text-rose-500 w-[95%]'>{blog.Title}</h1>
        <div className="w-full p-10 font-mono text-slate-200">
            <p className="blog-content">{blog.Content}</p>
        </div>
    </div>
  )
}

export default ReadMore