// Global state management with Zustand - Extended for cluster-wise workflow
import { create } from 'zustand';
import type {
    NetworkPersona,
    Customer,
    CrisisScenario,
    Strategy,
    SimulationResult,
    PriorityAssessment,
    RecoveryPlan,
    SectionId,
    PostStatus,
    StrategyFeedback
} from '../types';
import { initializeData } from '../data/generators';
import { clusters, type Cluster } from '../data/clusters';
import { narrativeChain, type NarrativeChainStep } from '../data/narrativeChain';
import { preventionNodes, type PreventionNode, calculateViralRisk } from '../data/preventionNodes';

// Analyst selected strategy for a cluster
export interface SelectedStrategy {
    strategyId: string;
    strategyName: string;
    clusterId: string;
    simulationRun: boolean;
    simulationResult?: SimulationResult;
    analystNotes?: string;
    selectedAt: string;
}

// C-Suite approval status
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'feedback';

export interface ClusterApproval {
    clusterId: string;
    strategyId: string;
    status: ApprovalStatus;
    submittedAt: string;
    reviewedAt?: string;
    ceoFeedback?: string;
    aiAssistanceUsed?: boolean;
}

interface NexusStore {
    // Data
    personas: NetworkPersona[];
    customers: Customer[];
    crisisScenarios: CrisisScenario[];
    strategies: Strategy[];
    clusters: Cluster[];
    narrativeChain: NarrativeChainStep[];
    preventionNodes: PreventionNode[];

    // Section Navigation
    activeSection: SectionId;
    setActiveSection: (section: SectionId) => void;
    scrollToSection: (section: SectionId) => void;

    // CLUSTER-WISE: Selected cluster drives everything
    selectedCluster: Cluster | null;
    selectCluster: (cluster: Cluster | null) => void;

    // Get cluster-specific data
    getClusterPosts: () => string[];
    getClusterNarrativeChain: () => NarrativeChainStep[];
    getClusterPreventionNodes: () => PreventionNode[];
    getClusterCustomers: () => Customer[];

    // ANALYST WORKFLOW
    analystSelectedStrategies: Map<string, SelectedStrategy>; // clusterId -> selected strategy
    selectStrategyForCluster: (clusterId: string, strategyId: string, strategyName: string) => void;
    setStrategySimulationResult: (clusterId: string, result: SimulationResult) => void;
    addAnalystNotes: (clusterId: string, notes: string) => void;

    // C-SUITE APPROVAL WORKFLOW
    clusterApprovals: Map<string, ClusterApproval>;
    submitForApproval: (clusterId: string) => void;
    approveCluster: (clusterId: string) => void;
    rejectCluster: (clusterId: string, feedback: string) => void;
    requestAIAssistance: (clusterId: string) => void;
    getApprovalStatus: (clusterId: string) => ClusterApproval | null;

    // Post Status Tracking
    postStatuses: Map<string, PostStatus>;
    updatePostStatus: (postId: string, status: PostStatus) => void;

    // Prevention Controls (cluster-specific)
    activePreventions: Map<string, string[]>; // clusterId -> prevention node ids
    togglePrevention: (nodeId: string) => void;
    getCurrentViralRisk: () => number;

