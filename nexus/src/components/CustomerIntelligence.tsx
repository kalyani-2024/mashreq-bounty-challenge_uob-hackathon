import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Clock, Package, Users, TrendingDown, AlertTriangle } from 'lucide-react';
import { useNexusStore } from '../store/useStore';
import { getCustomerPriorityAssessment } from '../services/aiService';
import FeatureImportance from './FeatureImportance';
import ConfidenceIndicator from './ConfidenceIndicator';
import type { Customer } from '../types';

interface CustomerIntelligenceProps {
    customer: Customer;
}

export default function CustomerIntelligence({ customer }: CustomerIntelligenceProps) {
    const { priorityAssessments, setPriorityAssessment } = useNexusStore();
    const [loading, setLoading] = useState(false);

    const assessment = priorityAssessments.get(customer.id);

    useEffect(() => {
        const loadAssessment = async () => {
            if (!assessment) {
                setLoading(true);
                const result = await getCustomerPriorityAssessment(customer);
                setPriorityAssessment(customer.id, result);
                setLoading(false);
            }
        };
        loadAssessment();
    }, [customer.id]);

    // Generate sentiment history data (mock)
    const sentimentHistory = [
        { date: '2025-10', score: 0.75 },
        { date: '2025-11', score: 0.80 },
        { date: '2025-12', score: 0.72 },
        { date: '2026-01', score: customer.complaint.sentiment }
    ];

    const getUrgencyColor = (urgency: string | undefined) => {
        switch (urgency) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-300';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default: return 'bg-green-100 text-green-700 border-green-300';
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
                {/* Customer Profile */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-mashreq-orange" />
                        Customer Profile
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">Account Value</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                AED {(customer.account_value / 1000).toFixed(0)}k
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">Tenure</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1">
                                <Clock className="w-4 h-4 text-blue-600" />
                                {customer.tenure_years} years
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">Products</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1">
                                <Package className="w-4 h-4 text-purple-600" />
                                {customer.products.length}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">Lifetime Value</span>
                            <span className="font-semibold text-green-600">
                                AED {(customer.lifetime_value / 1000000).toFixed(1)}M
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">Social Reach</span>
                            <span className="font-semibold text-slate-800">
                                {(customer.followers / 1000).toFixed(0)}k followers
                            </span>
                        </div>
                        <div className="pt-3 border-t border-slate-200">
                            <span className="text-xs text-slate-400">Products:</span>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {customer.products.map(product => (
                                    <span key={product} className="text-xs px-2 py-1 bg-white rounded border border-slate-200 text-slate-600">
                                        {product.replace(/_/g, ' ')}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Priority Score */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        AI Priority Assessment
                    </h3>

                    {loading ? (
                        <div className="flex items-center justify-center h-48">
                            <div className="animate-spin w-8 h-8 border-4 border-mashreq-orange border-t-transparent rounded-full"></div>
                        </div>
                    ) : assessment ? (
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-slate-800 mb-1">
                                    {assessment.priority_score.toFixed(1)}
                                    <span className="text-2xl text-slate-400">/10</span>
                                </div>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(assessment.urgency)}`}>
                                    {assessment.urgency?.toUpperCase()} PRIORITY
                                </span>
                            </div>

                            <div className="flex items-center justify-center mt-4">
                                <ConfidenceIndicator
                                    confidence={assessment.confidence}
                                    size="sm"
                                    explanation={`AI confidence in this assessment`}
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-200 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Churn Risk</span>
                                    <span className="font-semibold text-red-600">{Math.round(assessment.churn_risk * 100)}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Response Deadline</span>
                                    <span className="font-semibold text-orange-600">{assessment.response_deadline}</span>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Risk Assessment */}
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h3 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5" />
                        Risk Assessment
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-slate-500 mb-1">Churn Probability</div>
                            <div className="text-4xl font-bold text-red-600">
                                {Math.round((assessment?.churn_risk || 0.5) * 100)}%
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-slate-500 mb-1">Response Deadline</div>
                            <div className="text-2xl font-bold text-orange-600">
                                {assessment?.response_deadline || '30 minutes'}
                            </div>
                        </div>
                        <div className="pt-4 border-t border-red-200">
                            <div className="text-sm text-slate-500 mb-1">At-Risk Value</div>
                            <div className="text-2xl font-bold text-red-600">
                                AED {(customer.lifetime_value / 1000000).toFixed(1)}M
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                + Reputational impact on {(customer.followers / 1000).toFixed(0)}k followers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sentiment History Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-4">Sentiment History</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={sentimentHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                        <YAxis domain={[-1, 1]} stroke="#94a3b8" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#FF6B00"
                            strokeWidth={3}
                            dot={{ fill: '#FF6B00', strokeWidth: 2 }}
                            activeDot={{ r: 8, fill: '#FF6B00' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-slate-500">Positive (&gt; 0.5)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-slate-500">Negative (&lt; 0)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                        <span className="text-slate-500">Current: {customer.complaint.sentiment.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Feature Importance */}
            {assessment && (
                <FeatureImportance
                    contributions={assessment.feature_contributions}
                    title="Priority Score Factors (AI Attribution)"
                />
            )}
        </div>
    );
}
