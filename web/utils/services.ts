import axios from "axios"
import errorHandler from "./errorHandler"

// post
export const postService = async(url: string, postData: any)=> {
    try{
        const response = await axios.post(url, postData)
        return response
    } catch(e){
        errorHandler(e)
    }
}
// get
export const getService =async (url:string) => {
    try{
        const response = await axios.get(url)
        return response
    } catch(e){
        errorHandler(e)
    }    
}
// put
export const putService =async (url: string, updateData: any) => {
    try{
        const response = await axios.put(url, updateData)
        return response
    } catch(e){
        errorHandler(e)
    }
}
// delete
export const deleteService =async (url:string) => {
    try{
        const response = await axios.delete(url)
        return response
    } catch(e){
        errorHandler(e)
    }    
}