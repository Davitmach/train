'use client';
import { Calendar } from "./components/calendar";
import { StatusBar } from "./components/statusBar";
import { Task } from "./components/task";
import { ButtonPlus } from "./components/button";
import { NewTask } from "./components/newTask";
import { useState } from "react";

export default function Home() {
  const [active,setActive] = useState(false);
  return (
  <>

<Calendar/>
<div className="px-[21px]">
<StatusBar success={4} total={4}/>
<Task date={{
  day:13,
  month:'Май'
}}
status={false}
title="Отжимания"
train={[
  {
    approach:1,
    repeats:12,
    weight:3
  },
  {
    approach:2,
    repeats:12,
    weight:3
  },
  {
    approach:3,
    repeats:12,
    weight:3
  }
]}
/>
<ButtonPlus onClick={()=> setActive(true)}/>
</div>
{active==true &&<NewTask setActive={setActive}/>}
  </>
  );
}
