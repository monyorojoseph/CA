import useSWR from 'swr'
import { getService } from '../utils/services'

// get conversation
export const userConversations = ()=> {
    const { data, isLoading, error } = useSWR('/chat/my-conversations/', getService)
    return { conversations: data?.data, Loading:isLoading, error }
}
// get message history
export const userMessageHistory = (conversation_name: string)=> {
    const { data, isLoading, error } = useSWR(`/chat/message-history/${conversation_name}/`, getService)
    return { messages: data?.data, Loading:isLoading, error }
}

// get conversation details
export const userConversation = (name: string)=> {
    const { data, isLoading, error } = useSWR(`/chat/conversation/${name}/`, getService)
    return { conversation: data?.data, Loading:isLoading, error }
}