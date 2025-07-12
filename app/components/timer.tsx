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

  const [activeIndex, setActiveIndex] = useState(0);


  const REPEAT_COUNT = 100;
  const fullValues = Array.from({ length: values.length * REPEAT_COUNT }, (_, i) => values[i % values.length]);
  const middleIndex = Math.floor(fullValues.length / 2);

  // Изначальный скролл к центральному значению
  useEffect(() => {
    if (!containerRef.current) return;
    const initialIndex = middleIndex - (middleIndex % values.length) + selected;
    const scrollTop = initialIndex * ITEM_HEIGHT;
    isScrollingRef.current = true;
    containerRef.current.scrollTo({ top: scrollTop, behavior: 'auto' });
    setActiveIndex(initialIndex);

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  }, [selected]);

  const handleScrollEnd = () => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const value = fullValues[index % values.length];

    setActiveIndex(index);

    const newScrollTop = index * ITEM_HEIGHT;
    isScrollingRef.current = true;
    containerRef.current.scrollTo({ top: newScrollTop, behavior: 'smooth' });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);

    onChange(value);
  };

  const onScroll = () => {
    if (isScrollingRef.current) return;

   
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      handleScrollEnd();
     
    }, 80); // сократили задержку для лучшего UX
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
        {fullValues.map((val, i) => {
          const distance = Math.abs(i - activeIndex);

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
                'select-none cursor-pointer  w-full flex justify-center items-center duration-300 transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)]',
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


export default function TimerPicker({ setSec }: { setSec: (val: number) => void }) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    const totalSeconds = hour * 3600 + minute * 60 + second;
    setSec(totalSeconds);
  }, [hour, minute, second]);

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

