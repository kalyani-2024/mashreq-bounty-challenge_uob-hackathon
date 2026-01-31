import { faker } from '@faker-js/faker';
import type {
    NetworkPersona,
    Customer,
    CrisisScenario,
    Strategy,
    Complaint
} from '../types';

// UAE-specific names and handles
const UAE_FIRST_NAMES = [
    'Ahmed', 'Mohammed', 'Fatima', 'Aisha', 'Omar', 'Khalid', 'Sara', 'Layla',
    'Youssef', 'Hassan', 'Maryam', 'Noor', 'Ali', 'Abdullah', 'Huda', 'Rania',
    'Ibrahim', 'Tariq', 'Salma', 'Dana', 'Karim', 'Zainab', 'Rashid', 'Amira'
];

const UAE_LAST_NAMES = [
    'Al-Mahmoud', 'Al-Rashid', 'Al-Nahyan', 'Al-Maktoum', 'Al-Qassimi', 'Al-Nuaimi',
    'Al-Shamsi', 'Al-Suwaidi', 'Al-Marzooqi', 'Al-Ali', 'Al-Hashimi', 'Al-Balushi'
];

const type_distribution = {
    influencer: 6,
    high_value_customer: 5,
    journalist: 3,
    brand_advocate: 6,
    retail_customer: 25,
    chronic_complainer: 3,
    bot: 2
};

function generateUAEName(): string {
    const firstName = faker.helpers.arrayElement(UAE_FIRST_NAMES);
    const lastName = faker.helpers.arrayElement(UAE_LAST_NAMES);
    return `${firstName} ${lastName}`;
}

function generateHandle(name: string): string {
    const cleaned = name.replace(/\s+/g, '').replace(/-/g, '');
    const suffix = faker.helpers.arrayElement(['UAE', 'Dubai', '_Official', '', String(faker.number.int({ min: 10, max: 99 }))]);
    return `@${cleaned}${suffix}`;
}

function getFollowerCount(type: NetworkPersona['type']): number {
    switch (type) {
        case 'influencer': return faker.number.int({ min: 100000, max: 500000 });
        case 'journalist': return faker.number.int({ min: 50000, max: 200000 });
        case 'high_value_customer': return faker.number.int({ min: 30000, max: 150000 });
        case 'brand_advocate': return faker.number.int({ min: 10000, max: 50000 });
        case 'retail_customer': return faker.number.int({ min: 100, max: 5000 });
        case 'chronic_complainer': return faker.number.int({ min: 200, max: 2000 });
        case 'bot': return faker.number.int({ min: 1000, max: 10000 });
        default: return faker.number.int({ min: 100, max: 1000 });
    }
}

