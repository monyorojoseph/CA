import Tabs from "./Tabs";

export default function Navbar({tab, setTab}:{
    tab: string
    setTab: Function
}){
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
            </div>
        </header>
    )
}