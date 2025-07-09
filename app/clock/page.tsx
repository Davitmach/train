import TimerPicker from "../components/timer";


export default function Page() {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center mt-[20px]">
        <h1 className="text-black2 font-[500] text-[28px]">Запуск таймера</h1>
      </div>

      <TimerPicker />
    </div>
  );
}
