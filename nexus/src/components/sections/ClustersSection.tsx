import { motion } from 'framer-motion';
import { LayoutGrid, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useNexusStore } from '../../store/useStore';
import SectionHeader from '../shared/SectionHeader';

export default function ClustersSection() {
    const { clusters, selectedCluster, selectCluster } = useNexusStore();

    const getColorClasses = (color: string, isSelected: boolean) => {
        const colors = {
            red: {
                bg: isSelected ? 'bg-red-500' : 'bg-gradient-to-br from-red-50 to-red-100',
                border: isSelected ? 'border-red-600' : 'border-red-200',
                text: isSelected ? 'text-white' : 'text-red-700',
                icon: isSelected ? 'text-white' : 'text-red-500'
            },
            yellow: {
                bg: isSelected ? 'bg-yellow-500' : 'bg-gradient-to-br from-yellow-50 to-yellow-100',
                border: isSelected ? 'border-yellow-600' : 'border-yellow-200',
                text: isSelected ? 'text-white' : 'text-yellow-700',
                icon: isSelected ? 'text-white' : 'text-yellow-500'
            },
            green: {
                bg: isSelected ? 'bg-green-500' : 'bg-gradient-to-br from-green-50 to-green-100',
                border: isSelected ? 'border-green-600' : 'border-green-200',
                text: isSelected ? 'text-white' : 'text-green-700',
                icon: isSelected ? 'text-white' : 'text-green-500'
            }
        };
        return colors[color as keyof typeof colors] || colors.green;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <AlertCircle className="w-5 h-5" />;
            case 'monitoring': return <Clock className="w-5 h-5" />;
            case 'resolved': return <CheckCircle className="w-5 h-5" />;
            default: return <AlertCircle className="w-5 h-5" />;
        }
    };

    return (
        <section id="section-clusters" className="py-8">
            <SectionHeader
                id="clusters"
                icon={<LayoutGrid className="w-6 h-6" />}
                title="Crisis Clusters"
                subtitle="Click a cluster to view related posts and analysis"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clusters.map((cluster, idx) => {
                    const isSelected = selectedCluster?.id === cluster.id;
                    const colors = getColorClasses(cluster.color, isSelected);

                    return (
                        <motion.button
                            key={cluster.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => selectCluster(cluster)}
                            className={`
                                relative p-6 rounded-2xl border-2 text-left transition-all
                                ${colors.bg} ${colors.border}
                                ${isSelected ? 'shadow-xl ring-4 ring-orange-200' : 'shadow-lg hover:shadow-xl'}
                            `}
                        >
                            {/* Risk Badge */}
                            <div className={`absolute top-4 right-4 flex items-center gap-1.5 ${colors.text}`}>
                                {getStatusIcon(cluster.status)}
                                <span className="text-sm font-semibold">{cluster.risk}%</span>
                            </div>

                            {/* Post Count Bubble */}
                            <div className={`
                                w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                                ${isSelected ? 'bg-white/20' : 'bg-white shadow-md'}
                            `}>
                                <span className={`text-3xl font-bold ${isSelected ? 'text-white' : colors.text}`}>
                                    {cluster.count}
                                </span>
                            </div>

                            {/* Cluster Name */}
                            <h3 className={`text-xl font-bold mb-2 ${colors.text}`}>
                                {cluster.name}
                            </h3>

                            {/* Status */}
                            <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                                {cluster.status === 'active' ? 'Requires immediate attention' :
                                    cluster.status === 'monitoring' ? 'Under observation' : 'Successfully resolved'}
                            </p>

                            {/* Root Cause Preview */}
                            {isSelected && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 pt-4 border-t border-white/20"
                                >
                                    <p className="text-xs text-white/70 mb-1">ROOT CAUSE:</p>
                                    <p className="text-sm text-white font-medium line-clamp-2">
                                        {cluster.rootCause}
                                    </p>
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Summary Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Total Posts</p>
                    <p className="text-2xl font-bold text-slate-800">
                        {clusters.reduce((sum, c) => sum + c.count, 0)}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Active Clusters</p>
                    <p className="text-2xl font-bold text-red-600">
                        {clusters.filter(c => c.status === 'active').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">Avg Risk</p>
                    <p className="text-2xl font-bold text-orange-600">
                        {Math.round(clusters.reduce((sum, c) => sum + c.risk, 0) / clusters.length)}%
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <p className="text-sm text-slate-500">RCA Complete</p>
                    <p className="text-2xl font-bold text-green-600">100%</p>
                </div>
            </div>
        </section>
    );
}
