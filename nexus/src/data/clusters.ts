// Static cluster data for NEXUS demo
export interface Cluster {
    id: string;
    name: string;
    count: number;
    risk: number;
    rootCause: string;
    prevention: string[];
    whyChain: string[];
    fiveWhys?: string[]; // Alias for whyChain for components
    color: 'red' | 'yellow' | 'green';
    status: 'active' | 'monitoring' | 'resolved';
}

export const clusters: Cluster[] = [
    {
        id: 'api_down',
        name: 'API Downtime',
        count: 4,
        risk: 92,
        rootCause: 'Auto-scaling CPU threshold misconfigured at 90%',
        prevention: [
            'Lower threshold to 70% during peak hours',
            'Implement predictive auto-scaling',
            'Load test at 2x expected traffic',
            'Add redundant load balancers'
        ],
        whyChain: [
            'API endpoints returning 503 errors',
            'Load balancer failed under traffic spike',
            'Traffic spike during morning rush (8-10 AM)',
            'Auto-scaling delayed response by 4 minutes',
            'CPU threshold configured at 90% (should be 70%)'
        ],
        color: 'red',
        status: 'active'
    },
    {
        id: 'app_crash',
        name: 'App Crashes',
        count: 1,
        risk: 67,
        rootCause: 'Memory leak in payment module after v2.3 update',
        prevention: [
            'Rollback payment module to v2.2',
            'Add memory monitoring alerts',
            'Implement automated garbage collection',
            'Schedule hotfix deployment'
        ],
        whyChain: [
            'App crashes during checkout flow',
            'Out of memory exception thrown',
            'Memory not released after payment processing',
            'Payment module v2.3 introduced memory leak',
            'Insufficient testing of payment flow edge cases'
        ],
        color: 'yellow',
        status: 'active'
    },
    {
        id: 'billing',
        name: 'Billing Issues',
        count: 1,
        risk: 45,
        rootCause: 'Payment gateway timeout during high volume',
        prevention: [
            'Increase gateway timeout from 10s to 30s',
            'Add retry logic with exponential backoff',
            'Implement backup payment gateway',
            'Queue billing requests during peak'
        ],
        whyChain: [
            'Customers charged but transaction marked failed',
            'Payment gateway response exceeds timeout',
            'Gateway processes requests sequentially',
            'High transaction volume during salary day',
            'No circuit breaker or retry mechanism'
        ],
        color: 'green',
        status: 'monitoring'
    }
];

export function getClusterById(id: string): Cluster | undefined {
    return clusters.find(c => c.id === id);
}

export function getClusterPosts(clusterId: string, allPosts: any[]): any[] {
    // Map cluster IDs to crisis types
    const clusterTypeMap: Record<string, string> = {
        'api_down': 'service_disruption',
        'app_crash': 'misinformation',
        'billing': 'fraud_rumor'
    };
    return allPosts.filter(p => p.cluster_id === clusterId || p.type === clusterTypeMap[clusterId]);
}
