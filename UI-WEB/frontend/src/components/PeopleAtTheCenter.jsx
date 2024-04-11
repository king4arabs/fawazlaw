import React from "react";

const PeopleAtTheCenter = () => {
  return (
    <div className=" w-full flex bg-bggradient2 justify-center flex-col">
      <div className=" flex flex-col justify-center items-center w-[80%] gap-7  bg-transparent mx-auto  py-10 ">
        <div className=" items-center">
          <h1 className=" text-[48px] text-center">آراء عملائنا</h1>
          <p className=" text base">تعرف على ما يقوله العملاء لدينا</p>
        </div>
        <div className=" text-center text-base lg:w-[600px]">
          " فواز هي الشركة التي أذهب إليها دون تردد لحل امور شركتي القانونية
          تقريبًا. يتسم فريق العمل بسرعة الاستجابة والامانه والرد على جميع
          استفساراتي دون كلل او ملل، هم نعم الناصح والامين “
        </div>
        <p className=" font-bold">
          محمد السلمي, <span className=" font-thin">معلومة </span>
        </p>
        <div className="flex flex-row gap-4 justify-center items-center">
          <img src="\Images\Imageman.png" alt="" />
          <img src="\Images\Imagegirl.png" alt="" />
          <img src="\Images\Group 14073lined.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default PeopleAtTheCenter;
