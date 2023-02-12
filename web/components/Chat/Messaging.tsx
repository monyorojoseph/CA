// import BgImage from 'images/chat_bg.jpg'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useCredentials } from '../../utils/hooks'
import { useEffect, useState } from 'react';
import { useMessageHistory } from '../../swr/chat';
import { Message } from '../../utils/types';
// import AudioCall from './AudioCall';
import MessageBar from '../Message/MessageBar';
import MessageBody from '../Message/MessageBody';
import MessageInput from '../Message/MessageInput';

export default function Messaging({conversationName}: {conversationName:string}){
    const { access } = useCredentials()
    const { messages } = useMessageHistory(conversationName)
    const [ messageHistory, setMessageHistory ] = useState<Array<Message>>()

    useEffect(()=>{
        setMessageHistory(messages)          
    }, [messages])


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
            switch(data.type){
                case "chat_message_echo":
                    setMessageHistory([...messageHistory!, data['message']])                    
                    break; 
                case "delete_message_echo":
                    console.log(data)
                    break;
                case "react_message_echo":
                    console.log(data)
                    break                         
                default:
                    console.error("Unknown message type!");
                    break;
            }

        }
    })
    // read messages
    sendJsonMessage({type: "read_messages"})

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];
    
    return (
        <div className="border border-neutral-500 border-l-2 space-y-2 relative">
            <MessageBar conversationName={conversationName}/>
            <MessageBody messageHistory={messageHistory}/>
            <MessageInput sendJsonMessage={sendJsonMessage}/>
            {/* <div className='absolute top-5 bg-white left-1/2 
            border rounded-md border-neutral-500'>
                <div className='relative w-96 h-80  '>
                    <AudioCall sendJsonMessage={sendJsonMessage} />
                </div>
            </div> */}
        </div>
    )
}




