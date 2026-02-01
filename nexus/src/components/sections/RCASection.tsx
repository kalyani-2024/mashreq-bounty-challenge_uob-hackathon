import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, FlaskConical, Play, CheckCircle, Loader2, AlertCircle, ChevronDown, ChevronUp, Send, Clock } from 'lucide-react';
import { useNexusStore } from '../../store/useStore';
import SectionHeader from '../shared/SectionHeader';
import AIExplainability, { createStrategyFactors } from '../shared/AIExplainability';
import { simulateCrisisResponse } from '../../services/aiService';
import FeatureImportance from '../FeatureImportance';
import ConfidenceIndicator from '../ConfidenceIndicator';

// Response strategies with predictedoutcomes
const responseStrategies = [
    {
        id: 'S1',
        name: 'Immediate Public Statement',
        description: 'CEO issues immediate public apology with compensation offer',
        score: 7.2,
        cost: 5000,
        time: '1-2h',
        risk: 'medium',
        effectiveness: 0.72,
        viralReduction: 65
    },
    {
        id: 'S2',
        name: 'Private Influencer Outreach',
        description: 'CRO personally contacts key influencers with resolution',
        score: 8.7,
        cost: 2000,
        time: '2-4h',
        risk: 'low',
        effectiveness: 0.87,
        viralReduction: 82,
        recommended: true
    },
    {
        id: 'S3',
        name: 'Active Monitoring',
        description: 'Monitor situation and respond only if escalation continues',
        score: 4.5,
        cost: 0,
        time: '48h',
        risk: 'high',
        effectiveness: 0.45,
        viralReduction: 15
    },
    {
        id: 'S4',
        name: 'Direct Customer Resolution',
        description: 'Direct outreach to affected customers with premium support',
        score: 7.8,
        cost: 15000,
        time: '4-6h',
        risk: 'low',
        effectiveness: 0.78,
        viralReduction: 70
    }
];

