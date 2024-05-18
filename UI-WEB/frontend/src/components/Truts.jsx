import Marquee from "react-fast-marquee";

const Truts = () => {
  const logos = [
    "/Images/1234ffferer.png",
    "/Images/Bitmap.png",
    "/Images/Bitmap4.png",
    "/Images/ima1212.png",
    "/Images/image1243.png",
    "/Images/ima99.png",
  ];
  return (
    <div className=" w-full my-14 pb-14 pt-6">
      <div className=" mx-auto w-[80%] gap-2 flex flex-col justify-between items-center">
        <h1 className="lg:text-[50px] text-4xl font-bold w-fit justify-between text-end">
          جهات نفخر بهم
        </h1>
        <h6 className="text-[14px]">
          الشركات والهيئات والمؤسسات التي نتعامل معاها
        </h6>
      </div>
      <div className="flex flex-row w-full gap-7 justify-center items-center">
        <Marquee
          pauseOnClick={true}
          pauseOnHover={true}
          speed={100}
          direction="right"
        >
          {logos.map((logo, index) => {
            return (
              <div
                key={index}
                className="w-[200px] h-[200px] justify-center items-center flex"
              >
                <img src={logo} alt="logo" />
              </div>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
};

export default Truts;
