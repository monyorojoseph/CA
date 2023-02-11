import { TABS } from "../Screens/MainScreen"

export default function Tabs({tab, setTab}:{
    tab: string
    setTab: Function
}){
    return (
        <div className="grid grid-cols-3 items-center">
            <span onClick={()=> setTab(TABS.Chats)} 
            className={`text-center cursor-pointer py-2 
            ${tab === TABS.Chats && 'bg-white text-neutral-500 font-bold'}`}>
                Chats</span>
            <span onClick={()=> setTab(TABS.Calls)} 
            className={`text-center cursor-pointer py-2 
            ${tab === TABS.Calls && 'bg-white text-neutral-500 font-bold'}`}>
                Calls</span>
            <span onClick={()=> setTab(TABS.People)} 
            className={`text-center cursor-pointer py-2 
            ${tab === TABS.People && 'bg-white text-neutral-500 font-bold'}`}>
                People</span>
        </div>
    )
}