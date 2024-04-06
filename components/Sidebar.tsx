'use client'
import classNames from "classnames";
import { useState } from "react";
import { BiComment } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
interface PropTypes {
   history: {
    text: string;
    isCode: boolean;
    prompt?: string
   }[]
   setCurrentResult: () => void;
  }
const Sidebar = ({history, setCurrentResult}: PropTypes) => {
  const [width, setWidth] = useState(false)
  return (
    <div className={classNames(`fixed !z-[9999999999999999999999999999999] left-0 top-0 ${width ? 'w-[284px]' : 'w-[68px]'} h-screen bg-[#f0f4f9] p-5 flex flex-col justify-center transition-all duration-300 border-r`)}>
    <GiHamburgerMenu size={18} className="cursor-pointer text-gray-600 absolute top-5 left-5" onClick={() => setWidth(!width)} />
   {width &&  <>
   {history.length > 0 ? history.map(item => (
    <div className="flex items-center gap-4 hover:bg-blue-100 px-3 py-2 rounded-[32px] cursor-pointer" onClick={() => setCurrentResult(item)}>
        <BiComment />
        <p className="flex-1">{item.prompt.length > 16 ? <span>{item.prompt?.slice(0,16)}...</span> :  item.prompt}</p>
        <AiOutlineDelete />
    </div>
   )) : ''}
    
    </>}
    </div>
  )
}

export default Sidebar