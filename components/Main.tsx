'use client'
import MDEditor, { divider } from "@uiw/react-md-editor";
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import Loader from "../app/Loader";
import Header from "./Header";
import { IoMdSend } from "react-icons/io";
import Skeleton from "./Skeleton";
import Image from "next/image";
import Sidebar from "./Sidebar";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API);
interface DataType {
  text: string;
  isCode: boolean;
  prompt?: string
}
const Main = () => {
    const [prompt, setPrompt] = useState('')
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState<DataType | null>(null)
    const [query, setQuery] = useState(false)
    const [storeQuery, setStoreQuery] = useState('')
    const [history, setHistory] = useState<DataType[]>([])
    const [prompts] = useState([
      {id: 1, prompt: 'What is reactjs and why it is very popular?'},
      {id: 2, prompt: 'blockchain vs AI, which field is best for carerr'},
      {id: 3, prompt: 'How to grow on Youtube give me important tips'},
      {id: 4, prompt: 'What is digital marketing please suggest me some courses'},
    ])
    const sendQuery = async () => {
      if(prompt.trim() === '') {
        return;
      }
      setData(null)
      setLoader(true)
      setQuery(true)
      setPrompt('')
      setStoreQuery(prompt)
     try {
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ];
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        safetySettings,
      });

      const result = await model.generateContentStream(prompt);
      let data = '';
for await (const chunk of result.stream) {
  const chunkText = chunk.text();
  console.log(chunkText);
  data += chunkText;
}


      const isCode =data.includes("```");
      setLoader(false)
      setData({
        text: data,
        isCode, // Add a flag to identify code snippets
      },);
      setHistory([{prompt, text: data, isCode},...history, ])
     } catch (error) {
      setLoader(false)
      alert('Something went wrong')
     }
    }
    const parseBio = (text: string) => {
      let responseArray = text.split("**");
      let newArray = "";
      
      for(let i = 0; i < responseArray.length; i++) {
        if(i === 0 || i%2 !== 1) {
          newArray += responseArray[i];
        } else {
          newArray += "</br><b>"+responseArray[i]+"</b>";

        }
      }
      let finalArray = newArray.split("*").join('</br>')
      return finalArray
    };
  const setCurrentResult = (data: DataType) => {
      setData(data)
      setStoreQuery(data.prompt)
  }
  return (
    <>
   <Sidebar history={history} setCurrentResult={setCurrentResult} />
        <div className="fixed bottom-0 lef-0 right-0 w-full bg-transparent left-0 !z-[99999999999999999999999999]">
        <div className='bg-[#f0f4f9] max-w-[940px] mx-auto  rounded-[32px]  pl-8 pr-5 h-[64px] flex items-center  w-full mb-10'>
       <input type="text" name="" className='bg-transparent outline-none h-[64px] rounded-[32px] flex-1 placeholder:text-black' placeholder='Enter a prompt here' value={prompt} onChange={(e) => setPrompt(e.target.value)} />
       
        <IoMdSend className="cursor-pointer text-gray-500" size={23} onClick={sendQuery} />
 
        </div>
        </div>
        {!query && <Header prompts={prompts} />}
        {query && <div className="flex items-center gap-4 group">
          <Image src="/kid.avif" alt="kid" width={40} height={40} className="rounded-full object-cover overflow-hidden" />
          <p className="flex-1">{storeQuery}</p>
          <div className="w-10 h-10 items-center hidden justify-center rounded-full bg-gray-100 group-hover:flex cursor-pointer" onClick={() => setPrompt(storeQuery)}><MdModeEdit size={20} className="text-gray-600" /></div>
        </div>}
        {loader && <div className="mt-5 flex gap-4">
        <div className="relative w-[30px] h-[30px] ">
        <Image src="/gemini.png" fill alt="logo" className="rounded-full mt-10 overflow-hidden object-cover animate-spin" />
        </div>
        <Skeleton />
          </div>}
         {data &&  <div className="flex items-start gap-7 my-10">
          <Image src="/gemini.png" width={30} height={30} alt="logo" className="rounded-full mt-6 overflow-hidden object-cover" />
          <div
              className="flex-1 overflow-x-auto"
            >
              {data?.isCode ? (
                <MDEditor.Markdown
                className="mt-6"
                  source={data?.text}
                />
              ) : (
                <>
               
                  <p dangerouslySetInnerHTML={{__html: parseBio(data?.text)}} />
                  
                </>
              )}
            </div>
          </div>}
</>
        
  )
}

export default Main