
export interface SankeyNode {
  name: string;
  depth?: number;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface GovernanceItem {
  id: string;
  type: 'Cost Optimization' | 'Budget Alert' | 'Unused Resource' | 'Anomaly';
  description: string;
  savingPotential: number;
  owner: string;
  status: 'Open' | 'In Progress' | 'Resolved';
}

export interface TimelinePoint {
  date: string;
  value: number;
}

export interface NodeDetail {
  timeline: TimelinePoint[];
  governanceItems: GovernanceItem[];
}

export interface DashboardData {
  nodes: SankeyNode[];
  links: SankeyLink[];
  details: Record<string, NodeDetail>;
}

const DEPARTMENTS_L1 = ['R&D', 'Marketing', 'Sales', 'Operations'];
const DEPARTMENTS_L2_PREFIX = ['Infra', 'Platform', 'Growth', 'Enterprise', 'Support'];
const DEPARTMENTS_L3_PREFIX = ['Backend', 'Frontend', 'Data', 'AI', 'Mobile'];

const generateTimeline = (): TimelinePoint[] => {
  const data: TimelinePoint[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      date: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
      value: Math.floor(Math.random() * 50000) + 10000,
    });
  }
  return data;
};

const generateGovernanceItems = (): GovernanceItem[] => {
  const items: GovernanceItem[] = [];
  const count = Math.floor(Math.random() * 5);
  const types: GovernanceItem['type'][] = ['Cost Optimization', 'Budget Alert', 'Unused Resource', 'Anomaly'];
  const statuses: GovernanceItem['status'][] = ['Open', 'In Progress', 'Resolved'];
  
  for (let i = 0; i < count; i++) {
    items.push({
      id: `GOV-${Math.floor(Math.random() * 10000)}`,
      type: types[Math.floor(Math.random() * types.length)],
      description: 'Resource usage exceeds threshold or idle instances detected.',
      savingPotential: Math.floor(Math.random() * 1000),
      owner: `User ${Math.floor(Math.random() * 100)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return items;
};

export const generateMockData = (): DashboardData => {
  const nodes: SankeyNode[] = [];
  const links: SankeyLink[] = [];
  const details: Record<string, NodeDetail> = {};

  // Level 1
  DEPARTMENTS_L1.forEach(l1 => {
    nodes.push({ name: l1, depth: 0 });
    details[l1] = { timeline: generateTimeline(), governanceItems: generateGovernanceItems() };
    
    // Level 2
    const numL2 = Math.floor(Math.random() * 2) + 2; // 2-3 L2 nodes per L1
    for (let i = 0; i < numL2; i++) {
      const l2 = `${l1} - ${DEPARTMENTS_L2_PREFIX[Math.floor(Math.random() * DEPARTMENTS_L2_PREFIX.length)]} ${i+1}`;
      if (!nodes.find(n => n.name === l2)) {
        nodes.push({ name: l2, depth: 1 });
        details[l2] = { timeline: generateTimeline(), governanceItems: generateGovernanceItems() };
        links.push({ source: l1, target: l2, value: Math.floor(Math.random() * 1000) + 100 });
      }

      // Level 3
      const numL3 = Math.floor(Math.random() * 2) + 1; // 1-2 L3 nodes per L2
      for (let j = 0; j < numL3; j++) {
        const l3 = `${l2.split(' - ')[1]} - ${DEPARTMENTS_L3_PREFIX[Math.floor(Math.random() * DEPARTMENTS_L3_PREFIX.length)]} ${j+1}`;
        if (!nodes.find(n => n.name === l3)) {
          nodes.push({ name: l3, depth: 2 });
          details[l3] = { timeline: generateTimeline(), governanceItems: generateGovernanceItems() };
        }
        // Link might already exist if we reused names, but here names are unique enough or we check
        // Simplified: allow multiple parents to same child? No, strictly hierarchical for this demo
        // To make it simple, let's make names unique path-based to avoid cycles or confusion
        // But Sankey often merges. Let's keep unique names for simplicity.
        // Actually, to make it look nice, let's just append unique IDs if needed, but the naming above is a bit loose.
        // Let's refine naming to be unique.
      }
    }
  });

  // Re-generating with a cleaner approach for levels
  // Clear arrays
  nodes.length = 0;
  links.length = 0;
  
  // Create Nodes
  const l1Nodes = DEPARTMENTS_L1;
  const l2Nodes: string[] = [];
  const l3Nodes: string[] = [];
  const l4Nodes: string[] = [];

  l1Nodes.forEach(name => {
    nodes.push({ name, depth: 0 });
    details[name] = { timeline: generateTimeline(), governanceItems: generateGovernanceItems() };
  });

  // Generate L2 and Links from L1
  l1Nodes.forEach(l1 => {
    const count = 2 + Math.floor(Math.random() * 2);
    for (let k = 0; k < count; k++) {
      const name = `${l1} Div ${k+1}`; // Unique L2 name
      l2Nodes.push(name);
      nodes.push({ name, depth: 1 });
      details[name] = { timeline: generateTimeline(), governanceItems: generateGovernanceItems() };
      links.push({ source: l1, target: name, value: Math.floor(Math.random() * 500) + 200 });
    }
  });

  // Generate L3 and Links from L2
  l2Nodes.forEach(l2 => {
    const count = 2 + Math.floor(Math.random() * 2);
    for (let k = 0; k < count; k++) {
      const name = `${l2} Team ${k+1}`; // Unique L3 name
      l3Nodes.push(name);
      nodes.push({ name, depth: 2 });
      details[name] = { timeline: generateTimeline(), governanceItems: generateGovernanceItems() };
      links.push({ source: l2, target: name, value: Math.floor(Math.random() * 300) + 100 });
    }
  });

  // Generate L4 and Links from L3
  l3Nodes.forEach(l3 => {
    const count = 1 + Math.floor(Math.random() * 3);
    for (let k = 0; k < count; k++) {
      const name = `${l3} Proj ${k+1}`; // Unique L4 name
      l4Nodes.push(name);
      nodes.push({ name, depth: 3 });
      details[name] = { timeline: generateTimeline(), governanceItems: generateGovernanceItems() };
      links.push({ source: l3, target: name, value: Math.floor(Math.random() * 100) + 50 });
    }
  });

  return { nodes, links, details };
};
