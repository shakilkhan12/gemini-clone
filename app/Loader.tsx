'use client'

const Loader = () => {
  return (
    <div className="flex items-center space-x-3">
        <span className="flex w-10 h-10 rounded-full border-[3px] border-black border-b-transparent animate-spin"></span>
        <span>Contents are loading...</span>
    </div>
  )
}

export default Loader