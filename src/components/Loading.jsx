import React from "react";

const Loading = ({ titleText, text }) => {
  return (
    <div className="text-2xl h-[90vh] justify-center items-center mx-auto w-full flex flex-col">
      <h1 className="text-[28px] text-[#003E6F] font-bold">Loading...</h1>
    </div>
  );
};

export default Loading;
