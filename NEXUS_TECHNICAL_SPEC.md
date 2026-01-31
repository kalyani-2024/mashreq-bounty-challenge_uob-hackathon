# NEXUS - Dual-Track Social Intelligence System
## Complete Technical Specification for Rapid Development

---

## 🎯 PROJECT OVERVIEW

**Name:** NEXUS - AI-Powered Social Intelligence & Crisis Navigation System

**Tagline:** "Map the network. Predict the cascade. Navigate the crisis."

**Core Innovation:** Dual-track system that handles BOTH viral crisis detection AND high-value customer retention

**Tech Stack:**
- Frontend: React 18 + Vite
- UI: Tailwind CSS + shadcn/ui
- Network Viz: React Flow
- Charts: Recharts
- Backend: Node.js + Express (optional - can be frontend-only)
- AI: Claude API (Anthropic)
- State: React Context or Zustand

**Development Time:** 18-22 hours (one intensive day)

---

## 📁 PROJECT STRUCTURE

```
nexus/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── CrisisTrack.jsx
│   │   ├── CustomerTrack.jsx
│   │   ├── NetworkGraph.jsx
│   │   ├── CascadePredictor.jsx
│   │   ├── ResponseSimulator.jsx
│   │   ├── CustomerIntelligence.jsx
│   │   ├── ResponseAdvisor.jsx
│   │   └── ApprovalWorkflow.jsx
│   ├── data/
│   │   ├── personas.json
│   │   ├── network.json
│   │   ├── crisisScenarios.json
│   │   └── customerData.json
│   ├── utils/
│   │   ├── priorityScoring.js
│   │   ├── cascadePrediction.js
│   │   └── claudeAPI.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🚀 QUICK START COMMANDS

```bash
# Create project
npm create vite@latest nexus -- --template react
cd nexus

# Install dependencies
npm install
npm install reactflow recharts lucide-react zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Optional: shadcn/ui
npx shadcn-ui@latest init

