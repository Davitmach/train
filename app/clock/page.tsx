'use client';
import { useEffect, useState } from "react";
import { ButtonPlay } from "../components/button";
import CountdownTimer from "../components/time";
import TimerPicker from "../components/timer";


export default function Page() {
  const [sec,setSec] = useState(0);
  const [activeTimer,setActiveTimer] = useState(false);
  useEffect(()=> {
console.log(sec);

  },[sec])
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center mt-[20px]">
        <h1 className="text-black2 font-[500] text-[28px]">Запуск таймера</h1>
      </div>
{activeTimer==false  ?<TimerPicker  setSec={setSec} /> : <CountdownTimer setActiveTimer={setActiveTimer} totalSeconds={sec} />}
      
{
activeTimer ==false && <ButtonPlay onClick={()=> {
  if(sec>0) {
  setActiveTimer(true)
  }
}} className="mt-[20px] cursor-pointer"/> 
}



    </div>
  );
}