// Generate network personas
export function generatePersonas(count: number = 50): NetworkPersona[] {
    const personas: NetworkPersona[] = [];
    const typeQueue: NetworkPersona['type'][] = [];

    // Build queue based on distribution
    Object.entries(type_distribution).forEach(([type, num]) => {
        for (let i = 0; i < num && typeQueue.length < count; i++) {
            typeQueue.push(type as NetworkPersona['type']);
        }
    });

    // Shuffle the queue
    faker.helpers.shuffle(typeQueue);

    // Fill remaining with retail customers
    while (typeQueue.length < count) {
        typeQueue.push('retail_customer');
    }

    for (let i = 0; i < count; i++) {
        const name = generateUAEName();
        const type = typeQueue[i];
        const followers = getFollowerCount(type);

        // Position in a circular/clustered layout
        const angle = (i / count) * 2 * Math.PI;
        const radius = 200 + faker.number.int({ min: 0, max: 150 });

        const persona: NetworkPersona = {
            id: `p${String(i + 1).padStart(3, '0')}`,
            name,
            handle: generateHandle(name),
            type,
            followers,
            sentiment: faker.number.float({ min: -1, max: 1, fractionDigits: 2 }),
            influence_score: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
            reached_by_crisis: false,
            position: {
                x: 400 + Math.cos(angle) * radius,
                y: 300 + Math.sin(angle) * radius
            },
            connections: [],
            postHistory: faker.helpers.multiple(
                () => faker.helpers.arrayElement(['positive', 'neutral', 'negative']),
                { count: faker.number.int({ min: 2, max: 6 }) }
            ),
            isCustomer: ['high_value_customer', 'retail_customer', 'chronic_complainer'].includes(type),
            accountValue: type === 'high_value_customer'
                ? faker.number.int({ min: 100000, max: 2000000 })
                : type === 'retail_customer'
                    ? faker.number.int({ min: 5000, max: 50000 })
                    : undefined,
            tenure: ['high_value_customer', 'retail_customer'].includes(type)
                ? faker.number.int({ min: 1, max: 15 })
                : undefined
        };

        personas.push(persona);
    }

    // Generate connections (each node connects to 2-5 others)
    personas.forEach((persona, idx) => {
        const connectionCount = faker.number.int({ min: 2, max: 5 });
        const possibleConnections = personas
            .filter((_, i) => i !== idx && !persona.connections.includes(personas[i]?.id))
            .map(p => p.id);

        const newConnections = faker.helpers.arrayElements(
            possibleConnections,
            Math.min(connectionCount, possibleConnections.length)
        );

        persona.connections.push(...newConnections);

        // Make connections bidirectional
        newConnections.forEach(connId => {
            const connPersona = personas.find(p => p.id === connId);
            if (connPersona && !connPersona.connections.includes(persona.id)) {
                connPersona.connections.push(persona.id);
            }
        });
    });

    return personas;
}

// Generate high-priority customers
export function generateCustomers(personas: NetworkPersona[], count: number = 5): Customer[] {
    const highValuePersonas = personas.filter(p => p.type === 'high_value_customer').slice(0, count);

    const complaints: { content: string; issue_type: string; severity: Complaint['severity'] }[] = [
        {
            content: "Mashreq card declined at important investor meeting. Embarrassing. Seriously considering switching banks.",
            issue_type: "service_failure",
            severity: "critical"
        },
        {
            content: "Third time this month my wire transfer was delayed. This is affecting my business operations.",
            issue_type: "transfer_delay",
            severity: "high"
        },
        {
            content: "Your app crashed and I missed paying a supplier on time. Unacceptable for a bank of your reputation.",
            issue_type: "app_failure",
            severity: "high"
        },
        {
            content: "Been waiting 45 minutes on hold. My time is valuable. @MashreqBank do better.",
            issue_type: "wait_time",
            severity: "medium"
        },
        {
            content: "Lost my card abroad and the replacement process is a nightmare. Rethinking my banking relationship.",
            issue_type: "card_replacement",
            severity: "high"
        }
    ];

    return highValuePersonas.map((persona, idx) => {
        const complaint = complaints[idx % complaints.length];
        const accountValue = persona.accountValue || faker.number.int({ min: 100000, max: 2000000 });

        return {
            id: `cust_${String(idx + 1).padStart(3, '0')}`,
            personaId: persona.id,
            name: persona.name,
            handle: persona.handle,
            account_type: faker.helpers.arrayElement(['business', 'premium', 'corporate']) as Customer['account_type'],
            account_value: accountValue,
            tenure_years: persona.tenure || faker.number.int({ min: 3, max: 15 }),
            followers: persona.followers,
            lifetime_value: accountValue * faker.number.float({ min: 2, max: 5, fractionDigits: 1 }),
            products: faker.helpers.arrayElements(
                ['business_banking', 'corporate_card', 'investment_portfolio', 'trade_finance', 'wealth_management', 'forex_services'],
                { min: 2, max: 4 }
            ),
            complaint: {
                id: `comp_${String(idx + 1).padStart(3, '0')}`,
                content: complaint.content,
                timestamp: new Date(Date.now() - faker.number.int({ min: 0, max: 7200000 })).toISOString(),
                sentiment: faker.number.float({ min: -0.95, max: -0.6, fractionDigits: 2 }),
                severity: complaint.severity,
                issue_type: complaint.issue_type,
                public_visibility: true
            },
            relationship_manager: generateUAEName(),
            last_contact: faker.date.recent({ days: 30 }).toISOString().split('T')[0]
        };
    });
}

