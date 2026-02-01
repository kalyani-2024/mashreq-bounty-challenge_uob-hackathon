import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, X, ChevronDown, ChevronUp, User } from 'lucide-react';
import { useState } from 'react';
import type { PostVerification } from '../../data/verification';
import { getVerificationColor, getVerificationLabel } from '../../data/verification';

interface VerificationPanelProps {
    verification: PostVerification;
    onClose: () => void;
    onApprove?: (action: 'confirm' | 'deny' | 'investigate') => void;
}

export default function VerificationPanel({ verification, onClose, onApprove }: VerificationPanelProps) {
    const [expandedCheck, setExpandedCheck] = useState<string | null>(null);
    const [showPatterns, setShowPatterns] = useState(false);

    const colors = getVerificationColor(verification.status);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-start justify-between z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-slate-600" />
                            <span className="text-sm text-slate-500 font-medium">SIGMA VERIFICATION</span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Claim Verification Analysis</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Extracted Claim */}
                    <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-slate-400">
                        <p className="text-xs text-slate-500 mb-1 font-medium">EXTRACTED CLAIM</p>
                        <p className="text-lg font-semibold text-slate-800">"{verification.extractedClaim}"</p>
                    </div>

                    {/* Verification Status */}
                    <div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-5`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{colors.icon}</span>
                                <div>
                                    <p className={`text-2xl font-bold ${colors.text}`}>
                                        {getVerificationLabel(verification.status)}
                                    </p>
                                    <p className={`text-sm ${colors.text}`}>
                                        Confidence: {verification.confidence}%
                                    </p>
                                </div>
                            </div>
                            {verification.humanReviewRequired && (
                                <div className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Human Review Required
                                </div>
                            )}
                        </div>
                    </div>

                    {/* AI Explainability - Why This Decision */}
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                        <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-sm">🧠</span>
                            Why AI Made This Decision
                        </h4>
                        <div className="space-y-2 text-sm text-purple-900">
                            <p>The AI analyzed this claim using 4 weighted verification checks:</p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li><strong>Official Sources (40%):</strong> {verification.checks[0].finding}</li>
                                <li><strong>Internal Systems (35%):</strong> {verification.checks[1].finding}</li>
                                <li><strong>Trusted News (15%):</strong> {verification.checks[2].finding}</li>
                                <li><strong>Source Credibility (10%):</strong> {verification.checks[3].finding}</li>
                            </ul>
                            <div className="mt-3 pt-3 border-t border-purple-200">
                                <p className="font-medium">Confidence Calculation:</p>
                                <p className="font-mono text-xs bg-white rounded p-2 mt-1">
                                    ({verification.checks[0].confidence}% × 0.4) + ({verification.checks[1].confidence}% × 0.35) + ({verification.checks[2].confidence}% × 0.15) + ({verification.checks[3].confidence}% × 0.1) = {verification.confidence}%
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Verification Checks */}
                    <div className="space-y-3">
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Verification Checks ({verification.checks.length})
                        </h4>

                        {verification.checks.map((check) => {
                            const isExpanded = expandedCheck === check.name;
                            const isPositive = check.status === 'DENIED' || check.status === 'NO_EVIDENCE' || check.status === 'HIGH';

                            return (
                                <div
                                    key={check.name}
                                    className={`bg-white rounded-xl border-l-4 ${isPositive ? 'border-green-500' : check.status === 'NO_STATEMENT' || check.status === 'MEDIUM' ? 'border-yellow-500' : 'border-red-500'} border border-slate-200 overflow-hidden`}
                                >
                                    <button
                                        onClick={() => setExpandedCheck(isExpanded ? null : check.name)}
                                        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">
                                                {isPositive ? '✅' : check.status === 'NO_STATEMENT' || check.status === 'MEDIUM' ? '❓' : '⚠️'}
                                            </span>
                                            <div>
                                                <p className="font-semibold text-slate-800">{check.name}</p>
                                                <p className="text-sm text-slate-500">Weight: {check.weight}%</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${isPositive ? 'bg-green-100 text-green-700' :
                                                check.status === 'NO_STATEMENT' || check.status === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {check.status} • {check.confidence}%
                                            </span>
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-slate-100"
                                            >
                                                <div className="p-4 bg-slate-50">
                                                    <p className="text-sm text-slate-700 mb-3">
                                                        <strong>Finding:</strong> {check.finding}
                                                    </p>
                                                    <div className="space-y-1 text-xs text-slate-600">
                                                        {check.details.map((detail, idx) => (
                                                            <p key={idx}>{detail}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Misinformation Patterns */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setShowPatterns(!showPatterns)}
                            className="w-full p-4 flex items-center justify-between text-left hover:bg-yellow-100 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                <span className="font-bold text-yellow-800">Misinformation Pattern Analysis</span>
                            </div>
                            {showPatterns ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <AnimatePresence>
                            {showPatterns && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-yellow-200"
                                >
                                    <div className="p-4 space-y-3">
                                        {verification.patterns.map((pattern) => (
                                            <div key={pattern.name} className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-slate-700">{pattern.name}</p>
                                                    {pattern.indicators.length > 0 && (
                                                        <p className="text-xs text-slate-500">{pattern.indicators.join(', ')}</p>
                                                    )}
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${pattern.level === 'HIGH' ? 'bg-red-100 text-red-700' :
                                                    pattern.level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'
                                                    }`}>
                                                    {pattern.level}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Red Flags */}
                    {verification.redFlags.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                                🚩 Red Flags Detected ({verification.redFlags.length})
                            </h4>
                            <ul className="space-y-2 text-sm text-red-700">
                                {verification.redFlags.map((flag, idx) => (
                                    <li key={idx}>{flag}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Human Review Actions */}
                    {verification.humanReviewRequired && (
                        <div className="bg-slate-800 rounded-xl p-5 text-white">
                            <h4 className="font-bold mb-3 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Analyst Decision Required
                            </h4>
                            <p className="text-sm text-slate-300 mb-4">
                                Review the evidence above and select an action. Your decision will be recorded for audit (who, what, when). See README for governance details.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => onApprove?.('confirm')}
                                    className="flex-1 py-3 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                                >
                                    ✓ Confirm True
                                </button>
                                <button
                                    onClick={() => onApprove?.('investigate')}
                                    className="flex-1 py-3 bg-yellow-500 text-slate-800 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                                >
                                    🔍 Investigate
                                </button>
                                <button
                                    onClick={() => onApprove?.('deny')}
                                    className="flex-1 py-3 bg-red-500 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                                >
                                    ✗ Mark False
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
