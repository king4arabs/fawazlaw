export const CounterComp = ({
  onIncrease,
  onDecrease,
  count,
  width,
  height,
}) => {
  return (
    <>
      <div
        style={{ width: width ? width : "", height: height ? height : "" }}
        className="flex items-center w-[170px] h-[45px]"
      >
        <button
          onClick={onIncrease}
          className="w-[40px] rounded-[4px] h-full flex justify-center items-center bg-[#ebebeb] text-[#484848] text-[26px]"
        >
          +
        </button>
        <p className="text-[18px] h-full flex justify-center items-center bg-[#efefef4d] grow">
          {count}
        </p>
        <button
          onClick={onDecrease}
          className="w-[40px] rounded-[4px] h-full flex justify-center items-center bg-[#ebebeb] text-[#484848] text-[36px]"
        >
          -
        </button>
      </div>
    </>
  );
};
