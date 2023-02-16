import { useContext, createContext, useMemo, useState } from 'react';
import { TABS } from '../utils/constantValues';
import { MainContextType } from '../utils/types';


const MainContext = createContext<MainContextType>({
    setTab: ()=> {},
    setConversationName: ()=> {},
    tab: '',
    conversationName: '',
    target: '',
    setTarget: ()=> {}
});

export function MainContextProvider({children}: {children: JSX.Element}){
    const [ conversationName, setConversationName ] = useState<string>()
    const [ tab, setTab ] = useState<string>(TABS.Chats)
    const [ target, setTarget ]= useState<string>()

    const contextValues = useMemo(()=> ({
        conversationName, tab, 
        setTab, setConversationName,
        target, setTarget
    }), [tab, conversationName])
    
    return (
        <MainContext.Provider value={contextValues}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => {
    return useContext(MainContext)
}