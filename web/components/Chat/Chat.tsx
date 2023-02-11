import Chats from "./Chats";
import Messaging from "./Messaging";

export default function Chat(){
    
    return (
        <section className="grid grid-cols-6" style={{'height': '82.5vh'}}>
            <div className="col-span-1">
                <Chats />
            </div>
            <div className="col-span-5">
                <Messaging />
            </div>
        </section>
    )
}