# Run
npm run dev
```

---

## 📊 DATA STRUCTURES

### 1. Persona Structure (personas.json)

```json
{
  "personas": [
    {
      "id": "p001",
      "name": "Tech Guru UAE",
      "handle": "@TechGuru_UAE",
      "type": "influencer",
      "followerCount": 200000,
      "trustScore": 8.5,
      "sentiment": "neutral",
      "influence": {
        "reach": "high",
        "engagement": 0.045
      },
      "isCustomer": false,
      "accountValue": 0,
      "position": { "x": 400, "y": 200 },
      "connections": ["p002", "p005", "p012"],
      "postHistory": ["neutral", "positive", "neutral"]
    },
    {
      "id": "p002",
      "name": "CEO Startup Dubai",
      "handle": "@CEO_Startup",
      "type": "high_value_customer",
      "followerCount": 80000,
      "trustScore": 7.8,
      "sentiment": "positive",
      "influence": {
        "reach": "medium",
        "engagement": 0.038
      },
      "isCustomer": true,
      "accountValue": 750000,
      "tenure": 7,
      "products": ["business_banking", "corporate_card", "investment"],
      "position": { "x": 600, "y": 300 },
      "connections": ["p001", "p008", "p015"],
      "postHistory": ["positive", "positive", "positive", "positive"]
    },
    {
      "id": "p003",
      "name": "Angry Customer",
      "handle": "@AlwaysAngry",
      "type": "chronic_complainer",
      "followerCount": 450,
      "trustScore": 2.1,
      "sentiment": "negative",
      "influence": {
        "reach": "low",
        "engagement": 0.012
      },
      "isCustomer": true,
      "accountValue": 5000,
      "tenure": 1,
      "products": ["savings"],
      "position": { "x": 200, "y": 400 },
      "connections": ["p004"],
      "postHistory": ["negative", "negative", "negative", "negative", "negative"]
    }
  ]
}
```

**Generate 50 personas total with types:**
- `influencer` (5-8 personas)
- `high_value_customer` (3-5 personas)
- `journalist` (2-3 personas)
- `brand_advocate` (5-7 personas)
- `retail_customer` (20-25 personas)
- `chronic_complainer` (2-3 personas)
- `bot` (3-5 personas)

---

### 2. Crisis Scenario Structure (crisisScenarios.json)

```json
{
  "scenarios": [
    {
      "id": "crisis_001",
      "type": "service_disruption",
      "title": "ATM Service Issues",
      "status": "active",
      "severity": "high",
      "detectedAt": "2026-01-30T10:23:00Z",
      "posts": [
        {
          "id": "post_001",
          "personaId": "p025",
          "timestamp": "2026-01-30T10:23:00Z",
          "content": "Mashreq ATM ate my card and won't give it back! 😡 Dubai Mall branch",
          "sentiment": -0.85,
          "reach": 450,
          "engagement": 12
        },
        {
          "id": "post_002",
          "personaId": "p032",
          "timestamp": "2026-01-30T10:45:00Z",
          "content": "Same happened to me yesterday at Marina branch. What's going on?",
          "sentiment": -0.72,
          "reach": 280,
          "engagement": 8
        },
        {
          "id": "post_003",
          "personaId": "p015",
          "timestamp": "2026-01-30T11:12:00Z",
          "content": "Hearing reports of ATM issues across UAE. Anyone else affected? @MashreqBank",
          "sentiment": -0.65,
          "reach": 3200,
          "engagement": 156
        }
      ],
      "metrics": {
        "postCount": 47,
        "uniqueUsers": 38,
        "totalReach": 125000,
        "avgSentiment": -0.78,
        "viralProbability": 0.80,
        "trendingIn": "6 hours"
      },
      "narrativeChain": [
        {
          "stage": "origin",
          "time": "10:23 AM",
          "description": "Original complaint posted",
          "postIds": ["post_001"]
        },
        {
          "stage": "amplification",
          "time": "10:45 AM",
          "description": "Multiple users confirm similar issues",
          "postIds": ["post_002", "post_006", "post_011"]
        },
        {
          "stage": "critical",
          "time": "11:12 AM",
          "description": "Influencer notices and amplifies",
          "postIds": ["post_003"]
        },
        {
          "stage": "predicted_viral",
          "time": "4:00 PM (predicted)",
          "description": "Expected to trend if not addressed",
          "postIds": []
        }
      ],
      "cascadePrediction": {
        "hour_2": { "posts": 8, "reach": 15000, "probability": 0.65 },
        "hour_6": { "posts": 23, "reach": 85000, "probability": 0.80 },
        "hour_24": { "posts": 120, "reach": 500000, "probability": 0.85 },
        "hour_48": { "posts": 450, "reach": 2000000, "probability": 0.75 }
      }
    },
    {
      "id": "crisis_002",
      "type": "fraud_rumor",
      "title": "Phishing Scam Reports",
      "status": "monitoring",
      "severity": "medium",
      "detectedAt": "2026-01-30T09:15:00Z",
      "posts": [
        {
          "id": "post_101",
          "personaId": "p042",
          "timestamp": "2026-01-30T09:15:00Z",
          "content": "Got a suspicious SMS claiming to be from Mashreq asking for my PIN. Be careful!",
          "sentiment": -0.55,
          "reach": 850,
          "engagement": 45
        }
      ],
      "metrics": {
        "postCount": 12,
        "uniqueUsers": 11,
        "totalReach": 18000,
        "avgSentiment": -0.62,
        "viralProbability": 0.35,
        "trendingIn": "unlikely"
      }
    }
  ]
}
```

**Create 4 scenarios:**
1. `service_disruption` - ATM issues (HIGH severity)
2. `fraud_rumor` - Phishing scam reports (MEDIUM severity)
3. `positive_feedback` - Branch service praise (LOW severity)
4. `misinformation` - False data breach claim (HIGH severity)

---

### 3. Customer Intelligence Structure (customerData.json)

```json
{
  "highPriorityCustomers": [
    {
      "id": "cust_001",
      "personaId": "p002",
      "handle": "@CEO_Startup",
      "name": "Ahmed Al-Mahmoud",
      "priorityScore": 9.2,
      "accountData": {
        "accountValue": 750000,
        "tenure": 7,
        "products": ["business_banking", "corporate_card", "investment_portfolio"],
        "lifetimeValue": 2000000,
        "profitability": "high"
      },
      "complaint": {
        "id": "comp_001",
        "timestamp": "2026-01-30T14:23:00Z",
        "content": "Mashreq card declined at important investor meeting. Embarrassing. Seriously considering switching banks.",
        "sentiment": -0.88,
        "severity": "high",
        "issueType": "service_failure",
        "publicVisibility": true
      },
      "riskAssessment": {
        "churnProbability": 0.85,
        "reputationalImpact": "high",
        "urgency": "immediate",
        "responseDeadline": "30 minutes"
      },
      "sentimentHistory": [
        { "date": "2025-12-15", "score": 0.7 },
        { "date": "2026-01-05", "score": 0.8 },
        { "date": "2026-01-20", "score": 0.75 },
        { "date": "2026-01-30", "score": -0.88 }
      ],
      "relationship": {
        "relationshipManager": "Sarah Thompson",
        "lastContact": "2026-01-15",
        "engagementLevel": "high",
        "complaintsHistory": 0
      },
      "influence": {
        "followers": 80000,
        "reach": "medium",
        "industry": "tech_startup"
      }
    }
  ]
}
```

**Generate 5 high-priority customers** with varying:
- Account values: AED 100k - 2M
- Tenure: 1-10 years
- Priority scores: 7.5 - 9.5
- Different issue types

---

### 4. Response Strategy Templates

```json
{
  "crisisResponses": [
    {
      "id": "strategy_a",
      "name": "Immediate Public Statement",
      "description": "Issue official statement on all channels",
      "steps": [
        "Draft official statement",
        "Get legal approval",
        "Post on Twitter, LinkedIn, Facebook",
        "Monitor response"
      ],
      "estimatedTime": "2 hours",
      "riskLevel": "medium"
    },
    {
      "id": "strategy_b",
      "name": "Private Influencer Outreach",
      "description": "Contact key influencers privately before public statement",
      "steps": [
        "Identify key influencers in network",
        "Prepare accurate information",
        "Direct message/call within 30 mins",
        "Request they help clarify situation",
        "Then issue public statement"
      ],
      "estimatedTime": "4 hours",
      "riskLevel": "low"
    },
    {
      "id": "strategy_c",
      "name": "Silent Monitoring",
      "description": "Monitor without immediate response",
      "steps": [
        "Continue monitoring for 48 hours",
        "Track sentiment and reach",
        "Respond only if reaches threshold"
      ],
      "estimatedTime": "48 hours",
      "riskLevel": "high"
    }
  ],
  "customerResponses": {
    "vip_recovery": {
      "name": "VIP Recovery Protocol",
      "steps": [
        {
          "step": 1,
          "action": "Immediate Personal Outreach",
          "who": "Relationship Manager",
          "when": "Within 30 minutes",
          "channel": "Phone call + Direct Message",
          "script": "Mr./Ms. [Name], this is [RM Name] from Mashreq. I just saw your post and I sincerely apologize for the inconvenience with your card. I'm personally looking into this right now and will have answers within the hour. Your relationship with us matters deeply, and we're committed to making this right immediately."
        },
        {
          "step": 2,
          "action": "Issue Resolution",
          "details": [
            "Investigate decline reason",
            "Ensure no future occurrences",
            "Provide temporary backup solution",
            "Expedite replacement if needed"
          ]
        },
        {
          "step": 3,
          "action": "Relationship Reinforcement",
          "options": [
            "Waive all fees for 6 months",
            "Upgrade to premium card",
            "Personal banking concierge service",
            "Executive meeting scheduled"
          ]
        }
      ],
      "expectedOutcome": {
        "retentionProbability": 0.90,
        "sentimentShift": { "from": -0.88, "to": 0.60 },
        "publicPostOutcome": "75% chance of positive follow-up or deletion"
      }
    }
  }
}
```

---

## 🧮 UTILITY FUNCTIONS

### priorityScoring.js

```javascript
/**
 * Calculate customer priority score
 * Score range: 0-10 (higher = more urgent)
 */
export function calculatePriorityScore(customer) {
  const weights = {
    accountValue: 0.3,
    tenure: 0.2,
    productUsage: 0.2,
    severity: 0.2,
    influence: 0.1
  };

  // Normalize account value (0-10 scale)
  const accountScore = Math.min(customer.accountValue / 200000, 1) * 10;
  
  // Normalize tenure (0-10 scale, cap at 10 years)
  const tenureScore = Math.min(customer.tenure / 10, 1) * 10;
  
  // Product usage score
  const productScore = Math.min(customer.products.length / 5, 1) * 10;
  
  // Severity score from complaint
  const severityMap = {
    low: 2,
    medium: 5,
    high: 9,
    critical: 10
  };
  const severityScore = severityMap[customer.complaint.severity] || 5;
  
  // Influence score based on followers
  const influenceScore = Math.min(customer.influence.followers / 100000, 1) * 10;
  
  // Calculate weighted score
  const totalScore = 
    (accountScore * weights.accountValue) +
    (tenureScore * weights.tenure) +
    (productScore * weights.productUsage) +
    (severityScore * weights.severity) +
    (influenceScore * weights.influence);
  
  return {
    total: parseFloat(totalScore.toFixed(1)),
    breakdown: {
      accountValue: parseFloat((accountScore * weights.accountValue).toFixed(1)),
      tenure: parseFloat((tenureScore * weights.tenure).toFixed(1)),
      productUsage: parseFloat((productScore * weights.productUsage).toFixed(1)),
      severity: parseFloat((severityScore * weights.severity).toFixed(1)),
      influence: parseFloat((influenceScore * weights.influence).toFixed(1))
    }
  };
}

