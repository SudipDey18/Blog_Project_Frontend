import React from 'react'

const Loading = ({ loadingMessage }) => {
    const Message = loadingMessage;
    return (
        <>
            <div className=" bg-zinc-900 text-white h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-5xl font-semibold mb-10 text-sky-300">{Message}</div>
                    <div className="flex justify-center space-x-4">
                        <div className="w-10 h-10 bg-violet-600 rounded-full animate-bounce animation-delay-0"></div>
                        <div className="w-10 h-10 bg-violet-600 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-10 h-10 bg-violet-600 rounded-full animate-bounce animation-delay-400"></div>
                    </div>

                    <div id="loadingText" className="mt-6 text-xl opacity-75">Please wait...</div>
                </div>

            </div>
        </>
    )
}

export default Loading