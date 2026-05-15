# Custom Formula Animation - Implementation Guide

## Overview
The CustomFormulaAnimation component demonstrates FactWise's "Build Once. Calculate Forever" concept by showing how users create a custom landed cost formula and apply it to vendor comparisons.

## Animation Sequence (24 seconds total)

### Phase 1: Formula Builder (0-8s)
**What happens:**
1. Animated cursor moves to "Create Formula" button in header
2. Clicks button → Formula Builder modal opens
3. Modal displays 5 available components:
   - 💰 Unit Price (Base)
   - 📊 BCD - 10% (Duties)
   - 📈 SWS - 2% (Duties)
   - 🚚 Freight (Logistics)
   - 🛡️ Insurance (Logistics)

4. Cursor clicks each component one by one
5. As each component is selected:
   - Component card highlights with blue border
   - Checkmark appears
   - Formula preview updates showing: `Unit + BCD + SWS + Freight + Insurance`

6. After all 5 components selected, cursor clicks "Save Formula"
7. Success banner appears: "Custom Formula Created!"
8. Modal closes

**Key Message:** Users build their formula once with the exact cost components they care about.

---

### Phase 2: Apply to Vendors (8-20s)
**What happens:**
1. Three vendor cards appear (collapsed):
   - **Vendor A** - Quote: $100 (Blue)
   - **Vendor B** - Quote: $95 (Green) ← Cheapest quote
   - **Vendor C** - Quote: $105 (Yellow)

2. Cursor clicks **Vendor A** → Details dropdown:
   - Unit Price: $100.00
   - BCD (10%): $10.00
   - SWS (2%): $2.00
   - Freight: $15.00
   - Insurance: $3.00
   - **True Landed Cost: $130.00**
   - Shows: "+$30.00 vs quote"

3. Cursor clicks **Vendor B** → Details dropdown:
   - Unit Price: $95.00
   - BCD (10%): $9.50
   - SWS (2%): $1.90
   - Freight: $15.00
   - Insurance: $3.00
   - **True Landed Cost: $124.40** ← Lowest true cost!
   - Shows: "+$29.40 vs quote"
   - Green button appears: "Lowest True Cost"

4. Cursor clicks **Vendor C** → Details dropdown:
   - Unit Price: $105.00
   - BCD (10%): $10.50
   - SWS (2%): $2.10
   - Freight: $15.00
   - Insurance: $3.00
   - **True Landed Cost: $135.60**
   - Shows: "+$30.60 vs quote"

5. Cursor clicks "Lowest True Cost" button on Vendor B
6. Vendor B card gets:
   - Green checkmark badge
   - Highlighted border
   - "Selected" label

**Key Message:** The formula is automatically applied to all vendors. The cheapest quote ($95) is NOT the lowest true cost ($124.40).

---

### Phase 3: Selection Confirmation (20-24s)
**What happens:**
1. Success banner appears with celebration particles:
   ```
   ✓ Vendor B Selected!
   Lowest true cost: $124.40 (not cheapest quote at $95)
   ✓ Your custom formula applied automatically
   ```

2. Animation holds for 3 seconds to let message sink in

3. Loop restarts

**Key Message:** Buy on true cost, not just the number on the quote.

---

## Technical Implementation

### Component Structure
```tsx
CustomFormulaAnimation.tsx
├── Background Image (40% opacity)
├── Browser Chrome (traffic lights + URL bar)
├── Dashboard Header
│   └── "Build Once. Calculate Forever."
├── Formula Builder Modal (conditional)
│   ├── Available Components List
│   ├── Formula Preview
│   └── Save Button
├── Success Banner (conditional)
├── Vendor Columns (3)
│   ├── Vendor Header (always visible)
│   └── Cost Breakdown (dropdown)
└── Selection Message (conditional)
```

### State Management
- `formulaBuilderOpen`: Controls modal visibility
- `selectedComponents`: Tracks which formula components are selected
- `formulaSaved`: Shows success banner
- `expandedVendors`: Array of expanded vendor indices
- `selectedVendor`: Which vendor is selected (1 = Vendor B)
- `showBestValue`: Shows "Lowest True Cost" button
- `showSelection`: Shows final selection message
- `cursorPosition`: Animated cursor coordinates
- `isClicking`: Click animation state

### Animation Timing
```javascript
0.8s  - Initial delay
0.8s  - Move to Create Formula button
0.15s - Click animation
1.0s  - Modal open delay
4.8s  - Select 5 components (0.6s move + 0.15s click + 0.8s delay each)
1.0s  - Pause before save
0.8s  - Move to Save button
0.15s - Click animation
1.0s  - Success banner display
0.8s  - Modal close delay
3.6s  - Click 3 vendors (0.8s move + 0.15s click + 1.2s delay each)
0.8s  - Show Best Value button
0.8s  - Move to Best Value button
0.15s - Click animation
0.5s  - Selection animation
3.0s  - Hold selection message
---
24.0s TOTAL
```

---

## Key Design Decisions

### 1. Formula First, Then Apply
The animation explicitly shows formula creation BEFORE vendor comparison. This reinforces "Build Once. Calculate Forever" - you define your logic once, then it applies everywhere.

### 2. Visual Hierarchy
- **Blue** = System/Formula (header, modal, formula preview)
- **Vendor Colors** = Individual vendors (blue, green, yellow)
- **Green** = Success/Selection (checkmarks, best value, selection message)

### 3. Progressive Disclosure
Vendors start collapsed to reduce cognitive load. Details reveal one by one as the cursor "evaluates" each option.

### 4. Emphasis on True Cost vs Quote
Every vendor shows "+$X vs quote" to hammer home that unit price ≠ true cost. The selection message explicitly states "not cheapest quote at $95".

### 5. Automated Application
The success banner says "Now applying to vendor comparison..." to show the formula automatically works across all vendors without manual recalculation.

---

## Context from User

### Key Quotes:
> "Unit price is never the real cost. Duties, freight, insurance, packaging — the cheapest quote on paper is rarely the cheapest purchase in reality."

> "Define your own formula once. FactWise applies it automatically across every event, every vendor, every quote — normalized to your currency, your costs, your rules."

> "Build Once. Calculate Forever."

> "Buy on true cost. Not just the number on the quote."

### Business Logic:
- **Vendor B** has the cheapest quote ($95) but NOT the lowest true cost
- True costs: A=$130, B=$124.40, C=$135.60
- The formula includes: Unit Price + BCD (10%) + SWS (2%) + Freight ($15) + Insurance ($3)
- This demonstrates why procurement teams need custom formulas beyond simple price comparison

---

## Files Referenced
- Main component: `src/components/methodology-animations/CustomFormulaAnimation.tsx`
- Parent component: `src/components/Methodology.tsx`
- Background image: `public/ChatGPT Image May 15, 2026, 12_40_41 PM.png`
- Formula UI reference: `reference/formula_extracted/*.png` (6 screenshots)

---

## Status: ✅ COMPLETE

The animation is fully implemented and demonstrates:
1. ✅ Formula builder interface with component selection
2. ✅ Real-time formula preview as components are added
3. ✅ Automatic application to vendor comparison
4. ✅ Progressive disclosure of vendor cost breakdowns
5. ✅ Clear distinction between quote price and true cost
6. ✅ Selection of lowest true cost (not cheapest quote)
7. ✅ Celebration and confirmation messaging
8. ✅ 24-second loop with smooth cursor animations
