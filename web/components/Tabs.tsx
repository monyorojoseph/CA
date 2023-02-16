import { useMainContext } from "../contexts/MainContext"
import { TABS } from "../utils/constantValues"

export default function Tabs(){
    const { tab, setTab } = useMainContext()
    return (
        <div className="w-1/2 mx-auto mt-2">
            <div className="grid grid-cols-3 items-center">
                <span onClick={()=> setTab(TABS.Chats)} 
                className={`text-center cursor-pointer py-2 rounded-md 
                ${tab === TABS.Chats && 'bg-neutral-500 text-neutral-50 font-bold'}`}>
                    Chats</span>
                <span onClick={()=> setTab(TABS.Calls)} 
                className={`text-center cursor-pointer py-2 rounded-md 
                ${tab === TABS.Calls && 'bg-neutral-500 text-neutral-50 font-bold'}`}>
                    Calls</span>
                <span onClick={()=> setTab(TABS.People)} 
                className={`text-center cursor-pointer py-2  rounded-md
                ${tab === TABS.People && 'bg-neutral-500 text-neutral-50 font-bold'}`}>
                    People</span>
            </div>
        </div>
    )
}