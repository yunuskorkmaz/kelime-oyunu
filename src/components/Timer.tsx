import { FC, useEffect, useRef, useState } from 'react';
const Timer: FC<{ start: number; onFinish: () => void }> = ({ start, onFinish }) => {
  const [time, setTime] = useState(start);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      onFinish();
      clearInterval(intervalRef.current);
    }
  }, [time]);

  return <>{time}</>;
};

export default Timer;
