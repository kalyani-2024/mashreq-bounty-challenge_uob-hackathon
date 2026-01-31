import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, DollarSign, Clock, TrendingDown, AlertCircle, X } from 'lucide-react';
import { useNexusStore } from '../store/useStore';
import CustomerIntelligence from './CustomerIntelligence';
import ResponseAdvisor from './ResponseAdvisor';
import { getCustomerPriorityAssessment } from '../services/aiService';
import type { PriorityAssessment } from '../types';

export default function CustomerTrack() {
    const { customers, selectedCustomer, selectCustomer, priorityAssessments, setPriorityAssessment } = useNexusStore();
    const [, setLoading] = useState<string | null>(null);

    // Separate high and medium priority
    const highPriority = customers.filter(c => {
        const assessment = priorityAssessments.get(c.id);
        return assessment ? assessment.priority_score >= 8 : c.complaint.severity === 'critical' || c.complaint.severity === 'high';
    });

    const mediumPriority = customers.filter(c => !highPriority.find(hp => hp.id === c.id));

    // Load priority assessments on mount
    useEffect(() => {
        const loadAssessments = async () => {
            for (const customer of customers) {
                if (!priorityAssessments.has(customer.id)) {
                    setLoading(customer.id);
                    const assessment = await getCustomerPriorityAssessment(customer);
                    setPriorityAssessment(customer.id, assessment);
                }
            }
            setLoading(null);
        };
        loadAssessments();
    }, [customers]);

    const getAssessment = (customerId: string): PriorityAssessment | undefined => {
        return priorityAssessments.get(customerId);
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-green-100 text-green-700 border-green-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Overview Stats */}
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
                        <span className="text-sm font-medium text-red-600">Critical Priority</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">{highPriority.length}</div>
                    <p className="text-sm text-slate-500 mt-1">Immediate action required</p>
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
                        <span className="text-sm font-medium text-yellow-600">Medium Priority</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">{mediumPriority.length}</div>
                    <p className="text-sm text-slate-500 mt-1">Response within 24 hours</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl border border-orange-200 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium text-orange-600">At-Risk Value</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">
                        {(customers.reduce((sum, c) => sum + c.lifetime_value, 0) / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Total lifetime value at risk</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border border-purple-200 p-5 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <TrendingDown className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-purple-600">Avg Churn Risk</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-800">
                        {Math.round(
                            customers.reduce((sum, c) => {
                                const a = getAssessment(c.id);
                                return sum + (a?.churn_risk || 0.5);
                            }, 0) / customers.length * 100
                        )}%
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Across all monitored customers</p>
                </motion.div>
            </div>

            {/* High Priority Customers */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    Critical Priority Signals
                </h2>

                <div className="space-y-4">
                    {highPriority.map((customer, idx) => {
                        const assessment = getAssessment(customer.id);

                        return (
                            <motion.div
                                key={customer.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => selectCustomer(customer)}
                                className="bg-white rounded-xl border border-red-200 p-6 cursor-pointer hover:shadow-lg hover:border-red-300 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-slate-800">{customer.name}</h3>
                                            <span className="text-slate-400">{customer.handle}</span>
                                            <span className={`text-sm font-bold ${(assessment?.priority_score || 0) >= 9 ? 'text-red-600' : 'text-orange-600'
                                                }`}>
                                                Priority: {assessment?.priority_score?.toFixed(1) || '...'}/10
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                AED {(customer.account_value / 1000).toFixed(0)}k
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {customer.tenure_years} years
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {(customer.followers / 1000).toFixed(0)}k followers
                                            </span>
                                            <span className="text-red-600 font-medium flex items-center gap-1">
                                                <TrendingDown className="w-4 h-4" />
                                                {Math.round((assessment?.churn_risk || 0.5) * 100)}% churn risk
                                            </span>
                                        </div>

                                        <div className="bg-slate-50 rounded-lg p-3 mb-3 border border-slate-100">
                                            <p className="text-sm italic text-slate-700">"{customer.complaint.content}"</p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                Posted {new Date(customer.complaint.timestamp).toLocaleTimeString()}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 text-xs rounded-full border ${getSeverityColor(customer.complaint.severity)}`}>
                                                {customer.complaint.severity.toUpperCase()}
                                            </span>
                                            <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 border border-red-200">
                                                Response needed: {assessment?.response_deadline || '30 mins'}
                                            </span>
                                            <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                                                LTV: AED {(customer.lifetime_value / 1000000).toFixed(1)}M
                                            </span>
                                        </div>
                                    </div>

                                    <button className="px-4 py-2 bg-mashreq-orange text-white rounded-lg text-sm font-medium hover:bg-mashreq-orange-dark transition-all shadow-lg shadow-orange-200">
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Medium Priority */}
            {mediumPriority.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        Medium Priority Signals
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        {mediumPriority.map((customer, idx) => {
                            const assessment = getAssessment(customer.id);

                            return (
                                <motion.div
                                    key={customer.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => selectCustomer(customer)}
                                    className="bg-white rounded-xl border border-yellow-200 p-4 cursor-pointer hover:shadow-md hover:border-yellow-300 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-slate-800">{customer.name}</h4>
                                        <span className="text-xs text-yellow-600 font-semibold">
                                            Priority: {assessment?.priority_score?.toFixed(1) || '...'}/10
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-2">
                                        {customer.complaint.content}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span>AED {(customer.account_value / 1000).toFixed(0)}k</span>
                                        <span>•</span>
                                        <span>{customer.tenure_years} years</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Customer Detail Modal */}
            <AnimatePresence>
                {selectedCustomer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
                        onClick={() => selectCustomer(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Customer Intelligence & Response Advisor</h2>
                                    <p className="text-sm text-slate-500">{selectedCustomer.name} • {selectedCustomer.handle}</p>
                                </div>
                                <button
                                    onClick={() => selectCustomer(null)}
                                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <CustomerIntelligence customer={selectedCustomer} />
                                <ResponseAdvisor customer={selectedCustomer} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
