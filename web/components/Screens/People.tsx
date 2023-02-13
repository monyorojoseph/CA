import { BiMessageDetail } from 'react-icons/bi'
import { usePeople, useUser } from '../../swr/user'
import { Person } from '../../utils/types'
import { TABS } from './MainScreen'
import { IoMdCall } from 'react-icons/io'

export default function People({setTab, setTarget, setConversationName}:{
    setTab: Function;
    setConversationName: Function;
    setTarget: Function;
}){
    const { people, loading } = usePeople()
    const { user } = useUser()

    const createConversationName = (otherId: string)=> {
        const ids = [otherId, user.id ]
        ids.sort()
        const name = `${ids[0]}__${ids[1]}`
        setTab(TABS.Chats)
        setConversationName(name)
    }

    return (
        <div className='space-y-1'>
            {
                people?.map((person: Person)=> (
                    <div key={person.id}
                    className='border-2 py-1 px-3 rounded-md flex flex-row items-center'>
                        <h6 className='flex-1 font-bold'>{person.full_name}</h6>
                        <div className='flex flex-row items-center justify-center gap-2'>

                            <span className='px-4 text-lg text-green-500'>
                                <IoMdCall className='cursor-pointer' 
                                onClick={()=> setTarget(person.full_name)}/>
                            </span>
                            <span className='px-4 text-lg text-green-500'>
                                <BiMessageDetail className='cursor-pointer' 
                                onClick={()=> createConversationName(person.id)}/>
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}