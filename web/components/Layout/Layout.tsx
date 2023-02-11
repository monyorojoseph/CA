import Footer from "./Footer";
import Navbar from "./Navbar";

interface PropTypes {
    children: JSX.Element
}

export default function({children}: PropTypes){
    return (
        <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto">
            {children}
        </main>
        <Footer />
        </div>
    )
}