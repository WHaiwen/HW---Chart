import React from 'react';
import { useStore } from '../../store/useStore';

const presets: string[][] = [
  ['#2563eb', '#06b6d4', '#14b8a6', '#10b981', '#f59e0b', '#ef4444'],
  ['#111827', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6'],
  ['#7c3aed', '#22c55e', '#f97316', '#3b82f6', '#f43f5e', '#0ea5e9'],
  ['#0f766e', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1'],
];

export const PalettePicker: React.FC = () => {
  const { palette, setPalette } = useStore();

  const updateColor = (i: number, color: string) => {
    const next = palette.map((c, idx) => idx === i ? color : c);
    setPalette(next);
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="font-semibold text-gray-700 mb-3">配色方案</h3>
      <div className="space-y-3">
        <div className="grid grid-cols-6 gap-2">
          {palette.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="color" value={c} onChange={(e) => updateColor(i, e.target.value)} />
              <input
                className="border rounded px-2 py-1 text-xs w-full"
                value={c}
                onChange={(e) => updateColor(i, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div>
          <span className="block text-xs text-gray-500 mb-1">预设方案</span>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                className="border rounded p-2 flex gap-1 items-center hover:bg-gray-50"
                onClick={() => setPalette(p)}
              >
                {p.map((c, i) => (
                  <span key={i} className="w-4 h-4 rounded" style={{ backgroundColor: c }} />
                ))}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

