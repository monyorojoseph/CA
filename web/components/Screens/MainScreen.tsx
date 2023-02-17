
import Calls from "./Calls";
import People from "./People";
import { TABS } from "../../utils/constantValues";
import { useMainContext } from "../../contexts/MainContext";
import Conversations from "../Chat/Converstions";
import Messaging from "../Chat/Messaging";
import { useTabs } from "../../contexts/TabsContext";

export default function MainScreen(){
    const { tab } = useTabs()
    const { conversationName } = useMainContext()
    return (
        <main className="w-11/12 md:w-9/12 lg:w-6/12 mx-auto h-screen py-4">
            <section className="grid grid-cols-12 gap-1">
                <div className="col-span-3">
                    <Conversations  />
                </div>
                <div className="col-span-9">
                    { (tab === TABS.Chats && conversationName) && <Messaging />}
                    { tab === TABS.Calls && <Calls />}
                    { tab === TABS.People && <People />}
                </div>
            </section>
        </main>
    )
}