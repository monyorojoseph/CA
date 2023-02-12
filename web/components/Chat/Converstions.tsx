import { useConversations } from "../../swr/chat"
import { Convo } from "../../utils/types"

export default function Conversations({ setConversationName}: {
    setConversationName: Function;
}){
    const { conversations } = useConversations()
    return (
        <div className="border border-neutral-400 divide-y-2 
        border-r-0 overflow-y-auto h-full">
            {
                conversations?.map((convo: Convo)=> (
                    <div key={convo.name}
                    onClick={()=> setConversationName(convo.name)}
                    className="p-2 text-sm cursor-pointer">
                        <p>{convo.other_user.full_name}</p>
                        <p className="text-xs text-slate-800 text-opacity-70">{convo.last_message.data}</p>                
                    </div>
                ))
            }
        </div>
    )
}