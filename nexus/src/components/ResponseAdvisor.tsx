import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, CheckCircle, AlertTriangle, Loader2, Copy, Check } from 'lucide-react';
import { useNexusStore } from '../store/useStore';
import { getRecoveryPlan } from '../services/aiService';
import FeatureImportance from './FeatureImportance';
import ConfidenceIndicator from './ConfidenceIndicator';
import type { Customer } from '../types';

interface ResponseAdvisorProps {
    customer: Customer;
}

export default function ResponseAdvisor({ customer }: ResponseAdvisorProps) {
    const { recoveryPlans, setRecoveryPlan } = useNexusStore();
    const [loading, setLoading] = useState(false);
    const [copiedScript, setCopiedScript] = useState(false);
    const [approvals, setApprovals] = useState({ reviewed: false, approved: false });
    const [reviewerName, setReviewerName] = useState('');

    const plan = recoveryPlans.get(customer.id);

    const loadPlan = async () => {
        if (plan) return;

        setLoading(true);
        try {
            const result = await getRecoveryPlan(customer);
            setRecoveryPlan(customer.id, result);
        } catch (error) {
            console.error('Failed to load recovery plan:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyScript = (script: string) => {
        navigator.clipboard.writeText(script);
        setCopiedScript(true);
        setTimeout(() => setCopiedScript(false), 2000);
    };

    // If no plan loaded yet, show generate button
    if (!plan && !loading) {
        return (
            <div className="bg-slate-50 rounded-xl p-8 text-center border border-slate-200">
                <div className="w-16 h-16 bg-mashreq-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-mashreq-orange" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">AI Response Advisor</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                    Generate a personalized recovery strategy with call scripts based on customer profile and risk assessment
                </p>
                <button
                    onClick={loadPlan}
                    className="px-6 py-3 bg-mashreq-orange text-white rounded-lg font-medium hover:bg-mashreq-orange-dark transition-all shadow-lg shadow-orange-200"
                >
                    Generate AI Recommendations
                </button>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="bg-slate-50 rounded-xl p-12 text-center border border-slate-200">
                <Loader2 className="w-12 h-12 text-mashreq-orange mx-auto mb-4 animate-spin" />
                <p className="text-slate-600 font-medium">Analyzing customer data & generating strategy...</p>
                <p className="text-sm text-slate-400 mt-1">AI is crafting personalized recovery recommendations</p>
            </div>
        );
    }

    if (!plan) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Header with Strategy & Confidence */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{plan.strategy}</h3>
                        <p className="text-sm text-slate-500 mt-1 max-w-2xl">{plan.urgency_justification}</p>
                    </div>
                    <ConfidenceIndicator confidence={plan.confidence} size="md" />
                </div>
            </div>

            {/* Recovery Steps */}
            <div className="space-y-4">
                {plan.steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="bg-white rounded-xl border border-slate-200 p-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-mashreq-orange rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                {step.step}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-slate-800 mb-3">{step.title}</h4>

                                {/* Step metadata */}
                                {step.who && (
                                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-400">Who:</span>
                                            <span className="font-medium text-slate-700">{step.who}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-400">When:</span>
                                            <span className="font-medium text-orange-600">{step.when}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-400">Channel:</span>
                                            <span className="font-medium text-slate-700 flex items-center gap-1">
                                                <Phone className="w-4 h-4" />
                                                {step.channel}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Call Script */}
                                {step.script && (
                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                                Suggested Call Script
                                            </span>
                                            <button
                                                onClick={() => copyScript(step.script || '')}
                                                className="flex items-center gap-1 text-xs text-mashreq-orange hover:text-mashreq-orange-dark"
                                            >
                                                {copiedScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                {copiedScript ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <p className="text-sm text-slate-700 italic leading-relaxed">
                                            "{step.script}"
                                        </p>
                                    </div>
                                )}

                                {/* Actions list */}
                                {step.actions && (
                                    <ul className="space-y-2">
                                        {step.actions.map((action, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <span className="text-mashreq-orange mt-1">•</span>
                                                <span className="text-slate-600">{action}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Goodwill Options */}
                                {step.options && (
                                    <div className="space-y-2 mt-4">
                                        <span className="text-sm font-medium text-slate-500">Select Goodwill Gesture:</span>
                                        {step.options.map((option, i) => (
                                            <div
                                                key={i}
                                                className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-mashreq-orange cursor-pointer transition-all"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium text-slate-800">{option.action}</div>
                                                        <div className="text-sm text-slate-500">{option.impact}</div>
                                                    </div>
                                                    <div className="text-sm font-medium text-mashreq-orange">{option.estimated_value}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {step.recommended && (
                                            <div className="text-sm text-green-600 font-medium mt-2">
                                                ✓ Recommended: {step.recommended}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {step.timeline && (
                                    <div className="text-sm text-slate-400 mt-2">Timeline: {step.timeline}</div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Expected Outcomes */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Expected Outcomes (If Action Taken)
                    </h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Retention Probability</span>
                            <span className="font-bold text-green-600">
                                {Math.round(plan.expected_outcome.retention_probability * 100)}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Sentiment Shift</span>
                            <span className="font-bold text-green-600">
                                {plan.expected_outcome.sentiment_shift.change}
                            </span>
                        </div>
                        <div className="pt-3 border-t border-green-200">
                            <span className="text-slate-500 text-xs">Public Post Outcomes:</span>
                            <div className="mt-2 space-y-1">
                                {Object.entries(plan.expected_outcome.public_post_outcome).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-xs">
                                        <span className="text-slate-500 capitalize">{key.replace(/_/g, ' ')}</span>
                                        <span className="text-slate-700">{Math.round(value * 100)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pt-3 border-t border-green-200">
                            <span className="text-slate-500 text-xs">Additional Benefits:</span>
                            <ul className="mt-2 space-y-1">
                                {plan.expected_outcome.additional_benefits.map((benefit, i) => (
                                    <li key={i} className="text-xs text-slate-600 flex items-start gap-1">
                                        <span className="text-green-500">✓</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Risks (If No Action Taken)
                    </h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Churn Probability</span>
                            <span className="font-bold text-red-600">
                                {Math.round(plan.if_no_action.churn_probability * 100)}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Lost Revenue</span>
                            <span className="font-bold text-red-600">
                                AED {(plan.if_no_action.lost_revenue / 1000000).toFixed(1)}M
                            </span>
                        </div>
                        <div className="pt-3 border-t border-red-200">
                            <div className="mb-2">
                                <span className="text-slate-500 text-xs">Reputational Impact:</span>
                                <p className="text-xs text-slate-600 mt-1">{plan.if_no_action.reputational_impact}</p>
                            </div>
                            <div>
                                <span className="text-slate-500 text-xs">Cascade Risk:</span>
                                <p className="text-xs text-slate-600 mt-1">{plan.if_no_action.cascade_risk}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Importance */}
            <FeatureImportance
                contributions={plan.feature_contributions}
                title="AI Recommendation Factors"
            />

            {/* Human Approval */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Human Approval Required
                </h4>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={approvals.reviewed}
                            onChange={(e) => setApprovals({ ...approvals, reviewed: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-300 text-mashreq-orange focus:ring-mashreq-orange"
                        />
                        <span className="text-sm text-slate-700">
                            Reviewed by:
                            <input
                                type="text"
                                value={reviewerName}
                                onChange={(e) => setReviewerName(e.target.value)}
                                className="ml-2 px-2 py-1 border border-slate-200 rounded text-sm w-48"
                                placeholder="Your name"
                            />
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={approvals.approved}
                            onChange={(e) => setApprovals({ ...approvals, approved: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-300 text-mashreq-orange focus:ring-mashreq-orange"
                        />
                        <span className="text-sm text-slate-700">
                            I am authorized to approve this recovery action
                        </span>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            disabled={!approvals.reviewed || !approvals.approved || !reviewerName}
                            className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${approvals.reviewed && approvals.approved && reviewerName
                                ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            <CheckCircle className="w-4 h-4" />
                            Approve & Escalate to RM
                        </button>
                        <button className="flex-1 py-3 bg-yellow-100 text-yellow-700 rounded-lg font-medium hover:bg-yellow-200 transition-all">
                            Modify Strategy
                        </button>
                        <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all">
                            Generate Alternative
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
