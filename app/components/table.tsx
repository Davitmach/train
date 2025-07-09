import React, { JSX } from "react";
import '../assets/table.scss';
interface ITable extends React.TableHTMLAttributes<HTMLTableElement> {
  info: {
    title1: string;
    title2: string;
    title3: string;
  };
  data: {
    approach: string | number;
    repeats: string | number;
    weight: string | number;
  }[];
}

export const Table: React.FC<ITable> = ({ data, info, ...props }): JSX.Element => {
  return (
    <table {...props}>
      <thead className="flex w-full">
        <tr className="border border-[#FAFF71] w-full flex justify-between bg-yellow h-[62px] rounded-t-[10px]">
          <td className=" text-[22px] font-[400]  text-black flex-1 flex justify-center items-center border-r border-[#B4B9A0]">{info.title1}</td>
          <td className=" text-[22px] font-[400]  text-black flex-1 flex justify-center items-center border-r border-[#B4B9A0]">{info.title2}</td>
          <td className=" text-[22px] font-[400]  text-black flex-1 flex justify-center items-center">{info.title3}</td>
        </tr>
      </thead>
      <tbody className="flex flex-col w-full">
        {data.map((e, index) => {
          const isLast = index + 1 === data.length;
          const isFirst = index === 0;
          const baseTdClass = `flex-1 flex items-center justify-center text-black bg-yellowLight ${
            isLast ? '' : isFirst ? 'border-t border-b  ' : 'border-b'
          } border-[#B4B9A0]`;

          return (
            <tr
              key={index}
              className={`h-[62px] flex w-full justify-between overflow-hidden ${
                isLast ? 'rounded-b-[10px] border-b border-l border-r border-[#B4B9A0]' : ''
              }`}
            >
              <td className={`${baseTdClass} border-r ${isLast==false &&'border-l'} text-[22px] font-[400] text-black`}>{e.approach}</td>
              <td className={`${baseTdClass} border-r text-[22px] font-[400] text-black`}>{e.repeats}</td>
              <td className={`${baseTdClass} ${isLast==false &&'border-r'} text-[22px] font-[400] text-black`}>{e.weight}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
