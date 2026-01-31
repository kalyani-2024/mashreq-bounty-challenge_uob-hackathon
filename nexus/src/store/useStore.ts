// Global state management with Zustand
import { create } from 'zustand';
import type {
    NetworkPersona,
    Customer,
    CrisisScenario,
    Strategy,
    SimulationResult,
    PriorityAssessment,
    RecoveryPlan
} from '../types';
import { initializeData } from '../data/generators';

interface NexusStore {
    // Data
    personas: NetworkPersona[];
    customers: Customer[];
    crisisScenarios: CrisisScenario[];
    strategies: Strategy[];

    // UI State
    activeTrack: 'crisis' | 'customer';
    selectedCrisis: CrisisScenario | null;
    selectedCustomer: Customer | null;
    isLoading: boolean;

    // AI Results
    simulationResults: Map<string, SimulationResult>;
    priorityAssessments: Map<string, PriorityAssessment>;
    recoveryPlans: Map<string, RecoveryPlan>;

    // Actions
    setActiveTrack: (track: 'crisis' | 'customer') => void;
    selectCrisis: (crisis: CrisisScenario | null) => void;
    selectCustomer: (customer: Customer | null) => void;
    setLoading: (loading: boolean) => void;

    // AI Result setters
    setSimulationResult: (strategyId: string, result: SimulationResult) => void;
    setPriorityAssessment: (customerId: string, assessment: PriorityAssessment) => void;
    setRecoveryPlan: (customerId: string, plan: RecoveryPlan) => void;

    // Initialize
    initializeStore: () => void;
}

// Initialize data
const initialData = initializeData();

export const useNexusStore = create<NexusStore>((set) => ({
    // Initial data from generators
    personas: initialData.personas,
    customers: initialData.customers,
    crisisScenarios: initialData.crisisScenarios,
    strategies: initialData.strategies,

    // UI State
    activeTrack: 'crisis',
    selectedCrisis: initialData.crisisScenarios[0] || null,
    selectedCustomer: null,
    isLoading: false,

    // AI Results (cached)
    simulationResults: new Map(),
    priorityAssessments: new Map(),
    recoveryPlans: new Map(),

    // Actions
    setActiveTrack: (track) => set({ activeTrack: track }),

    selectCrisis: (crisis) => set({ selectedCrisis: crisis }),

    selectCustomer: (customer) => set({ selectedCustomer: customer }),

    setLoading: (loading) => set({ isLoading: loading }),

    setSimulationResult: (strategyId, result) => set((state) => {
        const newResults = new Map(state.simulationResults);
        newResults.set(strategyId, result);
        return { simulationResults: newResults };
    }),

    setPriorityAssessment: (customerId, assessment) => set((state) => {
        const newAssessments = new Map(state.priorityAssessments);
        newAssessments.set(customerId, assessment);
        return { priorityAssessments: newAssessments };
    }),

    setRecoveryPlan: (customerId, plan) => set((state) => {
        const newPlans = new Map(state.recoveryPlans);
        newPlans.set(customerId, plan);
        return { recoveryPlans: newPlans };
    }),

    initializeStore: () => {
        const data = initializeData();
        set({
            personas: data.personas,
            customers: data.customers,
            crisisScenarios: data.crisisScenarios,
            strategies: data.strategies,
            selectedCrisis: data.crisisScenarios[0] || null
        });
    }
}));
