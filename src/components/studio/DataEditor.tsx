import React from 'react';
import { useStore } from '../../store/useStore';

export const DataEditor: React.FC = () => {
  const {
    categories, setCategories, addCategory,
    series, setSeries, addSeries, updateSeriesValue
  } = useStore();

  const updateCategoryName = (i: number, name: string) => {
    const next = categories.map((c, idx) => idx === i ? name : c);
    setCategories(next);
  };

  const updateSeriesName = (i: number, name: string) => {
    const next = series.map((s, idx) => idx === i ? { ...s, name } : s);
    setSeries(next);
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="font-semibold text-gray-700 mb-3">数据编辑</h3>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">类别（X 轴）</span>
          <button className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200" onClick={() => addCategory()}>
            添加类别
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {categories.map((c, i) => (
            <input
              key={i}
              className="border rounded px-2 py-1 text-sm"
              value={c}
              onChange={(e) => updateCategoryName(i, e.target.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">序列（Series）</span>
          <button className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200" onClick={() => addSeries()}>
            添加序列
          </button>
        </div>
        <div className="space-y-4">
          {series.map((s, si) => (
            <div key={si} className="border rounded p-3">
              <input
                className="border rounded px-2 py-1 text-sm mb-2 w-full"
                value={s.name}
                onChange={(e) => updateSeriesName(si, e.target.value)}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {categories.map((_, ci) => (
                  <input
                    key={ci}
                    type="number"
                    className="border rounded px-2 py-1 text-sm"
                    value={s.data[ci] ?? 0}
                    onChange={(e) => updateSeriesValue(si, ci, Number(e.target.value))}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

