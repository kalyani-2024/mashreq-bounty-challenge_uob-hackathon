import { motion } from 'framer-motion';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// AI decision factors with weights
export interface AIFactor {
    name: string;
    value: number;
    weight: number;
    contribution: number;
    description: string;
}

interface AIExplainabilityProps {
    title: string;
    decision: string;
    confidence: number;
    factors: AIFactor[];
    reasoning?: string;
    compact?: boolean;
}

export default function AIExplainability({ title, decision, confidence, factors, reasoning, compact = false }: AIExplainabilityProps) {
    const [isExpanded, setIsExpanded] = useState(!compact);

    const totalContribution = factors.reduce((sum, f) => sum + f.contribution, 0);

    return (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-purple-100/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-200 rounded-lg flex items-center justify-center">
                        <Brain className="w-4 h-4 text-purple-700" />
                    </div>
                    <div>
                        <p className="font-semibold text-purple-900">{title}</p>
                        <p className="text-sm text-purple-600">{decision}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-xs text-purple-500">Confidence</p>
                        <p className="font-bold text-purple-800">{confidence}%</p>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-purple-500" /> : <ChevronDown className="w-4 h-4 text-purple-500" />}
                </div>
            </button>

            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="border-t border-purple-200 p-4 space-y-4"
                >
                    {/* Reasoning */}
                    {reasoning && (
                        <div className="bg-white rounded-lg p-3 text-sm text-purple-800">
                            <strong>AI Reasoning:</strong> {reasoning}
                        </div>
                    )}

                    {/* Factor Breakdown */}
                    <div className="space-y-3">
                        <p className="text-xs text-purple-600 font-medium">DECISION FACTORS & WEIGHTS</p>
                        {factors.map((factor, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-purple-100">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-slate-800">{factor.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500">Weight: {(factor.weight * 100).toFixed(0)}%</span>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${factor.value >= 0.7 ? 'bg-green-100 text-green-700' :
                                            factor.value >= 0.4 ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {(factor.value * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>

                                {/* Visual bar */}
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${factor.value * 100}%` }}
                                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                                        className={`h-full rounded-full ${factor.value >= 0.7 ? 'bg-green-500' :
                                            factor.value >= 0.4 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}
                                    />
                                </div>

                                <p className="text-xs text-slate-600">{factor.description}</p>
                                <p className="text-xs text-purple-600 mt-1">
                                    Contributes {((factor.contribution / totalContribution) * 100).toFixed(1)}% to final score
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Formula */}
                    <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono text-green-400">
                        <p className="text-slate-400 mb-1">// Score calculation</p>
                        <p>
                            {factors.map((f) => `(${(f.value * 100).toFixed(0)}% × ${(f.weight * 100).toFixed(0)}%)`).join(' + ')} = {confidence}%
                        </p>
                    </div>

                    {/* Responsible AI Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                        <strong>🛡️ Responsible AI:</strong> This is an AI-generated assessment. All decisions require human approval before action.
                        The AI provides evidence-based recommendations but final authority rests with certified analysts.
                    </div>
                </motion.div>
            )}
        </div>
    );
}

// Helper to create factors from priority assessment
export function createPriorityFactors(churnRisk: number, accountValue: number, socialReach: number, sentiment: number): AIFactor[] {
    return [
        {
            name: 'Churn Risk Score',
            value: churnRisk,
            weight: 0.35,
            contribution: churnRisk * 0.35,
            description: 'ML model prediction based on account history, complaint patterns, and behavioral signals'
        },
        {
            name: 'Account Value Impact',
            value: Math.min(accountValue / 1000000, 1),
            weight: 0.30,
            contribution: Math.min(accountValue / 1000000, 1) * 0.30,
            description: 'Weighted by lifetime value, product holdings, and cross-sell potential'
        },
        {
            name: 'Social Amplification Risk',
            value: Math.min(socialReach / 200000, 1),
            weight: 0.20,
            contribution: Math.min(socialReach / 200000, 1) * 0.20,
            description: 'Follower count, engagement rate, and historical viral reach'
        },
        {
            name: 'Sentiment Severity',
            value: Math.abs(sentiment),
            weight: 0.15,
            contribution: Math.abs(sentiment) * 0.15,
            description: 'NLP analysis of complaint language, emotion detection, and urgency signals'
        }
    ];
}

// Helper to create factors from response strategy
export function createStrategyFactors(effectiveness: number, cost: number, risk: number, time: number): AIFactor[] {
    const costScore = 1 - (cost / 50000); // Inverse: lower cost = higher score
    const riskScore = 1 - risk;
    const timeScore = 1 - (time / 48); // Inverse: faster = higher score

    return [
        {
            name: 'Predicted Effectiveness',
            value: effectiveness,
            weight: 0.40,
            contribution: effectiveness * 0.40,
            description: 'Based on similar historical cases, customer segment behavior, and response patterns'
        },
        {
            name: 'Cost Efficiency',
            value: Math.max(0, costScore),
            weight: 0.25,
            contribution: Math.max(0, costScore) * 0.25,
            description: 'ROI analysis comparing retention value vs. intervention cost'
        },
        {
            name: 'Risk Assessment',
            value: riskScore,
            weight: 0.20,
            contribution: riskScore * 0.20,
            description: 'Potential for escalation, precedent-setting, and unintended consequences'
        },
        {
            name: 'Response Speed',
            value: Math.max(0, timeScore),
            weight: 0.15,
            contribution: Math.max(0, timeScore) * 0.15,
            description: 'Time-to-resolution impact on customer satisfaction and viral prevention'
        }
    ];
}
