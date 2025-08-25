"use client";

import { ITimeAndDate } from "@/types/interface";
import { useEffect, useRef, useState } from "react";

const RealtimeClock = ({
  locale,
  timeZone,
  hour12 = false,
}: ITimeAndDate) => {
  // render hanya di client agar tidak mismatch dengan SSR
  const [now, setNow] = useState<Date | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // set awal tepat di detik berikutnya supaya tick pas :00
    const setTick = () => setNow(new Date());
    setTick();

    const scheduleNext = () => {
      const ms = 1000 - (Date.now() % 1000); // align ke detik berikutnya
      timerRef.current = window.setTimeout(() => {
        setTick();
        scheduleNext();
      }, ms) as unknown as number;
    };
    scheduleNext();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!now) return null; // hindari hydration error

  // format jam
  const time = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12,
    timeZone,
  });

  // format tanggal: Wednesday, August 13, 2025
  const date = now.toLocaleDateString(locale ?? "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  });

  return (
    <div className="flex flex-col items-center">
        <div className="text-4xl font-semibold">
            {time}
        </div>
        <div className="font-semibold">
            {date}
        </div>
    </div>
  )
};

export default RealtimeClock;
