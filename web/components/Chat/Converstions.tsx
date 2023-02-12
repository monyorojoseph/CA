import { userConversations } from "../../swr/chat"

export default function Conversations(){
    const { conversations } = userConversations()
    console.log(conversations)
    return (
        <div className="border border-neutral-400 divide-y-2 
        border-r-0 overflow-y-auto h-full">
            <div className="p-2 text-sm cursor-pointer">
                <p>Johnson</p>
                <p className="text-xs text-slate-800 text-opacity-70">last msg</p>                
            </div>
        </div>
    )
}