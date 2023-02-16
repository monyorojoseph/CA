import { Message } from "../utils/types";

export default function messageHistoryRedducer(state: Array<Message>, action: any){
    switch(action.type){
        case "load":
            return action['data']
        case "append":
            return [ ...state, action['data']]
        case "remove":
            return state?.filter((message: Message)=> message.id !== action['message_id'])
        case "update":
        const updated_message = action['data']
        return state?.forEach((message)=> {
            if (message.id === updated_message.id){
                return updated_message
            }
            return message
        })

        default:
            return state;
    }
}