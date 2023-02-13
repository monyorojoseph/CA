import { IoMdCall, IoMdSettings } from "react-icons/io"
import { useConversation } from "../../swr/chat"
import { FiVideo } from "react-icons/fi"

export default function MessageBar({conversationName}: {conversationName:string}) {
    const { conversation } = useConversation(conversationName)
    return (
        <div className='p-2 bg-neutral-500 text-white 
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