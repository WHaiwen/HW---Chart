# Product Requirements Document: Resource Cost Sankey Dashboard

## 1. Overview
This project aims to build an interactive dashboard visualizing resource cost consumption across organizational levels using a Sankey diagram.

## 2. Key Features
1.  **Sankey Diagram**:
    *   Visualizes flow of resource costs.
    *   **Hierarchy**: 4 Levels (Level 1 Dept -> Level 2 Dept -> Level 3 Dept -> Level 4 Dept).
    *   **Direction**: Left to Right.

2.  **Interactions**:
    *   **Hover**: Highlighting the entire path (upstream and downstream) when hovering over a node or link.
    *   **Tooltip**: Displaying a floating window with the node's resource consumption timeline (trend over time) upon hover.
    *   **Selection**: Clicking a node selects it and updates a details view.

3.  **Details View**:
    *   Located below the Sankey diagram.
    *   Shows "Resource Governance Details" for the selected node.
    *   Metrics might include: Total Cost, Optimization Suggestions, Owner, Status.

## 3. User Stories
*   As a user, I want to see how costs flow from top-level departments down to teams.
*   As a user, I want to hover over a department to see its cost trend over the last 6 months.
*   As a user, I want to click on a department to see specific governance actions required.
