// Unified AI service layer with Claude API + demo fallback
import { CONFIG } from '../config';
import type { Customer, CrisisScenario, Strategy, PriorityAssessment, RecoveryPlan, SimulationResult } from '../types';
import { analyzeCustomerPriority, generateRecoveryPlan as claudeGenerateRecoveryPlan, simulateCrisisResponse as claudeSimulateCrisisResponse } from './claudeClient';
import { getDemoPriorityAssessment, getDemoRecoveryPlan, getDemoSimulationResult } from '../data/demoResponses';

// Simulate AI "thinking" delay for better UX
async function simulateThinking(): Promise<void> {
    if (CONFIG.DEMO_MODE) {
        await new Promise(resolve => setTimeout(resolve, CONFIG.THINKING_DELAY));
    }
}

// Get customer priority assessment (Claude API or demo fallback)
export async function getCustomerPriorityAssessment(customer: Customer): Promise<PriorityAssessment> {
    await simulateThinking();

    if (!CONFIG.DEMO_MODE) {
        const claudeResult = await analyzeCustomerPriority(customer);
        if (claudeResult) return claudeResult;
        console.warn('Claude API failed, falling back to demo mode');
    }

    return getDemoPriorityAssessment(customer);
}

// Get recovery plan (Claude API or demo fallback)
export async function getRecoveryPlan(customer: Customer): Promise<RecoveryPlan> {
    await simulateThinking();

    if (!CONFIG.DEMO_MODE) {
        const claudeResult = await claudeGenerateRecoveryPlan(customer);
        if (claudeResult) return claudeResult;
        console.warn('Claude API failed, falling back to demo mode');
    }

    return getDemoRecoveryPlan(customer);
}

// Simulate crisis response (Claude API or demo fallback)
export async function simulateCrisisResponse(
    crisis: CrisisScenario,
    strategy: Strategy
): Promise<SimulationResult> {
    await simulateThinking();

    if (!CONFIG.DEMO_MODE) {
        const claudeResult = await claudeSimulateCrisisResponse(crisis, strategy);
        if (claudeResult) return claudeResult;
        console.warn('Claude API failed, falling back to demo mode');
    }

    return getDemoSimulationResult(crisis, strategy);
}

// Check if running in demo mode
export function isDemoMode(): boolean {
    return CONFIG.DEMO_MODE;
}
