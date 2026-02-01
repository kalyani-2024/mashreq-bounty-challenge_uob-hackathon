// Prevention nodes for cascade control
export interface PreventionNode {
    id: string;
    nodeIndex: number;
    handle: string;
    name: string;
    action: string;
    impact: number; // Negative percentage (e.g., -40 = 40% reduction)
    cost: string;
    timeToExecute: string;
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
}

export const preventionNodes: PreventionNode[] = [
    {
        id: 'node_2',
        nodeIndex: 2,
        handle: '@DevGuru_UAE',
        name: 'Mohammed Al-Shamsi',
        action: 'Private DM with accurate technical info',
        impact: -40,
        cost: 'AED 0',
        timeToExecute: '15 minutes',
        difficulty: 'easy',
        description: 'Direct message with technical explanation and ETA. Developer community respects transparency.'
    },
    {
        id: 'node_3',
        nodeIndex: 3,
        handle: '@BankWatcher',
        name: 'Anonymous',
        action: 'Public fact-check post',
        impact: -65,
        cost: 'AED 0',
        timeToExecute: '30 minutes',
        difficulty: 'medium',
        description: 'Official statement debunking breach rumor. Requires legal/comms approval for wording.'
    },
    {
        id: 'node_4',
        nodeIndex: 4,
        handle: '@NewsUAE',
        name: 'UAE Business News',
        action: 'Proactive media outreach',
        impact: -80,
        cost: 'AED 5,000',
        timeToExecute: '1 hour',
        difficulty: 'hard',
        description: 'Press release + journalist briefing before story runs. Requires executive approval and PR team.'
    }
];

export interface CascadePrediction {
    timeLabel: string;
    hoursFromNow: number;
    noAction: number;
    withPrevention: number;
}

export const cascadePredictions: CascadePrediction[] = [
    { timeLabel: 'Now', hoursFromNow: 0, noAction: 25, withPrevention: 25 },
    { timeLabel: '+2h', hoursFromNow: 2, noAction: 65, withPrevention: 30 },
    { timeLabel: '+6h', hoursFromNow: 6, noAction: 92, withPrevention: 25 },
    { timeLabel: '+24h', hoursFromNow: 24, noAction: 98, withPrevention: 18 }
];

export function calculateViralRisk(activePreventions: string[]): number {
    // Base viral risk without action
    let risk = 98;

    // Apply prevention impacts
    activePreventions.forEach(id => {
        const node = preventionNodes.find(n => n.id === id);
        if (node) {
            // Compound reduction
            risk = risk * (1 + node.impact / 100);
        }
    });

    return Math.max(5, Math.round(risk));
}

export function getPreventionSummary(activePreventions: string[]): {
    totalReduction: number;
    finalRisk: number;
    reachSaved: number;
} {
    const baseRisk = 98;
    const baseReach = 6200000; // 6.2M projected reach without action

    const finalRisk = calculateViralRisk(activePreventions);
    const totalReduction = baseRisk - finalRisk;
    const reachSaved = Math.round(baseReach * (totalReduction / 100));

    return { totalReduction, finalRisk, reachSaved };
}
