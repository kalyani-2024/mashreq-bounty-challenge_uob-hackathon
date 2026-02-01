import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, AlertCircle, UserCheck, FileCheck } from 'lucide-react';

interface GuardrailsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const BOUNDARIES = [
    'Post or respond on social media',
    'Change customer accounts or balances',
    'Process refunds or transactions',
    'Take any action without human approval',
];

export default function GuardrailsPanel({ isOpen, onClose }: GuardrailsPanelProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 320 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 320 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">AI Guardrails</h2>
                                    <p className="text-xs text-slate-500">System boundaries & responsible AI</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>

                        <div className="p-5 space-y-6 overflow-y-auto">
                            {/* Non-action boundaries */}
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-orange-500" />
                                    This system does not
                                </h3>
                                <ul className="space-y-2">
                                    {BOUNDARIES.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                            <span className="text-red-500 font-bold mt-0.5">✕</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Human-in-the-loop */}
                            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                                    <UserCheck className="w-4 h-4 text-green-600" />
                                    Human oversight
                                </h3>
                                <p className="text-sm text-green-800">
                                    All recommendations require analyst review and C-Suite approval before any action.
                                    The AI supports decisions; it does not execute them.
                                </p>
                            </div>

                            {/* Audit */}
                            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                                <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                    <FileCheck className="w-4 h-4 text-blue-600" />
                                    Audit & governance
                                </h3>
                                <p className="text-sm text-blue-800">
                                    In production, every decision (verification outcomes, strategy approvals, rejections)
                                    is recorded in the audit database with who, what, and when for compliance and review.
                                    See README for details.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
