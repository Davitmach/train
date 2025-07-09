'use client';
import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const ITEM_WIDTH = 40;
const ITEM_MARGIN = 19;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ITEM_MARGIN;
const LOAD_DAYS = 30;

const generateDates = (start: dayjs.Dayjs, count: number, forward: boolean) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(forward ? start.add(i, 'day') : start.subtract(i, 'day'));
  }
  return forward ? arr : arr.reverse();
};

export const Calendar:React.FC = () => {
  const [dates, setDates] = useState(() => {
    const start = dayjs().subtract(3, 'month');
    return generateDates(start, 270, true);
  });

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const justPrepended = useRef(false);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const scrollToDate = (date: dayjs.Dayjs, smooth = true) => {
    const container = containerRef.current;
    const el = itemRefs.current[date.format('YYYY-MM-DD')];
    if (!container || !el || isUserScrolling.current) return;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const currentScrollLeft = container.scrollLeft;

    const elCenter = elRect.left + elRect.width / 2;
    const screenCenter = window.innerWidth / 2;
    const scrollDelta = elCenter - screenCenter;

    container.scrollTo({
      left: currentScrollLeft + scrollDelta,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  useEffect(() => {
    scrollToDate(dayjs(), false);
  }, []);

  useEffect(() => {
    if (justPrepended.current) {
      justPrepended.current = false;
      return;
    }
    scrollToDate(selectedDate);
  }, [selectedDate, dates]);

  const onScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    isUserScrolling.current = true;
    scrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 100);

    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (scrollLeft < ITEM_FULL_WIDTH * LOAD_DAYS) {
      const firstDate = dates[0];
      const newDates = generateDates(firstDate.subtract(LOAD_DAYS, 'day'), LOAD_DAYS, true);
      justPrepended.current = true;
      setDates((prev) => [...newDates, ...prev]);
      container.scrollLeft += ITEM_FULL_WIDTH * LOAD_DAYS;
    }

    if (scrollLeft > maxScrollLeft - ITEM_FULL_WIDTH * LOAD_DAYS) {
      const lastDate = dates[dates.length - 1];
      const newDates = generateDates(lastDate.add(1, 'day'), LOAD_DAYS, true);
      setDates((prev) => [...prev, ...newDates]);
    }
  };

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div
        ref={containerRef}
        onScroll={onScroll}
        className="items-center outline-none border-none mt-[43px] no-scrollbar flex gap-[19px] overflow-x-auto whitespace-nowrap select-none"
        style={{ height: 100 }}
      >
      {dates.map((date, index) => {
  const isSelected = date.isSame(selectedDate, 'day');
  const formattedDay = date.format('dd')[0].toUpperCase() + date.format('dd')[1].toLowerCase();
  const key = date.format('YYYY-MM-DD');
  const isFirstOfMonth = date.date() === 1;

  return (
    <React.Fragment key={key}>
      {isFirstOfMonth && (
        <div className='text-[#999999]'
          style={{
            // width:'57px',
            height:'40px',
            textAlign: 'center',
            fontWeight: '400',
            transform:'rotate(90deg)',
           
            fontSize: 24,
            flexShrink: 0,
         
          }}
        >
          {date.format('MMMM')}
        </div>
      )}

      <div
        ref={(el) => {
          itemRefs.current[key] = el;
        }}
        onClick={() => setSelectedDate(date)}
        style={{
          width: ITEM_WIDTH,
          userSelect: 'none',
          cursor: 'pointer',
          padding: '12px 0',
          textAlign: 'center',
          color: isSelected ? '#1D2315' : '#999999',
          fontWeight: '400',
          flexShrink: 0,
        }}
        title={date.format('DD MMM YYYY')}
      >
        <div style={{ fontSize: 24 }}>{formattedDay}</div>
        <div
          style={{
            fontSize: 24,
            borderRadius: 10,
            background: isSelected ? '#FAFF71' : 'transparent',
          }}
        >
          {date.date()}
        </div>
      </div>
    </React.Fragment>
  );
})}

      </div>
    </>
  );
};
