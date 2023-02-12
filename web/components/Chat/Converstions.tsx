import { userConversations } from "../../swr/chat"
import { Convo } from "../../utils/types"

export default function Conversations({ setConversationName}: {
    setConversationName: Function;
}){
    const { conversations } = userConversations()
    return (
        <div className="border border-neutral-400 divide-y-2 
        border-r-0 overflow-y-auto h-full">
            {
                conversations?.map((convo: Convo)=> (
                    <div key={convo.name}
                    onClick={()=> setConversationName(convo.name)}
                    className="p-2 text-sm cursor-pointer">
                        <p>{convo.other_user}</p>
                        <p className="text-xs text-slate-800 text-opacity-70">{convo.last_message.data}</p>                
                    </div>
                ))
            }
        </div>
    )
}