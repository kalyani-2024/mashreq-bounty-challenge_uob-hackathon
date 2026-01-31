interface ConfidenceBadgeProps {
    score: number; // 0 to 1
    size?: 'sm' | 'md' | 'lg';
}

export default function ConfidenceBadge({ score, size = 'md' }: ConfidenceBadgeProps) {
    const percentage = Math.round(score * 100);

    let colorClass = '';
    let label = '';

    if (score >= 0.8) {
        colorClass = 'bg-green-100 text-green-800 border-green-200';
        label = 'High Confidence';
    } else if (score >= 0.6) {
        colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        label = 'Medium Confidence';
    } else {
        colorClass = 'bg-red-100 text-red-800 border-red-200';
        label = 'Low Confidence';
    }

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-base px-3 py-1'
    };

    return (
        <div className={`inline-flex items-center gap-1.5 border rounded-full font-medium ${colorClass} ${sizeClasses[size]}`}>
            <div className={`rounded-full ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'} ${score >= 0.8 ? 'bg-green-500' : score >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
            <span>{percentage}%</span>
            {size !== 'sm' && <span className="opacity-75 border-l border-current pl-1.5 ml-0.5">{label}</span>}
        </div>
    );
}
