# Technical Design Document: Resource Cost Sankey Dashboard

## 1. Architecture
*   **Type**: Single Page Application (SPA).
*   **Framework**: React 18+ with TypeScript.
*   **Build Tool**: Vite.
*   **Styling**: Tailwind CSS.

## 2. Key Libraries
*   **Visualization**: `echarts` and `echarts-for-react`.
    *   *Reasoning*: ECharts provides excellent support for Sankey diagrams with built-in `focus: 'adjacency'` for path highlighting and flexible tooltips.
*   **State Management**: `zustand`.
    *   *Reasoning*: Lightweight store to manage the `selectedNode` state shared between the Chart and the Details Table.
*   **Icons**: `lucide-react`.

## 3. Data Structure
*   **Sankey Data**:
    *   `nodes`: Array of `{ name: string, depth: number }`.
    *   `links`: Array of `{ source: string, target: string, value: number }`.
*   **Node Detail Data**:
    *   Map or Object keyed by node name.
    *   Contains: `timeline` (array of `{ date, value }`) for tooltip, and `governanceDetails` (array of records) for the bottom panel.

## 4. Component Structure
*   `App.tsx`: Main layout.
*   `components/SankeyChart.tsx`: Wrapper around ECharts instance. Handles events (click, hover).
*   `components/GovernanceDetails.tsx`: Table/List view for selected node details.
*   `components/TooltipChart.tsx`: Mini chart component for the tooltip (can be rendered as static HTML string or via ECharts formatter). *Note: ECharts tooltip formatter returns HTML string or DOM, we will use a custom formatter.*

## 5. API / Mock Data
*   `src/utils/mockData.ts`: Functions to generate the 4-level hierarchy and random cost data.
