import { MainContextProvider } from "../contexts/MainContext"
import MainScreen from "../components/Screens/MainScreen"
import Tabs from "../components/Tabs"
import Notification from "../components/Notification";

export default function Home(){
    console.log('Home')
    return (
        <MainContextProvider>
            <>  <Notification />
                <div className="min-h-screen space-y-1">
                    <Tabs />
                    <MainScreen />
                </div>
            </>
        </MainContextProvider>
    )
}