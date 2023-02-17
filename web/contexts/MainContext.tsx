import { useContext, createContext, useMemo, useState } from 'react';
import { TABS } from '../utils/constantValues';
import { MainContextType } from '../utils/types';


const MainContext = createContext<MainContextType>({
    setConversationName: ()=> {},
    conversationName: '',
    callTarget: '',
    setCallTarget: ()=> {}
});

export function MainContextProvider({children}: {children: JSX.Element}){
    const [ conversationName, setConversationName ] = useState<string>()
    const [ callTarget, setCallTarget ]= useState<string>()

    const contextValues = useMemo(()=> ({
        conversationName, setConversationName,
        callTarget, setCallTarget
    }), [ conversationName, callTarget])
    
    return (
        <MainContext.Provider value={contextValues}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => {
    return useContext(MainContext)
}