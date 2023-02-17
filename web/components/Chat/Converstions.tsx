import { useMainContext } from "../../contexts/MainContext";
import { useTabs } from "../../contexts/TabsContext";
import { useConversations } from "../../swr/chat"
import { TABS } from "../../utils/constantValues";
import { Convo } from "../../utils/types"
import Tabs from "../Tabs";

export default function Conversations(){
    const { conversations } = useConversations()
    const { setConversationName } = useMainContext()
    const { setTab } = useTabs()

    const startConversation = (name: string)=>{
        setTab(TABS.Chats)
        setConversationName(name)
    }


    return (
        <div className="border border-neutral-400 divide-y-2 
        overflow-y-auto rounded-md" style={{'height': '85vh'}}>
            <div>
                <Tabs />
            </div>
            <div>
                {
                    conversations?.map((convo: Convo)=> (
                        <div key={convo.name}
                        onClick={()=> startConversation(convo.name)}
                        className="p-2 text-sm cursor-pointer">
                            <p>{convo.other_user.full_name}</p>
                            <p className="text-xs text-slate-800 text-opacity-70">{convo.last_message.data}</p>                
                        </div>
                    ))
                }
            </div>

        </div>
    )
}