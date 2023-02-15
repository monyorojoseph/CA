// import BgImage from 'images/chat_bg.jpg'
import useWebSocket from 'react-use-websocket';
import { useCredentials, useWebsocketConncetionStatusHook } from '../../utils/hooks'
import { useEffect, useState } from 'react';
import { useMessageHistory } from '../../swr/chat';
import { Message } from '../../utils/types';
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
                    const newMessageHistory = messageHistory?.filter((message)=> message.id !== data['message_id'])
                    setMessageHistory(newMessageHistory)
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

    const {connectionStatus} = useWebsocketConncetionStatusHook(readyState);
    console.log("[ MESSAGE ]" , connectionStatus)

    
    return (
        <div className="border border-neutral-500 border-l-2 space-y-2 relative">
            <MessageBar conversationName={conversationName}/>
            <MessageBody messageHistory={messageHistory} sendJsonMessage={sendJsonMessage}/>
            <MessageInput sendJsonMessage={sendJsonMessage}/>
        </div>
    )
}




