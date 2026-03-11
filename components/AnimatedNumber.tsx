import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

function formatWithSeparator(num: number, separator: string): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1500,
  prefix = '',
  suffix = '',
  separator = '.',
  className = ''
}) => {
  const animatedValue = useCountUp(value, duration);

  return (
    <span className={className}>
      {prefix}{formatWithSeparator(animatedValue, separator)}{suffix}
    </span>
  );
};

export default AnimatedNumber;
