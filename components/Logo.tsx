import React from 'react';
import Svg, { Text, Line, Rect } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  width: number;
  height: number;
}

export function Logo({ width, height }: LogoProps) {
  const { theme } = useTheme();

  const cx = width / 2;
  const cy = height / 2;

  // Decorative mini candlesticks flanking the title
  const candleY1 = cy - 30;
  const candleY2 = cy + 30;
  const candleWidth = 10;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Left decorative candle (green) */}
      <Line
        x1={cx - 140}
        y1={candleY1 - 8}
        x2={cx - 140}
        y2={candleY2 + 8}
        stroke={theme.candlePositive}
        strokeWidth={2}
      />
      <Rect
        x={cx - 140 - candleWidth / 2}
        y={candleY1}
        width={candleWidth}
        height={candleY2 - candleY1}
        fill={theme.candlePositive}
        rx={2}
      />

      {/* Right decorative candle (red) */}
      <Line
        x1={cx + 140}
        y1={candleY1 - 12}
        x2={cx + 140}
        y2={candleY2 + 6}
        stroke={theme.candleNegative}
        strokeWidth={2}
      />
      <Rect
        x={cx + 140 - candleWidth / 2}
        y={cy - 18}
        width={candleWidth}
        height={36}
        fill={theme.candleNegative}
        rx={2}
      />

      {/* CANDLE in white */}
      <Text
        x={cx - 4}
        y={cy - 8}
        textAnchor="middle"
        fontSize={36}
        fontWeight="900"
        fill={theme.text}
        letterSpacing={4}
      >
        CANDLE
      </Text>

      {/* CLASH in accent (teal) */}
      <Text
        x={cx - 4}
        y={cy + 32}
        textAnchor="middle"
        fontSize={36}
        fontWeight="900"
        fill={theme.accent}
        letterSpacing={8}
      >
        CLASH
      </Text>
    </Svg>
  );
}
