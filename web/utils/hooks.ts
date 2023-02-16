import { ReadyState } from 'react-use-websocket';

// token hook
export const useCredentials: any = ()=> {
    let access = ''
    let refresh = '' 
    
    if (typeof window === 'undefined') return { access, refresh }

    const credentials = window.localStorage.getItem('credentials')
    if (credentials){
        const cred = JSON.parse(window.localStorage.getItem('credentials') as string)
        access = cred['access']
        refresh = cred['refresh']
    }

    return { access, refresh }
}
// ws connection state hook
export const useWebsocketConncetionStatusHook = (readyState: ReadyState)=> {
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    return {connectionStatus};
}