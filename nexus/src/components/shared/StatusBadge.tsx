import { motion } from 'framer-motion';
import type { PostStatus } from '../../types';

interface StatusBadgeProps {
    status: PostStatus;
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

const statusConfig: Record<PostStatus, { bg: string; text: string; label: string; dot: string }> = {
    active: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        label: 'ACTIVE',
        dot: 'bg-red-500 animate-pulse'
    },
    watch: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        label: 'WATCH',
        dot: 'bg-yellow-500'
    },
    resolved: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        label: 'RESOLVED',
        dot: 'bg-green-500'
    },
    verified: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        label: 'VERIFIED',
        dot: 'bg-blue-500'
    },
    flagged: {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        label: 'FLAGGED',
        dot: 'bg-orange-500'
    },
    new: {
        bg: 'bg-slate-100',
        text: 'text-slate-700',
        label: 'NEW',
        dot: 'bg-slate-500'
    }
};

export default function StatusBadge({ status, size = 'md', onClick }: StatusBadgeProps) {
    const config = statusConfig[status];

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm'
    };

    return (
        <motion.button
            whileHover={onClick ? { scale: 1.05 } : {}}
            whileTap={onClick ? { scale: 0.95 } : {}}
            onClick={onClick}
            className={`
                inline-flex items-center gap-1.5 rounded-full font-semibold
                ${config.bg} ${config.text} ${sizeClasses[size]}
                ${onClick ? 'cursor-pointer hover:shadow-md' : 'cursor-default'}
                transition-all
            `}
        >
            <span className={`w-2 h-2 rounded-full ${config.dot}`} />
            {config.label}
        </motion.button>
    );
}

export function cycleStatus(current: PostStatus): PostStatus {
    const order: PostStatus[] = ['active', 'watch', 'resolved'];
    const currentIndex = order.indexOf(current);
    return order[(currentIndex + 1) % order.length];
}
