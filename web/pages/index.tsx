import { useEffect } from "react";
import AuthScreen from "../components/Screens/AuthScreen";
import { useUser } from "../swr/user";
import { useRouter } from "next/router";

export default function Home() {
  const { user } = useUser()
  const router = useRouter()
  useEffect(()=> {
    if(user){
      router.push('/home')
    }
  },[user])

  return <AuthScreen />
}
