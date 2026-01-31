// Demo mode pre-generated AI responses
import type {
    PriorityAssessment,
    RecoveryPlan,
    SimulationResult,
    Customer,
    CrisisScenario,
    Strategy
} from '../types';

// Pre-generated priority assessments for demo mode
export function getDemoPriorityAssessment(customer: Customer): PriorityAssessment {
    const highValue = customer.account_value > 500000;
    const longTenure = customer.tenure_years > 5;
    const highInfluence = customer.followers > 50000;
    const severeSentiment = customer.complaint.sentiment < -0.7;

    const baseScore = 5;
    let score = baseScore;
    if (highValue) score += 2;
    if (longTenure) score += 1.5;
    if (highInfluence) score += 1;
    if (severeSentiment) score += 1;
    if (customer.complaint.severity === 'critical') score += 1;

    const finalScore = Math.min(10, Math.round(score * 10) / 10);
    const churnRisk = severeSentiment ? 0.75 + Math.random() * 0.2 : 0.4 + Math.random() * 0.3;

    return {
        priority_score: finalScore,
        churn_risk: Math.round(churnRisk * 100) / 100,
        urgency: finalScore >= 8.5 ? 'critical' : finalScore >= 7 ? 'high' : finalScore >= 5 ? 'medium' : 'low',
        response_deadline: finalScore >= 8.5 ? '30 minutes' : finalScore >= 7 ? '2 hours' : '24 hours',
        confidence: 0.87,
        feature_contributions: [
            {
                factor: 'Account Value',
                weight: 0.30,
                impact: highValue ? 'critical' : 'medium',
                value: `AED ${(customer.account_value / 1000).toFixed(0)}k`,
                explanation: highValue
                    ? 'Premium tier account with significant banking relationship'
                    : 'Standard account value within normal range'
            },
            {
                factor: 'Customer Tenure',
                weight: 0.22,
                impact: longTenure ? 'high' : 'medium',
                value: `${customer.tenure_years} years`,
                explanation: longTenure
                    ? 'Long-standing customer with demonstrated loyalty - higher lifetime value at risk'
                    : 'Moderate tenure, relationship still developing'
            },
            {
                factor: 'Complaint Severity',
                weight: 0.25,
                impact: customer.complaint.severity === 'critical' ? 'critical' : 'high',
                value: customer.complaint.severity,
                explanation: `Public complaint with ${Math.abs(customer.complaint.sentiment * 100).toFixed(0)}% negative sentiment indicates strong emotional response`
            },
            {
                factor: 'Social Influence',
                weight: 0.15,
                impact: highInfluence ? 'high' : 'low',
                value: `${(customer.followers / 1000).toFixed(0)}k followers`,
                explanation: highInfluence
                    ? 'High follower count creates significant reputational risk if complaint spreads'
                    : 'Limited social reach reduces viral risk'
            },
            {
                factor: 'Churn Signals',
                weight: 0.08,
                impact: 'medium',
                value: 'Explicit threat detected',
                explanation: 'Customer language suggests active consideration of switching banks'
            }
        ],
        explanation: `Priority score of ${finalScore}/10 based on ${highValue ? 'high-value account' : 'account value'}, ${customer.tenure_years}-year relationship, and ${customer.complaint.severity} complaint severity. ${highInfluence ? 'Social influence of ' + (customer.followers / 1000).toFixed(0) + 'k followers adds reputational urgency.' : ''}`
    };
}

