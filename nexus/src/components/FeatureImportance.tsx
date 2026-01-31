import { motion } from 'framer-motion';
import type { FeatureContribution } from '../types';

interface FeatureImportanceProps {
    contributions: FeatureContribution[];
    title?: string;
}

export default function FeatureImportance({ contributions, title = "AI Decision Factors" }: FeatureImportanceProps) {
    const maxWeight = Math.max(...contributions.map(c => c.weight));

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'critical': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-slate-400';
        }
    };

    const getImpactBg = (impact: string) => {
        switch (impact) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-mashreq-orange"></div>
                <h3 className="font-semibold text-slate-800">{title}</h3>
                <span className="text-xs text-slate-500 ml-auto">SHAP-inspired Attribution</span>
            </div>

            <div className="space-y-4">
                {contributions.map((contrib, idx) => (
                    <motion.div
                        key={contrib.factor}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group"
                    >
                        <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-sm text-slate-700">{contrib.factor}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${getImpactBg(contrib.impact)}`}>
                                    {contrib.impact}
                                </span>
                            </div>
                            <span className="text-sm font-semibold text-slate-800">
                                {typeof contrib.value === 'number' ? contrib.value.toFixed(2) : contrib.value}
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(contrib.weight / maxWeight) * 100}%` }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`h-full rounded-full ${getImpactColor(contrib.impact)}`}
                            />
                        </div>

                        {/* Explanation - shown on hover or always visible */}
                        <p className="text-xs text-slate-500 leading-relaxed">
                            {contrib.explanation}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
