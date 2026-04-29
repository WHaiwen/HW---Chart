import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type * as echarts from 'echarts';
import { useStore } from '../store/useStore';

export const StackedLineChart: React.FC = () => {
  const { data, selectedNode } = useStore();

  const option = useMemo<echarts.EChartsOption>(() => {
    if (!selectedNode || !data.nodes.length) return {};

    const children = data.links
      .filter(l => l.source === selectedNode)
      .map(l => l.target);

    const seriesNodes = children.length ? children.slice(0, 8) : [selectedNode];
    const firstDetail = data.details[seriesNodes[0]];
    if (!firstDetail || !firstDetail.timeline.length) return {};

    const xLabels = firstDetail.timeline.map(p => p.date);

    const series = seriesNodes
      .map(name => {
        const detail = data.details[name];
        if (!detail) return null;
        const values = detail.timeline.map(p => p.value);
        return {
          name,
          type: 'line',
          stack: 'total',
          smooth: true,
          symbol: 'none',
          emphasis: { focus: 'series' },
          data: values,
        };
      })
      .filter(Boolean) as echarts.SeriesOption[];

    return {
      title: {
        text: 'Stacked Line Trend',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        top: 28,
      },
      grid: {
        left: 40,
        right: 20,
        bottom: 30,
        top: 70,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xLabels,
      },
      yAxis: {
        type: 'value',
      },
      series,
    };
  }, [data, selectedNode]);

  return (
    <div className="w-full h-[320px] bg-white rounded-lg shadow-sm mb-6">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

