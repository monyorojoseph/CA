import { BsEmojiSmile } from "react-icons/bs"
import { useUser } from "../../swr/user"
import { Message } from "../../utils/types"
import { RiDeleteBin5Line } from "react-icons/ri"
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export default function MessageBody({messageHistory, sendJsonMessage}: {
    messageHistory?: Array<Message>;
    sendJsonMessage: SendJsonMessage}){
    const { user } = useUser()
    const deleteMessage = (id: string) => {
        sendJsonMessage({
            type: 'delete_message',
            'message_id': id
        })
    }

    return (

        <div className='p-2 space-y-2 overflow-y-auto' 
        style={{"height": '65vh'}} >
            {
                messageHistory?.map((message: Message)=> (

                <div key={message.id}
                className={`flex flex-row ${message.sender.id === user.id ? "justify-end": "justify-start"}`}>
                    <div className={`w-fit flex items-center gap-1 
                    ${message.sender.id === user.id ? "flex-row": "flex-row-reverse"}`}>
                        { message.sender.id === user.id && (<div className='flex flex-row items-center gap-3
                        p-2 text-lg text-black text-opacity-0 hover:text-opacity-100'>
                            <BsEmojiSmile />

                            <RiDeleteBin5Line className="cursor-pointer hover:text-red-600" 
                            onClick={()=> deleteMessage(message.id)}/>
                        </div>)}
                        <p className={`border p-2 rounded-md flex-1 
                        ${!(message.sender.id === user.id) && "bg-neutral-200"}`}
                        >{message.data}</p>                    
                    </div>
                </div>
                ))
            }
        </div>
    )
}