// Generate crisis scenarios
export function generateCrisisScenarios(): CrisisScenario[] {
    const now = new Date();

    return [
        {
            id: 'crisis_001',
            type: 'service_disruption',
            title: 'ATM Service Network Issues',
            status: 'active',
            severity: 'high',
            detected_at: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
            posts: [
                {
                    id: 'post_001',
                    persona_id: 'p025',
                    timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
                    content: "Mashreq ATM ate my card and won't give it back! 😡 Dubai Mall branch",
                    sentiment: -0.85,
                    reach: 450,
                    engagement: 12
                },
                {
                    id: 'post_002',
                    persona_id: 'p032',
                    timestamp: new Date(now.getTime() - 1.5 * 60 * 60 * 1000).toISOString(),
                    content: "Same happened to me yesterday at Marina branch. What's going on @MashreqBank?",
                    sentiment: -0.72,
                    reach: 280,
                    engagement: 8
                },
                {
                    id: 'post_003',
                    persona_id: 'p003',
                    timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
                    content: "Hearing reports of ATM issues across UAE. Anyone else affected? @MashreqBank",
                    sentiment: -0.65,
                    reach: 125000,
                    engagement: 856
                }
            ],
            metrics: {
                post_count: 47,
                unique_users: 38,
                total_reach: 285000,
                avg_sentiment: -0.78,
                viral_probability: 0.72,
                trending_in: '4 hours'
            },
            narrative_chain: [
                { stage: 'origin', time: '10:23 AM', description: 'Original complaint posted', post_ids: ['post_001'] },
                { stage: 'amplification', time: '10:45 AM', description: 'Multiple users confirm similar issues', post_ids: ['post_002'] },
                { stage: 'critical', time: '11:12 AM', description: 'Influencer notices and amplifies', post_ids: ['post_003'] },
                { stage: 'predicted_viral', time: '3:00 PM (predicted)', description: 'Expected to trend if not addressed', post_ids: [] }
            ]
        },
        {
            id: 'crisis_002',
            type: 'fraud_rumor',
            title: 'Phishing Scam Reports',
            status: 'monitoring',
            severity: 'medium',
            detected_at: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
            posts: [
                {
                    id: 'post_101',
                    persona_id: 'p042',
                    timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
                    content: "Got a suspicious SMS claiming to be from Mashreq asking for my PIN. Be careful everyone!",
                    sentiment: -0.55,
                    reach: 850,
                    engagement: 45
                }
            ],
            metrics: {
                post_count: 12,
                unique_users: 11,
                total_reach: 18000,
                avg_sentiment: -0.52,
                viral_probability: 0.25,
                trending_in: 'unlikely'
            },
            narrative_chain: [
                { stage: 'origin', time: '7:15 AM', description: 'User reports phishing attempt', post_ids: ['post_101'] },
                { stage: 'amplification', time: '8:30 AM', description: 'Similar reports emerge', post_ids: [] }
            ]
        },
        {
            id: 'crisis_003',
            type: 'misinformation',
            title: 'False Data Breach Claim',
            status: 'active',
            severity: 'critical',
            detected_at: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
            posts: [
                {
                    id: 'post_201',
                    persona_id: 'p005',
                    timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
                    content: "BREAKING: Hearing rumors of a major data breach at Mashreq Bank. Can anyone confirm? #UAE #Banking",
                    sentiment: -0.9,
                    reach: 185000,
                    engagement: 2340
                }
            ],
            metrics: {
                post_count: 28,
                unique_users: 24,
                total_reach: 520000,
                avg_sentiment: -0.85,
                viral_probability: 0.88,
                trending_in: '1 hour'
            },
            narrative_chain: [
                { stage: 'origin', time: '11:30 AM', description: 'Journalist posts unverified claim', post_ids: ['post_201'] },
                { stage: 'critical', time: '11:45 AM', description: 'Rapid amplification begins', post_ids: [] }
            ]
        },
        {
            id: 'crisis_004',
            type: 'positive_feedback',
            title: 'Branch Service Excellence',
            status: 'resolved',
            severity: 'low',
            detected_at: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
            posts: [
                {
                    id: 'post_301',
                    persona_id: 'p018',
                    timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
                    content: "Amazing experience at Mashreq JBR branch today! Staff went above and beyond. This is what banking should be! 🌟",
                    sentiment: 0.92,
                    reach: 12000,
                    engagement: 230
                }
            ],
            metrics: {
                post_count: 8,
                unique_users: 8,
                total_reach: 45000,
                avg_sentiment: 0.85,
                viral_probability: 0.15,
                trending_in: 'n/a'
            },
            narrative_chain: [
                { stage: 'origin', time: 'Yesterday', description: 'Positive customer feedback', post_ids: ['post_301'] }
            ]
        }
    ];
}

