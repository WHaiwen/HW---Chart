import React from 'react';
import { ChartPreview } from './studio/ChartPreview.tsx';
import { ChartConfigurator } from './studio/ChartConfigurator.tsx';
import { DataEditor } from './studio/DataEditor.tsx';
import { PalettePicker } from './studio/PalettePicker.tsx';

export const ChartStudio: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">AI Chart Studio</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartPreview />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ChartConfigurator />
          <PalettePicker />
        </div>
      </div>
      <div className="mt-6">
        <DataEditor />
      </div>
    </div>
  );
};
