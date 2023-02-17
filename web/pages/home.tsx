import { MainContextProvider } from "../contexts/MainContext"
import MainScreen from "../components/Screens/MainScreen"
import AudioCall from "../components/Chat/AudioCall";
import { TabsProvider } from "../contexts/TabsContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../swr/user";

export default function Home(){
    console.log('Home')
    const { user } = useUser()
    return (
        <MainContextProvider>
            <div className="min-h-screen space-y-1">
                {user && <AudioCall />}
                <TabsProvider>
                    <MainScreen />
                </TabsProvider>
            </div>
        </MainContextProvider>
    )
}