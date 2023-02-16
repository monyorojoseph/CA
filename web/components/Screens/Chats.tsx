import { useMainContext } from "../../contexts/MainContext";
import Conversations from "../Chat/Converstions";
import Messaging from "../Chat/Messaging";

export default function Chats(){
    const { conversationName} = useMainContext()        
    return (
        <section className="grid grid-cols-6" style={{'height': '82.5vh'}}>
            <div className="col-span-1">
                <Conversations  />
            </div>
            <div className="col-span-5">
                {conversationName && <Messaging />}
            </div>
        </section>
    )
}