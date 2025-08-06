import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { blogData } from '../Api';
import { useQuery } from '@tanstack/react-query';
import Loading from './Loading';
import ErrorComp from './ErrorComp';
import MDEditor from '@uiw/react-md-editor';


const Readme = ({ loginUser }) => {
    // let {Id} = useParams() ;
    const [blog, SetBlog] = useState({})
    const navigate = useNavigate();

    const viewBlog = async () => {
        return await blogData('MzY3-MTc1NDQxMjM5NTA0Mw==-NzY2LCPHKP');
    }

    const handelClose = () => {
        navigate('/blogs');
    }

    const getBlog = useQuery({
        queryKey: ["blog"],
        queryFn: viewBlog
    })

    useEffect(() => {
        if (getBlog.data?.data?.Blog)
            SetBlog(getBlog.data.data.Blog);
    }, [getBlog.data])

    if (getBlog.isPending) return <Loading />

    if (getBlog.isError) return <ErrorComp errorMessage={getBlog.error?.response?.data.Error ?? "Something went wrong."} code={getBlog.error?.status ?? 403} />

    return (
        <div className="w-screen h-auto min-h-screen bg-[#2D2C2B] text-base flex flex-col items-center">
            <div className='w-5/6 flex justify-between'>
                <button className="text-red-700 text-5xl" onClick={handelClose}>&times;</button>
                <p className="text-zinc-400 text-lg font-mono pt-3">Written By: <span className='hover:text-blue-800'>{blog.Writer}</span></p>
            </div>
            <h1 className='font-serif text-2xl text-rose-500 w-[95%]'>{blog.Title}</h1>
            <div className="w-full p-10 font-mono text-slate-200">
                {/* <p className="blog-content">{blog.Content}</p> */}
                <MDEditor.Markdown
                    source={blog.Content?.replace(/\\n/g, '\n')}
                    style={{
                        backgroundColor: 'transparent', // Tailwind 'bg-slate-800'
                        color: '#fff',
                        padding: '1rem',
                        width: '100%',
                        overflowY: 'auto',
                    }}
                />
            </div>
        </div>
    )
}

export default Readme