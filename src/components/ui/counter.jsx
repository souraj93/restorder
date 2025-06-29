"use client";

import { useEffect, useState } from "react";

export function MinuteCounter({ initialSeconds = 300 }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  return (
    <div>
      {minutes}m {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}s
    </div>
  );
}