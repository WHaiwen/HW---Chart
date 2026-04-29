# Page Design Document

## 1. Layout
*   **Header**:
    *   Title: "Resource Cost Flow & Governance"
    *   Background: White or light gray.
    *   Shadow: Subtle.

*   **Main Content Area** (Top ~60% of screen):
    *   Container for the Sankey Diagram.
    *   Background: White card with rounded corners.
    *   Padding: 24px.

*   **Details Area** (Bottom ~40% of screen):
    *   Title: "Governance Details: [Selected Node Name]"
    *   Content: A data table or list of cards.
    *   Columns: Resource ID, Cost Type, Amount, Optimization Status, Owner.

## 2. Visual Style
*   **Colors**:
    *   Level 1: Blue-600
    *   Level 2: Cyan-500
    *   Level 3: Teal-500
    *   Level 4: Emerald-500
    *   Links: Light gray with opacity (e.g., Gray-300).
    *   Highlight: Orange or distinct color for hover/selection.

*   **Typography**:
    *   Sans-serif (Inter or system font).
    *   Clear hierarchy (H1 for page title, H2 for section titles).

## 3. Interaction Design
*   **Hover**:
    *   Node/Link opacity changes (others fade out).
    *   Tooltip appears with a mini line chart showing trend.
*   **Click**:
    *   Node border highlight or color change to indicate selection.
    *   Bottom panel updates immediately.
