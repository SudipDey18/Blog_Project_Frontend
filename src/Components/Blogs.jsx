import React, { useEffect, useState } from 'react'
import { likeUpdate, viewBlogs } from '../Api.jsx';
import { HiHeart } from "react-icons/hi";
import Loading from './Loading.jsx';
import { useNavigate } from 'react-router-dom';
import { FaShareAlt } from "react-icons/fa";
import SocialShare from './Share.jsx';


const Blogs = ({ loginUser }) => {
    const navigate = useNavigate();
    const currentUrl = window.location.protocol + "//" + window.location.host;
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(false);
    const [blogsLoading, setBlogsLoading] = useState(true);
    const [share, setShare] = useState(false);
    const [shareData, setShareData] = useState({ title: '', url: '' });
    let apiData;

    const likeFunction = async (Data) => {
        // console.log(Data);

        if (loginUser?.UserId) {
            let apiData = await likeUpdate({ BlogLikes: Data.Likes, BlogId: Data.BlogId, UserId: loginUser.UserId });

            if (apiData.data?.Blogs) {
                setBlogs(apiData.data.Blogs);
                setPage(false);
            }
        } else {
            navigate('/');
        }
    }

    const getBlogs = async () => {
        let res = await viewBlogs();
        setBlogs(res.data.Blogs);
        setBlogsLoading(false);
    }

    useEffect(() => {
        getBlogs();
    }, []);


    const handelReadMore = (id) => {
        navigate(`/blog/${id}`);
    }

    if (blogsLoading) {
        return (<Loading loadingMessage="Blog Loading..." />)
    }

    return (
        <>
            <div className='h-auto min-h-screen w-screen bg-zinc-900 flex flex-col justify-center items-center'>
                {share && <SocialShare className="" url={shareData.url} title={shareData.title} setShare={setShare} />}
                <h1 className='text-5xl text-zinc-500 font-bold mt-14'>All Blogs</h1>
                <hr className='w-56 h-2 bg-zinc-200' />
                <h2 className='text-3xl text-red-400' >{apiData?.data.nann}</h2>
                {blogs?.map((element, index) => (
                    <div className="flex flex-col bg-[#2D2C2B] text-base text-slate-200 p-5 items-center w-5/6 sm:w-4/5 mt-10 rounded-3xl" key={index} >
                        {/* {console.log(element)} */}
                        <h2 className="font-serif text-2xl text-rose-500">{element.Title}</h2>
                        <div className="w-5/6 h-12 overflow-hidden font-mono" id="content">{element.Content}</div>
                        <div className='flex gap-10 w-full sm:w-2/4 justify-center'>
                            <button className="bg-violet-700 hover:bg-violet-900 p-2 w-3/6 sm:w-2/6 border-2 border-slate-800 rounded-2xl" onClick={() => handelReadMore(element.BlogId)} >Read More</button>
                            <div className='flex items-center'>
                                <button className="text-3xl disabled:opacity-20" onClick={() => { setPage(true); likeFunction({ Likes: element.Likes, BlogId: element.BlogId }) }}
                                    disabled={page}
                                >
                                    <HiHeart className={page ? "size-10" : ""} style={{
                                        color: element.Likes.includes(loginUser.UserId) ? 'red' : "white"
                                    }} />
                                </button>
                                <div className="">{(() => {
                                    try {
                                        if (typeof element.Likes === 'string') {
                                            const parsed = JSON.parse(element.Likes);
                                            return Array.isArray(parsed) ? parsed.length : 0;
                                        } else if (Array.isArray(element.Likes)) {
                                            return element.Likes.length;
                                        } else {
                                            return 0;
                                        }
                                    } catch (e) {
                                        console.error("Failed to parse Likes:", e);
                                        return 0;
                                    }
                                })()}</div>
                            </div>
                            <div className='flex items-center'><FaShareAlt className='size-6' onClick={() => {
                                setShareData({ title: element.Title, url: `${currentUrl}/blog/${element.BlogId}` });
                                setShare(true);
                            }} /></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

export default Blogs