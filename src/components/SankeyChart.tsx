
import React, { useEffect, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type * as echarts from 'echarts';
import { useStore } from '../store/useStore';

export const SankeyChart: React.FC = () => {
  const { data, fetchData, setSelectedNode } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const option = useMemo<echarts.EChartsOption>(() => {
    if (!data.nodes.length) return {};

    return {
      title: {
        text: 'Resource Cost Flow',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params: echarts.TooltipComponentFormatterCallbackParams) => {
          const p = Array.isArray(params) ? params[0] : params;
          if (!p) return '';

          if (p.dataType === 'edge') {
            const edge = p.data as unknown;
            if (
              edge &&
              typeof edge === 'object' &&
              'source' in edge &&
              'target' in edge &&
              'value' in edge &&
              typeof (edge as { source?: unknown }).source === 'string' &&
              typeof (edge as { target?: unknown }).target === 'string'
            ) {
              const { source, target, value } = edge as {
                source: string;
                target: string;
                value: unknown;
              };
              return `${source} -> ${target} : ${String(value)}`;
            }

            return typeof p.name === 'string' ? p.name : '';
          }
          
          const nodeName = p.name;
          if (typeof nodeName !== 'string') return '';
          const detail = data.details[nodeName];
          if (!detail) return nodeName;

          // Generate simple SVG sparkline
          const values = detail.timeline.map(d => d.value);
          const max = Math.max(...values);
          const min = Math.min(...values);
          const width = 150;
          const height = 40;
          const points = values.map((v, i) => {
            const x = (i / (values.length - 1)) * width;
            const y = height - ((v - min) / (max - min || 1)) * height;
            return `${x},${y}`;
          }).join(' ');

          const sparkline = `
            <svg width="${width}" height="${height}" style="background: transparent;">
              <polyline points="${points}" fill="none" stroke="#4ade80" stroke-width="2" />
            </svg>
          `;

          const timelineHtml = `
            <div style="margin-top: 8px;">
              <div style="font-size: 12px; color: #aaa;">6 Month Trend</div>
              ${sparkline}
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: #aaa;">
                <span>${detail.timeline[detail.timeline.length - 1].date}</span>
                <span>${detail.timeline[0].date}</span>
              </div>
            </div>
          `;

          return `
            <div style="padding: 4px;">
              <div style="font-weight: bold;">${nodeName}</div>
              ${timelineHtml}
            </div>
          `;
        }
      },
      series: [
        {
          type: 'sankey',
          layout: 'none',
          emphasis: {
            focus: 'adjacency',
          },
          data: data.nodes.map(n => ({ name: n.name, depth: n.depth })),
          links: data.links,
          lineStyle: {
            color: 'source',
            curveness: 0.5,
          },
          label: {
            position: 'right',
            color: '#333',
            fontSize: 12,
          },
          nodeWidth: 20,
          nodeGap: 8,
          levels: [
            {
              depth: 0,
              itemStyle: { color: '#2563eb' }, // Blue-600
              lineStyle: { color: 'source', opacity: 0.2 }
            },
            {
              depth: 1,
              itemStyle: { color: '#06b6d4' }, // Cyan-500
              lineStyle: { color: 'source', opacity: 0.2 }
            },
            {
              depth: 2,
              itemStyle: { color: '#14b8a6' }, // Teal-500
              lineStyle: { color: 'source', opacity: 0.2 }
            },
            {
              depth: 3,
              itemStyle: { color: '#10b981' }, // Emerald-500
              lineStyle: { color: 'source', opacity: 0.2 }
            }
          ]
        }
      ]
    };
  }, [data]);

  const onEvents: Record<string, (params: echarts.ECElementEvent) => void> = {
    click: (params) => {
      if (params.dataType === 'node' && typeof params.name === 'string') {
        setSelectedNode(params.name);
      }
    }
  };

  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-sm p-4">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        onEvents={onEvents}
      />
    </div>
  );
};
