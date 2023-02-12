import { useCredentials } from "./hooks";
import axios from 'axios';

export default function axiosSetup(){
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.interceptors.request.use(function(config){
        if (typeof window === 'undefined') return config
        const credentials = window.localStorage.getItem('credentials')
        if (!credentials) return config
        const access = JSON.parse(window.localStorage.getItem('credentials') as string)['access']
        config.headers['Authorization'] = 'Bearer ' + access
        return config
    })
}