
import React from 'react';
import { useStore } from '../store/useStore';
import { AlertTriangle, TrendingDown, DollarSign, User, Clock, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { StackedLineChart } from './StackedLineChart';

export const GovernanceDetails: React.FC = () => {
  const { selectedNode, selectedNodeDetails } = useStore();

  if (!selectedNode || !selectedNodeDetails) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-white rounded-lg shadow-sm p-8">
        <div className="text-center">
          <TrendingDown className="w-12 h-12 mx-auto mb-2 opacity-20" />
          <p>Select a node in the Sankey diagram to view resource governance details.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-red-600 bg-red-50 border-red-200';
      case 'In Progress': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Resolved': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Cost Optimization': return <DollarSign className="w-4 h-4" />;
      case 'Budget Alert': return <AlertTriangle className="w-4 h-4" />;
      case 'Unused Resource': return <Clock className="w-4 h-4" />; // Or trash icon
      case 'Anomaly': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6 mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <TrendingDown className="w-6 h-6 text-blue-600" />
          Governance Details: <span className="text-blue-600">{selectedNode}</span>
        </h2>
        <div className="text-sm text-gray-500">
          Total Items: {selectedNodeDetails.governanceItems.length}
        </div>
      </div>

      <StackedLineChart />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saving Potential</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedNodeDetails.governanceItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm font-medium text-gray-900 gap-2">
                    {getIcon(item.type)}
                    {item.type}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ${item.savingPotential.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {item.owner}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx("px-2 inline-flex text-xs leading-5 font-semibold rounded-full border", getStatusColor(item.status))}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
