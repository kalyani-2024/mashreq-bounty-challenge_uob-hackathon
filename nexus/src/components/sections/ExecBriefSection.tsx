import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, CheckCircle, XCircle, MessageSquare, Brain, TrendingDown, Users, Clock, Sparkles } from 'lucide-react';
import { useNexusStore } from '../../store/useStore';
import SectionHeader from '../shared/SectionHeader';

export default function ExecBriefSection() {
    const {
        selectedCluster,
        customers,
        getCurrentViralRisk,
        analystSelectedStrategies,
        clusterApprovals,
        approveCluster,
        rejectCluster,
        requestAIAssistance
    } = useNexusStore();

    const [ceoFeedback, setCeoFeedback] = useState('');
    const [showAIAssistance, setShowAIAssistance] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);

    if (!selectedCluster) {
        return (
            <section id="section-brief" className="py-8">
                <SectionHeader
                    id="brief"
                    icon={<FileText className="w-6 h-6" />}
                    title="Executive Brief"
                    subtitle="Select a cluster first"
                />
                <div className="bg-slate-50 rounded-xl p-12 text-center">
                    <p className="text-slate-500">Please select a cluster to view Executive Brief</p>
                </div>
            </section>
        );
    }

    const selectedStrategy = analystSelectedStrategies.get(selectedCluster.id);
    const approvalStatus = clusterApprovals.get(selectedCluster.id);
    const viralRisk = getCurrentViralRisk();

    const handleDownloadPDF = () => {
        alert('PDF download started! (Demo mode)');
    };

    const handleEmailCSuite = () => {
        alert('Email sent to C-Suite! (Demo mode)');
    };

    const handleApprove = () => {
        approveCluster(selectedCluster.id);
    };

    const handleReject = () => {
        if (ceoFeedback.trim()) {
            rejectCluster(selectedCluster.id, ceoFeedback);
            setCeoFeedback('');
        }
    };

    const handleRequestAI = () => {
        requestAIAssistance(selectedCluster.id);
        setShowAIAssistance(true);
        // Mock AI response
        setTimeout(() => {
            setAiRecommendation(
                `Based on my analysis of the ${selectedCluster.name} cluster:\n\n` +
                `• The proposed strategy "${selectedStrategy?.strategyName}" shows 87% historical success rate in similar scenarios\n` +
                `• Risk assessment: ${selectedCluster.risk > 80 ? 'HIGH - Recommend immediate action' : 'MODERATE - Can proceed with caution'}\n` +
                `• Potential ROI: AED ${((100 - selectedCluster.risk) * 5000).toLocaleString()} in retained customer value\n` +
                `• Key concern: ${selectedCluster.count > 5 ? 'High volume requires rapid execution' : 'Manageable volume allows for personalized approach'}\n\n` +
                `Recommendation: ${selectedCluster.risk > 70 ? 'APPROVE with urgency' : 'APPROVE after adding customer compensation component'}`
            );
        }, 1500);
    };

    return (
        <section id="section-brief" className="py-8">
            <SectionHeader
                id="brief"
                icon={<FileText className="w-6 h-6" />}
                title={`Executive Brief: ${selectedCluster.name}`}
                subtitle="CEO Review & Approval Dashboard"
                action={
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            PDF
                        </button>
                        <button
                            onClick={handleEmailCSuite}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            Email
                        </button>
                    </div>
                }
            />

            <div className="space-y-6">
                {/* Cluster Summary */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">{selectedCluster.name} - Situation Overview</h3>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white/20 rounded-xl p-4 text-center">
                            <p className="text-3xl font-bold">{selectedCluster.count}</p>
                            <p className="text-sm text-orange-100">Total Posts</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-4 text-center">
                            <p className="text-3xl font-bold">{selectedCluster.risk}%</p>
                            <p className="text-sm text-orange-100">Risk Score</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-4 text-center">
                            <p className="text-3xl font-bold">{viralRisk}%</p>
                            <p className="text-sm text-orange-100">Viral Risk</p>
                        </div>
                        <div className="bg-white/20 rounded-xl p-4 text-center">
                            <p className="text-3xl font-bold">{customers.length}</p>
                            <p className="text-sm text-orange-100">VIPs at Risk</p>
                        </div>
                    </div>
                </div>

                {/* Root Cause Summary */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5" />
                        Root Cause Identified
                    </h4>
                    <p className="text-red-700">{selectedCluster.rootCause}</p>
                </div>

                {/* Analyst's Proposed Strategy */}
                {approvalStatus ? (
                    <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden">
                        <div className="bg-slate-800 text-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400 mb-1">STRATEGY SUBMITTED FOR APPROVAL</p>
                                    <h3 className="text-xl font-bold">{selectedStrategy?.strategyName}</h3>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-bold ${approvalStatus.status === 'approved' ? 'bg-green-500' :
                                    approvalStatus.status === 'rejected' ? 'bg-red-500' :
                                        approvalStatus.status === 'feedback' ? 'bg-blue-500' :
                                            'bg-yellow-500'
                                    }`}>
                                    {approvalStatus.status.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Simulation Results Summary */}
                            {selectedStrategy?.simulationResult && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-green-800 mb-3">AI Simulation Results</h4>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-green-600">
                                                {(selectedStrategy.simulationResult.predicted_outcome.sentiment_shift.after * 100).toFixed(0)}%
                                            </p>
                                            <p className="text-xs text-green-700">Predicted Sentiment</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-green-600">
                                                {selectedStrategy.simulationResult.predicted_outcome.viral_probability.change}
                                            </p>
                                            <p className="text-xs text-green-700">Viral Reduction</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-green-600">
                                                {Math.round(selectedStrategy.simulationResult.confidence * 100)}%
                                            </p>
                                            <p className="text-xs text-green-700">AI Confidence</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CEO Actions - Only show if pending */}
                            {approvalStatus.status === 'pending' && (
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-orange-500" />
                                        CEO Decision Required
                                    </h4>

                                    {/* AI Assistance */}
                                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                                        <button
                                            onClick={handleRequestAI}
                                            disabled={showAIAssistance}
                                            className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-purple-700 disabled:bg-purple-300 transition-colors"
                                        >
                                            <Sparkles className="w-5 h-5" />
                                            Get AI Assistance for Decision
                                        </button>

                                        {showAIAssistance && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-4 bg-white rounded-lg p-4 border border-purple-200"
                                            >
                                                {aiRecommendation ? (
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Brain className="w-5 h-5 text-purple-600" />
                                                            <span className="font-semibold text-purple-800">AI Analysis</span>
                                                        </div>
                                                        <pre className="text-sm text-purple-700 whitespace-pre-wrap font-sans">
                                                            {aiRecommendation}
                                                        </pre>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center py-4">
                                                        <div className="animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full" />
                                                        <span className="ml-2 text-purple-600">Analyzing...</span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Feedback Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            CEO Feedback / Comments
                                        </label>
                                        <textarea
                                            value={ceoFeedback}
                                            onChange={(e) => setCeoFeedback(e.target.value)}
                                            placeholder="Add feedback or required changes..."
                                            className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <button
                                            onClick={handleApprove}
                                            className="py-4 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            Approve
                                        </button>
                                        <button
                                            onClick={handleReject}
                                            disabled={!ceoFeedback.trim()}
                                            className="py-4 bg-red-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <XCircle className="w-5 h-5" />
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => setCeoFeedback(ceoFeedback + '\n[Requesting changes: ]')}
                                            className="py-4 bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                                        >
                                            <MessageSquare className="w-5 h-5" />
                                            Feedback
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Show result after decision */}
                            {approvalStatus.status === 'approved' && (
                                <div className="bg-green-100 border border-green-300 rounded-xl p-6 text-center">
                                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                    <h4 className="text-xl font-bold text-green-800">Strategy Approved</h4>
                                    <p className="text-green-600 mt-2">
                                        Approved on {new Date(approvalStatus.reviewedAt || '').toLocaleString()}
                                    </p>
                                    <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                                        Execute Strategy Now
                                    </button>
                                </div>
                            )}

                            {approvalStatus.status === 'rejected' && (
                                <div className="bg-red-100 border border-red-300 rounded-xl p-6">
                                    <XCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                                    <h4 className="text-xl font-bold text-red-800 text-center">Strategy Rejected</h4>
                                    <p className="text-red-600 mt-2 text-center">
                                        CEO Feedback: {approvalStatus.ceoFeedback}
                                    </p>
                                    <button className="mt-4 w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
                                        Go Back to RCA & Revise Strategy
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-8 text-center">
                        <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                        <h4 className="text-xl font-bold text-yellow-800">Awaiting Analyst Strategy Selection</h4>
                        <p className="text-yellow-600 mt-2">
                            No strategy has been submitted for approval yet.
                            <br />
                            The analyst needs to select a strategy in the RCA section.
                        </p>
                    </div>
                )}

                {/* Prevention Actions for this cluster */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Prevention Actions
                    </h4>
                    <ul className="space-y-2">
                        {selectedCluster.prevention.map((action, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-green-700">
                                <span className="text-green-500 mt-1">✓</span>
                                {action}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
