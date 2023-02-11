import { useEffect, useState } from "react";
import AuthScreen from "../components/Screens/AuthScreen";
import MainScreen from "../components/Screens/MainScreen";
import { useCredentials } from "../utils/hooks";

export default function Home() {
  const [ token, setToken ] = useState<string>()
  useEffect(()=> {
    const { access } = useCredentials()
    setToken(access)
  },[])
  return token ? (
    <MainScreen />
  ) :
  (
    <AuthScreen />
  )
}
