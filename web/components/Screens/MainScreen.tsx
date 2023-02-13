import { useState } from "react";
import Navbar from "../Layout/Navbar";
import Chats from "./Chats";
import Calls from "./Calls";
import People from "./People";

export const TABS = {
    Chats: "Chats",
    Calls: "Calls",
    People: "People"
}

export default function MainScreen(){
    const [ target, setTarget ] = useState<string>()
    const [ conversationName, setConversationName ] = useState<string>()


    const [ tab, setTab ] = useState<string>(TABS.Chats)
    return (
        <div className="min-h-screen space-y-1">
        <Navbar tab={tab} setTab={setTab} target={target} />
        <main className="container mx-auto">
            { tab === TABS.Chats && <Chats conversationName={conversationName} setConversationName={setConversationName}/>}
            { tab === TABS.Calls && <Calls />}
            { tab === TABS.People && <People setConversationName={setConversationName}
            setTab={setTab} setTarget={setTarget}/>}
        </main>
        </div>
    )
}