/**
 * Calculate churn probability
 */
export function calculateChurnRisk(customer) {
  let churnScore = 0;
  
  // Negative sentiment increases churn
  if (customer.complaint.sentiment < -0.5) {
    churnScore += 0.3;
  }
  if (customer.complaint.sentiment < -0.8) {
    churnScore += 0.2;
  }
  
  // Public visibility increases risk
  if (customer.complaint.publicVisibility) {
    churnScore += 0.15;
  }
  
  // High-value customers more likely to have options
  if (customer.accountData.accountValue > 500000) {
    churnScore += 0.1;
  }
  
  // Long tenure customers rarely churn unless severely upset
  if (customer.accountData.tenure > 5 && customer.complaint.severity === 'high') {
    churnScore += 0.1;
  }
  
  return Math.min(churnScore, 0.95);
}

/**
 * Determine urgency level
 */
export function calculateUrgency(priorityScore, churnRisk) {
  if (priorityScore >= 8.5 && churnRisk >= 0.7) {
    return {
      level: 'critical',
      responseTime: '30 minutes',
      color: 'red'
    };
  } else if (priorityScore >= 7.0 && churnRisk >= 0.5) {
    return {
      level: 'high',
      responseTime: '2 hours',
      color: 'orange'
    };
  } else if (priorityScore >= 5.0) {
    return {
      level: 'medium',
      responseTime: '24 hours',
      color: 'yellow'
    };
  } else {
    return {
      level: 'low',
      responseTime: '48 hours',
      color: 'green'
    };
  }
}
```

---

### cascadePrediction.js

```javascript
/**
 * Predict viral cascade through network
 */
export function predictCascade(crisis, networkGraph) {
  const { posts, metrics } = crisis;
  
  // Find initial posters
  const initialNodes = posts.map(p => p.personaId);
  
  // Find their connections (1st degree)
  const firstDegree = new Set();
  initialNodes.forEach(nodeId => {
    const node = networkGraph.personas.find(p => p.id === nodeId);
    if (node) {
      node.connections.forEach(connId => firstDegree.add(connId));
    }
  });
  
  // Calculate amplification probability for each connected node
  const amplificationProbabilities = Array.from(firstDegree).map(nodeId => {
    const node = networkGraph.personas.find(p => p.id === nodeId);
    
    // Factors affecting amplification
    const trustFactor = node.trustScore / 10;
    const engagementFactor = node.influence.engagement;
    const sentimentAlignment = node.sentiment === 'negative' ? 1.5 : 0.5;
    
    const probability = (trustFactor * 0.3 + engagementFactor * 10 * 0.4) * sentimentAlignment;
    
    return {
      nodeId,
      node,
      probability: Math.min(probability, 0.95)
    };
  });
  
  // Sort by probability
  const likelyAmplifiers = amplificationProbabilities
    .filter(a => a.probability > 0.3)
    .sort((a, b) => b.probability - a.probability);
  
  // Calculate reach over time
  const timelineProjection = [
    {
      hours: 2,
      posts: posts.length + Math.floor(likelyAmplifiers.length * 0.3),
      reach: metrics.totalReach * 1.5,
      probability: 0.65
    },
    {
      hours: 6,
      posts: posts.length + Math.floor(likelyAmplifiers.length * 0.6),
      reach: metrics.totalReach * 3.5,
      probability: metrics.viralProbability
    },
    {
      hours: 24,
      posts: posts.length + Math.floor(likelyAmplifiers.length * 1.2),
      reach: metrics.totalReach * 8,
      probability: metrics.viralProbability + 0.05
    },
    {
      hours: 48,
      posts: posts.length * 3,
      reach: metrics.totalReach * 15,
      probability: metrics.viralProbability - 0.1
    }
  ];
  
  return {
    likelyAmplifiers: likelyAmplifiers.slice(0, 10),
    criticalNodes: likelyAmplifiers.slice(0, 3),
    timelineProjection,
    viralThreshold: timelineProjection[1].reach > 100000
  };
}

/**
 * Identify critical influence pathways
 */
export function identifyInfluencePaths(startNodeId, targetReach, networkGraph) {
  const paths = [];
  
  const startNode = networkGraph.personas.find(p => p.id === startNodeId);
  if (!startNode) return paths;
  
  // BFS to find high-reach paths
  const queue = [[startNode]];
  const visited = new Set([startNodeId]);
  
  while (queue.length > 0) {
    const path = queue.shift();
    const currentNode = path[path.length - 1];
    
    // Calculate cumulative reach of this path
    const cumulativeReach = path.reduce((sum, node) => sum + node.followerCount, 0);
    
    if (cumulativeReach >= targetReach) {
      paths.push({
        path: path.map(n => ({ id: n.id, name: n.name, reach: n.followerCount })),
        totalReach: cumulativeReach,
        depth: path.length
      });
      continue;
    }
    
    // Explore connections
    currentNode.connections.forEach(connId => {
      if (!visited.has(connId) && path.length < 4) {
        const connNode = networkGraph.personas.find(p => p.id === connId);
        if (connNode) {
          visited.add(connId);
          queue.push([...path, connNode]);
        }
      }
    });
  }
  
  return paths.slice(0, 5);
}
```

---

### claudeAPI.js

```javascript
/**
 * Claude API integration
 * NOTE: For demo purposes, you can pre-generate responses or use mock data
 * For production, this would make actual API calls
 */

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || '';

/**
 * Simulate response to a crisis strategy
 */
