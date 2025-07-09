import React from "react";

interface IStatusBar {
  total: number;
  success: number;
}

export const StatusBar: React.FC<IStatusBar> = ({ total, success }) => {
  if (success > total) {
    throw new Error("`success` не может быть больше `total`");
  }

  const percent = total > 0 ? (success / total) * 100 : 0;

  return (
    <div className="flex gap-[10px] items-center mb-[20px]">
      <div className="text-black2 text-[16px]">
        {success} из {total}
      </div>
      <div className="flex-1 h-[5px] w-full relative overflow-hidden bg-[#E5EBDD] rounded-[10px]">
        <div
          style={{
            width: `${percent}%`,
          }}
          className={`absolute rounded-[10px] left-0 top-0 h-[5px] ${
            success < total ? "bg-[#FAFF71]" : "bg-[#CAEBAD]"
          }`}
        ></div>
      </div>
    </div>
  );
};