// Pre-generated recovery plans for demo mode
export function getDemoRecoveryPlan(customer: Customer): RecoveryPlan {
    return {
        strategy: 'VIP Recovery Protocol',
        confidence: 0.91,
        urgency_justification: `First complaint in ${customer.tenure_years} years from a AED ${(customer.account_value / 1000).toFixed(0)}k account holder. Public embarrassment combined with ${(customer.followers / 1000).toFixed(0)}k social followers creates critical retention risk requiring immediate executive-level response.`,
        steps: [
            {
                step: 1,
                title: 'Immediate Personal Outreach',
                who: customer.relationship_manager,
                when: 'Within 30 minutes',
                channel: 'Phone call + Direct Message',
                script: `"${customer.name.split(' ')[0]}, this is ${customer.relationship_manager} from Mashreq. I just saw your post about ${customer.complaint.issue_type.replace(/_/g, ' ')} and I sincerely apologize for the inconvenience. This is completely unacceptable, especially given your ${customer.tenure_years}-year relationship with us. I'm personally looking into this right now and will have answers within the hour. Your relationship with Mashreq matters deeply to us, and we are fully committed to making this right immediately."`,
                priority: 'critical'
            },
            {
                step: 2,
                title: 'Issue Resolution',
                timeline: '1-2 hours',
                actions: [
                    `Investigate ${customer.complaint.issue_type.replace(/_/g, ' ')} root cause immediately`,
                    'Confirm no systemic issues affecting other customers',
                    'Implement immediate fix or workaround',
                    'Document resolution for compliance and future prevention',
                    'Prepare written apology from branch manager'
                ]
            },
            {
                step: 3,
                title: 'Relationship Reinforcement',
                options: [
                    {
                        action: 'Waive all fees for 6 months',
                        estimated_value: 'AED 2,400',
                        impact: 'Good gesture, expected for VIP recovery'
                    },
                    {
                        action: 'Upgrade to Platinum card',
                        estimated_value: 'AED 5,000/year',
                        impact: 'Demonstrates commitment to long-term relationship'
                    },
                    {
                        action: 'Personal banking concierge service',
                        estimated_value: 'Premium service tier',
                        impact: 'VIP treatment, proactive issue prevention'
                    },
                    {
                        action: 'Executive meeting + investment review',
                        estimated_value: 'Relationship building',
                        impact: 'Deepens relationship, upsell opportunity'
                    }
                ],
                recommended: 'Combine fee waiver + executive meeting for maximum impact'
            }
        ],
        expected_outcome: {
            retention_probability: 0.92,
            sentiment_shift: {
                from: customer.complaint.sentiment,
                to: 0.65,
                change: `+${(0.65 - customer.complaint.sentiment).toFixed(2)} (significant improvement)`
            },
            public_post_outcome: {
                positive_followup: 0.48,
                deletion: 0.28,
                neutral_silence: 0.19,
                continued_negative: 0.05
            },
            lifetime_value_protected: customer.lifetime_value,
            additional_benefits: [
                'Potential positive testimonial opportunity',
                'Strengthened relationship for product upsell',
                `Reduced influence risk (${(customer.followers / 1000).toFixed(0)}k followers)`,
                'Case study for customer recovery best practices'
            ]
        },
        if_no_action: {
            churn_probability: 0.85,
            lost_revenue: customer.lifetime_value,
            reputational_impact: `Negative post remains visible to ${(customer.followers / 1000).toFixed(0)}k followers, may be amplified by network`,
            cascade_risk: 'Medium to High - may influence other business clients in similar situations'
        },
        feature_contributions: [
            {
                factor: 'VIP Recovery Selection',
                weight: 0.35,
                impact: 'critical',
                value: 'Recommended',
                explanation: 'Account value and tenure warrant highest-tier recovery protocol'
            },
            {
                factor: 'Urgency Assessment',
                weight: 0.25,
                impact: 'critical',
                value: '30 minutes',
                explanation: 'Public visibility and sentiment severity require immediate response'
            },
            {
                factor: 'Compensation Level',
                weight: 0.20,
                impact: 'high',
                value: 'Fee waiver + Executive meeting',
                explanation: 'Proportional to relationship value and severity of issue'
            },
            {
                factor: 'Script Personalization',
                weight: 0.20,
                impact: 'high',
                value: 'Tenure-aware messaging',
                explanation: 'Acknowledging long relationship builds trust and shows recognition'
            }
        ]
    };
}

