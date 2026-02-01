// Verification types and mock data for SIGMA verification system
export type VerificationStatus = 'VERIFIED_FALSE' | 'LIKELY_FALSE' | 'UNCERTAIN' | 'LIKELY_TRUE' | 'VERIFIED_TRUE';

export interface VerificationCheck {
    name: string;
    status: string;
    confidence: number;
    weight: number;
    finding: string;
    details: string[];
}

export interface MisinfoPattern {
    name: string;
    score: number;
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    indicators: string[];
}

export interface PostVerification {
    postId: string;
    extractedClaim: string;
    status: VerificationStatus;
    confidence: number;
    checks: VerificationCheck[];
    patterns: MisinfoPattern[];
    redFlags: string[];
    humanReviewRequired: boolean;
    analystNotes?: string;
    verifiedBy?: string;
    verifiedAt?: string;
}

// Mock verification data for posts
export const mockVerifications: Record<string, PostVerification> = {
    'post_001': {
        postId: 'post_001',
        extractedClaim: 'Mashreq API has been down for 3 hours',
        status: 'LIKELY_TRUE',
        confidence: 82,
        checks: [
            {
                name: 'Official Sources',
                status: 'CONFIRMED',
                confidence: 78,
                weight: 40,
                finding: 'Status page confirms planned maintenance',
                details: [
                    '✓ Status page: "Scheduled API maintenance 08:00-11:00"',
                    '✓ Twitter: No denial issued',
                    '✓ Press: No official statement'
                ]
            },
            {
                name: 'Internal Systems',
                status: 'EVIDENCE_FOUND',
                confidence: 92,
                weight: 35,
                finding: 'Internal monitoring confirms outage',
                details: [
                    '✓ SOC: API gateway alerts detected',
                    '✓ Tickets: 47 complaints received',
                    '✓ Monitoring: 99.2% → 45% availability drop'
                ]
            },
            {
                name: 'Trusted News',
                status: 'NO_COVERAGE',
                confidence: 60,
                weight: 15,
                finding: 'No major news coverage (expected for maintenance)',
                details: [
                    '• Reuters: 0 articles',
                    '• Gulf News: 0 articles',
                    '• The National: 0 articles'
                ]
            },
            {
                name: 'Source Credibility',
                status: 'HIGH',
                confidence: 85,
                weight: 10,
                finding: 'Verified enterprise account with good history',
                details: [
                    '✓ Account age: 8 years',
                    '✓ Verified business account',
                    '✓ Previous claims: 94% accurate'
                ]
            }
        ],
        patterns: [
            { name: 'Sensationalism', score: 0.3, level: 'MEDIUM', indicators: ['Emoji usage', 'Frustration tone'] },
            { name: 'Vague Sources', score: 0.1, level: 'LOW', indicators: ['Cites specific times'] },
            { name: 'Urgency', score: 0.2, level: 'LOW', indicators: [] },
            { name: 'Copy-Paste', score: 0, level: 'LOW', indicators: [] }
        ],
        redFlags: [],
        humanReviewRequired: false
    },
    'post_003': {
        postId: 'post_003',
        extractedClaim: 'Mashreq data breach caused the outage',
        status: 'VERIFIED_FALSE',
        confidence: 94,
        checks: [
            {
                name: 'Official Sources',
                status: 'DENIED',
                confidence: 95,
                weight: 40,
                finding: 'Official statement explicitly denies breach',
                details: [
                    '✓ Status page: "No security incidents"',
                    '✓ Twitter: "Planned maintenance - no data impact"',
                    '✓ Press: Official denial issued'
                ]
            },
            {
                name: 'Internal Systems',
                status: 'NO_EVIDENCE',
                confidence: 92,
                weight: 35,
                finding: 'No security alerts or anomalies',
                details: [
                    '✓ SOC: Zero security alerts',
                    '✓ Fraud detection: Normal patterns',
                    '✓ Data access logs: No unauthorized access'
                ]
            },
            {
                name: 'Trusted News',
                status: 'NO_COVERAGE',
                confidence: 85,
                weight: 15,
                finding: 'Major outlets would cover real breach',
                details: [
                    '• Reuters: 0 articles',
                    '• Bloomberg: 0 articles',
                    '• Gulf News: 0 articles',
                    '⚠️ Real breaches get immediate coverage'
                ]
            },
            {
                name: 'Source Credibility',
                status: 'LOW',
                confidence: 88,
                weight: 10,
                finding: 'Anonymous account with suspicious patterns',
                details: [
                    '❌ Account age: 3 months',
                    '❌ Not verified',
                    '❌ Follower ratio: 1:15 (suspicious)',
                    '❌ Previous claims: 23% accuracy'
                ]
            }
        ],
        patterns: [
            { name: 'Sensationalism', score: 0.8, level: 'HIGH', indicators: ['ALL CAPS', 'Warning emojis 🚨', '"BREAKING"'] },
            { name: 'Vague Sources', score: 0.9, level: 'HIGH', indicators: ['No specific sources cited', 'Uses "hearing"'] },
            { name: 'Urgency', score: 0.6, level: 'MEDIUM', indicators: ['Creates panic'] },
            { name: 'Copy-Paste', score: 0.2, level: 'LOW', indicators: [] }
        ],
        redFlags: [
            '⚠️ Uses sensational language and ALL CAPS',
            '⚠️ Relies on vague sources ("Hearing...")',
            '⚠️ Source has low credibility score (2.3/10)',
            '⚠️ Official sources explicitly deny the claim'
        ],
        humanReviewRequired: true
    },
    'post_004': {
        postId: 'post_004',
        extractedClaim: 'Mashreq investigating alleged security breach',
        status: 'UNCERTAIN',
        confidence: 55,
        checks: [
            {
                name: 'Official Sources',
                status: 'NO_STATEMENT',
                confidence: 30,
                weight: 40,
                finding: 'No specific statement about this claim',
                details: [
                    '? Status page: Only mentions maintenance',
                    '? Twitter: No response to claims',
                    '? Press: No statement issued'
                ]
            },
            {
                name: 'Internal Systems',
                status: 'NO_EVIDENCE',
                confidence: 75,
                weight: 35,
                finding: 'No investigation logged in systems',
                details: [
                    '✓ SOC: No active investigations',
                    '? Ticket: Some inquiries about breach rumor',
                    '✓ IR Team: No incidents opened'
                ]
            },
            {
                name: 'Trusted News',
                status: 'COVERED',
                confidence: 65,
                weight: 15,
                finding: 'One outlet reporting (unverified)',
                details: [
                    '? UAE Business News: Reporting rumor',
                    '• Reuters: 0 articles',
                    '• Bloomberg: 0 articles'
                ]
            },
            {
                name: 'Source Credibility',
                status: 'MEDIUM',
                confidence: 60,
                weight: 10,
                finding: 'News account with mixed track record',
                details: [
                    '✓ Account age: 5 years',
                    '? Not verified',
                    '? Previous claims: 67% accuracy'
                ]
            }
        ],
        patterns: [
            { name: 'Sensationalism', score: 0.4, level: 'MEDIUM', indicators: ['"DEVELOPING"', 'Uses "alleged"'] },
            { name: 'Vague Sources', score: 0.5, level: 'MEDIUM', indicators: ['Uses "reports"'] },
            { name: 'Urgency', score: 0.3, level: 'LOW', indicators: [] },
            { name: 'Copy-Paste', score: 0, level: 'LOW', indicators: [] }
        ],
        redFlags: [
            '❓ Claim needs further investigation',
            '❓ No official confirmation or denial yet',
            '❓ Source is newspaper but claim is unverified'
        ],
        humanReviewRequired: true
    }
};

// Get verification for a post
export function getVerification(postId: string): PostVerification | null {
    return mockVerifications[postId] || null;
}

// Get status badge color classes
export function getVerificationColor(status: VerificationStatus) {
    switch (status) {
        case 'VERIFIED_FALSE': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500', icon: '❌' };
        case 'LIKELY_FALSE': return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-500', icon: '🚫' };
        case 'UNCERTAIN': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500', icon: '❓' };
        case 'LIKELY_TRUE': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500', icon: '✓' };
        case 'VERIFIED_TRUE': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500', icon: '✅' };
    }
}

// Format status label
export function getVerificationLabel(status: VerificationStatus) {
    switch (status) {
        case 'VERIFIED_FALSE': return 'VERIFIED FALSE';
        case 'LIKELY_FALSE': return 'LIKELY FALSE';
        case 'UNCERTAIN': return 'UNCERTAIN';
        case 'LIKELY_TRUE': return 'LIKELY TRUE';
        case 'VERIFIED_TRUE': return 'VERIFIED TRUE';
    }
}