export async function simulateCrisisResponse(crisis, strategy) {
  // For demo: return pre-generated data
  // For real implementation: call Claude API
  
  const mockSimulation = {
    strategy: strategy.name,
    predictedOutcome: {
      sentimentShift: {
        before: crisis.metrics.avgSentiment,
        after: crisis.metrics.avgSentiment + (strategy.id === 'strategy_b' ? 0.43 : 0.23),
        change: strategy.id === 'strategy_b' ? '+0.43' : '+0.23'
      },
      viralProbability: {
        before: crisis.metrics.viralProbability,
        after: strategy.id === 'strategy_b' ? 0.25 : 0.55,
        change: strategy.id === 'strategy_b' ? '-55%' : '-25%'
      },
      reach: {
        before: crisis.metrics.totalReach,
        after: strategy.id === 'strategy_b' ? 150000 : 300000,
        change: strategy.id === 'strategy_b' ? '-70%' : '-40%'
      },
      affectedNodes: {
        before: crisis.posts.length,
        after: strategy.id === 'strategy_b' ? 18 : 35
      }
    },
    predictedPosts: [
      {
        personaId: 'p001',
        name: 'Tech Guru UAE',
        content: strategy.id === 'strategy_b' 
          ? "Just spoke with Mashreq team - the ATM issue was isolated to one machine. Systems running normally. Quick response from them 👍"
          : "Still seeing reports of ATM issues @MashreqBank. Official statement says it's fixed but users still complaining...",
        sentiment: strategy.id === 'strategy_b' ? 0.65 : -0.35,
        probability: strategy.id === 'strategy_b' ? 0.75 : 0.60
      },
      {
        personaId: 'p015',
        name: 'Finance Blogger',
        content: strategy.id === 'strategy_b'
          ? "Good to see Mashreq addressing the ATM issue proactively. Transparency matters."
          : "Mashreq's denial doesn't match what customers are reporting. Trust issues?",
        sentiment: strategy.id === 'strategy_b' ? 0.45 : -0.55,
        probability: 0.60
      },
      {
        personaId: 'p032',
        name: 'Random User',
        content: "Still skeptical but at least they're acknowledging it...",
        sentiment: -0.15,
        probability: 0.50
      }
    ],
    riskAssessment: {
      level: strategy.id === 'strategy_b' ? 'low' : 'medium',
      containment: strategy.id === 'strategy_b' ? 'high' : 'moderate',
      recommendation: strategy.id === 'strategy_b' 
        ? 'Crisis effectively contained. Continue monitoring for 48 hours.'
        : 'Partial containment. May require follow-up actions.'
    },
    confidence: strategy.id === 'strategy_b' ? 0.78 : 0.65
  };
  
  return mockSimulation;
}

/**
 * Generate customer response recommendations
 */
export async function generateCustomerResponse(customer) {
  // Mock response - in production, call Claude API
  
  const recommendations = {
    strategy: 'VIP Recovery Protocol',
    confidence: 0.92,
    steps: [
      {
        step: 1,
        title: 'Immediate Personal Outreach',
        who: customer.relationship.relationshipManager,
        when: 'Within 30 minutes',
        channel: 'Phone call + DM',
        script: `${customer.name}, this is ${customer.relationship.relationshipManager} from Mashreq. I just saw your post about the card decline and I sincerely apologize. This is completely unacceptable, especially given your ${customer.accountData.tenure}-year relationship with us. I'm personally investigating this right now and will have answers within the hour. Your business matters deeply to us.`,
        priority: 'critical'
      },
      {
        step: 2,
        title: 'Issue Resolution',
        actions: [
          'Investigate decline reason immediately',
          'Check for systemic issues',
          'Provide temporary backup payment solution',
          'Expedite replacement card if needed',
          'Ensure no future occurrences'
        ],
        timeline: '1-2 hours'
      },
      {
        step: 3,
        title: 'Relationship Reinforcement',
        options: [
          {
            action: 'Waive all fees for 6 months',
            estimatedValue: 'AED 2,400',
            impact: 'Good gesture, expected'
          },
          {
            action: 'Upgrade to Platinum card',
            estimatedValue: 'AED 5,000/year',
            impact: 'Shows commitment to relationship'
          },
          {
            action: 'Personal banking concierge',
            estimatedValue: 'Premium service',
            impact: 'VIP treatment, prevents future issues'
          },
          {
            action: 'Executive meeting + investment review',
            estimatedValue: 'Relationship building',
            impact: 'Deepens relationship, upsell opportunity'
          }
        ],
        recommended: 'Combine fee waiver + executive meeting'
      }
    ],
    expectedOutcome: {
      retentionProbability: 0.90,
      sentimentShift: {
        from: customer.complaint.sentiment,
        to: 0.60,
        change: '+1.48 (significant improvement)'
      },
      publicPostOutcome: {
        positive_followup: 0.45,
        deletion: 0.30,
        neutral_silence: 0.20,
        continued_negative: 0.05
      },
      lifetimeValueProtected: customer.accountData.lifetimeValue,
      additionalBenefits: [
        'Potential positive testimonial',
        'Strengthened relationship for upsell',
        'Reduced influence risk (80k followers)'
      ]
    },
    ifNoAction: {
      churnProbability: 0.85,
      lostRevenue: customer.accountData.lifetimeValue,
      reputationalImpact: 'Negative post remains visible to 80k followers',
      cascadeRisk: 'Medium - may influence other business clients'
    },
    urgencyJustification: `First complaint in ${customer.accountData.tenure} years from a ${customer.accountData.accountValue.toLocaleString()} AED account holder. Public embarrassment + high influence = critical retention risk.`
  };
  
  return recommendations;
}

/**
 * Analyze sentiment trend
 */
export function analyzeSentimentTrend(sentimentHistory) {
  if (sentimentHistory.length < 2) return 'insufficient_data';
  
  const recent = sentimentHistory.slice(-3);
  const avgRecent = recent.reduce((sum, s) => sum + s.score, 0) / recent.length;
  const older = sentimentHistory.slice(0, -3);
  const avgOlder = older.length > 0 
    ? older.reduce((sum, s) => sum + s.score, 0) / older.length 
    : avgRecent;
  
  const change = avgRecent - avgOlder;
  
  if (change < -0.5) return { trend: 'sharp_decline', urgency: 'high' };
  if (change < -0.2) return { trend: 'declining', urgency: 'medium' };
  if (change > 0.2) return { trend: 'improving', urgency: 'low' };
  return { trend: 'stable', urgency: 'low' };
}
```

---

## 🎨 COMPONENT SPECIFICATIONS

### Dashboard.jsx

```jsx
import { useState } from 'react';
import CrisisTrack from './CrisisTrack';
import CustomerTrack from './CustomerTrack';

