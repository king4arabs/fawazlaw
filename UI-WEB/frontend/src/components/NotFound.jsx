import React from "react";

const NotFound = ({ titleText, text }) => {
  return (
    <div className=" text-2xl h-[90vh] justify-center items-center mx-auto w-full flex flex-col">
      <h1 className=" text-8xl text-red-300 font-bold">404</h1>
      <p>{titleText ? titleText : 'Not Found'}</p>
      <p>{!titleText && 'This Route is not available'}</p>
    </div>
  );
};

export default NotFound;
