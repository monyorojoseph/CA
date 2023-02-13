import AudioCall from "../Chat/AudioCall";
import Tabs from "./Tabs";
import { useState } from "react";

export default function Navbar({tab, target, setTab}:{
        tab: string;
        target?: string;
        setTab: Function;
    }){
    // const [ makeCall, setMakeCall ] = useState<boolean>(false)

    return (
        <header className="bg-neutral-700 text-white shadow-sm">
            <div className="w-2/3 mx-auto">
                <nav className="flex flex-row justify-between items-center">
                    <h1 className="text-lg font-bold p-2">CA</h1>
                    <div className="flex flex-row items-center gap-4">
                        <span>Login</span>
                        <span>Sign up</span>
                    </div>
                </nav>
                <Tabs tab={tab} setTab={setTab}/>

            {target && <div className='fixed top-5 left-1/2 z-50'>
                <div className='relative w-96 h-80 border-neutral-500 border rounded-md bg-white'>
                    <AudioCall target={target} />
                </div>
            </div>}

            </div>
        </header>
    )
}