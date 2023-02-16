import Chats from "../components/Screens/Chats"
import Navbar from "../components/Layout/Navbar"
import Calls from "../components/Screens/Calls"
import People from "../components/Screens/People"
import { MainContextProvider, useMainContext } from "../contexts/MainContext"
import { TABS } from "../utils/constantValues"
import MainScreen from "../components/Screens/MainScreen"

export default function Home(){
    return (
        <MainContextProvider>
            <>
            <div className="min-h-screen space-y-1">
                <Navbar />
                <MainScreen />
            </div>
            </>
        </MainContextProvider>
    )
}