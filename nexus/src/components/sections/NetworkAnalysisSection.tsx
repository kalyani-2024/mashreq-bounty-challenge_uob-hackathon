import { motion } from 'framer-motion';
import { Network, Clock, Users, TrendingDown, ChevronRight, Shield, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNexusStore } from '../../store/useStore';
import SectionHeader from '../shared/SectionHeader';
import { cascadePredictions, getPreventionSummary } from '../../data/preventionNodes';

import NetworkGraph from '../NetworkGraph';

export default function NetworkAnalysisSection() {
    const {
        selectedCluster,
        getClusterNarrativeChain,
        getClusterPreventionNodes,
        activePreventions,
        togglePrevention,
        getCurrentViralRisk,
        personas
    } = useNexusStore();

    if (!selectedCluster) {
        return (
            <section id="section-network" className="py-8">
                <SectionHeader
                    id="network"
                    icon={<Network className="w-6 h-6" />}
                    title="Network Analysis"
                    subtitle="Select a cluster first"
                />
                <div className="bg-slate-50 rounded-xl p-12 text-center">
                    <p className="text-slate-500">Please select a cluster to view network analysis</p>
                </div>
            </section>
        );
    }

    const narrativeChain = getClusterNarrativeChain();
    const preventionNodes = getClusterPreventionNodes();
    const clusterPreventions = activePreventions.get(selectedCluster.id) || [];
    const viralRisk = getCurrentViralRisk();
    const summary = getPreventionSummary(clusterPreventions);

    // Generate chart data based on active preventions
    const chartData = cascadePredictions.map(p => ({
        name: p.timeLabel,
        'No Action': p.noAction,
        'With Prevention': clusterPreventions.length > 0
            ? Math.max(5, Math.round(p.withPrevention * (1 - clusterPreventions.length * 0.15)))
            : p.withPrevention
    }));

    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'ORIGINATOR': return 'bg-red-500';
            case 'AMPLIFIER': return 'bg-orange-500';
            case 'MISINFO': return 'bg-yellow-500';
            case 'CRITICAL': return 'bg-red-600';
            default: return 'bg-slate-500';
        }
    };

    const getStageBorder = (stage: string) => {
        switch (stage) {
            case 'ORIGINATOR': return 'border-red-500';
            case 'AMPLIFIER': return 'border-orange-500';
            case 'MISINFO': return 'border-yellow-500';
            case 'CRITICAL': return 'border-red-600';
            default: return 'border-slate-500';
        }
    };

    const getWhyItMatters = (stage: string): string => {
        switch (stage) {
            case 'ORIGINATOR': return 'First complaint – sets tone and can trigger amplification.';
            case 'AMPLIFIER': return 'Confirmation from others – validates the issue and widens reach.';
            case 'MISINFO': return 'False claim introduced – needs verification before response.';
            case 'CRITICAL': return 'Media / high reach – potential headline; intervention window closing.';
            default: return 'Part of crisis spread path.';
        }
    };

    return (
        <section id="section-network" className="py-8">
            <SectionHeader
                id="network"
                icon={<Network className="w-6 h-6" />}
                title={`Network Analysis: ${selectedCluster.name}`}
                subtitle="Narrative chain, cascade prediction & prevention controls"
            />

            <div className="space-y-8">
                {/* 5A: Network Graph */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Network className="w-5 h-5 text-purple-400" />
                                Influencer Impact Graph
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                                Click nodes to explore • Orange ring = narrative path • Node size = reach
                            </p>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" />Influencer</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" />High Value</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />Crisis Reached</span>
                        </div>
                    </div>
                    <NetworkGraph
                        personas={personas}
                        highlightNodes={narrativeChain.map(n => n.handle.replace('@', ''))}
                    />
                </div>
                {/* 5A: Narrative Chain Timeline */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-purple-600" />
                        </span>
                        Narrative Chain for {selectedCluster.name}
                        <span className="text-sm font-normal text-slate-500 ml-2">Crisis spread path</span>
                    </h3>

                    {narrativeChain.length === 0 ? (
                        <div className="bg-slate-50 rounded-xl p-8 text-center">
                            <p className="text-slate-500">No narrative chain data for this cluster</p>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-red-600" />

                            <div className="space-y-6">
                                {narrativeChain.map((step, idx) => (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="relative flex items-start gap-4 pl-16"
                                    >
                                        {/* Stage Dot */}
                                        <div className={`absolute left-4 w-5 h-5 rounded-full ${getStageColor(step.stage)} ring-4 ring-white shadow-lg`} />

                                        {/* Content Card */}
                                        <div className={`flex-1 bg-slate-50 rounded-xl p-4 border-l-4 ${getStageBorder(step.stage)}`}>
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-full text-white ${getStageColor(step.stage)} mb-2`}>
                                                        {step.stage}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-slate-800">{step.name}</span>
                                                        <span className="text-slate-400">{step.handle}</span>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-slate-500 font-mono">{step.time}</span>
                                            </div>

                                            <p className="text-slate-700 mb-3">{step.text}</p>

                                            <div className="bg-slate-100 rounded-lg px-3 py-2 mb-3 border-l-2 border-slate-400">
                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Why this matters</p>
                                                <p className="text-sm text-slate-700">{getWhyItMatters(step.stage)}</p>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {(step.reach / 1000).toFixed(0)}k reach
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <TrendingDown className="w-4 h-4" />
                                                    {Math.round(step.sentiment * 100)}% sentiment
                                                </span>
                                                {step.preventable && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-bold border border-green-300">
                                                        <Shield className="w-3.5 h-3.5" />
                                                        Intervention point
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        {idx < narrativeChain.length - 1 && (
                                            <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Outcome Box */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-6 ml-16 p-4 bg-red-50 border border-red-200 rounded-xl"
                            >
                                <p className="text-sm text-red-600 font-semibold">PREDICTED OUTCOME (No Action)</p>
                                <p className="text-red-700">{selectedCluster.risk}% viral probability • 6.2M projected reach by +24h</p>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* 5B: Cascade Prediction Chart */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 relative">
                    <span className="absolute top-4 right-4 px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-medium">
                        Prototype • Simulated data
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <TrendingDown className="w-4 h-4 text-blue-600" />
                        </span>
                        Cascade Prediction - {selectedCluster.name}
                        <span className="text-sm font-normal text-slate-500 ml-2">Viral risk over time</span>
                    </h3>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis domain={[0, 100]} stroke="#64748b" tickFormatter={(v) => `${v}%`} />
                                <Tooltip
                                    formatter={(value) => [`${value}%`, '']}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="No Action"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ fill: '#ef4444' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="With Prevention"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    dot={{ fill: '#22c55e' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Impact Summary */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                            <p className="text-2xl font-bold text-green-600">{summary.totalReduction}%</p>
                            <p className="text-sm text-green-700">Risk Reduction</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                            <p className="text-2xl font-bold text-blue-600">{viralRisk}%</p>
                            <p className="text-sm text-blue-700">Current Viral Risk</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                            <p className="text-2xl font-bold text-purple-600">{(summary.reachSaved / 1000000).toFixed(1)}M</p>
                            <p className="text-sm text-purple-700">Reach Saved</p>
                        </div>
                    </div>
                </div>

                {/* 5C: Prevention Controls */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-green-600" />
                        </span>
                        Prevention Controls - {selectedCluster.name}
                        <span className="text-sm font-normal text-slate-500 ml-2">Toggle to see cascade impact</span>
                    </h3>

                    {preventionNodes.length === 0 ? (
                        <div className="bg-slate-50 rounded-xl p-8 text-center">
                            <p className="text-slate-500">No prevention controls for this cluster</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {preventionNodes.map((node) => {
                                const isActive = clusterPreventions.includes(node.id);

                                return (
                                    <motion.div
                                        key={node.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        whileHover={{ scale: 1.01 }}
                                        className={`
                                            p-4 rounded-xl border-2 cursor-pointer transition-all
                                            ${isActive
                                                ? 'bg-green-50 border-green-400 shadow-lg shadow-green-100'
                                                : 'bg-white border-slate-200 hover:border-slate-300'}
                                        `}
                                        onClick={() => togglePrevention(node.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {/* Toggle */}
                                                <div className={`
                                                    w-12 h-7 rounded-full p-1 transition-all
                                                    ${isActive ? 'bg-green-500' : 'bg-slate-200'}
                                                `}>
                                                    <div className={`
                                                        w-5 h-5 rounded-full bg-white shadow-md transition-transform
                                                        ${isActive ? 'translate-x-5' : 'translate-x-0'}
                                                    `} />
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-semibold text-slate-800">{node.handle}</span>
                                                        {isActive && (
                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-slate-600">{node.action}</p>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <span className={`text-xl font-bold ${isActive ? 'text-green-600' : 'text-slate-400'}`}>
                                                    {node.impact}%
                                                </span>
                                                <p className="text-xs text-slate-500">{node.timeToExecute}</p>
                                            </div>
                                        </div>

                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-3 pt-3 border-t border-green-200"
                                            >
                                                <p className="text-sm text-green-700">{node.description}</p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-green-600">
                                                    <span>Cost: {node.cost}</span>
                                                    <span>Difficulty: {node.difficulty}</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}

                    {/* Live Viral Risk */}
                    <motion.div
                        key={viralRisk}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="mt-6 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl text-white text-center"
                    >
                        <p className="text-sm text-slate-400 mb-2">LIVE VIRAL RISK - {selectedCluster.name}</p>
                        <p className={`text-5xl font-bold ${viralRisk <= 30 ? 'text-green-400' : viralRisk <= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {viralRisk}%
                        </p>
                        {clusterPreventions.length > 0 && (
                            <p className="text-sm text-green-400 mt-2">
                                ↓ {98 - viralRisk}% reduction with {clusterPreventions.length} prevention{clusterPreventions.length > 1 ? 's' : ''} active
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
