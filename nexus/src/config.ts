// App configuration
export const CONFIG = {
    // Auto-detect demo mode when no API key is set
    DEMO_MODE: !import.meta.env.VITE_ANTHROPIC_API_KEY,

    // API configuration
    ANTHROPIC_API_KEY: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
    API_TIMEOUT: 30000,

    // Demo mode settings
    THINKING_DELAY: 1500, // Simulate AI "thinking" in demo mode

    // Network graph settings
    PERSONA_COUNT: 50,

    // Crisis settings
    CRISIS_SCENARIOS_COUNT: 4,

    // Customer settings
    HIGH_PRIORITY_CUSTOMERS_COUNT: 5,
};
