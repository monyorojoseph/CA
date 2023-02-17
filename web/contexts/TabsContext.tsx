import { createContext, useContext, useState } from "react";
import { TABS } from "../utils/constantValues";
import { TabsContextType } from "../utils/types";


const TabsContext = createContext<TabsContextType>({
    tab: '',
    setTab: ()=> {}
})

export function TabsProvider({ children }: { children: JSX.Element }){
    const [ tab, setTab ] = useState<string>(TABS.Chats)
    return (
        <TabsContext.Provider value={{tab, setTab}}>
            {children}
        </TabsContext.Provider>
    )
}

export const useTabs = ()=> {
    return useContext(TabsContext)
}