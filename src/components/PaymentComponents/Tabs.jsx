import React from 'react';

const Tabs = ({ currentTab, handleClick }) => {
  const tabs = [
    { title: 'VISA / Master', value: 'debitCard' },
    { title: 'Wire Transfer', value: 'wireTransfer' },
    { title: 'Cash', value: 'cash' },
  ];
  return (
    <div className="flex items-center w-[90%]">
      {tabs.map((item) => (
        <div
          className={`border p-3 mr-2 rounded ${
            item.value === currentTab ? 'bg-slate-500' : 'bg-slate-200'
          } cursor-pointer `}
          onClick={() => handleClick(item.value)}
        >
          <p
            className={`${
              item.value === currentTab ? 'text-slate-50' : 'text-slate-800'
            }`}
          >
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
