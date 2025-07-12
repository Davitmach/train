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
              <td className={`${baseTdClass} flex items-center justify-center border-r text-[22px] font-[400] text-black`}>
                <input
  type="number"
  className="text-center w-full outline-none border-none"
  defaultValue={e.repeats}
  onKeyDown={e => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End'];
    if (allowedKeys.includes(e.key)) {
      // Разрешаем спецклавиши всегда
      return;
    }
    if (!/[0-9]/.test(e.key)) {
      // Блокируем все, кроме цифр и спецклавиш
      e.preventDefault();
      return;
    }

    const target = e.currentTarget as HTMLInputElement;
    const currentValue = target.value;
    const selectionStart = target.selectionStart || 0;
    const selectionEnd = target.selectionEnd || 0;

    // Длина с учётом замены выделенного текста
    const newLength = currentValue.length - (selectionEnd - selectionStart) + 1;

    if (newLength > 4) {
      e.preventDefault();
    }
  }}
  onPaste={e => {
    const paste = e.clipboardData.getData('text');
    if (!/^\d*$/.test(paste)) {
      e.preventDefault();
      return;
    }
    const target = e.currentTarget as HTMLInputElement;
    const currentValue = target.value;
    const selectionStart = target.selectionStart || 0;
    const selectionEnd = target.selectionEnd || 0;
    const newLength = currentValue.length - (selectionEnd - selectionStart) + paste.length;
    if (newLength > 4) {
      e.preventDefault();
    }
  }}
/>


</td>
              <td className={`${baseTdClass} ${isLast==false &&'border-r'} flex items-center justify-center text-[22px] font-[400] text-black`}><input
  type="text" // лучше text, чтобы проще контролировать ввод
  className="text-center w-full outline-none border-none"
  defaultValue={e.weight}
  onKeyDown={e => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End'];

    if (allowedKeys.includes(e.key)) {
      // Разрешаем спецклавиши всегда
      return;
    }

    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    const selectionStart = target.selectionStart || 0;
    const selectionEnd = target.selectionEnd || 0;

    const hasDot = value.includes('.');
    const isDigit = /^[0-9]$/.test(e.key);
    const isDot = e.key === '.';

    // Блокируем всё кроме цифр и точки
    if (!isDigit && !isDot) {
      e.preventDefault();
      return;
    }

    // Запретить вторую точку
    if (isDot && hasDot) {
      e.preventDefault();
      return;
    }

    // Если после точки уже есть 1 цифра, блокируем ввод следующей цифры после точки
    if (hasDot) {
      const dotIndex = value.indexOf('.');
      const decimals = value.substring(dotIndex + 1);

      // Проверяем, если курсор после точки и после точки уже 1 цифра и выделение не затрагивает цифру после точки
      if (selectionStart > dotIndex) {
        // Если пытаемся ввести символ, когда после точки уже есть 1 символ
        if (decimals.length >= 1 && selectionStart === selectionEnd) {
          e.preventDefault();
          return;
        }
      }
    }

    // Ограничение по общей длине — разрешаем максимум 6 символов (например "100.5")
    // Считаем длину нового значения с учётом выделенного текста и вводимого символа
    const newLength = value.length - (selectionEnd - selectionStart) + 1;
    if (newLength > 6) {
      e.preventDefault();
      return;
    }
  }}
  onPaste={e => {
    const paste = e.clipboardData.getData('text');

    // Разрешаем только цифры и максимум одна точка
    if (!/^\d*\.?\d*$/.test(paste)) {
      e.preventDefault();
      return;
    }

    const target = e.currentTarget as HTMLInputElement;
    const value = target.value;
    const selectionStart = target.selectionStart || 0;
    const selectionEnd = target.selectionEnd || 0;

    const newValue = value.slice(0, selectionStart) + paste + value.slice(selectionEnd);

    // Проверяем, чтобы не было больше одной точки
    if ((newValue.match(/\./g) || []).length > 1) {
      e.preventDefault();
      return;
    }

    // Проверяем, что после точки не больше одной цифры
    const dotIndex = newValue.indexOf('.');
    if (dotIndex !== -1) {
      const decimals = newValue.substring(dotIndex + 1);
      if (decimals.length > 1) {
        e.preventDefault();
        return;
      }
    }

    // Максимальная длина 6 символов
    if (newValue.length > 6) {
      e.preventDefault();
      return;
    }
  }}
/>


</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
