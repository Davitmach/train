'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ITask {
  title: string;
  status: boolean;
  date: {
    day: number;
    month: string;
  };
  train: {
    approach: number;
    repeats: number;
    weight: number;
  }[];
}

export const Task: React.FC<ITask> = ({ title, date, status, train }) => {
  const { push } = useRouter();
  const [checked, setChecked] = useState(status); // управляемое состояние

  const HandlePush = (
    title: string,
    month: string,
    day: number,
    train: {
      approach: number;
      repeats: number;
      weight: number;
    }[]
  ) => {
    const DATA = {
      date: {
        month,
        day,
      },
      title,
      train,
    };
    const encode = encodeURIComponent(JSON.stringify(DATA));
    push(`/train?data=${encode}`);
  };

  return (
    <div
      onClick={() => HandlePush(title, date.month, date.day, train)}
      className={`shadow-2xl flex justify-between items-center px-[20px] h-[54px] rounded-[10px] w-full cursor-pointer ${
        checked ? 'bg-[#CAEBAD]' : 'bg-yellow'
      }`}
    >
      <h1 className="text-black text-[24px]">{title}</h1>
      <div
        onClick={(e) => e.stopPropagation()}
      >
        <input
          className="w-[16px] h-[16px]"
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
    </div>
  );
};
