import { motion } from 'framer-motion';
import { TrendingUp, Clock } from 'lucide-react';
import type { CrisisScenario } from '../types';

interface CascadePredictorProps {
    crisis: CrisisScenario;
}

export default function CascadePredictor({ crisis }: CascadePredictorProps) {
    // Generate cascade predictions based on current metrics
    const predictions = [
        {
            hours: 2,
            posts: Math.round(crisis.metrics.post_count * 1.5),
            reach: Math.round(crisis.metrics.total_reach * 1.8),
            probability: Math.min(crisis.metrics.viral_probability + 0.05, 0.95)
        },
        {
            hours: 6,
            posts: Math.round(crisis.metrics.post_count * 3),
            reach: Math.round(crisis.metrics.total_reach * 4),
            probability: Math.min(crisis.metrics.viral_probability + 0.1, 0.95)
        },
        {
            hours: 24,
            posts: Math.round(crisis.metrics.post_count * 8),
            reach: Math.round(crisis.metrics.total_reach * 12),
            probability: Math.min(crisis.metrics.viral_probability + 0.15, 0.95)
        },
        {
            hours: 48,
            posts: Math.round(crisis.metrics.post_count * 15),
            reach: Math.round(crisis.metrics.total_reach * 25),
            probability: Math.max(crisis.metrics.viral_probability - 0.1, 0.3)
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">24-Hour Cascade Prediction</h3>
                        <p className="text-sm text-slate-500">AI-powered spread analysis</p>
                    </div>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${crisis.metrics.viral_probability > 0.7
                    ? 'bg-red-100 text-red-700'
                    : crisis.metrics.viral_probability > 0.4
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                    Trending in: {crisis.metrics.trending_in}
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-red-500 to-red-700 rounded-full" />

                {/* Current State */}
                <div className="relative pl-8 pb-8">
                    <div className="absolute left-0 top-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow" />
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="font-semibold text-orange-700">Current State</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <span className="text-slate-500">Posts:</span>
                                <span className="ml-2 font-semibold text-slate-800">{crisis.metrics.post_count}</span>
                            </div>
                            <div>
                                <span className="text-slate-500">Reach:</span>
                                <span className="ml-2 font-semibold text-slate-800">{(crisis.metrics.total_reach / 1000).toFixed(0)}k</span>
                            </div>
                            <div>
                                <span className="text-slate-500">Viral Risk:</span>
                                <span className={`ml-2 font-semibold ${crisis.metrics.viral_probability > 0.7 ? 'text-red-600' : 'text-orange-600'
                                    }`}>
                                    {(crisis.metrics.viral_probability * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Predictions */}
                {predictions.map((pred, idx) => (
                    <motion.div
                        key={pred.hours}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="relative pl-8 pb-8 last:pb-0"
                    >
                        <div className={`absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-white shadow ${pred.probability > 0.8 ? 'bg-red-500' : pred.probability > 0.5 ? 'bg-orange-500' : 'bg-yellow-500'
                            }`} />

                        <div className={`rounded-lg p-4 border ${pred.probability > 0.8
                            ? 'bg-red-50 border-red-200'
                            : pred.probability > 0.5
                                ? 'bg-orange-50 border-orange-200'
                                : 'bg-yellow-50 border-yellow-200'
                            }`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-slate-700">+{pred.hours} Hours</span>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${pred.probability > 0.8
                                    ? 'bg-red-200 text-red-800'
                                    : pred.probability > 0.5
                                        ? 'bg-orange-200 text-orange-800'
                                        : 'bg-yellow-200 text-yellow-800'
                                    }`}>
                                    {(pred.probability * 100).toFixed(0)}% likely
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-slate-500">Est. Posts:</span>
                                    <span className="ml-2 font-semibold text-slate-800">{pred.posts}</span>
                                    <span className="text-xs text-red-600 ml-1">
                                        (+{Math.round((pred.posts / crisis.metrics.post_count - 1) * 100)}%)
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500">Est. Reach:</span>
                                    <span className="ml-2 font-semibold text-slate-800">{(pred.reach / 1000).toFixed(0)}k</span>
                                    <span className="text-xs text-red-600 ml-1">
                                        (+{Math.round((pred.reach / crisis.metrics.total_reach - 1) * 100)}%)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Narrative Chain */}
            <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="font-semibold text-slate-800 mb-4">Narrative Chain</h4>
                <div className="flex gap-4">
                    {crisis.narrative_chain.map((stage) => (
                        <div key={stage.stage} className="flex-1">
                            <div className={`h-2 rounded-full mb-2 ${stage.stage === 'origin' ? 'bg-blue-500' :
                                stage.stage === 'amplification' ? 'bg-orange-500' :
                                    stage.stage === 'critical' ? 'bg-red-500' :
                                        'bg-red-300 animate-pulse'
                                }`} />
                            <div className="text-xs">
                                <span className={`font-semibold capitalize ${stage.stage === 'predicted_viral' ? 'text-red-600' : 'text-slate-700'
                                    }`}>
                                    {stage.stage.replace('_', ' ')}
                                </span>
                                <p className="text-slate-500">{stage.time}</p>
                                <p className="text-slate-400 mt-1 line-clamp-2">{stage.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