    // Strategy Lab
    customStrategyFeedback: StrategyFeedback | null;
    setCustomStrategyFeedback: (feedback: StrategyFeedback | null) => void;
    isAnalyzingStrategy: boolean;
    setIsAnalyzingStrategy: (loading: boolean) => void;

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

export const useNexusStore = create<NexusStore>((set, get) => ({
    // Initial data from generators
    personas: initialData.personas,
    customers: initialData.customers,
    crisisScenarios: initialData.crisisScenarios,
    strategies: initialData.strategies,
    clusters: clusters,
    narrativeChain: narrativeChain,
    preventionNodes: preventionNodes,

    // Section Navigation
    activeSection: 'clusters',
    setActiveSection: (section) => set({ activeSection: section }),
    scrollToSection: (section) => {
        set({ activeSection: section });
        const element = document.getElementById(`section-${section}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    // CLUSTER-WISE: Selected cluster drives everything
    selectedCluster: clusters[0] || null,
    selectCluster: (cluster) => {
        set({ selectedCluster: cluster });
        if (cluster) {
            // Auto-scroll to posts when cluster selected
            setTimeout(() => {
                const postsSection = document.getElementById('section-posts');
                if (postsSection) {
                    postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    },

    // Get cluster-specific data
    getClusterPosts: () => {
        const cluster = get().selectedCluster;
        if (!cluster) return [];
        // Return post IDs for this cluster
        return cluster.id === 'api_down'
            ? ['post_001', 'post_002', 'post_003', 'post_004']
            : cluster.id === 'app_crash'
                ? ['post_005']
                : ['post_006'];
    },

    getClusterNarrativeChain: () => {
        const cluster = get().selectedCluster;
        if (!cluster) return get().narrativeChain;
        // Filter narrative chain by cluster (for now, api_down has the chain)
        return cluster.id === 'api_down' ? get().narrativeChain : [];
    },

    getClusterPreventionNodes: () => {
        const cluster = get().selectedCluster;
        if (!cluster) return get().preventionNodes;
        // For demo, return all prevention nodes since they apply to the crisis
        return get().preventionNodes;
    },

    getClusterCustomers: () => {
        const cluster = get().selectedCluster;
        if (!cluster) return get().customers;
        // For demo, distribute customers across clusters
        const allCustomers = get().customers;
        const chunkSize = Math.ceil(allCustomers.length / 3);
        if (cluster.id === 'api_down') return allCustomers.slice(0, chunkSize);
        if (cluster.id === 'app_crash') return allCustomers.slice(chunkSize, chunkSize * 2);
        return allCustomers.slice(chunkSize * 2);
    },

    // ANALYST WORKFLOW
    analystSelectedStrategies: new Map(),
    selectStrategyForCluster: (clusterId, strategyId, strategyName) => set((state) => {
        const newStrategies = new Map(state.analystSelectedStrategies);
        newStrategies.set(clusterId, {
            strategyId,
            strategyName,
            clusterId,
            simulationRun: false,
            selectedAt: new Date().toISOString()
        });
        return { analystSelectedStrategies: newStrategies };
    }),

    setStrategySimulationResult: (clusterId, result) => set((state) => {
        const newStrategies = new Map(state.analystSelectedStrategies);
        const existing = newStrategies.get(clusterId);
        if (existing) {
            newStrategies.set(clusterId, {
                ...existing,
                simulationRun: true,
                simulationResult: result
            });
        }
        return { analystSelectedStrategies: newStrategies };
    }),

    addAnalystNotes: (clusterId, notes) => set((state) => {
        const newStrategies = new Map(state.analystSelectedStrategies);
        const existing = newStrategies.get(clusterId);
        if (existing) {
            newStrategies.set(clusterId, { ...existing, analystNotes: notes });
        }
        return { analystSelectedStrategies: newStrategies };
    }),

    // C-SUITE APPROVAL WORKFLOW
    clusterApprovals: new Map(),
    submitForApproval: (clusterId) => set((state) => {
        const strategy = state.analystSelectedStrategies.get(clusterId);
        if (!strategy) return state;

        const newApprovals = new Map(state.clusterApprovals);
        newApprovals.set(clusterId, {
            clusterId,
            strategyId: strategy.strategyId,
            status: 'pending',
            submittedAt: new Date().toISOString()
        });
        return { clusterApprovals: newApprovals };
    }),

    approveCluster: (clusterId) => set((state) => {
        const newApprovals = new Map(state.clusterApprovals);
        const existing = newApprovals.get(clusterId);
        if (existing) {
            newApprovals.set(clusterId, {
                ...existing,
                status: 'approved',
                reviewedAt: new Date().toISOString()
            });
        }
        return { clusterApprovals: newApprovals };
    }),

    rejectCluster: (clusterId, feedback) => set((state) => {
        const newApprovals = new Map(state.clusterApprovals);
        const existing = newApprovals.get(clusterId);
        if (existing) {
            newApprovals.set(clusterId, {
                ...existing,
                status: 'rejected',
                ceoFeedback: feedback,
                reviewedAt: new Date().toISOString()
            });
        }
        return { clusterApprovals: newApprovals };
    }),

    requestAIAssistance: (clusterId) => set((state) => {
        const newApprovals = new Map(state.clusterApprovals);
        const existing = newApprovals.get(clusterId);
        if (existing) {
            newApprovals.set(clusterId, {
                ...existing,
                aiAssistanceUsed: true
            });
        }
        return { clusterApprovals: newApprovals };
    }),

    getApprovalStatus: (clusterId) => {
        return get().clusterApprovals.get(clusterId) || null;
    },

    // Post Status Tracking
    postStatuses: new Map(),
    updatePostStatus: (postId, status) => set((state) => {
        const newStatuses = new Map(state.postStatuses);
        newStatuses.set(postId, status);
        return { postStatuses: newStatuses };
    }),

    // Prevention Controls (cluster-specific)
    activePreventions: new Map(),
    togglePrevention: (nodeId) => set((state) => {
        const cluster = state.selectedCluster;
        if (!cluster) return state;

        const newPreventions = new Map(state.activePreventions);
        const clusterPreventions = newPreventions.get(cluster.id) || [];

        if (clusterPreventions.includes(nodeId)) {
            newPreventions.set(cluster.id, clusterPreventions.filter(id => id !== nodeId));
        } else {
            newPreventions.set(cluster.id, [...clusterPreventions, nodeId]);
        }
        return { activePreventions: newPreventions };
    }),

    getCurrentViralRisk: () => {
        const state = get();
        const cluster = state.selectedCluster;
        if (!cluster) return 98;

        const clusterPreventions = state.activePreventions.get(cluster.id) || [];
        return calculateViralRisk(clusterPreventions);
    },

    // Strategy Lab
    customStrategyFeedback: null,
    setCustomStrategyFeedback: (feedback) => set({ customStrategyFeedback: feedback }),
    isAnalyzingStrategy: false,
    setIsAnalyzingStrategy: (loading) => set({ isAnalyzingStrategy: loading }),

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
            selectedCrisis: data.crisisScenarios[0] || null,
            clusters: clusters,
            narrativeChain: narrativeChain,
            preventionNodes: preventionNodes,
            selectedCluster: clusters[0] || null
        });
    }
}));