export default function RCASection() {
    const {
        selectedCluster,
        strategies,
        crisisScenarios,
        simulationResults,
        setSimulationResult,
        analystSelectedStrategies,
        selectStrategyForCluster,
        setStrategySimulationResult,
        submitForApproval,
        getApprovalStatus
    } = useNexusStore();

    const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null);
    const [runningSimulation, setRunningSimulation] = useState<string | null>(null);
    const [showWhyChain, setShowWhyChain] = useState(false);
    const [analystNotes, setAnalystNotes] = useState('');

    if (!selectedCluster) {
        return (
            <section id="section-rca" className="py-8">
                <SectionHeader
                    id="rca"
                    icon={<Brain className="w-6 h-6" />}
                    title="Root Cause Analysis"
                    subtitle="Select a cluster first"
                />
                <div className="bg-slate-50 rounded-xl p-12 text-center">
                    <p className="text-slate-500">Please select a cluster to view RCA</p>
                </div>
            </section>
        );
    }

    const selectedStrategy = analystSelectedStrategies.get(selectedCluster.id);
    const approvalStatus = getApprovalStatus(selectedCluster.id);
    const crisis = crisisScenarios[0]; // Use first crisis for simulation

    const handleSelectStrategy = (strategy: typeof responseStrategies[0]) => {
        selectStrategyForCluster(selectedCluster.id, strategy.id, strategy.name);
        setExpandedStrategy(strategy.id);
    };

    const handleRunSimulation = async (strategyId: string) => {
        setRunningSimulation(strategyId);

        // Find matching strategy from store
        const storeStrategy = strategies.find(s => s.id === strategyId) || strategies[0];

        try {
            const result = await simulateCrisisResponse(crisis, storeStrategy);
            setSimulationResult(strategyId, result);
            setStrategySimulationResult(selectedCluster.id, result);
        } catch (error) {
            console.error('Simulation failed:', error);
        } finally {
            setRunningSimulation(null);
        }
    };

    const handleSubmitForApproval = () => {
        if (selectedStrategy) {
            submitForApproval(selectedCluster.id);
        }
    };


    return (
        <section id="section-rca" className="py-8">
            <SectionHeader
                id="rca"
                icon={<Brain className="w-6 h-6" />}
                title={`Root Cause Analysis: ${selectedCluster.name}`}
                subtitle="5 Whys → Strategy Selection → Simulation → Submit for Approval"
            />

            <div className="space-y-8">
                {/* 5 Whys Chain */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <button
                        onClick={() => setShowWhyChain(!showWhyChain)}
                        className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                            </span>
                            <div>
                                <h3 className="font-bold text-slate-800">5 Whys Analysis</h3>
                                <p className="text-sm text-slate-500">Root Cause: {selectedCluster.rootCause}</p>
                            </div>
                        </div>
                        {showWhyChain ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>

                    <AnimatePresence>
                        {showWhyChain && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-slate-200"
                            >
                                <div className="p-5 space-y-4">
                                    {(selectedCluster.fiveWhys || selectedCluster.whyChain).map((why, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1 bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                                                <p className="text-xs text-red-500 font-semibold mb-1">WHY {idx + 1}</p>
                                                <p className="text-slate-700">{why}</p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 ml-12">
                                        <p className="text-xs text-green-600 font-semibold mb-1">ROOT CAUSE IDENTIFIED</p>
                                        <p className="text-green-800 font-medium">{selectedCluster.rootCause}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Response Strategies */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FlaskConical className="w-5 h-5 text-purple-600" />
                        Response Strategies - Select & Simulate
                    </h3>

                    <div className="space-y-3">
                        {responseStrategies.map((strategy) => {
                            const isSelected = selectedStrategy?.strategyId === strategy.id;
                            const isExpanded = expandedStrategy === strategy.id;
                            const simResult = simulationResults.get(strategy.id);

                            return (
                                <div
                                    key={strategy.id}
                                    className={`rounded-xl border-2 transition-all ${isSelected
                                        ? 'border-orange-400 bg-orange-50'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    {/* Strategy Header */}
                                    <div
                                        className="p-4 flex items-center justify-between cursor-pointer"
                                        onClick={() => handleSelectStrategy(strategy)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-orange-500 bg-orange-500' : 'border-slate-300'
                                                }`}>
                                                {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {strategy.recommended && (
                                                    <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                                                        BEST
                                                    </span>
                                                )}
                                                <span className="font-semibold text-slate-800">{strategy.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-lg font-bold ${strategy.score >= 7.5 ? 'text-green-600' :
                                                strategy.score >= 5 ? 'text-yellow-600' : 'text-red-600'
                                                }`}>
                                                {strategy.score}/10
                                            </span>
                                            <span className="text-sm text-slate-500">AED {strategy.cost}</span>
                                            <span className="text-sm text-slate-500">{strategy.time}</span>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-slate-200"
                                            >
                                                <div className="p-4 space-y-4">
                                                    <p className="text-sm text-slate-600">{strategy.description}</p>

                                                    {/* Run Simulation Button */}
                                                    {!simResult && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRunSimulation(strategy.id);
                                                            }}
                                                            disabled={runningSimulation === strategy.id}
                                                            className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-purple-700 disabled:bg-purple-300 transition-colors"
                                                        >
                                                            {runningSimulation === strategy.id ? (
                                                                <>
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                    Running AI Simulation...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Play className="w-4 h-4" />
                                                                    Run Simulation
                                                                </>
                                                            )}
                                                        </button>
                                                    )}

                                                    {/* Simulation Results */}
                                                    {simResult && (
                                                        <div className="space-y-4">
                                                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                                    <span className="font-medium text-slate-800">Simulation Complete</span>
                                                                </div>
                                                                <ConfidenceIndicator confidence={simResult.confidence} size="sm" />
                                                            </div>

                                                            {/* Impact Table */}
                                                            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                                                                <table className="w-full text-sm">
                                                                    <thead className="bg-slate-50">
                                                                        <tr>
                                                                            <th className="p-3 text-left text-slate-600">Metric</th>
                                                                            <th className="p-3 text-left text-slate-600">Before</th>
                                                                            <th className="p-3 text-left text-slate-600">After</th>
                                                                            <th className="p-3 text-left text-slate-600">Change</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr className="border-t border-slate-100">
                                                                            <td className="p-3 font-medium">Sentiment</td>
                                                                            <td className="p-3 text-red-600">
                                                                                {(simResult.predicted_outcome.sentiment_shift.before * 100).toFixed(0)}%
                                                                            </td>
                                                                            <td className="p-3 text-yellow-600">
                                                                                {(simResult.predicted_outcome.sentiment_shift.after * 100).toFixed(0)}%
                                                                            </td>
                                                                            <td className="p-3 text-green-600 font-semibold">
                                                                                {simResult.predicted_outcome.sentiment_shift.change}
                                                                            </td>
                                                                        </tr>
                                                                        <tr className="border-t border-slate-100">
                                                                            <td className="p-3 font-medium">Viral Risk</td>
                                                                            <td className="p-3 text-red-600">
                                                                                {(simResult.predicted_outcome.viral_probability.before * 100).toFixed(0)}%
                                                                            </td>
                                                                            <td className="p-3">
                                                                                {(simResult.predicted_outcome.viral_probability.after * 100).toFixed(0)}%
                                                                            </td>
                                                                            <td className="p-3 text-green-600 font-semibold">
                                                                                {simResult.predicted_outcome.viral_probability.change}
                                                                            </td>
                                                                        </tr>
                                                                        <tr className="border-t border-slate-100">
                                                                            <td className="p-3 font-medium">Reach</td>
                                                                            <td className="p-3">
                                                                                {(simResult.predicted_outcome.reach.before / 1000).toFixed(0)}k
                                                                            </td>
                                                                            <td className="p-3">
                                                                                {(simResult.predicted_outcome.reach.after / 1000).toFixed(0)}k
                                                                            </td>
                                                                            <td className="p-3 text-green-600 font-semibold">
                                                                                {simResult.predicted_outcome.reach.change}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            {/* Feature Importance */}
                                                            <FeatureImportance
                                                                contributions={simResult.feature_contributions}
                                                                title="AI Prediction Factors"
                                                            />

                                                            {/* AI Explainability */}
                                                            <AIExplainability
                                                                title="Why AI Predicts This Outcome"
                                                                decision={`${(simResult.predicted_outcome.sentiment_shift.after * 100).toFixed(0)}% post-response sentiment`}
                                                                confidence={Math.round(simResult.confidence * 100)}
                                                                factors={createStrategyFactors(
                                                                    strategy.effectiveness,
                                                                    strategy.cost,
                                                                    strategy.risk === 'high' ? 0.7 : strategy.risk === 'medium' ? 0.4 : 0.1,
                                                                    parseInt(strategy.time) || 4
                                                                )}
                                                                reasoning={simResult.risk_assessment.recommendation}
                                                                compact
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Analyst Notes & Submit for Approval */}
                {selectedStrategy && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6"
                    >
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Send className="w-5 h-5 text-orange-600" />
                            Submit to C-Suite for Approval
                        </h3>

                        <div className="bg-white rounded-xl p-4 mb-4">
                            <p className="text-sm text-slate-500 mb-1">Selected Strategy</p>
                            <p className="text-lg font-semibold text-slate-800">{selectedStrategy.strategyName}</p>
                            {selectedStrategy.simulationRun && (
                                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4" />
                                    Simulation completed
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Analyst Notes (for C-Suite review)
                            </label>
                            <textarea
                                value={analystNotes}
                                onChange={(e) => setAnalystNotes(e.target.value)}
                                placeholder="Add any recommendations, concerns, or context for the executive team..."
                                className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                rows={3}
                            />
                        </div>

                        {approvalStatus ? (
                            <div className={`p-4 rounded-lg ${approvalStatus.status === 'approved' ? 'bg-green-100' :
                                approvalStatus.status === 'rejected' ? 'bg-red-100' :
                                    'bg-yellow-100'
                                }`}>
                                <div className="flex items-center gap-2">
                                    {approvalStatus.status === 'pending' && <Clock className="w-5 h-5 text-yellow-600" />}
                                    {approvalStatus.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-600" />}
                                    {approvalStatus.status === 'rejected' && <AlertCircle className="w-5 h-5 text-red-600" />}
                                    <span className="font-semibold capitalize">{approvalStatus.status}</span>
                                </div>
                                {approvalStatus.ceoFeedback && (
                                    <p className="mt-2 text-sm text-slate-700">CEO Feedback: {approvalStatus.ceoFeedback}</p>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleSubmitForApproval}
                                disabled={!selectedStrategy.simulationRun}
                                className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send className="w-5 h-5" />
                                Submit for CEO Approval
                            </button>
                        )}

                        {!selectedStrategy.simulationRun && (
                            <p className="text-sm text-orange-600 mt-2 text-center">
                                ⚠️ Run simulation first before submitting for approval
                            </p>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
