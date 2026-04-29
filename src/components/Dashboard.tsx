
import React from 'react';
import { SankeyChart } from './SankeyChart';
import { GovernanceDetails } from './GovernanceDetails';
import { ChartStudio } from './ChartStudio';
import { LayoutDashboard } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <LayoutDashboard className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-900">FinOpa Resource Governance</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Top Section: Sankey Chart */}
          <section>
            <SankeyChart />
          </section>

          {/* Bottom Section: Details & AI Chart Studio */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <GovernanceDetails />
            <ChartStudio />
          </section>
        </div>
      </main>
    </div>
  );
};
