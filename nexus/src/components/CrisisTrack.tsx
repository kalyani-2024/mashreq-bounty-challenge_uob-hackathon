import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Users, AlertCircle, Zap } from 'lucide-react';
import { useNexusStore } from '../store/useStore';
import NetworkGraph from './NetworkGraph';
import CascadePredictor from './CascadePredictor';
import ResponseSimulator from './ResponseSimulator';

export default function CrisisTrack() {
    const { crisisScenarios, selectedCrisis, selectCrisis, personas } = useNexusStore();
    const [showSimulator, setShowSimulator] = useState(false);

    // Filter active/monitoring crises
    const activeCrises = crisisScenarios.filter(c => c.status === 'active');
    const monitoringCrises = crisisScenarios.filter(c => c.status === 'monitoring');
    const resolvedCrises = crisisScenarios.filter(c => c.status === 'resolved');

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-red-200 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <span className="text-sm font-medium text-red-600">Active Crises</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">{activeCrises.length}</div>
                    <p className="text-sm text-slate-500 mt-1">Requires immediate attention</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl border border-yellow-200 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="text-sm font-medium text-yellow-600">Monitoring</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">{monitoringCrises.length}</div>
                    <p className="text-sm text-slate-500 mt-1">Under observation</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl border border-green-200 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-green-600">Resolved Today</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">{resolvedCrises.length}</div>
                    <p className="text-sm text-slate-500 mt-1">Successfully contained</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-purple-600">Network Nodes</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">{personas.length}</div>
                    <p className="text-sm text-slate-500 mt-1">Active personas monitored</p>
                </motion.div>
            </div>

            {/* Crisis Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {crisisScenarios.filter(c => c.status !== 'resolved').map(crisis => (
                    <button
                        key={crisis.id}
                        onClick={() => selectCrisis(crisis)}
                        className={`flex-shrink-0 px-4 py-2 rounded-lg border-2 transition-all ${selectedCrisis?.id === crisis.id
                                ? 'border-mashreq-orange bg-orange-50'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                    >
                        <span className="font-medium text-slate-800">{crisis.title}</span>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full border ${getSeverityColor(crisis.severity)}`}>
                            {crisis.severity.toUpperCase()}
                        </span>
                    </button>
                ))}
            </div>

            {/* Selected Crisis Detail */}
            {selectedCrisis && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-xl font-bold text-slate-800">{selectedCrisis.title}</h2>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(selectedCrisis.severity)}`}>
                                        {selectedCrisis.severity.toUpperCase()}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedCrisis.status === 'active' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                                        }`}>
                                        {selectedCrisis.status.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500">
                                    Detected {new Date(selectedCrisis.detected_at).toLocaleTimeString()} •
                                    Type: {selectedCrisis.type.replace(/_/g, ' ')}
                                </p>
                            </div>

                            <button
                                onClick={() => setShowSimulator(!showSimulator)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${showSimulator
                                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        : 'bg-mashreq-orange text-white hover:bg-mashreq-orange-dark shadow-lg shadow-orange-200'
                                    }`}
                            >
                                <Zap className="w-4 h-4" />
                                {showSimulator ? 'View Analysis' : 'Simulate Response'}
                            </button>
                        </div>
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-100">
                        <div className="text-center">
                            <div className="text-sm text-slate-500 mb-1">Posts</div>
                            <div className="text-2xl font-bold text-slate-800">{selectedCrisis.metrics.post_count}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-slate-500 mb-1">Total Reach</div>
                            <div className="text-2xl font-bold text-slate-800">
                                {(selectedCrisis.metrics.total_reach / 1000).toFixed(0)}k
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-slate-500 mb-1">Sentiment</div>
                            <div className={`text-2xl font-bold ${selectedCrisis.metrics.avg_sentiment < -0.5 ? 'text-red-600' :
                                    selectedCrisis.metrics.avg_sentiment < 0 ? 'text-orange-600' : 'text-green-600'
                                }`}>
                                {(selectedCrisis.metrics.avg_sentiment * 100).toFixed(0)}%
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-slate-500 mb-1">Viral Risk</div>
                            <div className={`text-2xl font-bold ${selectedCrisis.metrics.viral_probability > 0.7 ? 'text-red-600' :
                                    selectedCrisis.metrics.viral_probability > 0.4 ? 'text-orange-600' : 'text-green-600'
                                }`}>
                                {(selectedCrisis.metrics.viral_probability * 100).toFixed(0)}%
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6">
                        {showSimulator ? (
                            <ResponseSimulator crisis={selectedCrisis} />
                        ) : (
                            <div className="space-y-6">
                                {/* Network Graph */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Influence Network</h3>
                                    <NetworkGraph
                                        personas={personas}
                                        highlightNodes={selectedCrisis.posts.map(p => p.persona_id)}
                                    />
                                </div>

                                {/* Cascade Predictor */}
                                <CascadePredictor crisis={selectedCrisis} />

                                {/* Recent Posts */}
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Crisis Posts</h3>
                                    <div className="space-y-3">
                                        {selectedCrisis.posts.slice(0, 5).map(post => (
                                            <div key={post.id} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                                <p className="text-sm text-slate-700 mb-2">"{post.content}"</p>
                                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                                    <span>Reach: {post.reach.toLocaleString()}</span>
                                                    <span>Engagement: {post.engagement}</span>
                                                    <span className={post.sentiment < -0.5 ? 'text-red-600' : 'text-slate-600'}>
                                                        Sentiment: {(post.sentiment * 100).toFixed(0)}%
                                                    </span>
                                                    <span className="ml-auto">{new Date(post.timestamp).toLocaleTimeString()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
