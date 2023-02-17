// import BgImage from 'images/chat_bg.jpg'
import useWebSocket from 'react-use-websocket';
import { useCredentials, useWebsocketConncetionStatusHook } from '../../utils/hooks'
import { useEffect, useReducer } from 'react';
import { useMessageHistory } from '../../swr/chat';
import MessageBar from '../Message/MessageBar';
import MessageBody from '../Message/MessageBody';
import MessageInput from '../Message/MessageInput';
import messageHistoryRedducer from '../../reducers/MessageHistoryReducer';
import { useMainContext } from '../../contexts/MainContext';

export default function Messaging(){
    const { access } = useCredentials()
    const { conversationName} = useMainContext()
    const { messages } = useMessageHistory(conversationName!)
    const [ messageHistory, dispatch ] = useReducer(messageHistoryRedducer, [])

    useEffect(()=>{
        dispatch({
            type: "load",
            data: messages
        })        
    }, [messages])


    const { readyState, sendJsonMessage } = useWebSocket(
        access ? `ws://127.0.0.1:8000/message/${conversationName}/` : null, {
        queryParams: {
            token: access ? access : "",
        },  
        onMessage: (e)=> {
            const data = JSON.parse(e.data)
            switch(data.type){
                case "chat_message_echo":                    
                    dispatch({
                        type: "append",
                        data: data['message']
                    })                    
                    break; 
                case "delete_message_echo":                                       
                    dispatch({
                        type: "remove",
                        message_id: data['message_id']
                    })
                    break;
                case "react_message_echo":                          
                    dispatch({
                        type: "update",
                        data: data['message']
                    })
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
        <div className="border border-neutral-500 rounded-md space-y-2 relative" style={{'height': '85vh'}}>
            <MessageBar />
            <MessageBody messageHistory={messageHistory} sendJsonMessage={sendJsonMessage}/>
            <MessageInput sendJsonMessage={sendJsonMessage}/>
        </div>
    )
}




