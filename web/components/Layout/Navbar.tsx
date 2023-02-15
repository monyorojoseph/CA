import useWebSocket from "react-use-websocket";
import AudioCall from "../Chat/AudioCall";
import Tabs from "./Tabs";
import { useEffect, useState } from "react";
import { useCredentials, useWebsocketConncetionStatusHook } from "../../utils/hooks";
import { useUser } from "../../swr/user";

export default function Navbar({tab, target, setTab}:{
        tab: string;
        target?: string;
        setTab: Function;
    }){
    
    const { user } = useUser()
    const { access }= useCredentials()
    const { readyState, sendJsonMessage } = useWebSocket(
        access ? `ws://127.0.0.1:8000/notification/${user?.id}/` : null, {
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
                console.log(data.content)
                switch(data.type){ 
                    case "video_offer_echo":
                        console.log(data.content)
                        // if (data.content.target === user.full_name){
                        //   handleVideoOfferMsg(data.content)
                        // }
                        break
                    case "video_answer_echo":
                        // console.log(data.content)
                        break
                    case "new_ice_candidate_echo":
                        // console.log(data.content)
                        break
                    case "hang_up_echo":
                        // console.log(data.content)
                        break                       
                    default:
                        console.error("Unknown message type!");
                        break;
                }               
            }
    })

    const {connectionStatus} = useWebsocketConncetionStatusHook(readyState);
    console.log("[ NOTIFICATION ]" , connectionStatus) 
    
    useEffect(()=>{}, [user])

    return (
        <header className="bg-neutral-700 text-white shadow-sm">
            <div className="w-2/3 mx-auto">
                <nav className="flex flex-row justify-between items-center">
                    <h1 className="text-lg font-bold p-2">CA</h1>
                    <div className="flex flex-row items-center gap-4">
                        <span>Login</span>
                        <span>Sign up</span>
                    </div>
                </nav>
                <Tabs tab={tab} setTab={setTab}/>

            <div className={`fixed top-5 left-1/2 z-50 ${!target && 'hidden'}`}>
                <div className='relative w-96 h-80 border-neutral-500 border rounded-md bg-white'>
                    <AudioCall target={target} />
                </div>
            </div>

            </div>
        </header>
    )
}