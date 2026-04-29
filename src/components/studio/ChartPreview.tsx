import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type * as echarts from 'echarts';
import { useStore } from '../../store/useStore';

export const ChartPreview: React.FC = () => {
  const { chartType, title, categories, series, palette } = useStore();

  const option = useMemo<echarts.EChartsOption>(() => {
    const commonAxis = {
      xAxis: { type: 'category', data: categories, boundaryGap: chartType.includes('bar') },
      yAxis: { type: 'value' },
      legend: { top: 28 },
      tooltip: { trigger: chartType === 'pie' || chartType === 'donut' ? 'item' : 'axis' },
      color: palette,
      title: { text: title, left: 'center' },
      grid: { left: 40, right: 20, bottom: 30, top: 70, containLabel: true },
    };

    if (chartType === 'pie' || chartType === 'donut') {
      const data = categories.map((c, i) => ({
        name: c,
        value: (series[0]?.data[i] ?? 0),
      }));
      return {
        title: { text: title, left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { top: 28 },
        color: palette,
        series: [
          {
            name: series[0]?.name ?? 'Series 1',
            type: 'pie',
            radius: chartType === 'donut' ? ['40%', '70%'] : '60%',
            data,
          }
        ]
      } as echarts.EChartsOption;
    }

    if (chartType === 'scatter') {
      const scatterData = (series[0]?.data ?? []).map((y, i) => [i, y]);
      return {
        title: { text: title, left: 'center' },
        tooltip: { trigger: 'item' },
        color: palette,
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [{ type: 'scatter', name: series[0]?.name ?? 'Series 1', data: scatterData }]
      } as echarts.EChartsOption;
    }

    const toSeries = (t: 'line' | 'bar') => series.map(s => ({
      name: s.name,
      type: t,
      stack: chartType.startsWith('stacked') ? 'total' : undefined,
      smooth: t === 'line',
      symbol: 'circle',
      areaStyle: chartType === 'area' ? {} : undefined,
      emphasis: { focus: 'series' },
      data: s.data,
    })) as echarts.SeriesOption[];

    const isBar = chartType.includes('bar');
    const isArea = chartType === 'area';
    const t: 'line' | 'bar' = isBar ? 'bar' : 'line';
    const axis = {
      xAxis: { type: 'category', data: categories, boundaryGap: t === 'bar' || isArea },
      yAxis: { type: 'value' },
    };

    return {
      ...commonAxis,
      ...axis,
      series: toSeries(t),
    } as echarts.EChartsOption;
  }, [chartType, title, categories, series, palette]);

  return (
    <div className="w-full h-[360px] bg-white rounded-lg border">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};
