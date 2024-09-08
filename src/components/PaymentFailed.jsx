import React from 'react';

const PaymentFailed = () => {
  return (
    <div className="flex justify-center">
      <div className="flex my-5 border bg-red-300 p-5 rounded items-center w-[90%]">
        <div>Payment failed, Try again</div>
      </div>
    </div>
  );
};

export default PaymentFailed;
