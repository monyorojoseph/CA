import { useState } from "react"
import { FiSend } from "react-icons/fi"
import { SendJsonMessage } from "react-use-websocket/dist/lib/types"

export default function MessageInput({sendJsonMessage}: {sendJsonMessage: SendJsonMessage}) {
    const [ message, setMessage ] = useState<string>('')
    const onSubmitHandler = (e:React.SyntheticEvent)=> {
        e.preventDefault()
        sendJsonMessage({
            type: 'chat_message',
            message: message
        })
        sendJsonMessage({type: "read_messages"})

        setMessage('')
    }
    return (

        <div className="border-t-2 p-2">
            <form onSubmit={onSubmitHandler}> 
                <div className="flex flex-row justify-center items-center gap-2">
                    <input type="text" name="message" required value={message} 
                    onChange = {(e: React.ChangeEvent<HTMLInputElement>)=> setMessage(e.target.value)}
                    className="w-full border-2 rounded-md py-1 px-2 outline-neutral-400
                    focus:outline-2"
                    placeholder='type message ...'/>
                    <button type="submit"
                    className="text-xl">
                        <FiSend />
                    </button>
                </div>
            </form>
        </div>
    )
}