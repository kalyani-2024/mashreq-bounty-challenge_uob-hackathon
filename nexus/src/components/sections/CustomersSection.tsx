import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Phone, Mail, ArrowRight, BadgeDollarSign, AlertTriangle, MessageSquare, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNexusStore } from '../../store/useStore';
import SectionHeader from '../shared/SectionHeader';
import AIExplainability, { createPriorityFactors } from '../shared/AIExplainability';
import { getComplaintForCluster } from '../../data/clusterGrievances';
import { calculatePriorityScore, severityToChurnRisk } from '../../data/calculations';

// Metrics use cluster-appropriate complaint when provided (for severity/sentiment)
function getCustomerMetrics(customer: any, displayComplaint?: { severity: string; sentiment?: number } | null) {
    const complaint = displayComplaint ?? customer.complaint;
    const churnRisk = customer.churn_risk ?? severityToChurnRisk[complaint?.severity] ?? 0.5;
    const socialReach = customer.social_reach ?? customer.followers ?? 10000;
    const sentimentScore = customer.sentiment_score ?? complaint?.sentiment ?? -0.5;
    const segment = customer.segment ?? customer.account_type ?? 'premium';
    const complaintsCount = customer.complaints_6m ?? 1;
    return { churnRisk, socialReach, sentimentScore, segment, complaintsCount };
}

function formatComplaintTime(iso: string): string {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffM = Math.floor(diffMs / 60000);
    const diffH = Math.floor(diffMs / 3600000);
    const diffD = Math.floor(diffMs / 86400000);
    if (diffM < 60) return `${diffM}m ago`;
    if (diffH < 24) return `${diffH}h ago`;
    if (diffD < 7) return `${diffD}d ago`;
    return d.toLocaleDateString();
}

