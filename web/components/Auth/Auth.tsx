import { SCREENS } from "../Screens/AuthScreen"

export default function Auth({authScreen, setAuthScreen}:{
    authScreen: string
    setAuthScreen: Function
}){
    return (
        <>
            <h1 className="my-4 text-xl text-white">Welcome to CA</h1>
            <div className="font-bold flex flex-row justify-center items-center gap-4">
                <span onClick={()=> setAuthScreen(SCREENS.Login)}
                className="border rounded-md py-1 px-3 cursor-pointer
                bg-white text-neutral-600">Login</span>
                <span onClick={()=> setAuthScreen(SCREENS.SignUp)}
                className="border rounded-md py-1 px-3 cursor-pointer
                bg-white text-neutral-600">Sign up</span>
            </div>
        </>
    )

}