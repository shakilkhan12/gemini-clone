import React from 'react';

const Skeleton = () => {
  return (
    <div className="w-full flex flex-col gap-3 my-10 flex-1">
      <div className="rounded-[4px] border-none  h-5 bg-size"></div>
      <div className="rounded-[4px] border-none  h-5 bg-size w-6/12"></div>
      <div className="rounded-[4px] border-none  h-5 bg-size w-3/12"></div>
    </div>
  );
};

export default Skeleton;