import useSwr from 'swr'
import { getService } from '../utils/services'

// list random pple
export const usePeople = ()=> {
    const { data, isLoading, error } = useSwr('/user/list-people/', getService)
    return { people: data?.data, loading: isLoading, error}
}

// user
export const useUser = ()=> {
    const { data, isLoading, error } = useSwr('/auth/users/me/', getService)
    return { user: data?.data, loading: isLoading, error}
}