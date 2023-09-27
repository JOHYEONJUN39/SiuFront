import { useState, useEffect } from 'react';

// 글 작성시간을 인자로 받아오기
export const useTimeStamp = (timestamp: Date) => {
  const [timeAgo, setTimeAgo] = useState('');

  const updateTimeStamp = () => {
    // 경과한 시간 계산 (1초 = 1000)
    const timeElapsed = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);

    const minuate = Math.floor(timeElapsed / 60);
    const hour = Math.floor(minuate / 60);
    const day = Math.floor(hour / 24);
    const month = Math.floor(day / 30);
    const year = Math.floor(month / 12);

    if (year) {
      setTimeAgo(`${year}년전`);
    } else if (month) {
      setTimeAgo(`${month}달전`);
    } else if (day) {
      setTimeAgo(`${day}일전`);
    } else if (hour) {
      setTimeAgo(`${hour}시간전`);
    } else if (minuate) {
      setTimeAgo(`${minuate}분전`);
    } else {
      setTimeAgo(`${timeElapsed}초전`);
    }
  };

  useEffect(() => {
    updateTimeStamp();
  }, [timestamp]);

  return timeAgo;
};