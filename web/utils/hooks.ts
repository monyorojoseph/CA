// token hook
export const useCredentials: any = ()=> {
    let access = ''
    let refresh = ''    
    const credentials = JSON.parse(localStorage.getItem('credentials') as string)
    if (credentials){
        access = credentials['access']
        refresh = credentials['refresh']
    }

    return { access, refresh }
}
// user hook