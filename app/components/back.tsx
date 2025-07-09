'use client';

import { useRouter } from "next/navigation";

export const Back = ()=> {
    const {back} = useRouter();
    return(
        <div onClick={back} className="flex items-center justify-center cursor-pointer gap-[10px]">
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0.5L0.955216 6.22389C0.462673 6.62408 0.462674 7.37592 0.955217 7.77611L8 13.5" stroke="#3B4134" strokeLinecap="round"/>
</svg>
<h1 className="text-black2 font-[500] text-[14px]">Назад</h1>
        </div> 
    )
}