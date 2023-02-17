import useSwr from 'swr'
import { getService } from '../utils/services'

// list random pple
export const usePeople = ()=> {
    const { data, isLoading, error } = useSwr('/user/list-people/', getService)
    return { people: data?.data, loading: isLoading, error}
}

// user
export const useUser = ()=> {

    if (typeof window === 'undefined') {
        const { data } = useSwr('/auth/users/me/', getService)
        return { user: data?.data}
    }

    const user = window.localStorage.getItem('user') as string
    
    if (user === undefined ){
        
        const { data } = useSwr('/auth/users/me/', getService)
        window.localStorage.setItem('user', JSON.stringify(data?.data))
        return { user: data?.data}
    }
    return { user: JSON.parse(user) }
    

}