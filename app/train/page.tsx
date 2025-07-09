"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Back } from "../components/back";
import { Table } from "../components/table";
import { ButtonPlus } from "../components/button";

export default function Page() {
    const [Data,setData] = useState<{
title:string,
date:{
        month:string,
        day:number
    },
     train:{
        approach:number,
        repeats:number,
        weight:number,

    }[]
    }>({
        date:{
            day:0,
            month:''
        },
        title:'',
        train:[{
            approach:0,
            repeats:0,
            weight:0
        }]
    });
const [trains, setTrains] = useState<{
  approach: number,
  repeats: number,
  weight: number
}[] | undefined>();

  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  useEffect(()=> {
if(data){
    setData(JSON.parse(data))
    
}
  },[data])
useEffect(()=> {
if(Data) {
    setTrains(Data.train);
}
},[Data])
  return(
     <Suspense fallback={<div>Загрузка...</div>}>
    <div className="px-[21px] pb-[100px]">
    <div className="w-full flex items-center justify-between mt-[20px]">
        <div className="flex-1 flex justify-start mt-[9px]"><Back/></div>
        <div className="flex-1 flex justify-center flex-col items-center">
            <h1 className="text-black2 font-[500] text-[28px]">{Data.title}</h1>
            <h3 className="text-black2 text-[24px]">{Data.date.day} {Data.date.month}</h3>
        </div>
        <div className="flex-1"></div>
    </div>
    <Table className="w-full mt-[41px]" info={{
        title1:'Подход',
        title2:'Повторений',
        title3:"Вес"
    }}
   data={(trains ?? []).map(train => ({
  approach: String(train.approach),
  repeats: String(train.repeats),
  weight: String(train.weight)
}))}

    />
<ButtonPlus 
  onClick={() => {
    if (!trains) return;

    const last = trains[trains.length - 1];
    const newApproach = last ? last.approach + 1 : 1;

    const newTrain = {
      approach: newApproach,
      repeats: last?.repeats ?? 0,
      weight: last?.weight ?? 0
    };

    setTrains([...trains, newTrain]);
  }}
/>


    </div>
    </Suspense>
  );
}
