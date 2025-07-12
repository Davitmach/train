'use client';
import { useState } from 'react';
import '../assets/newTask.scss';

export const NewTask = ({ setActive }: { setActive: (status: boolean) => void }) => {
  const [active, setActiveMenu] = useState(false);
  const [val, setVal] = useState('');
  const options = ['Ночное кардио', 'Секс', 'Минет', 'Куни', '69'];

  return (
    <div className="w-screen h-screen bg-[#3B413466] fixed inset-0 z-[99999] flex items-center justify-center">
      <div className="newTask_container relative flex gap-[20px] h-[246px] flex-col items-center justify-center max-w-[438px] w-full mx-auto bg-white rounded-[10px] pl-[20px] pt-[84px] pb-[64px] pr-[10px]">

        {/* Кнопка закрытия */}
        <svg className="absolute right-[10px] top-[40px] cursor-pointer" onClick={() => setActive(false)} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26 2L2 26M2 2L26 26" stroke="#3B4134" strokeWidth="4" strokeLinecap="round" />
        </svg>

        {/* Инпут + дропдаун */}
        <div className="w-full h-[39px] relative">
          <input
            placeholder="Введите название упражнения"
            className={`duration-300 h-full outline-0 border-[#B4B9A0] border w-full ${active ? 'rounded-t-[10px]' : 'rounded-[10px]'} px-[10px]`}
            type="text"
            value={val}
            onChange={e => setVal(e.target.value)}
            
          />

          <svg
            onClick={() => setActiveMenu(!active)}
            className={`absolute top-[50%] translate-y-[-50%] right-[10px] duration-300 cursor-pointer ${active ? 'rotate-180' : ''}`}
            width="18"
            height="9"
            viewBox="0 0 18 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 0.5L8.29289 7.79289C8.68342 8.18342 9.31658 8.18342 9.70711 7.79289L17 0.5" stroke="#3B4134" strokeLinecap="round" />
          </svg>

          {/* Выпадающий список */}
          <ul className={`
            max-h-[112px] overflow-y-auto rounded-b-[10px]
            ${active ? 'opacity-100 h-[112px] border-l border-r border-b border-[#B4B9A0]' : 'opacity-0 h-0'}
            px-[10px] w-full bg-white flex flex-col gap-[5px] duration-300 overflow-hidden absolute left-0 z-10
          `}>
            {options.map(option => (
              <li
                key={option}
                onClick={() => {
                  setVal(option);
                  setActiveMenu(false);
                }}
                className="cursor-pointer hover:bg-[#F3F5EC] rounded-[6px] px-[5px]"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>

        {/* Кнопка */}
        <button onClick={()=> {
            setActive(false)
        }} className="max-w-[194px] w-full shrink-0 h-[39px] outline-0 border-0 bg-[#99E381] rounded-[10px] flex items-center justify-center text-[16px] text-white">
          Создать тренировку
        </button>
      </div>
    </div>
  );
};
