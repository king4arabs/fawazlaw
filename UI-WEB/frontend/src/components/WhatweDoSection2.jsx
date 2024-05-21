import React from "react";
import LawServices from "./LawServices";
import Truts from "./Truts";
import PeopleAtTheCenter from "./PeopleAtTheCenter";
import Whatwedo from "./Whatwedo";

const WhatweDoSection2 = () => {
  return (
    <>
      <div className=" w-full flex my-9">
        <div className=" w-[90%] justify-between mx-auto items-center flex lg:flex-row flex-col-reverse gap-16 pb-11">
          <div className=" flex flex-col lg:w-[550px] gap-6">
            <h1 className=" font-bold text-4xl text-end">نبذة عن الشركة</h1>
            <p className=" text-end lg:w-[550px] text-[20px]">
              شركة فواز الداهش للمحاماة والاستشارات القانونية تم إنشاءها بعام
              (.) من قبل المحامي فواز بن محمد بن مسفر ال الداهش، و التي تتميز
              بالاستشارات القانونية و التوثيق والتحكيم، والتسوية الودية، و كذلك
              مدرجة لدى لجنة الإفلاس لكون مؤسس الشركة أمين إفلاس، و مصلح لدى
              وزارة العجل على منصة تراضي
            </p>
          </div>
          <div className="flex pl-9">
            <img src="\Images\Illustration.png" alt="" />
          </div>
        </div>
      </div>

      {/* another section here */}

      <div className=" w-full flex my-9">
        <div className=" w-[90%] justify-between mx-auto items-center flex lg:flex-row flex-col gap-9">
          <div className="flex">
            <img src="\Images\Mask Group.png" alt="" />
          </div>
          <div className=" flex flex-col lg:w-[550px] gap-6">
            <h1 className=" font-bold text-4xl text-end">
              نبذة عن مؤسس الشركة
            </h1>
            <p className=" text-end lg:w-[550px] text-[20px]">
              المحامي فواز الداهش كمؤسس للشركة يتمتع بخبرة تزيد عن 15 عاما في
              المجال القانوني و الاستشارات، حيث عمل لدى رئيس المحكمة الجزائية
              بجدة لعدة سنوات، و كمستشار قانوني للشركات المحلية و العالمية.
            </p>
          </div>
        </div>
      </div>

      {/* another section here */}

      <div className="w-full flex py-20 my-20">
        <div className=" w-[90%] flex lg:flex-row flex-col gap-8 mx-auto justify-center items-center">
          <div className="gap-3 flex flex-col w-[308px] items-center justify-center">
            <img src="\Images\Iconsave.png" alt="" className=" w-14 h-14" />
            <h1 className=" text-2xl font-bold">خدمات قانونية</h1>
            <p className=" text-[14px] text-center flex text-[#525A6A]">
              تقديم خدمات قانونية متميزة في سائر التخصصات 
            </p>
          </div>
          <div className="gap-3 flex flex-col w-[308px] items-center justify-center">
            <img src="/Images/Iconbook.png" alt="" className=" w-14 h-14" />
            <h1 className=" text-2xl font-bold">جودة الخدمات</h1>
            <p className=" text-[14px] text-center flex text-[#525A6A]">
              حفظ مصالح وحقوق عملائنا المشروعة من خلالف تقديم خدمات قانونية ذات
              نوعية وجوده عالية
            </p>
          </div>
          <div className="gap-3 flex flex-col w-[308px] items-center justify-center">
            <img src="\Images\Iconlawbook.png" alt="" className=" w-14 h-14" />
            <h1 className=" text-2xl font-bold">الدستور والمواثيق</h1>
            <p className=" text-[14px] text-center flex text-[#525A6A]">
              تقديم الحماية القانونية لعملائنا بما يكفله القانون والدستور
              والمواثيق والمعاهدات الدولية 
            </p>
          </div>
        </div>
      </div>

      {/* another section here */}

      <LawServices />
      {/* another section here */}
      <div className=" w-full flex my-12">
        <div className=" flex w-[80%] justify-between items-center mx-auto lg:flex-row flex-col ">
          <div className=" flex flex-col lg:w-[500px]  w-[350px] justify-end items-end gap-5 py-8 px-9 border rounded-md pb-20">
            <img
              src="\Images\Icon.png"
              alt=""
              className=" flex justify-end items-end text-end w-20 h-14"
            />
            <div
              className=" lg:w-[400px] w-[300px] text-end flex flex-col
             gap-3"
            >
              <h1 className=" text-[20px] text-end font-bold">رؤيتنا</h1>
              <p className=" text-[16px] text-end">
                تسعى شركتنا لمواكبة النمو المتسارع للخدمات القانونية على
                المستوى المحلي والخارجي ، لتكون أكبر شركة محاماة في العالم.
              </p>
            </div>
          </div>
          <div className=" flex flex-col lg:w-[500px] w-[350px] justify-end items-end gap-5 py-8 px-9 border rounded-md">
            <img
              src="\Images\Icon.png"
              alt=""
              className=" flex justify-end items-end text-end w-20 h-14"
            />
            <div
              className="lg:w-[400px] w-[300px] text-end flex flex-col
             gap-3"
            >
              <h1 className=" text-[20px] text-end font-bold">رسالتنا</h1>
              <p className=" text-[16px] w-full text-end">
                محامون ومستشارون ذو خبرات قانونية وكفاءات متميزة في سائر
                التخصصات التي يحتاجها كل مواطن أو مقيم على أرض هذه الباد أو في
                الخارج وتقديم الخدمات القانونية باحترافية بالمقر الرئيسي في جدة
                ومع حلفائنا القانونيين في الخليج العربي والوطن العربي وجميع
                أنحاء العالم.
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default WhatweDoSection2;
