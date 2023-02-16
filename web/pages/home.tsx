import { useState } from "react"
import Chats from "../components/Screens/Chats"
import Navbar from "../components/Layout/Navbar"
import Calls from "../components/Screens/Calls"
import People from "../components/Screens/People"

export const TABS = {
    Chats: "Chats",
    Calls: "Calls",
    People: "People"
}

export default function Home(){
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