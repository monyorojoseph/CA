import { useState } from "react";
import Footer from "../Layout/Footer";
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

    const [ tab, setTab ] = useState<string>(TABS.Chats)
    return (
        <div className="min-h-screen space-y-1">
        <Navbar tab={tab} setTab={setTab} />
        <main className="container mx-auto">
            { tab === TABS.Chats && <Chats />}
            { tab === TABS.Calls && <Calls />}
            { tab === TABS.People && <People tab={tab} setTab={setTab}/>}
        </main>
        <Footer />
        </div>
    )
}