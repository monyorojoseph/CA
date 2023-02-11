import { useState } from "react"
import { AuthDataType } from "../../utils/types"
import { postService } from "../../utils/services"
import { AxiosResponse } from "axios"

export default function AuthForm ({name}:{
    name: string
}){
    const [ data, setData ] = useState<AuthDataType>({
        email: '',
        password: ''
    })

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=> {
        e.persist()
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    const onSubmitHandler = async(e: React.SyntheticEvent)=> {
        e.preventDefault() 
        if (name === 'Login'){
            const response = await postService('/auth/jwt/create/', data) as AxiosResponse
            if( response?.status === 200){
                console.log("[ LOGIN ] :: ", response?.data)
                localStorage.setItem('credentials', JSON.stringify(response?.data))
            }
        }

        if (name === 'Sign Up'){
            const response = await postService('/auth/users/', data) as AxiosResponse
            if( response?.status === 200){
                console.log("[ SIGN UP ] :: ", response?.data)
                // localStorage.setItem('credentials', JSON.stringify(response?.data))
            }
        }
    }

    return (
        <form onSubmit={onSubmitHandler}
        className="mt-4 space-y-3 w-1/3">
            <div className="-space-y-px rounded-md shadow-sm">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border
                   border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 
                   focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm"
                  placeholder="Email address"
                />
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={onChangeHandler}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-neutral-300 
                  px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-neutral-500 focus:outline-none 
                  focus:ring-neutral-500 sm:text-sm"
                  placeholder="Password"
                />
            </div>

            <button
            type="submit"
            className="w-full  rounded-md border border-transparent 
            bg-white py-2 px-4 text-sm font-medium text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 
            focus:ring-neutral-500 focus:ring-offset-2"
            >
            {name}
            </button>


            <div className="text-sm">
                <a href="#" className="font-medium text-white hover:text-neutral-100">
                  Forgot your password?
                </a>
              </div>
        </form>)
}