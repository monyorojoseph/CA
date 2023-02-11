import { FiSend, FiVideo } from 'react-icons/fi'
import { IoMdCall, IoMdSettings } from 'react-icons/io'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { BsEmojiSmile } from 'react-icons/bs'
import BgImage from 'images/chat_bg.jpg'

export default function Messaging(){
    return (
        <div className="border border-neutral-500 border-l-2 space-y-2">
            <div className='p-2 bg-neutral-500 text-white 
            flex flex-row justify-between items-center'>
                <h6 className='font-bold px-4'>Johnson</h6>
                <div className='flex flex-row items-center space-x-3 px-5'>
                    <IoMdCall />
                    <FiVideo />
                    <IoMdSettings />
                </div>
            </div>
            <div className='p-2 space-y-2 overflow-y-auto' 
            style={{"height": '65vh'}} >
                <div className='flex flex-row justify-end'>
                    <div className='w-fit flex flex-row items-center gap-1'>
                        <div className='flex flex-row items-center gap-3
                        p-2 text-lg text-black text-opacity-0 hover:text-opacity-100'>
                            <BsEmojiSmile />
                            <RiDeleteBin5Line />
                        </div>
                        <p className='border p-2 rounded-md flex-1'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis eveniet!</p>                    
                    </div>
                </div>

                <div className='flex flex-row justify-start'>
                    <div className='w-fit flex flex-row-reverse items-center gap-1'>
                        <div className='flex flex-row items-center gap-3
                        p-2 text-lg text-black text-opacity-0 hover:text-opacity-100'>
                            <BsEmojiSmile />
                            <RiDeleteBin5Line />
                        </div>
                        <p className='border p-2 rounded-md flex-1 bg-neutral-200'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, reiciendis eveniet!</p>                    
                    </div>
                </div>
            </div>
            <div className="border-t-2 p-2">
                <form> 
                    <div className="flex flex-row justify-center items-center gap-2">
                        <input type="text" name="message" 
                        className="w-full border-2 rounded-md py-1 px-2 outline-neutral-400
                        focus:outline-2"
                        placeholder='type message ...'/>
                        <button type="submit"
                        className="text-xl">
                            <FiSend />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}