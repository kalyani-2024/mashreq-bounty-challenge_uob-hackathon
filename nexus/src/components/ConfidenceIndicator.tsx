import { motion } from 'framer-motion';

interface ConfidenceIndicatorProps {
    confidence: number; // 0-1
    explanation?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function ConfidenceIndicator({
    confidence,
    explanation,
    size = 'md'
}: ConfidenceIndicatorProps) {
    const percentage = Math.round(confidence * 100);

    // Determine color based on confidence level
    const getColor = () => {
        if (confidence >= 0.8) return { stroke: '#22c55e', bg: 'bg-green-100', text: 'text-green-700' };
        if (confidence >= 0.6) return { stroke: '#f59e0b', bg: 'bg-amber-100', text: 'text-amber-700' };
        return { stroke: '#ef4444', bg: 'bg-red-100', text: 'text-red-700' };
    };

    const colors = getColor();

    // Size configurations
    const sizeConfig = {
        sm: { outer: 60, stroke: 4, fontSize: 'text-sm', labelSize: 'text-xs' },
        md: { outer: 80, stroke: 5, fontSize: 'text-lg', labelSize: 'text-sm' },
        lg: { outer: 100, stroke: 6, fontSize: 'text-2xl', labelSize: 'text-base' }
    };

    const config = sizeConfig[size];
    const radius = (config.outer - config.stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (confidence * circumference);

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: config.outer, height: config.outer }}>
                {/* Background circle */}
                <svg
                    width={config.outer}
                    height={config.outer}
                    className="transform -rotate-90"
                >
                    <circle
                        cx={config.outer / 2}
                        cy={config.outer / 2}
                        r={radius}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth={config.stroke}
                    />
                    <motion.circle
                        cx={config.outer / 2}
                        cy={config.outer / 2}
                        r={radius}
                        fill="none"
                        stroke={colors.stroke}
                        strokeWidth={config.stroke}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </svg>

                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-bold ${config.fontSize} text-slate-800`}>
                        {percentage}%
                    </span>
                </div>
            </div>

            {/* Label */}
            <div className={`mt-2 px-3 py-1 rounded-full ${colors.bg} ${colors.text} ${config.labelSize} font-medium`}>
                {confidence >= 0.8 ? 'High Confidence' : confidence >= 0.6 ? 'Moderate' : 'Low Confidence'}
            </div>

            {/* Explanation */}
            {explanation && (
                <p className="mt-2 text-xs text-slate-500 text-center max-w-[200px]">
                    {explanation}
                </p>
            )}
        </div>
    );
}
