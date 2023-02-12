import { FiSend, FiVideo } from 'react-icons/fi'
import { IoMdCall, IoMdSettings } from 'react-icons/io'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { BsEmojiSmile } from 'react-icons/bs'
// import BgImage from 'images/chat_bg.jpg'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useCredentials } from '../../utils/hooks'
import { useState } from 'react';
import { userMessageHistory } from '../../swr/chat';
import { Message } from '../../utils/types';
import { useUser } from '../../swr/user';

export default function Messaging({conversationName}: {conversationName:string}){
    const { access } = useCredentials()
    const { messageHistory } = userMessageHistory(conversationName)
    const { user } = useUser()
    const { readyState, sendJsonMessage } = useWebSocket(
        access ? `ws://127.0.0.1:8000/message/${conversationName}/` : null, {
        queryParams: {
            token: access ? access : "",
        }, 
    
        onOpen: ()=> {
          console.log("Connected")
        }, 
        onClose: ()=> {
            console.log("Disconnected")
        },
        onMessage: (e)=> {
            const data = JSON.parse(e.data)
            console.log(data)
            switch(data.type){
                          
                default:
                    console.error("Unknown message type!");
                    break;
            }

        }
    })

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];
    
    const [ message, setMessage ] = useState<string>('')
    const onSubmitHandler = (e:React.SyntheticEvent)=> {
        e.preventDefault()
        sendJsonMessage({
            type: 'chat_message',
            message: message
        })
        setMessage('')
    }

    return (
        <div className="border border-neutral-500 border-l-2 space-y-2">
            <div className='p-2 bg-neutral-500 text-white 
            flex flex-row justify-between items-center'>
                <h6 className='font-bold px-4'>Johnson</h6>
                <div className='flex flex-row items-center space-x-3 px-5'>
                    <IoMdCall />
                    <FiVideo />
                    <IoMdSettings />
                </div>
            </div>

            <div className='p-2 space-y-2 overflow-y-auto' 
            style={{"height": '65vh'}} >
                {
                    messageHistory?.map((message: Message)=> (

                    <div key={message.id}
                    className={`flex flex-row ${message.sender.id === user.id ? "justify-end": "justify-start"}`}>
                        <div className={`w-fit flex items-center gap-1 
                        ${message.sender.id === user.id ? "flex-row": "flex-row-reverse"}`}>
                            <div className='flex flex-row items-center gap-3
                            p-2 text-lg text-black text-opacity-0 hover:text-opacity-100'>
                                <BsEmojiSmile />
                                <RiDeleteBin5Line />
                            </div>
                            <p className={`border p-2 rounded-md flex-1 
                            ${!(message.sender.id === user.id) && "bg-neutral-200"}`}
                            >{message.data}</p>                    
                        </div>
                    </div>
                    ))
                }
            </div>

            <div className="border-t-2 p-2">
                <form onSubmit={onSubmitHandler}> 
                    <div className="flex flex-row justify-center items-center gap-2">
                        <input type="text" name="message" required value={message} 
                        onChange = {(e: React.ChangeEvent<HTMLInputElement>)=> setMessage(e.target.value)}
                        className="w-full border-2 rounded-md py-1 px-2 outline-neutral-400
                        focus:outline-2"
                        placeholder='type message ...'/>
                        <button type="submit"
                        className="text-xl">
                            <FiSend />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}