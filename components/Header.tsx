'use client'

import { IoMdCode } from "react-icons/io"

type PropTypes = {
  prompts: {id: number, prompt: string}[]
}
const Header = ({prompts}: PropTypes) => {
  return (
    <div>
        <h2
            style={{
              backgroundImage:
                "linear-gradient(to right, #4285f4 0%, #9b72cb 10%, #d96570 50%)",
            }}
            className=" bg-clip-text text-[54px] font-medium text-transparent leading-[40px] relative inline-block capitalize"
          >
            Hello, Shakil Khan
          </h2>
          <h2 className="text-[54px] font-medium text-[#c4c7c5]">How can I help you today?
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-14">
        {prompts.map(item => (
            <div className="bg-[#f0f4f9] flex flex-col justify-between rounded-[12px] p-4 min-h-[200px] cursor-pointer" key={item.id}>
               <p>{item.prompt}</p>
               <div className="flex justify-end">
               <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                <IoMdCode />
               </span>
               </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Header