'use client'

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import '../assets/timer.scss';
const pad = (n: number) => n.toString().padStart(2, '0');
const range = (max: number) => Array.from({ length: max }, (_, i) => i);

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);

const Picker = ({ values, selected, onChange }: {
  values: number[],
  selected: number,
  onChange: (val: number) => void,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Скроллим к выбранному элементу по центру
  useEffect(() => {
    if (!containerRef.current) return;
    const scrollTop = ITEM_HEIGHT * selected;
    isScrollingRef.current = true;
    containerRef.current.scrollTo({ top: scrollTop, behavior: 'auto' });

    // Снимаем блокировку через 100мс (после скролла)
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  }, [selected]);

  // Обработка скролла
  const handleScrollEnd = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const newScrollTop = index * ITEM_HEIGHT;

    // Блокируем повторный вызов скролла во время анимации
    isScrollingRef.current = true;
    containerRef.current.scrollTo({ top: newScrollTop, behavior: 'smooth' });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 250);

    onChange(index);
  };

  const onScroll = () => {
    if (isScrollingRef.current) return; // игнорируем скролл во время программного
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleScrollEnd, 150);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[60px] h-[200px] timerCol overflow-y-scroll scrollbar-none"
      onScroll={onScroll}
    >
      <div
        className="flex flex-col items-center"
        style={{
          paddingTop: `${ITEM_HEIGHT * CENTER_INDEX}px`,
          paddingBottom: `${ITEM_HEIGHT * CENTER_INDEX}px`,
        }}
      >
        {values.map((val, i) => {
          const distance = Math.abs(i - selected);
          let sizeClass = 'text-xl';
          let colorClass = 'text-[#DCE153]';

          if (distance === 0) {
            sizeClass = 'text-[52px]';
            colorClass = 'text-[#DCE153]';
          } else if (distance === 1) {
            sizeClass = 'text-[46px]';
            colorClass = 'text-[#BEC33580]';
          } else if (distance === 2) {
            sizeClass = 'text-[36px]';
            colorClass = 'text-[#BEC33540]';
          }

          return (
            <div
              key={i}
              className={clsx(
                'duration-[400ms] w-full flex justify-center items-center transition-all duration-200 ease-in-out',
                sizeClass,
                colorClass
              )}
              style={{ height: ITEM_HEIGHT }}
            >
              {pad(val)}
            </div>
          );
        })}
      </div>
    </div>
  );
};




export default function TimerPicker() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  return (
    <div className="flex items-center justify-center mt-[168px] gap-4">
      <Picker values={range(24)} selected={hour} onChange={setHour} />
      <span className="text-[#E6EB5D] text-[52px]">:</span>
      <Picker values={range(60)} selected={minute} onChange={setMinute} />
      <span className="text-[#E6EB5D] text-[52px]">:</span>
      <Picker values={range(60)} selected={second} onChange={setSecond} />
    </div>
  );
}
