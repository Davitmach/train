'use client';

import { useEffect, useRef, useState } from 'react';
import { ButtonPause, ButtonPlay, ButtonReset } from './button';

const RADIUS = 160;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return [hrs, mins, secs].map(n => String(n).padStart(2, '0')).join(':');
};

const CountdownTimer = ({ totalSeconds,setActiveTimer }: {setActiveTimer:(val: boolean) => void, totalSeconds: number }) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [active,setActive] = useState(false);

useEffect(() => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  if (active) {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setActive(false); // останавливаем
          setActiveTimer(false); // сообщаем родителю
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, [active]);


  const progress = timeLeft / totalSeconds;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div>
    <div className="flex items-center justify-center  bg-[#F9FFF2] select-none mt-[130px]">
      <div className="relative w-[350px] h-[350px]">
        <svg className="w-full h-full rotate-[-90deg]">
          {/* Background circle with fill */}
          <circle
            cx="175"
            cy="175"
            r={RADIUS}
            fill="#FAFF7133"
            stroke="none"
          />
          {/* Outer static stroke */}
          <circle
            cx="175"
            cy="175"
            r={RADIUS}
            stroke="#FFFF99"
            strokeWidth="4"
            fill="none"
            className="opacity-50"
          />
          {/* Animated stroke */}
        <circle
  cx="175"
  cy="175"
  r={RADIUS}
  stroke="#FFFF00"
  strokeWidth="4"
  fill="none"
  strokeDasharray={CIRCUMFERENCE}
  strokeDashoffset={dashOffset}
  strokeLinecap="round"
  style={{
    transition: 'stroke-dashoffset .5s linear',
  }}
/>

        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-[52px] font- text-black2">
            {formatTime(timeLeft)}
          </div>
          <div className="text-[#14190099] text-[16px] mt-[5px]">
            Всего {minutes} мин {seconds} сек
          </div>
        </div>
      </div>
    </div>
    <div className='flex justify-between items-center w-full'>
        <ButtonReset onClick={()=> setActiveTimer(false)}/>
        {active==false ? <ButtonPlay onClick={()=> setActive(true)}/> : <ButtonPause onClick={()=> setActive(false)}/>}
    </div>
    </div>
  );
};

export default CountdownTimer;
