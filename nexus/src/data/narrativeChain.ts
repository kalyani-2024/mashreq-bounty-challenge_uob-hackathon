// Narrative chain data showing crisis spread path
export interface NarrativeChainStep {
    id: number;
    stage: 'ORIGINATOR' | 'AMPLIFIER' | 'MISINFO' | 'CRITICAL';
    time: string;
    handle: string;
    name: string;
    text: string;
    reach: number;
    sentiment: number;
    followers: number;
    isCustomer: boolean;
    preventable: boolean;
}

export const narrativeChain: NarrativeChainStep[] = [
    {
        id: 1,
        stage: 'ORIGINATOR',
        time: '08:00',
        handle: '@TechCEO_Dubai',
        name: 'Ahmed Al-Rashid',
        text: 'Mashreq API down for 3 hours. Lost production revenue. This is unacceptable for a bank of this caliber. 😡',
        reach: 125000,
        sentiment: -0.9,
        followers: 142000,
        isCustomer: true,
        preventable: false
    },
    {
        id: 2,
        stage: 'AMPLIFIER',
        time: '09:15',
        handle: '@DevGuru_UAE',
        name: 'Mohammed Al-Shamsi',
        text: 'Same enterprise outage at Mashreq affecting multiple clients. @TechCEO_Dubai not alone. DevOps teams scrambling.',
        reach: 45000,
        sentiment: -0.7,
        followers: 52000,
        isCustomer: true,
        preventable: true
    },
    {
        id: 3,
        stage: 'MISINFO',
        time: '09:45',
        handle: '@BankWatcher',
        name: 'Anonymous',
        text: 'BREAKING: Hearing Mashreq data breach may be cause of outage. Customer data potentially compromised? #UAEBanking',
        reach: 89000,
        sentiment: -0.95,
        followers: 78000,
        isCustomer: false,
        preventable: true
    },
    {
        id: 4,
        stage: 'CRITICAL',
        time: '11:00',
        handle: '@NewsUAE',
        name: 'UAE Business News',
        text: 'DEVELOPING: Mashreq Bank investigating alleged security breach following reports of widespread API outages...',
        reach: 250000,
        sentiment: -0.85,
        followers: 320000,
        isCustomer: false,
        preventable: true
    }
];

export function getStageInfo(stage: NarrativeChainStep['stage']): { color: string; label: string; description: string } {
    switch (stage) {
        case 'ORIGINATOR':
            return {
                color: 'red',
                label: 'Origin Point',
                description: 'Initial complaint that started the crisis'
            };
        case 'AMPLIFIER':
            return {
                color: 'orange',
                label: 'Amplification',
                description: 'Others confirming and spreading the issue'
            };
        case 'MISINFO':
            return {
                color: 'yellow',
                label: 'Misinformation',
                description: 'False narrative mutation introduced'
            };
        case 'CRITICAL':
            return {
                color: 'red',
                label: 'Critical Mass',
                description: 'Media amplification - potential headline'
            };
    }
}
