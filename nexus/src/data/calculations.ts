// Shared calculations so numbers are consistent and believable across the app.

/**
 * Priority score 0–100: weighted combination of churn risk, account value, and social reach.
 * All inputs normalized so result stays in 0–100.
 */
export function calculatePriorityScore(
    churnRisk: number,   // 0–1
    accountValue: number, // AED
    socialReach: number   // followers / reach
): number {
    const accountNorm = Math.min(accountValue / 2_000_000, 1);
    const reachNorm = Math.min(socialReach / 200_000, 1);
    const raw = 0.4 * churnRisk + 0.3 * accountNorm + 0.3 * reachNorm;
    return Math.min(100, Math.round(raw * 100));
}

/**
 * Churn risk 0–1 from complaint severity (when not already set on customer).
 */
export const severityToChurnRisk: Record<string, number> = {
    critical: 0.9,
    high: 0.72,
    medium: 0.52,
    low: 0.32
};
