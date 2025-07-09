import React, { JSX } from "react"
interface IBtnPlus extends React.HTMLProps<HTMLDivElement> {
    
}
export const ButtonPlus:React.FC<IBtnPlus> = ({...props}):JSX.Element=> {
    return(
        <div {...props} className="mx-auto mt-[40px] flex items-center justify-center cursor-pointer rounded-[50px] w-[60px] h-[60px] bg-[#99E381]"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0C12.7953 0 13.44 0.64471 13.44 1.44V10.56H22.56C23.3553 10.56 24 11.2047 24 12C24 12.7953 23.3553 13.44 22.56 13.44H13.44V22.56C13.44 23.3553 12.7953 24 12 24C11.2047 24 10.56 23.3553 10.56 22.56V13.44H1.44C0.64471 13.44 0 12.7953 0 12C0 11.2047 0.64471 10.56 1.44 10.56H10.56V1.44C10.56 0.64471 11.2047 0 12 0Z" fill="white"/>
</svg>
</div>
    )
}