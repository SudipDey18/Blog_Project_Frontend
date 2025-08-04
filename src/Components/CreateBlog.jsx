import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createBlog } from '../Api.jsx';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading.jsx';
import ErrorComp from './ErrorComp.jsx';
import SucessComp from './SucessComp.jsx';

const CreateBlog = ({ loginUser }) => {

  useEffect(() => {

    if (loginUser.Role != 'writer') {
      navigate('/blogs');
    }
  }, [])

  const navigate = useNavigate();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
  });

  // Start
  const handelSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      Title: title,
      Content: content,
      User: loginUser.Name
    }
    setButtonStatus(true);

    createBlogMutation.mutate(blogData);
  }
  // End

  if (createBlogMutation.isPending) {
    return (<Loading loadingMessage="Blog Creating" />)
  }

  if (createBlogMutation.isError) {
    // console.log(createBlogMutation);
    return (
      <ErrorComp errorMessage={createBlogMutation.error.message} code={createBlogMutation.data?.status ?? 404} />
    )
  }

  if (createBlogMutation.isSuccess) {
    console.log(createBlogMutation);

    return (
      <SucessComp SucessMessage={createBlogMutation.data?.data.Message} />
    )
  }

  return (
    <>
      <div className='w-screen h-screen bg-zinc-900 flex justify-center items-center'>
        <div className="bg-[#2D2C2B] text-lg text-slate-200 p-3 justify-items-center w-5/6 sm:w-2/5 h-4/6 rounded-3xl">
          <h1 className='text-3xl font-bold mb-5 text-sky-300' >Create a New Blog</h1>
          <form id="blogForm" onSubmit={handelSubmit} className='flex flex-col gap-3 w-full items-center'>
            <label htmlFor="title" className='text-xl font-semibold'>Blog Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className='p-1 w-5/6 bg-transparent border-4 border-zinc-600 outline-none rounded-xl text-center'
              value={title}
              placeholder="Enter blog title"
              spellCheck="false"
              maxLength={100}
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="content" className='text-xl font-semibold'>Content:</label>
            <textarea
              id="content"
              name="content"
              rows="3"
              className='p-1 w-5/6 bg-transparent border-4 border-zinc-600 outline-none rounded-xl text-center  resize-none'
              value={content}
              placeholder="Write your blog content..."
              spellCheck="false"
              minLength={300}
              required
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit" id="submitBtn" className='bg-violet-700 hover:bg-violet-900 p-3 w-3/5 sm:w-2/5 border-2 border-slate-800 rounded-full' disabled={buttonStatus}>Create Blog</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateBlog