
import { create } from 'zustand';
import { DashboardData, generateMockData, NodeDetail } from '../utils/mockData';

type ChartType = 'line' | 'stacked-line' | 'bar' | 'stacked-bar' | 'area' | 'pie' | 'donut' | 'scatter';

interface StudioSeries {
  name: string;
  data: number[];
}

interface ChartStudioState {
  chartType: ChartType;
  title: string;
  categories: string[];
  series: StudioSeries[];
  palette: string[];
  setChartType: (t: ChartType) => void;
  setTitle: (t: string) => void;
  setCategories: (c: string[]) => void;
  addCategory: (label?: string) => void;
  setSeries: (s: StudioSeries[]) => void;
  addSeries: (name?: string) => void;
  updateSeriesValue: (seriesIndex: number, categoryIndex: number, value: number) => void;
  setPalette: (p: string[]) => void;
  resetStudio: () => void;
}

interface AppState extends ChartStudioState {
  data: DashboardData;
  selectedNode: string | null;
  selectedNodeDetails: NodeDetail | null;
  setSelectedNode: (nodeName: string | null) => void;
  fetchData: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  data: { nodes: [], links: [], details: {} },
  selectedNode: null,
  selectedNodeDetails: null,
  chartType: 'stacked-line',
  title: 'AI Chart Studio',
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Series 1', data: [120, 200, 150, 80, 70, 110] },
    { name: 'Series 2', data: [90, 100, 140, 130, 160, 120] },
  ],
  palette: ['#2563eb', '#06b6d4', '#14b8a6', '#10b981', '#f59e0b', '#ef4444'],
  setChartType: (t) => set({ chartType: t }),
  setTitle: (t) => set({ title: t }),
  setCategories: (c) => {
    const { series } = get();
    const newSeries = series.map(s => {
      const data = [...s.data];
      if (c.length > data.length) {
        data.push(...Array(c.length - data.length).fill(0));
      } else if (c.length < data.length) {
        data.length = c.length;
      }
      return { ...s, data };
    });
    set({ categories: c, series: newSeries });
  },
  addCategory: (label) => {
    const { categories, series } = get();
    const newCategories = [...categories, label ?? `Cat ${categories.length + 1}`];
    const newSeries = series.map(s => ({ ...s, data: [...s.data, 0] }));
    set({ categories: newCategories, series: newSeries });
  },
  setSeries: (s) => set({ series: s }),
  addSeries: (name) => {
    const { categories, series } = get();
    const newS = { name: name ?? `Series ${series.length + 1}`, data: Array(categories.length).fill(0) };
    set({ series: [...series, newS] });
  },
  updateSeriesValue: (si, ci, value) => {
    const { series } = get();
    const next = series.map((s, i) => i === si ? { ...s, data: s.data.map((v, j) => j === ci ? value : v) } : s);
    set({ series: next });
  },
  setPalette: (p) => set({ palette: p }),
  resetStudio: () => set({
    chartType: 'line',
    title: 'AI Chart Studio',
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    series: [{ name: 'Series 1', data: [120, 200, 150, 80, 70, 110] }],
    palette: ['#2563eb', '#06b6d4', '#14b8a6', '#10b981', '#f59e0b', '#ef4444'],
  }),
  setSelectedNode: (nodeName) => {
    const { data } = get();
    set({ 
      selectedNode: nodeName,
      selectedNodeDetails: nodeName ? data.details[nodeName] : null
    });
  },
  fetchData: () => {
    const data = generateMockData();
    set({ data });
  },
}));
