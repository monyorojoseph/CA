import { IoMdCall, IoMdSettings } from "react-icons/io"
import { useConversation } from "../../swr/chat"
import { FiVideo } from "react-icons/fi"
import { useMainContext } from "../../contexts/MainContext"

export default function MessageBar() {
    const { conversationName} = useMainContext()
    const { conversation } = useConversation(conversationName!)
    return (
        <div className='p-2 bg-neutral-500 text-white rounded-t-sm
        flex flex-row justify-between items-center'>
            <h6 className='font-bold px-4'>{conversation?.other_user.full_name}</h6>
            <div className='flex flex-row items-center space-x-3 px-5'>
                <IoMdCall />
                <FiVideo />
                <IoMdSettings />
            </div>
        </div>
    )
}