export default function Dashboard() {
  const [activeTrack, setActiveTrack] = useState('crisis'); // 'crisis' or 'customer'
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NEXUS
              </h1>
              <p className="text-sm text-gray-400">Dual-Track Social Intelligence</p>
            </div>
            
            {/* Track Selector */}
            <div className="flex gap-2 bg-gray-800/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTrack('crisis')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTrack === 'crisis'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🚨 Crisis Track
              </button>
              <button
                onClick={() => setActiveTrack('customer')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeTrack === 'customer'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                💙 Customer Track
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTrack === 'crisis' ? <CrisisTrack /> : <CustomerTrack />}
      </main>
    </div>
  );
}
```

---

### NetworkGraph.jsx

```jsx
import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function NetworkGraph({ personas, highlightNodes = [] }) {
  // Convert personas to React Flow nodes
  const initialNodes = useMemo(() => {
    return personas.map(persona => {
      const isHighlighted = highlightNodes.includes(persona.id);
      
      // Determine color based on sentiment and type
      let bgColor = '#6b7280'; // gray
      if (persona.sentiment === 'positive') bgColor = '#10b981'; // green
      if (persona.sentiment === 'negative') bgColor = '#ef4444'; // red
      if (persona.type === 'influencer') bgColor = '#8b5cf6'; // purple
      if (persona.type === 'high_value_customer') bgColor = '#f59e0b'; // amber
      
      // Size based on follower count
      const size = Math.max(40, Math.min(persona.followerCount / 2000, 120));
      
      return {
        id: persona.id,
        type: 'default',
        position: persona.position,
        data: {
          label: (
            <div className="text-center">
              <div className="font-semibold text-xs">{persona.name}</div>
              <div className="text-[10px] text-gray-400">
                {(persona.followerCount / 1000).toFixed(0)}k
              </div>
            </div>
          )
        },
        style: {
          background: bgColor,
          color: 'white',
          border: isHighlighted ? '3px solid #fbbf24' : '2px solid #374151',
          borderRadius: '50%',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          boxShadow: isHighlighted ? '0 0 20px #fbbf24' : '0 4px 6px rgba(0,0,0,0.3)',
          transition: 'all 0.3s'
        }
      };
    });
  }, [personas, highlightNodes]);

  // Convert connections to React Flow edges
  const initialEdges = useMemo(() => {
    const edges = [];
    personas.forEach(persona => {
      persona.connections.forEach(connId => {
        edges.push({
          id: `${persona.id}-${connId}`,
          source: persona.id,
          target: connId,
          animated: highlightNodes.includes(persona.id) || highlightNodes.includes(connId),
          style: {
            stroke: highlightNodes.includes(persona.id) ? '#fbbf24' : '#4b5563',
            strokeWidth: highlightNodes.includes(persona.id) ? 2 : 1
          }
        });
      });
    });
    return edges;
  }, [personas, highlightNodes]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[600px] bg-gray-900 rounded-lg border border-gray-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#374151" gap={16} />
        <Controls className="bg-gray-800 border-gray-700" />
        <MiniMap
          className="bg-gray-800"
          nodeColor={(node) => node.style.background}
          maskColor="rgba(0, 0, 0, 0.6)"
        />
      </ReactFlow>
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur p-4 rounded-lg border border-gray-700 text-sm">
        <div className="font-semibold mb-2">Legend</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <span>Influencer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-600"></div>
            <span>High-Value Customer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span>Positive Sentiment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span>Negative Sentiment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### CrisisTrack.jsx

```jsx
import { useState } from 'react';
import NetworkGraph from './NetworkGraph';
import CascadePredictor from './CascadePredictor';
import ResponseSimulator from './ResponseSimulator';
import crisisData from '../data/crisisScenarios.json';
import networkData from '../data/network.json';

export default function CrisisTrack() {
  const [selectedCrisis, setSelectedCrisis] = useState(crisisData.scenarios[0]);
  const [showSimulator, setShowSimulator] = useState(false);

  return (
    <div className="space-y-6">
      {/* Crisis Overview Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4">
          <div className="text-red-400 text-sm font-medium">Active Crises</div>
          <div className="text-3xl font-bold mt-2">1</div>
          <div className="text-sm text-gray-400 mt-1">Requires immediate attention</div>
        </div>
        
        <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-4">
          <div className="text-yellow-400 text-sm font-medium">Monitoring</div>
          <div className="text-3xl font-bold mt-2">2</div>
          <div className="text-sm text-gray-400 mt-1">Under observation</div>
        </div>
        
        <div className="bg-green-900/20 border border-green-900/50 rounded-lg p-4">
          <div className="text-green-400 text-sm font-medium">Resolved Today</div>
          <div className="text-3xl font-bold mt-2">5</div>
          <div className="text-sm text-gray-400 mt-1">Successfully contained</div>
        </div>
      </div>

      {/* Active Crisis Detail */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{selectedCrisis.title}</h2>
              <span className="px-3 py-1 bg-red-600 rounded-full text-xs font-medium">
                {selectedCrisis.severity.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Detected {new Date(selectedCrisis.detectedAt).toLocaleTimeString()}
            </p>
          </div>
          
          <button
            onClick={() => setShowSimulator(!showSimulator)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            {showSimulator ? 'View Analysis' : 'Simulate Response'}
          </button>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-gray-400 text-xs">Posts</div>
            <div className="text-2xl font-bold mt-1">{selectedCrisis.metrics.postCount}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-gray-400 text-xs">Total Reach</div>
            <div className="text-2xl font-bold mt-1">
              {(selectedCrisis.metrics.totalReach / 1000).toFixed(0)}k
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-gray-400 text-xs">Sentiment</div>
            <div className="text-2xl font-bold mt-1 text-red-400">
              {(selectedCrisis.metrics.avgSentiment * 100).toFixed(0)}%
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-gray-400 text-xs">Viral Risk</div>
            <div className="text-2xl font-bold mt-1 text-orange-400">
              {(selectedCrisis.metrics.viralProbability * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {showSimulator ? (
          <ResponseSimulator crisis={selectedCrisis} />
        ) : (
          <>
            {/* Network Graph */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Influence Network</h3>
              <NetworkGraph
                personas={networkData.personas}
                highlightNodes={selectedCrisis.posts.map(p => p.personaId)}
              />
            </div>

            {/* Cascade Prediction */}
            <CascadePredictor crisis={selectedCrisis} />
          </>
        )}
      </div>
    </div>
  );
}
```

---

### CustomerTrack.jsx

```jsx
import { useState } from 'react';
import CustomerIntelligence from './CustomerIntelligence';
import ResponseAdvisor from './ResponseAdvisor';
import customerData from '../data/customerData.json';

export default function CustomerTrack() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const highPriority = customerData.highPriorityCustomers.filter(c => c.priorityScore >= 8);
  const mediumPriority = customerData.highPriorityCustomers.filter(c => c.priorityScore >= 6 && c.priorityScore < 8);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-4">
          <div className="text-red-400 text-sm font-medium">High Priority</div>
          <div className="text-3xl font-bold mt-2">{highPriority.length}</div>
          <div className="text-sm text-gray-400 mt-1">Requires immediate attention</div>
        </div>
        
        <div className="bg-yellow-900/20 border border-yellow-900/50 rounded-lg p-4">
          <div className="text-yellow-400 text-sm font-medium">Medium Priority</div>
          <div className="text-3xl font-bold mt-2">{mediumPriority.length}</div>
          <div className="text-sm text-gray-400 mt-1">Response within 24 hours</div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-gray-400 text-sm font-medium">Total Monitored</div>
          <div className="text-3xl font-bold mt-2">{customerData.highPriorityCustomers.length}</div>
          <div className="text-sm text-gray-400 mt-1">Active customer signals</div>
        </div>
      </div>

      {/* High Priority Customers */}
      <div>
        <h2 className="text-xl font-bold mb-4">🔴 High Priority Signals</h2>
        
        <div className="space-y-4">
          {highPriority.map(customer => (
            <div
              key={customer.id}
              className="bg-gray-900 border border-red-900/50 rounded-lg p-6 hover:border-red-700 transition-colors cursor-pointer"
              onClick={() => setSelectedCustomer(customer)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{customer.name}</h3>
                    <span className="text-gray-400 text-sm">{customer.handle}</span>
                    <div className="flex items-center gap-1 text-red-400 text-sm">
                      <span className="font-bold">Priority: {customer.priorityScore}/10</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>💰 AED {(customer.accountData.accountValue / 1000).toFixed(0)}k</span>
                    <span>📅 {customer.accountData.tenure} years</span>
                    <span>👥 {(customer.influence.followers / 1000).toFixed(0)}k followers</span>
                    <span className="text-red-400 font-medium">
                      ⚠️ {(customer.riskAssessment.churnProbability * 100).toFixed(0)}% churn risk
                    </span>
                  </div>
                  
                  <div className="bg-gray-800 rounded p-3 mb-3">
                    <p className="text-sm italic">"{customer.complaint.content}"</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Posted {new Date(customer.complaint.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-900/50 text-red-300 rounded text-xs">
                      Response needed: {customer.riskAssessment.responseDeadline}
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      LTV: AED {(customer.accountData.lifetimeValue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
                
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medium Priority */}
      <div>
        <h2 className="text-xl font-bold mb-4">🟡 Medium Priority Signals</h2>
        <div className="grid grid-cols-2 gap-4">
          {mediumPriority.map(customer => (
            <div
              key={customer.id}
              className="bg-gray-900 border border-yellow-900/50 rounded-lg p-4 hover:border-yellow-700 transition-colors cursor-pointer"
              onClick={() => setSelectedCustomer(customer)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{customer.name}</h4>
                <span className="text-xs text-yellow-400">Priority: {customer.priorityScore}</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">{customer.complaint.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Customer Intelligence & Response Advisor</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <CustomerIntelligence customer={selectedCustomer} />
              <div className="mt-6">
                <ResponseAdvisor customer={selectedCustomer} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### ResponseSimulator.jsx

```jsx
import { useState } from 'react';
import { simulateCrisisResponse } from '../utils/claudeAPI';
import responseStrategies from '../data/responseStrategies.json';

export default function ResponseSimulator({ crisis }) {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async (strategy) => {
    setLoading(true);
    setSelectedStrategy(strategy);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = await simulateCrisisResponse(crisis, strategy);
    setSimulation(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Response Strategy</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {responseStrategies.crisisResponses.map(strategy => (
            <button
              key={strategy.id}
              onClick={() => runSimulation(strategy)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedStrategy?.id === strategy.id
                  ? 'border-blue-600 bg-blue-900/20'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <h4 className="font-semibold mb-2">{strategy.name}</h4>
              <p className="text-sm text-gray-400 mb-3">{strategy.description}</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 bg-gray-700 rounded">{strategy.estimatedTime}</span>
                <span className={`px-2 py-1 rounded ${
                  strategy.riskLevel === 'low' ? 'bg-green-900/50 text-green-300' :
                  strategy.riskLevel === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                  'bg-red-900/50 text-red-300'
                }`}>
                  {strategy.riskLevel} risk
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Running AI simulation...</p>
          <p className="text-sm text-gray-500 mt-1">Analyzing network cascade & predicting outcomes</p>
        </div>
      )}

      {simulation && !loading && (
        <div className="space-y-6">
          {/* Comparison Table */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-900 border-b border-gray-700">
              <h3 className="text-lg font-semibold">Predicted Impact Comparison</h3>
            </div>
            
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr className="text-left text-sm text-gray-400">
                  <th className="p-4">Metric</th>
                  <th className="p-4">Current State</th>
                  <th className="p-4">After Response</th>
                  <th className="p-4">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-medium">Sentiment Score</td>
                  <td className="p-4 text-red-400">
                    {(simulation.predictedOutcome.sentimentShift.before * 100).toFixed(0)}%
                  </td>
                  <td className="p-4 text-yellow-400">
                    {(simulation.predictedOutcome.sentimentShift.after * 100).toFixed(0)}%
                  </td>
                  <td className="p-4 text-green-400 font-medium">
                    {simulation.predictedOutcome.sentimentShift.change}
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Viral Probability</td>
                  <td className="p-4 text-red-400">
                    {(simulation.predictedOutcome.viralProbability.before * 100).toFixed(0)}%
                  </td>
                  <td className="p-4">
                    {(simulation.predictedOutcome.viralProbability.after * 100).toFixed(0)}%
                  </td>
                  <td className="p-4 text-green-400 font-medium">
                    {simulation.predictedOutcome.viralProbability.change}
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Estimated Reach</td>
                  <td className="p-4">
                    {(simulation.predictedOutcome.reach.before / 1000).toFixed(0)}k
                  </td>
                  <td className="p-4">
                    {(simulation.predictedOutcome.reach.after / 1000).toFixed(0)}k
                  </td>
                  <td className="p-4 text-green-400 font-medium">
                    {simulation.predictedOutcome.reach.change}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Predicted Posts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Predicted Network Reactions</h3>
            <div className="space-y-3">
              {simulation.predictedPosts.map((post, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                      post.sentiment > 0 ? 'bg-green-600' : 
                      post.sentiment < 0 ? 'bg-red-600' : 'bg-gray-600'
                    }`}>
                      {post.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{post.name}</span>
                        <span className="text-xs text-gray-500">
                          {(post.probability * 100).toFixed(0)}% probability
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">{post.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`text-xs px-2 py-1 rounded ${
                          post.sentiment > 0 ? 'bg-green-900/50 text-green-300' :
                          post.sentiment < 0 ? 'bg-red-900/50 text-red-300' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          Sentiment: {post.sentiment.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Crisis Containment</span>
                <span className={`font-semibold ${
                  simulation.riskAssessment.containment === 'high' ? 'text-green-400' :
                  simulation.riskAssessment.containment === 'moderate' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {simulation.riskAssessment.containment.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Overall Risk Level</span>
                <span className={`font-semibold ${
                  simulation.riskAssessment.level === 'low' ? 'text-green-400' :
                  simulation.riskAssessment.level === 'medium' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {simulation.riskAssessment.level.toUpperCase()}
                </span>
              </div>
              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-900/50 rounded">
                <p className="text-sm text-blue-300">{simulation.riskAssessment.recommendation}</p>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Confidence: {(simulation.confidence * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Approval Actions */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Human Approval Required</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="reviewed" className="w-5 h-5" />
                <label htmlFor="reviewed" className="text-sm">
                  I have reviewed the predicted outcomes and understand the risks
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="authorized" className="w-5 h-5" />
                <label htmlFor="authorized" className="text-sm">
                  I am authorized to approve this response strategy
                </label>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
                  ✓ Approve & Execute
                </button>
                <button className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
                  ✗ Reject
                </button>
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                  Modify Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

### CustomerIntelligence.jsx & ResponseAdvisor.jsx

```jsx
// CustomerIntelligence.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculatePriorityScore, calculateChurnRisk } from '../utils/priorityScoring';

export default function CustomerIntelligence({ customer }) {
  const priorityBreakdown = calculatePriorityScore(customer);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Customer Profile */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Profile</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Account Value</span>
              <span className="font-semibold">AED {(customer.accountData.accountValue / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tenure</span>
              <span className="font-semibold">{customer.accountData.tenure} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Products</span>
              <span className="font-semibold">{customer.accountData.products.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Lifetime Value</span>
              <span className="font-semibold text-green-400">
                AED {(customer.accountData.lifetimeValue / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Social Influence</span>
              <span className="font-semibold">{(customer.influence.followers / 1000).toFixed(0)}k followers</span>
            </div>
          </div>
        </div>

        {/* Priority Score Breakdown */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Priority Score: {priorityBreakdown.total}/10</h3>
          <div className="space-y-2">
            {Object.entries(priorityBreakdown.breakdown).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-medium">{value}/10</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(value / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sentiment History */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Sentiment History</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={customer.sentimentHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis domain={[-1, 1]} stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ background: '#1F2937', border: '1px solid #374151' }}
            />
            <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400">Positive (&gt; 0.5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-400">Negative (&lt; 0)</span>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4">⚠️ Risk Assessment</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-400 text-sm mb-1">Churn Probability</div>
            <div className="text-3xl font-bold text-red-400">
              {(customer.riskAssessment.churnProbability * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Response Deadline</div>
            <div className="text-3xl font-bold text-orange-400">
              {customer.riskAssessment.responseDeadline}
            </div>
          </div>
          <div className="col-span-2 mt-4">
            <div className="text-gray-400 text-sm mb-2">At Risk Value</div>
            <div className="text-2xl font-bold text-red-400">
              AED {(customer.accountData.lifetimeValue / 1000000).toFixed(1)}M Lifetime Value
            </div>
            <p className="text-sm text-gray-400 mt-2">
              + Reputational impact on {(customer.influence.followers / 1000).toFixed(0)}k followers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ResponseAdvisor.jsx
import { useState } from 'react';
import { generateCustomerResponse } from '../utils/claudeAPI';

export default function ResponseAdvisor({ customer }) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadRecommendations = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const recs = await generateCustomerResponse(customer);
    setRecommendations(recs);
    setLoading(false);
  };

  if (!recommendations && !loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold mb-3">AI Response Advisor</h3>
        <p className="text-gray-400 mb-6">
          Generate personalized recovery strategy based on customer profile and risk assessment
        </p>
        <button
          onClick={loadRecommendations}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          Generate Recommendations
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-400">Analyzing customer data & generating strategy...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{recommendations.strategy}</h3>
          <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
            {(recommendations.confidence * 100).toFixed(0)}% Confidence
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">{recommendations.urgencyJustification}</p>

        {/* Response Steps */}
        {recommendations.steps.map((step, idx) => (
          <div key={idx} className="bg-gray-800 rounded-lg p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {step.step}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                
                {step.who && (
                  <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                    <div>
                      <span className="text-gray-400">Who:</span>
                      <span className="ml-2 font-medium">{step.who}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">When:</span>
                      <span className="ml-2 font-medium text-orange-400">{step.when}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Channel:</span>
                      <span className="ml-2 font-medium">{step.channel}</span>
                    </div>
                  </div>
                )}

                {step.script && (
                  <div className="bg-gray-900 rounded p-4 mb-4">
                    <div className="text-xs text-gray-400 mb-2">SUGGESTED SCRIPT:</div>
                    <p className="text-sm italic text-gray-300">"{step.script}"</p>
                  </div>
                )}

                {step.actions && (
                  <ul className="space-y-2">
                    {step.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-400 mt-1">•</span>
                        <span className="text-gray-300">{action}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {step.options && (
                  <div className="space-y-3 mt-4">
                    <div className="text-sm font-medium text-gray-400 mb-2">Select Goodwill Gesture:</div>
                    {step.options.map((option, i) => (
                      <div key={i} className="bg-gray-900 rounded p-4 hover:bg-gray-900/70 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium mb-1">{option.action}</div>
                            <div className="text-sm text-gray-400">{option.impact}</div>
                          </div>
                          <div className="text-sm text-blue-400 font-medium">{option.estimatedValue}</div>
                        </div>
                      </div>
                    ))}
                    {step.recommended && (
                      <div className="text-sm text-green-400 mt-2">
                        ✓ Recommended: {step.recommended}
                      </div>
                    )}
                  </div>
                )}

                {step.timeline && (
                  <div className="text-sm text-gray-400 mt-2">
                    Timeline: {step.timeline}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expected Outcomes */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-900/20 border border-green-900/50 rounded-lg p-6">
          <h4 className="font-semibold mb-4">✓ Expected Outcomes (If Action Taken)</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Retention Probability</span>
              <span className="font-bold text-green-400">
                {(recommendations.expectedOutcome.retentionProbability * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sentiment Shift</span>
              <span className="font-bold text-green-400">
                {recommendations.expectedOutcome.sentimentShift.change}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-green-900/50">
              <div className="text-gray-400 mb-2">Public Post Outcomes:</div>
              {Object.entries(recommendations.expectedOutcome.publicPostOutcome).map(([key, value]) => (
                <div key={key} className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}</span>
                  <span>{(value * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="text-gray-400 mb-2">Additional Benefits:</div>
              <ul className="space-y-1">
                {recommendations.expectedOutcome.additionalBenefits.map((benefit, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-6">
          <h4 className="font-semibold mb-4">✗ Risks (If No Action Taken)</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Churn Probability</span>
              <span className="font-bold text-red-400">
                {(recommendations.ifNoAction.churnProbability * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Lost Revenue</span>
              <span className="font-bold text-red-400">
                AED {(recommendations.ifNoAction.lostRevenue / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-red-900/50 space-y-2">
              <div>
                <div className="text-gray-400 mb-1">Reputational Impact:</div>
                <div className="text-xs text-gray-300">{recommendations.ifNoAction.reputationalImpact}</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Cascade Risk:</div>
                <div className="text-xs text-gray-300">{recommendations.ifNoAction.cascadeRisk}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Workflow */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h4 className="font-semibold mb-4">Human Approval Required</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="review-customer" className="w-5 h-5" />
            <label htmlFor="review-customer" className="text-sm">
              Reviewed by: <input type="text" className="ml-2 bg-gray-800 border border-gray-700 rounded px-2 py-1 w-48" placeholder="Your name" />
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="approve-customer" className="w-5 h-5" />
            <label htmlFor="approve-customer" className="text-sm">
              Approved by: <input type="text" className="ml-2 bg-gray-800 border border-gray-700 rounded px-2 py-1 w-48" placeholder="RM/Manager name" />
            </label>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
              ✓ Approve & Escalate to RM
            </button>
            <button className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition-colors">
              ⚠️ Modify Strategy
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
              Generate Alternative
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎬 DEMO SCRIPT (10 Minutes)

```
[0:00-1:00] INTRODUCTION
"Banks face two invisible threats:
1. Viral crises that destroy reputation
2. Silent churn - losing valuable customers one at a time

Everyone monitors for #1. Almost nobody monitors for #2 properly.

NEXUS is the first system that protects both."

[1:00-3:30] CRISIS TRACK DEMO
"Let me show you the Crisis Track first..."

[Show dashboard]
- Point to active crisis
- Show network graph with cascade animation
- Click through to cascade predictor
- Show timeline projection

"We don't just detect - we predict WHO will amplify and WHEN it goes viral."

[3:30-5:30] RESPONSE SIMULATOR
"But here's where we go further..."

[Show response simulator]
- Select Strategy B
- Hit "Run Simulation"
- Show comparison table
- Show predicted posts

"We simulate every strategy BEFORE you commit.
Strategy A amplifies the rumor.
Strategy B contains it.
The data is clear."

[5:30-6:00] THE TWIST
"Now, while everyone was watching that crisis, THIS happened..."

[Switch to Customer Track]

[6:00-8:00] CUSTOMER TRACK DEMO
[Show high-priority customer]
"One post. Not viral. But look closer..."

[Show customer intelligence]
- AED 750k account
- 7-year tenure
- First complaint ever
- 85% churn risk
- 80k followers

"This is a AED 2M lifetime value walking out the door.
And nobody's watching."

[Show Response Advisor]
"NEXUS doesn't just detect it - it tells you EXACTLY what to do."

[Walk through 3-step recovery protocol]
"Call within 30 minutes. Here's the script.
Here's the offer. 90% retention probability.

If we act, we save AED 2M + protect brand with 80k people.
If we don't, we lose everything."

[8:00-9:00] THE VISION
"NEXUS is the first dual-track intelligence system.
Track 1: Crisis Defense - protect reputation
Track 2: Customer Care - protect revenue

Everyone else solves one problem.
We solve both.

Because banks don't just lose from crises.
They lose from ignored customers."

[9:00-10:00] GOVERNANCE & CLOSE
[Quick show of approval workflows]
"Everything requires human oversight.
We augment judgment, not replace it."

[Show GitHub + team info]
"NEXUS: Map the network. Predict the cascade. Navigate the crisis.
Built by [Your Team Name]."
```

---

## ⚡ DEVELOPMENT SPEED HACKS

### 1. Use Pre-Generated Data
Don't generate on the fly. Create all JSON files first.

### 2. Mock Claude API
For demo, use pre-written responses. Faster + more reliable.

### 3. Copy-Paste UI
Use shadcn/ui components. Don't build from scratch.

### 4. Focus on 1 Scenario
Build ONE perfect crisis + ONE perfect customer.
Mention others exist.

### 5. Fake the Animations
Use CSS transitions, not complex libraries.

---

## 📝 SUBMISSION CHECKLIST

- [ ] GitHub repo with clean README
- [ ] All data files generated (personas, scenarios, customers)
- [ ] Network graph working with React Flow
- [ ] Both tracks (Crisis + Customer) functional
- [ ] Response simulator with comparison
- [ ] Customer intelligence panel complete
- [ ] Response advisor with recommendations
- [ ] Human approval workflows visible
- [ ] Dark mode UI polished
- [ ] 2-minute video recorded
- [ ] Demo practiced (can do in 8 mins)
- [ ] Submitted before 3 PM Feb 1, 2026

---

## 🏆 WHY YOU WIN

1. **Unique dual-track approach** - Nobody else will have this
2. **Shows banking acumen** - Understanding of LTV, churn, relationship management
3. **Visually stunning** - Network graphs > boring tables
4. **Strategically valuable** - Protects reputation AND revenue
5. **AI-powered intelligence** - Uses Claude API for simulation
6. **Governance-first** - Human approval built into UX
7. **Mashreq-aligned** - Uses their graph analytics DNA
8. **Production-ready thinking** - Shows understanding of real banking needs

---

## 🚀 FINAL COMMAND SEQUENCE

```bash
# Clone template
git clone <your-starter-template>
cd nexus

# Install everything
npm install

# Generate all data files using Claude
# (Use Claude Desktop to generate personas.json, network.json, etc.)

# Start building
npm run dev

# Test demo flow
# Practice presentation
# Record video
# Submit

# Win AED 4000 + internships 🏆
```

---

**Good luck! You've got this. The idea is solid, the plan is clear, now just execute. Remember: focus on the dual-track uniqueness and the customer care intelligence - that's your winning differentiator.** 🚀