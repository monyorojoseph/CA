import { useRouter } from "next/router";
import Conversations from "../Chat/Converstions";
import Messaging from "../Chat/Messaging";
import { useEffect, useState } from "react";

export default function Chats(){
    const router = useRouter()
    const conversation_name = router.query['conversation_name'] as string
    const [ conversationName, setConversationName ] = useState<string>()

    useEffect(()=>{
        setConversationName(conversation_name as string)
    }, [router])
    
    return (
        <section className="grid grid-cols-6" style={{'height': '82.5vh'}}>
            <div className="col-span-1">
                <Conversations />
            </div>
            <div className="col-span-5">
                {conversationName && <Messaging conversationName={conversationName}/>}
            </div>
        </section>
    )
}