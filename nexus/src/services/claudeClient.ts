// Claude API client for AI-powered analysis
import Anthropic from '@anthropic-ai/sdk';
import { CONFIG } from '../config';
import type { Customer, CrisisScenario, Strategy, PriorityAssessment, RecoveryPlan, SimulationResult } from '../types';

let anthropicClient: Anthropic | null = null;

function getClient(): Anthropic | null {
    if (CONFIG.DEMO_MODE) return null;

    if (!anthropicClient && CONFIG.ANTHROPIC_API_KEY) {
        anthropicClient = new Anthropic({
            apiKey: CONFIG.ANTHROPIC_API_KEY,
            dangerouslyAllowBrowser: true // For demo purposes only
        });
    }
    return anthropicClient;
}

// System prompt for consistent AI behavior
const SYSTEM_PROMPT = `You are NEXUS, an AI-powered social intelligence system for Mashreq Bank. 
You analyze customer data, crisis situations, and provide strategic recommendations.

IMPORTANT GUIDELINES:
1. Always return valid JSON matching the requested schema
2. Provide confidence scores based on data quality and certainty
3. Include feature_contributions array explaining what factors influenced your decision
4. Be specific to UAE banking context
5. Consider reputational, financial, and relationship impacts
6. Recommendations should be actionable and time-bound`;

// Analyze customer priority with Claude
export async function analyzeCustomerPriority(customer: Customer): Promise<PriorityAssessment | null> {
    const client = getClient();
    if (!client) return null;

    try {
        const response = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2000,
            system: SYSTEM_PROMPT,
            messages: [{
                role: 'user',
                content: `Analyze this customer and provide a priority assessment:

Customer: ${customer.name} (${customer.handle})
Account Type: ${customer.account_type}
Account Value: AED ${customer.account_value.toLocaleString()}
Tenure: ${customer.tenure_years} years
Followers: ${customer.followers.toLocaleString()}
Lifetime Value: AED ${customer.lifetime_value.toLocaleString()}
Products: ${customer.products.join(', ')}

Complaint:
"${customer.complaint.content}"
- Severity: ${customer.complaint.severity}
- Sentiment: ${customer.complaint.sentiment}
- Issue Type: ${customer.complaint.issue_type}
- Public: ${customer.complaint.public_visibility}

Return a JSON object with this EXACT structure:
{
  "priority_score": <number 0-10>,
  "churn_risk": <number 0-1>,
  "urgency": "critical" | "high" | "medium" | "low",
  "response_deadline": <string like "30 minutes" or "2 hours">,
  "confidence": <number 0-1>,
  "feature_contributions": [
    {
      "factor": <string>,
      "weight": <number 0-1>,
      "impact": "critical" | "high" | "medium" | "low",
      "value": <string or number>,
      "explanation": <string>
    }
  ],
  "explanation": <string summarizing the assessment>
}`
            }]
        });

        const textContent = response.content.find(c => c.type === 'text');
        if (!textContent || textContent.type !== 'text') return null;

        // Extract JSON from response
        const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return null;

        return JSON.parse(jsonMatch[0]) as PriorityAssessment;
    } catch (error) {
        console.error('Claude API error:', error);
        return null;
    }
}

// Generate recovery plan with Claude
export async function generateRecoveryPlan(customer: Customer): Promise<RecoveryPlan | null> {
    const client = getClient();
    if (!client) return null;

    try {
        const response = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 4000,
            system: SYSTEM_PROMPT,
            messages: [{
                role: 'user',
                content: `Generate a detailed recovery plan for this at-risk customer:

Customer: ${customer.name}
Handle: ${customer.handle}
Account Value: AED ${customer.account_value.toLocaleString()}
Tenure: ${customer.tenure_years} years
Followers: ${customer.followers.toLocaleString()}
Products: ${customer.products.join(', ')}
Relationship Manager: ${customer.relationship_manager}

Complaint: "${customer.complaint.content}"
Severity: ${customer.complaint.severity}
Issue Type: ${customer.complaint.issue_type}

Generate a JSON recovery plan with personalized call script, goodwill options, and expected outcomes.
Include feature_contributions explaining why each recommendation was made.

Return valid JSON matching the RecoveryPlan interface with steps array, expected_outcome, if_no_action, and feature_contributions.`
            }]
        });

        const textContent = response.content.find(c => c.type === 'text');
        if (!textContent || textContent.type !== 'text') return null;

        const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return null;

        return JSON.parse(jsonMatch[0]) as RecoveryPlan;
    } catch (error) {
        console.error('Claude API error:', error);
        return null;
    }
}

// Simulate crisis response with Claude
export async function simulateCrisisResponse(
    crisis: CrisisScenario,
    strategy: Strategy
): Promise<SimulationResult | null> {
    const client = getClient();
    if (!client) return null;

    try {
        const response = await client.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 3000,
            system: SYSTEM_PROMPT,
            messages: [{
                role: 'user',
                content: `Simulate the outcome of applying this strategy to the crisis:

CRISIS:
Title: ${crisis.title}
Type: ${crisis.type}
Severity: ${crisis.severity}
Current Metrics:
- Posts: ${crisis.metrics.post_count}
- Reach: ${crisis.metrics.total_reach.toLocaleString()}
- Sentiment: ${crisis.metrics.avg_sentiment}
- Viral Probability: ${(crisis.metrics.viral_probability * 100).toFixed(0)}%

Recent Posts:
${crisis.posts.slice(0, 3).map(p => `- "${p.content}" (sentiment: ${p.sentiment}, reach: ${p.reach})`).join('\n')}

STRATEGY: ${strategy.name}
${strategy.description}
Steps: ${strategy.steps.join(', ')}
Estimated Time: ${strategy.estimated_time}
Risk Level: ${strategy.risk_level}

Predict the outcomes after this strategy is executed. Include:
1. How metrics will change (sentiment, viral probability, reach)
2. Predicted posts from key personas (with probability estimates)
3. Risk assessment with containment level
4. Confidence score and feature contributions explaining the prediction

Return valid JSON matching SimulationResult interface.`
            }]
        });

        const textContent = response.content.find(c => c.type === 'text');
        if (!textContent || textContent.type !== 'text') return null;

        const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) return null;

        return JSON.parse(jsonMatch[0]) as SimulationResult;
    } catch (error) {
        console.error('Claude API error:', error);
        return null;
    }
}
