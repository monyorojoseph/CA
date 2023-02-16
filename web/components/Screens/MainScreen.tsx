
import Chats from "./Chats";
import Calls from "./Calls";
import People from "./People";
import { TABS } from "../../utils/constantValues";
import { useMainContext } from "../../contexts/MainContext";

export default function MainScreen(){
    const { tab } = useMainContext()
    return (
        <main className="container mx-auto">
            { tab === TABS.Chats && <Chats />}
            { tab === TABS.Calls && <Calls />}
            { tab === TABS.People && <People />}
        </main>
    )
}