import React, { useState } from "react";
import { RxCaretDown } from "react-icons/rx";

const EachFaq = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="w-full  rounded gap-2 ">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className={`flex justify-between flex-row-reverse w-full gap-3 py-3 px-3 border-b border-b-black ${
          accordionOpen && "bg-[#E7E9EC]"
        } `}
      >
        <span className="">{title}</span>
        {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
        <div
          className={`transform origin-center transition duration-200 ease-out ${
            accordionOpen && "!rotate-180"
          }`}
        >
          <RxCaretDown size={25} />
        </div>
        {/* <svg
          className="fill-indigo-500 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg> */}
      </button>

      <div
        className={`grid overflow-hidden justify-end transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100 bg-[##E7E9EC] pb-2 pr-2"
            : "grid-rows-[0fr] opacity-0 "
        }`}
      >
        <div className="overflow-hidden text-end mt-4 border-t-2 ">{answer}</div>
      </div>
    </div>
  );
};

export default EachFaq;