// Pre-generated simulation results for demo mode
export function getDemoSimulationResult(crisis: CrisisScenario, strategy: Strategy): SimulationResult {
    const isRecommended = strategy.recommended;
    const isLowRisk = strategy.risk_level === 'low';

    const sentimentImprovement = isRecommended ? 0.45 : isLowRisk ? 0.30 : 0.15;
    const viralReduction = isRecommended ? 0.55 : isLowRisk ? 0.35 : 0.15;
    const reachReduction = isRecommended ? 0.70 : isLowRisk ? 0.50 : 0.25;

    return {
        strategy_id: strategy.id,
        strategy_name: strategy.name,
        predicted_outcome: {
            sentiment_shift: {
                before: crisis.metrics.avg_sentiment,
                after: crisis.metrics.avg_sentiment + sentimentImprovement,
                change: `+${(sentimentImprovement * 100).toFixed(0)}%`
            },
            viral_probability: {
                before: crisis.metrics.viral_probability,
                after: crisis.metrics.viral_probability * (1 - viralReduction),
                change: `-${(viralReduction * 100).toFixed(0)}%`
            },
            reach: {
                before: crisis.metrics.total_reach,
                after: crisis.metrics.total_reach * (1 - reachReduction),
                change: `-${(reachReduction * 100).toFixed(0)}%`
            },
            affected_nodes: {
                before: crisis.posts.length,
                after: Math.max(crisis.posts.length - Math.floor(crisis.posts.length * reachReduction * 0.5), 1)
            }
        },
        predicted_posts: [
            {
                persona_id: 'p001',
                name: 'Tech Guru UAE',
                content: isRecommended
                    ? "Just spoke with Mashreq team - they're addressing the issue proactively. This is how banking should handle crises. Quick response 👍"
                    : "Still seeing mixed reports about the issue. @MashreqBank response seems slow...",
                sentiment: isRecommended ? 0.72 : -0.25,
                probability: isRecommended ? 0.78 : 0.55
            },
            {
                persona_id: 'p015',
                name: 'Finance Blogger',
                content: isRecommended
                    ? "Good to see Mashreq being transparent about the situation. Trust through communication."
                    : "Mashreq's response doesn't fully address customer concerns. More clarity needed.",
                sentiment: isRecommended ? 0.55 : -0.40,
                probability: 0.65
            },
            {
                persona_id: 'p032',
                name: 'Affected Customer',
                content: isRecommended
                    ? "Mashreq reached out directly to resolve my issue. Appreciate the personal touch."
                    : "Still waiting for a proper response from @MashreqBank...",
                sentiment: isRecommended ? 0.60 : -0.55,
                probability: isRecommended ? 0.70 : 0.80
            }
        ],
        risk_assessment: {
            level: isRecommended ? 'low' : isLowRisk ? 'medium' : 'high',
            containment: isRecommended ? 'high' : isLowRisk ? 'moderate' : 'low',
            recommendation: isRecommended
                ? 'Crisis effectively contained with high confidence. Continue monitoring for 48 hours and prepare positive follow-up content.'
                : isLowRisk
                    ? 'Partial containment expected. May require follow-up actions if sentiment doesn\'t improve within 6 hours.'
                    : 'High risk of continued escalation. Consider alternative strategy or combination approach.'
        },
        confidence: isRecommended ? 0.85 : isLowRisk ? 0.72 : 0.58,
        feature_contributions: [
            {
                factor: 'Strategy Selection',
                weight: 0.30,
                impact: isRecommended ? 'critical' : isLowRisk ? 'high' : 'medium',
                value: strategy.name,
                explanation: isRecommended
                    ? 'Influencer outreach has 3x higher success rate for reputation recovery'
                    : 'Strategy effectiveness varies based on crisis type and timing'
            },
            {
                factor: 'Timing',
                weight: 0.25,
                impact: 'high',
                value: strategy.estimated_time,
                explanation: 'Earlier intervention correlates with better containment outcomes'
            },
            {
                factor: 'Network Analysis',
                weight: 0.25,
                impact: 'high',
                value: `${crisis.posts.length} active nodes`,
                explanation: 'Current network spread indicates containment is still achievable'
            },
            {
                factor: 'Historical Patterns',
                weight: 0.20,
                impact: 'medium',
                value: 'Similar past incidents',
                explanation: 'Based on analysis of 50+ similar banking crisis scenarios'
            }
        ]
    };
}
