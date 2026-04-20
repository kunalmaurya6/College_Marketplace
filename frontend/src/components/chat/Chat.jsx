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

        <div className='absolute bottom-0 right-1 flex items-end gap-2'>
            <div className='bg-blue-200 w-[70px] h-[60px] rounded-full flex justify-center items-center' onClick={() => setToggle(!toggle)}>
                <div className='text-[25px]'>
                    <i className="fa-regular fa-comment-dots"></i>
                    <div className='text-sm'>{toggle?"open":"close"}</div>
                </div>
            </div>
            <div className={`w-[400px] h-[500px] bg-[#edf6ff] rounded-lg ${toggle ? "hidden" : ""}`}>
                <div className='w-[full] h-[15%] bg-green-100 rounded-lg p-5 flex flex-row justify-start items-center'>
                    <div>
                        <div className='h-[50px] w-[50px] bg-gray-50 rounded-full flex justify-center items-center text-[150%] mr-5'><i className="fa-solid fa-user"></i></div>
                    </div>
                    <div className='text-lg'>Kunal</div>
                </div>

                {/* chat box */}
                <div className='p-5 h-[75%] overflow-scroll '>
                    {
                        chats.map((chat =>
                            <div className={`w-full flex ${chat.type === "send" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[60%] p-1 m-1 rounded-lg flex items-end ${chat.type === "send" ? "bg-[#93C193]" : "bg-[#90CCE5]"}`}> {chat.message} <span className='ml-1 text-[10px] w-[50px]'>{chat.time}</span></div>
                            </div>
                        ))
                    }
                </div>

                {/* input */}
                <div className='h-[10%] w-[90%] bg-white mx-auto rounded-full flex justify-between'>
                    <input className='w-full focus:outline-hidden p-2' type="text" name="chatinput" />
                    <button className='w-[70px] h-[50px] text-[20px] bg-green-100 rounded-full'>
                        <i className="fa-regular fa-paper-plane">
                        </i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat
