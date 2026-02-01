import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { SectionId } from '../../types';

interface SectionHeaderProps {
    id: SectionId;
    icon: ReactNode;
    title: string;
    subtitle?: string;
    action?: ReactNode;
}

export default function SectionHeader({ id, icon, title, subtitle, action }: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                    <span className="text-white">{icon}</span>
                </div>
                <div>
                    <h2 id={`heading-${id}`} className="text-2xl font-bold text-slate-800">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-slate-500">{subtitle}</p>
                    )}
                </div>
            </div>
            {action && (
                <div>{action}</div>
            )}
        </motion.div>
    );
}
