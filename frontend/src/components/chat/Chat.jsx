import React, { useState } from 'react'

const Chat = () => {
    const chats = [
        {
            type: "send",
            message: "hi",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "hi!",
            time: "10:15 am"
        },
        {
            type: "send",
            message: "how are you",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "i am fine what about you",
            time: "10:15 am"
        },
        {
            type: "send",
            message: "i am also fine",
            time: "10:15 am"
        },
        {
            type: "send",
            message: "what's going on buddy",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "noting",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "noting",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "noting",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "noting",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "noting",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "noting",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "noting",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "noting",
            time: "10:15 am"
        },
        {
            type: "recive",
            message: "noting",
            time: "10:15 am"
        }
    ]

    const [toggle, setToggle] = useState(false);

    return (

        <div className='fixed bottom-3 right-3 z-40 flex max-w-[calc(100vw-1.5rem)] items-end gap-2 sm:bottom-5 sm:right-5'>
            <div className='flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-200 shadow-lg sm:h-[60px] sm:w-[70px]' onClick={() => setToggle(!toggle)}>
                <div className='text-center text-xl sm:text-[25px]'>
                    <i className="fa-regular fa-comment-dots"></i>
                    <div className='text-sm'>{toggle?"open":"close"}</div>
                </div>
            </div>
            <div className={`h-[min(500px,75vh)] w-[min(400px,calc(100vw-6rem))] rounded-lg bg-[#edf6ff] shadow-xl ${toggle ? "hidden" : ""}`}>
                <div className='flex h-[15%] w-full flex-row items-center justify-start rounded-t-lg bg-green-100 p-4 sm:p-5'>
                    <div>
                        <div className='mr-4 flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-[150%] sm:mr-5 sm:h-[50px] sm:w-[50px]'><i className="fa-solid fa-user"></i></div>
                    </div>
                    <div className='text-lg'>Kunal</div>
                </div>

                {/* chat box */}
                <div className='h-[75%] overflow-y-auto p-3 sm:p-5'>
                    {
                        chats.map((chat, index) =>
                            <div key={index} className={`flex w-full ${chat.type === "send" ? "justify-end" : "justify-start"}`}>
                                <div className={`m-1 flex max-w-[78%] items-end rounded-lg p-2 text-sm sm:max-w-[65%] ${chat.type === "send" ? "bg-[#93C193]" : "bg-[#90CCE5]"}`}> {chat.message} <span className='ml-1 w-[50px] text-[10px]'>{chat.time}</span></div>
                            </div>
                        )
                    }
                </div>

                {/* input */}
                <div className='mx-auto flex h-[10%] w-[92%] justify-between rounded-full bg-white'>
                    <input className='min-w-0 flex-1 rounded-full p-2 focus:outline-hidden' type="text" name="chatinput" />
                    <button className='flex h-full w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-[20px] sm:w-[70px]'>
                        <i className="fa-regular fa-paper-plane">
                        </i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat
