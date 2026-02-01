# 🚀 NEXUS 4.0 - FINAL COMPLETE SPECIFICATIONS
## AI-Powered Crisis Intelligence & Customer Retention Platform

**Current Base:** https://mashreq-sigma.vercel.app/  
**Goal:** Transform into award-winning hackathon demo with 6-section flow

---

## 📋 EXECUTIVE SUMMARY

**NEXUS** is an AI-powered crisis intelligence platform that transforms raw social media complaints into **actionable executive decisions** through a clean 6-section flow:

1. **Clusters** - Visual categorization (API Down 12🔴, App Crash 8🟡, Billing 5🟢)
2. **Posts/Activity** - Live timeline with cascade status tracking
3. **RCA + Simulations** - Claude 5 Whys root cause + 4 strategies + Strategy Lab (mock agentic AI)
4. **Executive Brief** - 1-click C-suite summary (PDF/Email ready)
5. **Network Analysis** - Narrative chain timeline + cascade prediction + prevention controls
6. **Customers** - CEO intelligence dashboard with churn risk + response scripts

**Key Innovation:** Detects BOTH external crises AND internal customer churn. Narrative chain shows exact crisis spread path (CEO→Dev→Misinfo→Media) with prevention interventions at each step.

---

## 🎯 NEW FEATURES ADDED (Version 4.0)

### ✨ 1. CLUSTERING SYSTEM
**What:** Posts auto-organize into 3-5 thematic clusters  
**Why:** Makes 50+ complaints manageable (scale to 1000s)  
**How:** TF-IDF + DBSCAN clustering (static for demo)

```json
{
  "api_down": {
    "name": "API Downtime",
    "posts": 12,
    "risk": 92,
    "rootCause": "Auto-scaling CPU threshold"
  },
  "app_crash": {
    "name": "App Crashes", 
    "posts": 8,
    "risk": 67,
    "rootCause": "Memory leak"
  }
}
```

**Demo Impact:** Click bubble → Entire cluster analysis appears

---

### ✨ 2. ROOT CAUSE ANALYSIS (RCA)
**What:** Claude-powered 5 Whys technique  
**Why:** Finds actionable root cause, not just symptoms  
**How:** Keyword extraction → Claude deep reasoning

**Example:**
```
Problem: API Downtime (12 posts)
Why 1: API down → Load balancer failed
Why 2: Load balancer → Traffic spike
Why 3: Traffic spike → Auto-scaling delayed
Why 4: Auto-scaling → CPU threshold 90%
Why 5: Threshold → Wrong config for peak hours

ROOT CAUSE: "Auto-scaling CPU threshold misconfigured"
PREVENTION: "Set threshold to 70% during peak hours + load test"
```

**Demo Impact:** From "API down" → "Exact fix to prevent recurrence"

---

### ✨ 3. STRATEGY LAB (Mock Agentic AI)
**What:** Test custom strategies, get AI feedback  
**Why:** Judges LOVE interactive demos  
**How:** Input idea → Claude scores vs 4 official strategies

**Flow:**
```
Input: "Public apology + 20% refund + CEO call"
[2s processing]

OUTPUT:
✅ Score: 7.8/10 (Better than A, worse than B)
✅ Why: Addresses emotion + economics
⚠️ Risks: Refund precedent (15%)
💰 Cost: AED 22k | ROI: AED 420k
💡 Pro Tip: Add private CEO call → 8.9/10

[SAVE AS STRATEGY E] [TEST ON CLUSTER]
```

**Demo Impact:** Judges participate → Ask "Can I test mine?" → YES!

---

### ✨ 4. NARRATIVE CHAIN ANALYSIS (Game-Changer)
**What:** Shows EXACT crisis spread path step-by-step  
**Why:** Turns network graph into predictive story  
**How:** Claude identifies: Originator → Amplifier → Misinfo → Critical

**Real Example:**
```
08:00 @TechCEO_Dubai: "API down 3hrs 😡"
      ↓ (125k reach, -0.9 sentiment)
09:15 @DevGuru_UAE: "Same enterprise outage"
      ↓ (45k reach, amplifies to 7 devs)
09:45 @BankWatcher: "Mashreq breach confirmed?" ← MISINFO MUTATION
      ↓ (89k reach, false narrative spreads)
11:00 @NewsUAE: "Bank investigating breach..."
      ↓ (250k reach, tomorrow's headline)

RESULT: 98% viral, 6.2M reach by +24h
```

**Why This Matters:**
- **Without Narrative:** "47 active nodes... uh?"
- **With Narrative:** "CEO → Devs → Breach misinfo → Media article"
- **Actionable:** DM Node 2 → Stops dev amplification (-40% cascade)

**Demo Impact:** Judges see crisis fortune-telling

---

### ✨ 5. CASCADE PREDICTION + PREVENTION
**What:** Time-series prediction with intervention controls  
**Why:** Shows business impact of doing nothing vs acting  
**How:** Pre-calculated scenarios + live simulation

**Chart:**
```
No Action:     25% → 65% (+2h) → 92% (+6h) → 98% (+24h)
With Prevention: 25% → 25% → 25% → 25%

Reach Impact: 6.2M → 800k (87% reduction)
```

**Prevention Controls:**
```
[✓] DM @DevGuru_UAE    → -40% cascade
[✓] Fact-check @BankWatcher → -65% misinfo
[✓] Media outreach @NewsUAE  → -80% article risk

LIVE RESULT: 18% viral risk (from 98%)
```

**Demo Impact:** Interactive sliders → Real-time cascade updates

---

### ✨ 6. EXECUTIVE BRIEF (1-Click)
**What:** C-suite summary with PDF/email export  
**Why:** Busy executives need 30-second glance  
**How:** Aggregates all sections into clean metrics

**Format:**
```
🚨 NEXUS EXECUTIVE BRIEF - 24hr Summary

📊 KEY METRICS
• 3 High-priority clusters (25 posts total)
• 1 CEO churn risk (AED 750k account)
• Viral risk reduced: 65% → 25%
• RCA completion: 100%

⚠️ TOP RISKS
1. @TechCEO_Dubai (Priority 9.2/10)
   Root Cause: Auto-scaling threshold
   Action: CRO outreach (script ready)
   Confidence: 92%

✅ PREVENTIVE MEASURES DEPLOYED
• Auto-scaling threshold → 70% CPU
• Load test scheduled: Tomorrow 10AM

**DECISION NEEDED:** Approve CEO goodwill package?

[📥 DOWNLOAD PDF] [📧 EMAIL C-SUITE]
```

**Demo Impact:** "Ready for board meeting" → Instant credibility

---

## 🏗️ COMPLETE 6-SECTION FLOW

```
┌────────────────────────────────────────┐
│ 1️⃣ CLUSTERS (Hero - Full Width)       │
│   [API Down🔴12] [App Crash🟡8] [Bill🟢5]│
│   Click → Scroll to Posts              │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│ 2️⃣ POSTS/ACTIVITY (Timeline)          │
│   @TechCEO: "API down" [🔴ACTIVE-2h]  │
│   @DevGuru: "Same" [🟡WATCH-1h]        │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│ 3️⃣ RCA + SIMULATIONS                  │
│   [5 Whys Chain] [4 Strategies Table]  │
│   [Strategy Lab: Test Your Idea]       │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│ 4️⃣ EXEC BRIEF                         │
│   3 Clusters | 25 Posts | 1 CEO Risk   │
│   [📥 PDF] [📧 EMAIL]                  │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│ 5️⃣ NETWORK ANALYSIS ⭐ NEW            │
│   [Narrative Chain Timeline]           │
│   [Cascade Prediction Chart]           │
│   [Prevention Controls: -40% -65% -80%]│
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│ 6️⃣ CUSTOMERS (Click Node → Detail)    │
│   [Network Graph] → CEO Card           │
│   [Churn Risk 85%] [Response Script]   │
└────────────────────────────────────────┘
```

---

## 🎨 DESIGN PRINCIPLES (Mobile-First)

```
✅ WHITE SPACE EVERYWHERE (Apple-style clean)
✅ 1 FOCUS PER SECTION (no clutter)
✅ BIG READABLE NUMBERS (24px+ metrics)
✅ ORANGE ACCENTS ONLY (#F39C12, #E8A92C)
✅ VERTICAL SCROLL (mobile-first, desktop 2-col)
✅ PROGRESSIVE DISCLOSURE (click → detail slide-in)
✅ TOUCH-FRIENDLY (48px min buttons)
```

**Colors (Mashreq Mandatory):**
```
Primary:   #F39C12 (orange)
Gold:      #E8A92C (hover)
Success:   #27AE60 (green)
Warning:   #F39C12 (orange)
Error:     #E74C3C (red)
White:     #FFFFFF
Dark Text: #2C3E50
```

---

## 🧠 STATE MANAGEMENT (Zustand)

```javascript
interface AppState {
  // Section navigation
  activeSection: 'clusters' | 'posts' | 'rca' | 'brief' | 'network' | 'customers';
  
  // Clusters
  clusters: Cluster[];
  selectedCluster: Cluster | null;
  
  // Posts
  posts: Post[];
  postStatuses: Map<string, 'active' | 'watch' | 'resolved'>;
  
  // RCA
  rcaResults: {
    cluster_id: string;
    root_cause: string;
    why_chain: string[];
    prevention: string[];
    confidence: number;
  };
  
  // Strategies
  strategies: Strategy[];
  customStrategyFeedback: {
    score: number;
    why_good: string;
    risks: string;
    cost: number;
    roi: string;
    improvements: string;
  } | null;
  
  // Network Analysis ⭐ NEW
  narrativeChain: {
    id: number;
    step: 'ORIGINATOR' | 'AMPLIFIER' | 'MISINFO' | 'CRITICAL';
    time: string;
    handle: string;
    text: string;
    reach: number;
    sentiment: number;
  }[];
  
  cascadePrediction: {
    current: number;
    plus2h: number;
    plus6h: number;
    plus24h: number;
  };
  
  preventionNodes: {
    id: string;
    node: string;
    action: string;
    impact: number;
  }[];
  
  activePreventions: string[];
  
  // Exec Brief
  execBrief: {
    clusters: number;
    posts: number;
    ceo_risks: number;
    viral_reduction: string;
    rca_completion: number;
  };
  
  // Customers
  priorityCustomers: Customer[];
  selectedCustomer: Customer | null;
}
```

---

## 🚀 90-SECOND DEMO SCRIPT (Judges Route)

```
[0:00] LANDING
"NEXUS finds TWO problems: viral crises AND silent customer churn"

[0:10] CLICK Cluster 1 (API Downtime - 12 posts)
"12 complaints auto-cluster by theme"

[0:20] SCROLL to Posts
"Watch: Posts arrive with cascade status"

[0:30] RCA appears
"Claude 5 Whys: Root cause = Auto-scaling threshold"

[0:40] Strategy Table
"4 strategies ranked. Strategy B = 8.7/10, AED 500k ROI"

[0:50] CLICK Strategy Lab
TYPE: "Public apology + refund"
[2s] → "7.8/10. Add CEO call → 8.9/10"

[1:10] SCROLL to Network Analysis
"Narrative chain: CEO → Devs → Breach misinfo → Media article"

[1:25] CLICK Prevention Controls
"DM Node 2 → Cascade drops 40%"
"Fact-check Node 3 → Kills misinfo 65%"

[1:40] Live simulation
"Viral risk: 98% → 25%"

[1:50] CLICK Exec Brief
"C-suite summary ready. PDF export."

[2:00] CLICK Network Node (CEO)
"While fighting crisis, THIS CEO is leaving"
"AED 750k account, 85% churn risk"

[2:15] Customer detail slides in
"Response script ready. 90% retention chance."

[2:30] CLOSE
"NEXUS: Predicts crises path-by-path. Saves revenue AND reputation."
```

---

## 📱 MOBILE NAVIGATION

**Fixed Bottom Nav (5 icons):**
```
[🔴 Clusters] [📊 Posts] [🔍 RCA] [📋 Brief] [🕸️ Network] [👤 Customers]
      Active (orange highlight)
```

**Swipe Gestures:**
- Left/Right: Navigate sections
- Up: Scroll within section
- Tap cluster: Auto-scroll to Posts

---

## ⚙️ TECHNICAL IMPLEMENTATION

### Data Generation (Static JSON for Demo)

```javascript
// clusters.json
const clusters = [
  {
    id: 'api_down',
    name: 'API Downtime',
    count: 12,
    risk: 92,
    rootCause: 'Auto-scaling CPU threshold misconfigured',
    color: 'red'
  },
  {
    id: 'app_crash',
    name: 'App Crashes',
    count: 8,
    risk: 67,
    rootCause: 'Memory leak in payment module',
    color: 'yellow'
  },
  {
    id: 'billing',
    name: 'Billing Issues',
    count: 5,
    risk: 45,
    rootCause: 'Payment gateway timeout',
    color: 'green'
  }
];

// narrativeChain.json
const narrativeChain = [
  {
    id: 1,
    step: 'ORIGINATOR',
    time: '08:00',
    handle: '@TechCEO_Dubai',
    text: 'API down 3hrs, lost production revenue 😡',
    reach: 125000,
    sentiment: -0.9,
    color: 'red'
  },
  {
    id: 2,
    step: 'AMPLIFIER',
    time: '09:15',
    handle: '@DevGuru_UAE',
    text: 'Same enterprise outage at Mashreq',
    reach: 45000,
    sentiment: -0.7,
    color: 'orange'
  },
  {
    id: 3,
    step: 'MISINFO',
    time: '09:45',
    handle: '@BankWatcher',
    text: 'Mashreq data breach confirmed?',
    reach: 89000,
    sentiment: -0.95,
    color: 'yellow'
  },
  {
    id: 4,
    step: 'CRITICAL',
    time: '11:00',
    handle: '@NewsUAE',
    text: 'Bank investigating alleged breach...',
    reach: 250000,
    sentiment: -0.85,
    color: 'red'
  }
];

// preventionNodes.json
const preventionNodes = [
  {
    id: 'node_2',
    node: '@DevGuru_UAE',
    action: 'Private DM with accurate info',
    impact: -40,
    color: 'orange'
  },
  {
    id: 'node_3',
    node: '@BankWatcher',
    action: 'Public fact-check post',
    impact: -65,
    color: 'yellow'
  },
  {
    id: 'node_4',
    node: '@NewsUAE',
    action: 'Proactive media outreach',
    impact: -80,
    color: 'red'
  }
];
```

### Claude Integration (Mock for Demo)

```javascript
// For hackathon: Hardcoded responses
const mockClaudeRCA = {
  root_cause: 'Auto-scaling CPU threshold set too high',
  why_chain: [
    'API down',
    'Load balancer failed under load',
    'Traffic spike during peak hours',
    'Auto-scaling delayed response',
    'CPU threshold configured at 90% (too high)'
  ],
  prevention: [
    'Lower threshold to 70% during peak hours',
    'Implement predictive auto-scaling',
    'Load test at 2x expected traffic'
  ],
  confidence: 94
};

const mockStrategyFeedback = {
  score: 7.8,
  why_good: 'Addresses both emotion (apology) and economics (refund)',
  risks: '15% chance of refund precedent',
  cost: 22000,
  roi: 'AED 420k',
  improvements: 'Add private CEO call → 8.9/10',
  confidence: 89
};
```

---

## ✅ BUILD CHECKLIST (22 Hours)

### Phase 1: Core Setup (4h)
- [ ] React + TypeScript + Tailwind + Zustand
- [ ] Generate clusters JSON (3 clusters)
- [ ] Generate narrative chain JSON (4 steps)
- [ ] Generate prevention nodes JSON (3 nodes)
- [ ] Setup Zustand store with all state

### Phase 2: Section 1-2 (4h)
- [ ] Clusters hero (3 bubbles, click → scroll)
- [ ] Posts timeline (color-coded status)
- [ ] Smooth scroll animations

### Phase 3: Section 3 (RCA + Strategies) (4h)
- [ ] RCA panel with 5 Whys display
- [ ] Strategy comparison table (4 strategies)
- [ ] Strategy Lab input + mock AI feedback

### Phase 4: Section 4-5 (Exec + Network) (5h)
- [ ] Executive Brief metrics + PDF button
- [ ] Narrative chain timeline (vertical)
- [ ] Cascade prediction chart (line graph)
- [ ] Prevention controls (toggle + live impact)

### Phase 5: Section 6 (Customers) (3h)
- [ ] Network graph (React Flow)
- [ ] CEO customer cards
- [ ] Customer detail slide-in panel
- [ ] Response script display

### Phase 6: Polish (2h)
- [ ] Mobile bottom nav (6 icons)
- [ ] Swipe gestures
- [ ] Loading states
- [ ] Hover effects
- [ ] Demo practice

---

## 🎯 SUCCESS CRITERIA

```
✅ Clean 6-section vertical flow (mobile-first)
✅ Clusters clickable → Auto-scroll to Posts
✅ RCA 5 Whys displays root cause + prevention
✅ Strategy Lab: Custom idea → AI feedback in 2s
✅ Narrative chain: 4-step crisis path visualization
✅ Cascade prediction: Chart with/without prevention
✅ Prevention controls: Interactive sliders → Live impact
✅ Exec Brief: 1-click PDF-ready summary
✅ Network graph: Click node → Customer detail
✅ Mobile responsive: Works perfect on phone
✅ Mashreq branded: Orange/gold throughout
✅ Demo ready: 90s walkthrough smooth
✅ No clutter: White space + progressive disclosure
✅ Layman-friendly: Any non-tech can understand
```

---

## 🏆 WHY THIS WINS HACKATHONS

**Most crisis tools:** Network graph + "47 complaints detected"  
**NEXUS:** "CEO complains → Devs amplify → Breach misinfo → Media article. DM Node 2 NOW = -40% cascade."

**Most customer tools:** "85% churn risk"  
**NEXUS:** "AED 750k CEO leaving. Here's exact script. 90% save chance."

**Most demos:** Static screenshots  
**NEXUS:** Judges test own strategies in Strategy Lab → "7.8/10" feedback

**Innovation:** Narrative chain = Crisis fortune-telling. Prevention controls = Interactive decision-making.

**Result:** Judges think: "This predicts our PR nightmare AND tells us exactly what to do."

---

## 📂 FILES TO DELIVER

```
nexus-4.0/
├── README.md (this file)
├── CURSOR_PROMPT.txt (copy-paste ready)
├── src/
│   ├── data/
│   │   ├── clusters.json
│   │   ├── narrativeChain.json
│   │   ├── preventionNodes.json
│   │   └── customers.json
│   ├── components/
│   │   ├── Clusters.tsx
│   │   ├── Posts.tsx
│   │   ├── RCA.tsx
│   │   ├── StrategyLab.tsx
│   │   ├── NarrativeChain.tsx
│   │   ├── CascadePrediction.tsx
│   │   ├── PreventionControls.tsx
│   │   ├── ExecBrief.tsx
│   │   └── Customers.tsx
│   └── store/
│       └── useStore.ts
└── public/
    └── demo-script.md
```

---

## 🚀 NEXT STEPS

1. **Download this file** (save as NEXUS_4.0_SPECIFICATIONS.md)
2. **Copy CURSOR_PROMPT.txt** (included at bottom)
3. **Paste into Cursor** → "Build this exactly"
4. **22 hours later** → Production demo ready
5. **Practice 90s script** → Win hackathon

---

## 📋 CURSOR PROMPT (Copy Everything Below)

```
NEXUS 4.0 - AI CRISIS INTELLIGENCE PLATFORM

Build a 6-section vertical-scroll crisis intelligence dashboard:

SECTION 1: CLUSTERS
- 3 bubble cards (API Down🔴12, App Crash🟡8, Billing🟢5)
- Click → Scroll to Posts section
- Use clusters.json data

SECTION 2: POSTS/ACTIVITY  
- Timeline of posts with status badges (🔴Active, 🟡Watch, 🟢Resolved)
- Auto-scrolls when cluster clicked

SECTION 3: RCA + STRATEGIES
- LEFT: 5 Whys chain (vertical timeline)
- RIGHT: 4 strategies table (Score/Cost/Time/ROI)
- BOTTOM: Strategy Lab (input → mock AI feedback in 2s)

SECTION 4: EXEC BRIEF
- Clean metrics card
- [📥 PDF] [📧 EMAIL] buttons

SECTION 5: NETWORK ANALYSIS ⭐ KEY FEATURE
- Narrative Chain Timeline (4 steps: Originator→Amplifier→Misinfo→Critical)
- Cascade Prediction Chart (line graph: +2h 65%, +6h 92%, +24h 98%)
- Prevention Controls (3 toggle buttons with -40%, -65%, -80% impact)
- Live viral risk updates when controls toggled

SECTION 6: CUSTOMERS
- React Flow network graph
- Click node → Customer detail slides in
- Churn risk + response script

TECH STACK:
- React 18 + TypeScript + Tailwind CSS
- Zustand (state)
- React Flow (network graph)
- Framer Motion (animations)

COLORS (Mashreq):
- Primary: #F39C12 (orange)
- Gold: #E8A92C
- Success: #27AE60
- Error: #E74C3C

MOBILE:
- Vertical scroll (1 section at a time)
- Bottom nav (6 icons)
- Touch-friendly (48px buttons)

DATA:
- All static JSON (no API calls)
- Use provided clusters.json, narrativeChain.json, preventionNodes.json

BUILD ORDER:
1. Setup + data files (2h)
2. Sections 1-2 (4h)
3. Section 3 RCA+Strategies (4h)
4. Sections 4-5 Brief+Network (5h)
5. Section 6 Customers (3h)
6. Mobile + polish (4h)

DEMO READY IN 22 HOURS. BUILD THIS EXACTLY.
```

---

**END OF SPECIFICATIONS**  
**Version:** 4.0 Final  
**Date:** February 1, 2026  
**Status:** Ready for Implementation  
**Target:** Hackathon Winner 🏆
