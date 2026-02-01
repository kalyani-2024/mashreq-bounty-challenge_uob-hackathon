// Cluster-appropriate grievances so customer complaints match the selected cluster (API outage, app crash, billing).
// Each cluster has a list of complaints; we pick by customer index so grievances are consistent per cluster view.

import type { Complaint } from '../types';

export interface ClusterGrievanceTemplate {
    content: string;
    severity: Complaint['severity'];
    issue_type: string;
    sentiment: number; // -1 to 1
}

export const clusterGrievances: Record<string, ClusterGrievanceTemplate[]> = {
    api_down: [
        {
            content: 'Just tried to transfer money via Mashreq app - total failure. Third time today. Anyone else facing this? Unacceptable.',
            severity: 'critical',
            issue_type: 'api_outage',
            sentiment: -0.92
        },
        {
            content: 'API down for 2 hours and I missed a critical business payment. Mashreq needs to fix this or I am moving my accounts.',
            severity: 'high',
            issue_type: 'transfer_failure',
            sentiment: -0.88
        },
        {
            content: 'Cannot complete any transaction on the app. Getting 503 errors. Customer service says they are "aware". Not good enough.',
            severity: 'high',
            issue_type: 'service_unavailable',
            sentiment: -0.85
        },
        {
            content: 'Mashreq app has been unusable all morning. Transfers failing, balance not loading. When will this be fixed?',
            severity: 'high',
            issue_type: 'api_outage',
            sentiment: -0.78
        },
        {
            content: 'Enterprise API integration down. Our payroll is delayed. This is a serious operational impact.',
            severity: 'critical',
            issue_type: 'api_outage',
            sentiment: -0.9
        }
    ],
    app_crash: [
        {
            content: 'Mashreq app keeps crashing whenever I try to check my balance. Third time this week. Anyone else?',
            severity: 'high',
            issue_type: 'app_crash',
            sentiment: -0.75
        },
        {
            content: 'App crashes during checkout every single time. I had to go to the branch. Not acceptable in 2024.',
            severity: 'high',
            issue_type: 'app_crash',
            sentiment: -0.82
        },
        {
            content: 'Cannot complete payment – app freezes and then crashes. Lost my cart twice. Fix this.',
            severity: 'medium',
            issue_type: 'app_crash',
            sentiment: -0.68
        },
        {
            content: 'App crashed and I missed paying a supplier on time. Unacceptable for a bank of your reputation.',
            severity: 'high',
            issue_type: 'app_crash',
            sentiment: -0.85
        },
        {
            content: 'Login screen loads then app closes. Reinstalled twice. Still crashing. Need this fixed urgently.',
            severity: 'medium',
            issue_type: 'app_crash',
            sentiment: -0.7
        }
    ],
    billing: [
        {
            content: 'Charged twice for the same transaction by Mashreq. Still waiting for refund after 5 days. This is theft!',
            severity: 'critical',
            issue_type: 'double_charge',
            sentiment: -0.88
        },
        {
            content: 'Payment went through but order failed. Money deducted, no refund in sight. Customer service not helping.',
            severity: 'high',
            issue_type: 'duplicate_charge',
            sentiment: -0.8
        },
        {
            content: 'Wrong amount debited from my account. Disputed 3 days ago – still no correction. Unacceptable.',
            severity: 'high',
            issue_type: 'billing_error',
            sentiment: -0.82
        },
        {
            content: 'Subscription charged twice in one month. No response from support. Considering filing a complaint.',
            severity: 'medium',
            issue_type: 'double_charge',
            sentiment: -0.72
        },
        {
            content: 'Gateway timeout during payment – money held, transaction marked failed. Where is my refund?',
            severity: 'high',
            issue_type: 'payment_timeout',
            sentiment: -0.78
        }
    ]
};

/**
 * Returns a complaint object to display for this customer in the given cluster.
 * Uses cluster-appropriate grievance content; keeps customer id and generates stable timestamp.
 */
export function getComplaintForCluster(
    clusterId: string,
    customerId: string,
    customerIndex: number
): Omit<Complaint, 'id'> & { id: string } {
    const pool = clusterGrievances[clusterId] ?? clusterGrievances.api_down;
    const template = pool[customerIndex % pool.length];
    const hoursAgo = (customerIndex % 48) + 1;
    const timestamp = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

    return {
        id: `comp_${clusterId}_${customerId}`,
        content: template.content,
        timestamp,
        sentiment: template.sentiment,
        severity: template.severity,
        issue_type: template.issue_type,
        public_visibility: true
    };
}
