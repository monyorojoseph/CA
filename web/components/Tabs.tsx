import { useTabs } from "../contexts/TabsContext"
import { TABS } from "../utils/constantValues"

export default function Tabs(){
    const { tab, setTab } = useTabs()
    return (
            <div className="grid grid-cols-3 items-center">
                <span onClick={()=> setTab(TABS.Chats)} 
                className={`text-center cursor-pointer py-2 
                ${tab === TABS.Chats && 'bg-neutral-500 text-neutral-50 font-bold'}`}>
                    Chats</span>
                <span onClick={()=> setTab(TABS.Calls)} 
                className={`text-center cursor-pointer py-2 
                ${tab === TABS.Calls && 'bg-neutral-500 text-neutral-50 font-bold'}`}>
                    Calls</span>
                <span onClick={()=> setTab(TABS.People)} 
                className={`text-center cursor-pointer py-2
                ${tab === TABS.People && 'bg-neutral-500 text-neutral-50 font-bold'}`}>
                    People</span>
            </div>
    )
}