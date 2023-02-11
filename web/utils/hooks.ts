// token hook
export const useCredentials = ()=> {
    
    const credentials = JSON.parse(localStorage.getItem('credentials') as string)
    const access = credentials['access']
    const refresh = credentials['refresh']

    return { access, refresh }
}
// user hook