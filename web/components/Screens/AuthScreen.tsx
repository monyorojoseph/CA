import { useState } from "react"
import Auth from "../Auth/Auth"
import Login from "../Auth/Login"
import SignUp from "../Auth/SignUp"

export const SCREENS = {
    Auth: 'Auth',
    Login: 'Login',
    SignUp: 'SignUp'
}

export default function AuthScreen(){
    const [ authScreen, setAuthScreen ] = useState<string>(SCREENS.Auth)
    return (
        <main className="bg-neutral-600 w-full h-screen flex flex-col justify-center items-center">
            {authScreen === SCREENS.Auth && <Auth authScreen={authScreen} setAuthScreen={setAuthScreen}/>}
            {authScreen === SCREENS.Login && <Login />}
            {authScreen === SCREENS.SignUp && <SignUp />}

        </main>
    )
}