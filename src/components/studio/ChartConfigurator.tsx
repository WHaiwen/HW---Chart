import React from 'react';
import { useStore } from '../../store/useStore';

const chartTypes = [
  { value: 'line', label: 'Line' },
  { value: 'stacked-line', label: 'Stacked Line' },
  { value: 'area', label: 'Area' },
  { value: 'bar', label: 'Bar' },
  { value: 'stacked-bar', label: 'Stacked Bar' },
  { value: 'pie', label: 'Pie' },
  { value: 'donut', label: 'Donut' },
  { value: 'scatter', label: 'Scatter' },
] as const;

export const ChartConfigurator: React.FC = () => {
  const { chartType, setChartType, title, setTitle, resetStudio } = useStore();

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-700">配置</h3>
        <button
          className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
          onClick={resetStudio}
        >
          重置
        </button>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">图表类型</label>
          <select
            className="w-full border rounded px-2 py-1 text-sm"
            value={chartType}
            onChange={(e) => setChartType(e.target.value as any)}
          >
            {chartTypes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">标题</label>
          <input
            className="w-full border rounded px-2 py-1 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入图表标题"
          />
        </div>
      </div>
    </div>
  );
};

