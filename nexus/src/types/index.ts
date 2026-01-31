// Core data types for NEXUS

// Network persona in the social graph
export interface NetworkPersona {
    id: string;
    handle: string;
    name: string;
    followers: number;
    sentiment: number; // -1 to 1
    influence_score: number; // 0 to 10
    type: 'influencer' | 'high_value_customer' | 'journalist' | 'brand_advocate' | 'retail_customer' | 'chronic_complainer' | 'bot';
    reached_by_crisis: boolean;
    position: { x: number; y: number };
    connections: string[];
    postHistory: string[];
    isCustomer: boolean;
    accountValue?: number;
    tenure?: number;
}

// High-value customer requiring attention
export interface Customer {
    id: string;
    personaId: string;
    name: string;
    handle: string;
    account_type: 'personal' | 'business' | 'premium' | 'corporate';
    account_value: number;
    tenure_years: number;
    followers: number;
    lifetime_value: number;
    products: string[];
    complaint: Complaint;
    relationship_manager: string;
    last_contact: string;
}

export interface Complaint {
    id: string;
    content: string;
    timestamp: string;
    sentiment: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    issue_type: string;
    public_visibility: boolean;
}

// Crisis scenario
export interface CrisisScenario {
    id: string;
    type: 'service_disruption' | 'fraud_rumor' | 'data_breach' | 'misinformation' | 'positive_feedback';
    title: string;
    status: 'active' | 'monitoring' | 'resolved';
    severity: 'low' | 'medium' | 'high' | 'critical';
    detected_at: string;
    posts: CrisisPost[];
    metrics: CrisisMetrics;
    narrative_chain: NarrativeStage[];
}

export interface CrisisPost {
    id: string;
    persona_id: string;
    timestamp: string;
    content: string;
    sentiment: number;
    reach: number;
    engagement: number;
}

export interface CrisisMetrics {
    post_count: number;
    unique_users: number;
    total_reach: number;
    avg_sentiment: number;
    viral_probability: number;
    trending_in: string;
}

export interface NarrativeStage {
    stage: 'origin' | 'amplification' | 'critical' | 'viral' | 'predicted_viral';
    time: string;
    description: string;
    post_ids: string[];
}

// Response strategy
export interface Strategy {
    id: string;
    name: string;
    description: string;
    steps: string[];
    estimated_time: string;
    risk_level: 'low' | 'medium' | 'high';
    recommended: boolean;
}

// AI-generated results
export interface PriorityAssessment {
    priority_score: number;
    churn_risk: number;
    urgency: 'critical' | 'high' | 'medium' | 'low';
    response_deadline: string;
    confidence: number;
    feature_contributions: FeatureContribution[];
    explanation: string;
}

export interface FeatureContribution {
    factor: string;
    weight: number;
    impact: 'critical' | 'high' | 'medium' | 'low';
    value: string | number;
    explanation: string;
}

export interface SimulationResult {
    strategy_id: string;
    strategy_name: string;
    predicted_outcome: {
        sentiment_shift: { before: number; after: number; change: string };
        viral_probability: { before: number; after: number; change: string };
        reach: { before: number; after: number; change: string };
        affected_nodes: { before: number; after: number };
    };
    predicted_posts: PredictedPost[];
    risk_assessment: {
        level: 'low' | 'medium' | 'high';
        containment: 'high' | 'moderate' | 'low';
        recommendation: string;
    };
    confidence: number;
    feature_contributions: FeatureContribution[];
}

export interface PredictedPost {
    persona_id: string;
    name: string;
    content: string;
    sentiment: number;
    probability: number;
}

export interface RecoveryPlan {
    strategy: string;
    confidence: number;
    urgency_justification: string;
    steps: RecoveryStep[];
    expected_outcome: ExpectedOutcome;
    if_no_action: NoActionRisk;
    feature_contributions: FeatureContribution[];
}

export interface RecoveryStep {
    step: number;
    title: string;
    who?: string;
    when?: string;
    channel?: string;
    script?: string;
    actions?: string[];
    options?: GoodwillOption[];
    recommended?: string;
    timeline?: string;
    priority?: 'critical' | 'high' | 'medium' | 'low';
}

export interface GoodwillOption {
    action: string;
    estimated_value: string;
    impact: string;
}

export interface ExpectedOutcome {
    retention_probability: number;
    sentiment_shift: { from: number; to: number; change: string };
    public_post_outcome: {
        positive_followup: number;
        deletion: number;
        neutral_silence: number;
        continued_negative: number;
    };
    lifetime_value_protected: number;
    additional_benefits: string[];
}

export interface NoActionRisk {
    churn_probability: number;
    lost_revenue: number;
    reputational_impact: string;
    cascade_risk: string;
}

// App state
export interface AppState {
    personas: NetworkPersona[];
    customers: Customer[];
    crisisScenarios: CrisisScenario[];
    strategies: Strategy[];
    selectedCrisis: CrisisScenario | null;
    selectedCustomer: Customer | null;
    activeTrack: 'crisis' | 'customer';
    isLoading: boolean;
    demoMode: boolean;
}
