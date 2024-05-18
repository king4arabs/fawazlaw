import React from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const HomeSection1 = () => {
  return (
    <div className="w-full my-20 px-14">
      <div className="w-[100%]">
      <div className="w-full flex flex-col">
      <div className="subsection flex justify-between items-start">
        <div className="arrowAndbutton flex items-center gap-1">
          <FaRegArrowAltCircleLeft size={23} />
          <p className="lg:text-[14px] font-bold">كل الخدمات</p>
        </div>
        <h1 className="lg:text-[35px] text-4xl font-bold w-fit pb-3">
          خدمات تتناسب مع طبيعة عملك
        </h1>
      </div>
      <p className="text-[16px] xl:mt-4 mt-1 ml-auto">
        تتسم خدماتنا القانونية بالتنوع مستندين على منهجية قانونية تتماشى مع المتغيرات والتطورات الحديثة
      </p>
    </div>

        <div className="  flex lg:flex-row flex-col gap-3 justify-center items-center my-16 lg:h-[400px]">
          <div className=" w-[370px] py-8 px-5 border rounded-lg gap-10  flex flex-col items-end hover:shadow-2xl">
            <div className=" flex flex-col items-end gap-5">
              <img src="\Images\Iconpeople.png" alt="" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <h1 className=" text-[22px] font-bold text-end">
                  الاحوال الشخصية والحقوقية
                </h1>
                <h3 className=" text-[16.9px] font-normal text-end">
                  نؤمن بأن من اهم القيم في الشركة هو المحافظة والدفاع عن حقوق
                  العملاء والالتزام بالأمانة والثقة.
                </h3>
              </div>
            </div>
            <div className=" justify-end items-end flex w-full  transition duration-[100ms] ">
              <a
                href="/contacts"
                className="px-5 py-2 flex border rounded-lg  text-[#3E4450] items-center gap-[1px]"
              >
                اطلب الان
              </a>
            </div>
          </div>

          <div className=" w-[370px] py-8 px-5 border rounded-lg gap-10  flex flex-col items-end justify-end shadow-2xl">
            <div className=" flex flex-col items-end gap-5">
              <img src="\Images\Icongraph.png" alt="" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <h1 className=" text-[20px] font-bold text-end">
                  استشارات عقود العمل
                </h1>
                <h3 className=" text-[16.9px] font-normal text-end">
                  نسعى لأن نقدم خدماتنا المتنوعة لعملائنا باهتمام عالي لتحقيق
                  أعلي مستويات الانجاز والرضا.
                </h3>
              </div>
            </div>
            <div className=" justify-end items-end flex  group-hover:flex w-full ">
              <a
                href="/contacts"
                className="px-5 py-2 flex border rounded-lg  text-[#3E4450] items-center gap-[1px]"
              >
                اطلب الان
              </a>
            </div>
          </div>
          <div className=" w-[370px] py-8 px-5 border rounded-lg gap-10  flex flex-col items-end justify-end hover:shadow-2xl">
            <div className=" flex flex-col items-end gap-5">
              <img src="\Images\Circleidk.png" alt="" />
              <div className=" justify-end items-end flex flex-col gap-3 w-full">
                <h1 className=" text-[22px] font-bold text-end">
                  استشارات الشركات والاعمال
                </h1>
                <h3 className=" text-[16.9px] font-normal text-end">
                  نحرص على تقديم خدماتنا من خلال فريق عمل يتميز بعمق التجربة
                  والمعرفة الوثيقة بكافة جوانبة
                </h3>
              </div>
            </div>
            <div className=" justify-end items-end flex w-full transition duration-[100ms] ">
              <a
                href="/contacts"
                className="px-5 py-2 flex border rounded-lg  text-[#3E4450] items-center gap-[1px]"
              >
                اطلب الان
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection1;
