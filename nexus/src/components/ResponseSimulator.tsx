import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { useNexusStore } from '../store/useStore';
import { simulateCrisisResponse } from '../services/aiService';
import FeatureImportance from './FeatureImportance';
import ConfidenceIndicator from './ConfidenceIndicator';
import type { CrisisScenario } from '../types';

interface ResponseSimulatorProps {
    crisis: CrisisScenario;
}

export default function ResponseSimulator({ crisis }: ResponseSimulatorProps) {
    const { strategies, simulationResults, setSimulationResult } = useNexusStore();
    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [approvals, setApprovals] = useState({ reviewed: false, authorized: false });

    const currentSimulation = selectedStrategy ? simulationResults.get(selectedStrategy) : null;

    const runSimulation = async (strategyId: string) => {
        setSelectedStrategy(strategyId);

        // Check if already cached
        if (simulationResults.has(strategyId)) return;

        setLoading(true);
        const strategy = strategies.find(s => s.id === strategyId);
        if (!strategy) return;

        try {
            const result = await simulateCrisisResponse(crisis, strategy);
            setSimulationResult(strategyId, result);
        } catch (error) {
            console.error('Simulation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'low': return 'bg-green-100 text-green-700 border-green-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'high': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Strategy Selection */}
            <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Response Strategy</h3>
                <div className="grid grid-cols-2 gap-4">
                    {strategies.map(strategy => (
                        <motion.button
                            key={strategy.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => runSimulation(strategy.id)}
                            className={`p-5 rounded-xl border-2 text-left transition-all ${selectedStrategy === strategy.id
                                ? 'border-mashreq-orange bg-orange-50 shadow-lg'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-slate-800">{strategy.name}</h4>
                                {strategy.recommended && (
                                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                                        Recommended
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-slate-500 mb-3">{strategy.description}</p>
                            <div className="flex items-center gap-3 text-xs">
                                <span className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded">
                                    <Clock className="w-3 h-3" />
                                    {strategy.estimated_time}
                                </span>
                                <span className={`px-2 py-1 rounded border ${getRiskColor(strategy.risk_level)}`}>
                                    {strategy.risk_level} risk
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Loading State */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-slate-50 rounded-xl p-12 text-center border border-slate-200"
                    >
                        <Loader2 className="w-12 h-12 text-mashreq-orange mx-auto mb-4 animate-spin" />
                        <p className="text-slate-600 font-medium">Running AI Simulation...</p>
                        <p className="text-sm text-slate-400 mt-1">Analyzing network cascade & predicting outcomes</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Simulation Results */}
            <AnimatePresence>
                {currentSimulation && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Comparison Table */}
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                <h3 className="font-semibold text-slate-800">Predicted Impact Analysis</h3>
                                <ConfidenceIndicator confidence={currentSimulation.confidence} size="sm" />
                            </div>

                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr className="text-left text-sm text-slate-500">
                                        <th className="p-4 font-medium">Metric</th>
                                        <th className="p-4 font-medium">Current</th>
                                        <th className="p-4 font-medium">After Response</th>
                                        <th className="p-4 font-medium">Change</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="p-4 font-medium text-slate-800">Sentiment Score</td>
                                        <td className="p-4 text-red-600 font-semibold">
                                            {(currentSimulation.predicted_outcome.sentiment_shift.before * 100).toFixed(0)}%
                                        </td>
                                        <td className="p-4 text-yellow-600 font-semibold">
                                            {(currentSimulation.predicted_outcome.sentiment_shift.after * 100).toFixed(0)}%
                                        </td>
                                        <td className="p-4 text-green-600 font-semibold">
                                            {currentSimulation.predicted_outcome.sentiment_shift.change}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium text-slate-800">Viral Probability</td>
                                        <td className="p-4 text-red-600 font-semibold">
                                            {(currentSimulation.predicted_outcome.viral_probability.before * 100).toFixed(0)}%
                                        </td>
                                        <td className="p-4 font-semibold">
                                            {(currentSimulation.predicted_outcome.viral_probability.after * 100).toFixed(0)}%
                                        </td>
                                        <td className="p-4 text-green-600 font-semibold">
                                            {currentSimulation.predicted_outcome.viral_probability.change}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 font-medium text-slate-800">Estimated Reach</td>
                                        <td className="p-4 font-semibold text-slate-800">
                                            {(currentSimulation.predicted_outcome.reach.before / 1000).toFixed(0)}k
                                        </td>
                                        <td className="p-4 font-semibold text-slate-800">
                                            {(currentSimulation.predicted_outcome.reach.after / 1000).toFixed(0)}k
                                        </td>
                                        <td className="p-4 text-green-600 font-semibold">
                                            {currentSimulation.predicted_outcome.reach.change}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Predicted Posts */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-800 mb-4">Predicted Network Reactions</h3>
                            <div className="space-y-3">
                                {currentSimulation.predicted_posts.map((post, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-slate-50 rounded-lg p-4 border border-slate-100"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ${post.sentiment > 0 ? 'bg-green-500' : post.sentiment < 0 ? 'bg-red-500' : 'bg-slate-400'
                                                }`}>
                                                {post.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-slate-800">{post.name}</span>
                                                    <span className="text-xs text-slate-400">
                                                        {(post.probability * 100).toFixed(0)}% probability
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600">"{post.content}"</p>
                                                <div className={`inline-block text-xs px-2 py-1 rounded mt-2 ${post.sentiment > 0
                                                    ? 'bg-green-100 text-green-700'
                                                    : post.sentiment < 0
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    Sentiment: {(post.sentiment * 100).toFixed(0)}%
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Feature Importance */}
                        <FeatureImportance
                            contributions={currentSimulation.feature_contributions}
                            title="AI Prediction Factors"
                        />

                        {/* Risk Assessment */}
                        <div className={`rounded-xl p-6 border ${currentSimulation.risk_assessment.level === 'low'
                            ? 'bg-green-50 border-green-200'
                            : currentSimulation.risk_assessment.level === 'medium'
                                ? 'bg-yellow-50 border-yellow-200'
                                : 'bg-red-50 border-red-200'
                            }`}>
                            <h3 className="font-semibold text-slate-800 mb-4">Risk Assessment</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <span className="text-sm text-slate-500">Crisis Containment</span>
                                    <div className={`text-lg font-bold capitalize ${currentSimulation.risk_assessment.containment === 'high' ? 'text-green-600' :
                                        currentSimulation.risk_assessment.containment === 'moderate' ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                        {currentSimulation.risk_assessment.containment}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm text-slate-500">Overall Risk</span>
                                    <div className={`text-lg font-bold capitalize ${currentSimulation.risk_assessment.level === 'low' ? 'text-green-600' :
                                        currentSimulation.risk_assessment.level === 'medium' ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                        {currentSimulation.risk_assessment.level}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/70 rounded-lg p-4">
                                <p className="text-sm text-slate-700">{currentSimulation.risk_assessment.recommendation}</p>
                            </div>
                        </div>

                        {/* Human Approval */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                Human Approval Required
                            </h3>
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={approvals.reviewed}
                                        onChange={(e) => setApprovals({ ...approvals, reviewed: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-300 text-mashreq-orange focus:ring-mashreq-orange"
                                    />
                                    <span className="text-sm text-slate-700">
                                        I have reviewed the predicted outcomes and understand the risks
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={approvals.authorized}
                                        onChange={(e) => setApprovals({ ...approvals, authorized: e.target.checked })}
                                        className="w-5 h-5 rounded border-slate-300 text-mashreq-orange focus:ring-mashreq-orange"
                                    />
                                    <span className="text-sm text-slate-700">
                                        I am authorized to approve this response strategy
                                    </span>
                                </label>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        disabled={!approvals.reviewed || !approvals.authorized}
                                        className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${approvals.reviewed && approvals.authorized
                                            ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Approve & Execute
                                    </button>
                                    <button className="flex-1 py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-all">
                                        Reject
                                    </button>
                                    <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all">
                                        Modify
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
