import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { useTheme } from '../context/ThemeContext';
import type { Candle } from '../types';

interface ChartProps {
  candles: Candle[];
  currentIndex: number;
  height?: number;
}

const { width } = Dimensions.get('window');

export function Chart({ candles, currentIndex, height = 300 }: ChartProps) {
  const { theme } = useTheme();

  // Slice to only the candles revealed so far, then transform to wagmi format.
  // wagmi-charts requires: { timestamp (ms), open, high, low, close }
  // Our candle data stores time in seconds — multiply by 1000 to convert to milliseconds.
  const data = useMemo(() =>
    candles.slice(0, currentIndex + 1).map(c => ({
      timestamp: c.time * 1000,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    })),
    [candles, currentIndex]
  );

  // Don't render chart until we have at least 2 candles —
  // wagmi-charts requires a minimum of 2 data points to draw correctly.
  if (data.length < 2) {
    return <View style={{ height, width: '100%', backgroundColor: theme.background }} />;
  }

  return (
    <View style={{ height, width: '100%', backgroundColor: theme.background }}>
      <CandlestickChart.Provider data={data}>
        <CandlestickChart width={width} height={height}>
          <CandlestickChart.Candles
            positiveColor={theme.candlePositive}
            negativeColor={theme.candleNegative}
          />
        </CandlestickChart>
      </CandlestickChart.Provider>
    </View>
  );
}
