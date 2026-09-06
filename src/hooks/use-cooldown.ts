import { useEffect, useState } from "react";

export function useCooldownTimer(lastTimestamp?: number) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!lastTimestamp) {
      setTimeLeft("");
      return;
    }

    function update() {
      const now = Math.floor(Date.now() / 1000);
      const cooldown = 24 * 60 * 60;

      const elapsed = now - lastTimestamp!;
      const remaining = Math.max(cooldown - elapsed, 0);

      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;

      const pad = (n: number) => String(n).padStart(2, "0");
      setTimeLeft(`${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`);
    }

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [lastTimestamp]);

  return timeLeft;
}
