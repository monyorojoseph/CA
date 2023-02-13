import { ReadyState } from 'react-use-websocket';

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