// Generate response strategies
export function generateStrategies(): Strategy[] {
    return [
        {
            id: 'strategy_immediate',
            name: 'Immediate Public Statement',
            description: 'Issue official statement across all channels immediately',
            steps: [
                'Draft official acknowledgment statement',
                'Get rapid legal/compliance review (30 min)',
                'Post simultaneously on Twitter, LinkedIn, Instagram',
                'Brief customer service team on talking points',
                'Monitor response in real-time'
            ],
            estimated_time: '1-2 hours',
            risk_level: 'medium',
            recommended: false
        },
        {
            id: 'strategy_influencer',
            name: 'Private Influencer Outreach',
            description: 'Contact key influencers privately before public statement',
            steps: [
                'Identify top 3 influencers amplifying the issue',
                'Prepare accurate information package',
                'Direct message or call within 30 minutes',
                'Request they help clarify the situation',
                'Follow with coordinated public statement'
            ],
            estimated_time: '2-4 hours',
            risk_level: 'low',
            recommended: true
        },
        {
            id: 'strategy_monitor',
            name: 'Active Monitoring',
            description: 'Continue monitoring without immediate public response',
            steps: [
                'Set up enhanced monitoring for next 48 hours',
                'Track sentiment and reach metrics hourly',
                'Prepare response templates for escalation',
                'Respond only if situation crosses threshold'
            ],
            estimated_time: '48 hours',
            risk_level: 'high',
            recommended: false
        },
        {
            id: 'strategy_direct',
            name: 'Direct Customer Resolution',
            description: 'Reach out directly to affected customers first',
            steps: [
                'Identify and prioritize affected customers',
                'Personal outreach from relationship managers',
                'Resolve individual issues with compensation',
                'Request positive follow-up posts',
                'Issue public thank you for patience'
            ],
            estimated_time: '4-6 hours',
            risk_level: 'low',
            recommended: false
        }
    ];
}

// Initialize all data
export function initializeData() {
    const personas = generatePersonas(50);
    const customers = generateCustomers(personas, 5);
    const crisisScenarios = generateCrisisScenarios();
    const strategies = generateStrategies();

    // Mark some personas as reached by crisis
    const affectedIds = ['p025', 'p032', 'p003', 'p005', 'p042'];
    personas.forEach(p => {
        if (affectedIds.includes(p.id)) {
            p.reached_by_crisis = true;
            p.sentiment = Math.min(p.sentiment, -0.5);
        }
    });

    return { personas, customers, crisisScenarios, strategies };
}
