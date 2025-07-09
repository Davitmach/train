"use client";

import { useEffect, useState } from "react";
import { ClockSvg, HomeSvg } from "./Svg";
import { usePathname, useRouter } from "next/navigation";

export const Menu:React.FC = () => {
  const [active, setActive] = useState<"home" | "clock"|false>("home");
  const {push} = useRouter();
  const path = usePathname();
  const HandleChange = (page: "home" | "clock") => {
    setActive(page);
if(page=='home') {
  push('/')
}
else if(page=='clock') {
  push('/clock')
}
  };
  useEffect(()=> {
if(path.includes('train')) {
  setActive(false)
}
if(path=='/') {
  setActive('home')
}
else if(path=='/clock') {
  setActive('clock')
}

  },[path])
  return (
    <div className="fixed bottom-0 left-[50%] translate-x-[-50%] w-full max-w-[480px] mx-auto bg-yellow py-[10px] flex items-center justify-center gap-[40px]">
      <HomeSvg onClick={()=> {
        HandleChange('home')
      }}
        className="cursor-pointer"
        active={active == "home" ? true : false}
      />
      <ClockSvg onClick={()=> {
        HandleChange('clock')
      }}
        className="cursor-pointer"
        active={active == "clock" ? true : false}
      />
    </div>
  );
};
