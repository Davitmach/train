import Image from "next/image";
import { ClockSvg, HomeSvg } from "./components/Svg";
import { Table } from "./components/table";
import { Calendar } from "./components/calendar";
import { StatusBar } from "./components/statusBar";
import { Task } from "./components/task";
import { ButtonPlus } from "./components/button";

export default function Home() {
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

</div>

  </>
  );
}