function getSeverityStyles(severity: string) {
    switch (severity) {
        case 'critical': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
        case 'high': return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' };
        case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' };
        default: return { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' };
    }
}

export default function CustomersSection() {
    const { selectedCluster, getClusterCustomers } = useNexusStore();
    const [viewMode, setViewMode] = useState<'card' | 'graph'>('card');
    const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);

    if (!selectedCluster) {
        return (
            <section id="section-customers" className="py-8">
                <SectionHeader
                    id="customers"
                    icon={<Users className="w-6 h-6" />}
                    title="Customers"
                    subtitle="Select a cluster first"
                />
                <div className="bg-slate-50 rounded-xl p-12 text-center">
                    <p className="text-slate-500">Please select a cluster to view at-risk customers</p>
                </div>
            </section>
        );
    }

    const customers = getClusterCustomers();

    // Chart data: cluster-appropriate complaint + shared priority formula (0–100)
    const chartData = customers.map((c, idx) => {
        const displayComplaint = getComplaintForCluster(selectedCluster.id, c.id, idx);
        const metrics = getCustomerMetrics(c, displayComplaint);
        const priorityScore = calculatePriorityScore(metrics.churnRisk, c.account_value, metrics.socialReach);
        return {
            name: c.name.split(' ')[0],
            'Churn Risk': Math.round(metrics.churnRisk * 100),
            'Account Value (K)': Math.round(c.account_value / 1000),
            'Priority Score': priorityScore
        };
    });

    return (
        <section id="section-customers" className="py-8">
            <SectionHeader
                id="customers"
                icon={<Users className="w-6 h-6" />}
                title={`Customers: ${selectedCluster.name}`}
                subtitle={`${customers.length} VIPs at risk in this cluster`}
                action={
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('card')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'card'
                                ? 'bg-orange-500 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Cards
                        </button>
                        <button
                            onClick={() => setViewMode('graph')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'graph'
                                ? 'bg-orange-500 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            Graph
                        </button>
                    </div>
                }
            />

            {customers.length === 0 ? (
                <div className="bg-slate-50 rounded-xl p-8 text-center">
                    <p className="text-slate-500">No at-risk customers in this cluster</p>
                </div>
            ) : viewMode === 'card' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {customers.map((customer, idx) => {
                        const displayComplaint = getComplaintForCluster(selectedCluster.id, customer.id, idx);
                        const metrics = getCustomerMetrics(customer, displayComplaint);
                        const priorityScore = (metrics.churnRisk * 0.4 + (customer.account_value / 1000000) * 0.3 + (metrics.socialReach / 100000) * 0.3) * 100;
                        const isExpanded = expandedCustomer === customer.id;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`bg-white rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col min-h-[320px] ${metrics.churnRisk > 0.8 ? 'border-red-300' :
                                    metrics.churnRisk > 0.5 ? 'border-yellow-300' : 'border-slate-200'
                                    }`}
                            >
                                {/* Top accent bar */}
                                <div className={`h-1.5 ${metrics.churnRisk > 0.8 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                    metrics.churnRisk > 0.5 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                        'bg-gradient-to-r from-green-500 to-green-600'
                                    }`} />

                                <div
                                    className="p-4 flex flex-col flex-1 cursor-pointer hover:bg-slate-50/50 transition-colors"
                                    onClick={() => setExpandedCustomer(isExpanded ? null : customer.id)}
                                >
                                    {/* Header: avatar + name + priority */}
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="relative shrink-0">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md ${metrics.churnRisk > 0.8 ? 'bg-gradient-to-br from-red-500 to-red-600' :
                                                    metrics.churnRisk > 0.5 ? 'bg-gradient-to-br from-orange-500 to-orange-600' :
                                                        'bg-gradient-to-br from-green-500 to-green-600'
                                                    }`}>
                                                    {customer.name.split(' ').map((n: string) => n[0]).join('')}
                                                </div>
                                                {metrics.churnRisk > 0.8 && (
                                                    <div className="absolute -bottom-0.5 -right-0.5 bg-red-500 text-white p-0.5 rounded-full border-2 border-white">
                                                        <AlertTriangle className="w-2.5 h-2.5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-slate-800 truncate">{customer.name}</h4>
                                                <p className="text-xs text-slate-500 truncate">{customer.handle}</p>
                                                <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${metrics.segment === 'corporate' ? 'bg-slate-800 text-white' :
                                                    metrics.segment === 'premium' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    {metrics.segment}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="text-[10px] font-semibold text-slate-400 uppercase">Priority</span>
                                            <p className={`text-xl font-black leading-tight ${priorityScore > 70 ? 'text-red-600' : priorityScore > 40 ? 'text-orange-600' : 'text-green-600'}`}>
                                                {priorityScore.toFixed(0)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Grievance box (cluster-appropriate) */}
                                    {displayComplaint && (
                                        <div className={`rounded-xl border p-3 mb-3 flex-1 min-h-0 ${getSeverityStyles(displayComplaint.severity).bg} ${getSeverityStyles(displayComplaint.severity).border}`}>
                                            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                                                <MessageSquare className="w-3 h-3 text-slate-500 shrink-0" />
                                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-white/90 ${getSeverityStyles(displayComplaint.severity).text}`}>
                                                    {displayComplaint.severity}
                                                </span>
                                                <span className="text-[10px] text-slate-500">{formatComplaintTime(displayComplaint.timestamp)}</span>
                                                {displayComplaint.public_visibility && (
                                                    <Globe className="w-3 h-3 text-blue-600 shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-800 line-clamp-3 leading-snug">"{displayComplaint.content}"</p>
                                        </div>
                                    )}

                                    {/* Stats 2x2 */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-slate-50 rounded-lg p-2 text-center">
                                            <p className="text-[10px] text-slate-500">Churn</p>
                                            <p className={`text-sm font-bold ${metrics.churnRisk > 0.8 ? 'text-red-600' : metrics.churnRisk > 0.5 ? 'text-orange-600' : 'text-green-600'}`}>
                                                {Math.round(metrics.churnRisk * 100)}%
                                            </p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-2 text-center">
                                            <p className="text-[10px] text-slate-500">Value</p>
                                            <p className="text-sm font-bold text-slate-800">AED {(customer.account_value / 1000).toFixed(0)}k</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-2 text-center">
                                            <p className="text-[10px] text-slate-500">Reach</p>
                                            <p className="text-sm font-bold text-slate-800">{(metrics.socialReach / 1000).toFixed(0)}k</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-2 text-center">
                                            <p className="text-[10px] text-slate-500">Tenure</p>
                                            <p className="text-sm font-bold text-slate-800">{customer.tenure_years}y</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 text-center mt-2">
                                        {isExpanded ? 'Click to collapse' : 'Click for details'}
                                    </p>
                                </div>

                                {/* Expanded Content (full grievance + AI + recovery) */}
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        className="border-t-2 border-slate-200 bg-slate-50/80 p-4 space-y-4"
                                    >
                                        {/* Full Grievance (cluster-appropriate, when expanded) */}
                                        {displayComplaint && (
                                            <div className={`rounded-xl border-2 p-3 ${getSeverityStyles(displayComplaint.severity).bg} ${getSeverityStyles(displayComplaint.severity).border}`}>
                                                <p className="text-xs text-slate-600 mb-1">
                                                    {displayComplaint.issue_type.replace(/_/g, ' ')} • {formatComplaintTime(displayComplaint.timestamp)}
                                                    {displayComplaint.public_visibility && ' • Public post'}
                                                </p>
                                                <p className="text-sm text-slate-800">"{displayComplaint.content}"</p>
                                                <p className="text-xs text-slate-500 mt-1">Sentiment: {((displayComplaint.sentiment ?? 0) * 100).toFixed(0)}%</p>
                                            </div>
                                        )}
                                        {/* AI Priority Explainability */}
                                        <AIExplainability
                                            title="AI Priority Assessment"
                                            decision={`${priorityScore.toFixed(1)} priority score`}
                                            confidence={87}
                                            factors={createPriorityFactors(
                                                metrics.churnRisk,
                                                customer.account_value,
                                                metrics.socialReach,
                                                metrics.sentimentScore
                                            )}
                                            reasoning={`This customer has ${metrics.churnRisk > 0.7 ? 'high' : 'moderate'} churn risk based on complaint severity and sentiment. Account value of AED ${(customer.account_value / 1000).toFixed(0)}k and social reach of ${(metrics.socialReach / 1000).toFixed(0)}k followers make retention critical.`}
                                            compact
                                        />

                                        {/* Recovery Actions */}
                                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                                            <h5 className="font-semibold text-orange-800 mb-3">Recommended Recovery Actions</h5>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                                                    <Phone className="w-5 h-5 text-orange-500" />
                                                    <span className="text-sm text-slate-700">CRO Personal Call</span>
                                                    <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
                                                </div>
                                                <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                                                    <BadgeDollarSign className="w-5 h-5 text-orange-500" />
                                                    <span className="text-sm text-slate-700">Offer Premium Account Upgrade</span>
                                                    <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
                                                </div>
                                                <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                                                    <Mail className="w-5 h-5 text-orange-500" />
                                                    <span className="text-sm text-slate-700">Personalized Apology Email</span>
                                                    <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <button className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors">
                                                Initiate Recovery
                                            </button>
                                            <button className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                                                View History
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                /* Graph View */
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        Customer Risk Analysis - {selectedCluster.name}
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                                <Legend />
                                <Bar dataKey="Churn Risk" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Priority Score" fill="#f97316" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                            <p className="text-2xl font-bold text-red-600">
                                {customers.filter(c => getCustomerMetrics(c).churnRisk > 0.8).length}
                            </p>
                            <p className="text-sm text-red-700">High Risk</p>
                        </div>
                        <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-200">
                            <p className="text-2xl font-bold text-yellow-600">
                                {customers.filter(c => {
                                    const m = getCustomerMetrics(c);
                                    return m.churnRisk > 0.5 && m.churnRisk <= 0.8;
                                }).length}
                            </p>
                            <p className="text-sm text-yellow-700">Medium Risk</p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                            <p className="text-2xl font-bold text-green-600">
                                {customers.filter(c => getCustomerMetrics(c).churnRisk <= 0.5).length}
                            </p>
                            <p className="text-sm text-green-700">Low Risk</p>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                            <p className="text-2xl font-bold text-purple-600">
                                AED {(customers.reduce((sum, c) => sum + c.account_value, 0) / 1000000).toFixed(1)}M
                            </p>
                            <p className="text-sm text-purple-700">Total at Risk</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
