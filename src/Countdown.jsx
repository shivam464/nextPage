// Countdown.js
import React, { useEffect, useState } from "react";

const Countdown = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  return <p>Countdown: {timeLeft} seconds</p>;
};

export default Countdown;
