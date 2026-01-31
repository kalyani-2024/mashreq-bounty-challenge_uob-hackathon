import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Users, Activity, Shield } from 'lucide-react';
import { useNexusStore } from '../store/useStore';
import CrisisTrack from './CrisisTrack';
import CustomerTrack from './CustomerTrack';
import { isDemoMode } from '../services/aiService';

export default function Dashboard() {
    const { activeTrack, setActiveTrack } = useNexusStore();
    const [showDemoNotice, setShowDemoNotice] = useState(isDemoMode());

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
            {/* Demo Mode Banner */}
            <AnimatePresence>
                {showDemoNotice && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-amber-100 border-b border-amber-300 px-4 py-2 text-center text-sm text-amber-800"
                    >
                        <span className="font-medium">Demo Mode Active</span> — Using pre-generated AI responses.
                        Add VITE_ANTHROPIC_API_KEY to .env for live Claude API integration.
                        <button
                            onClick={() => setShowDemoNotice(false)}
                            className="ml-4 text-amber-600 hover:text-amber-800 underline"
                        >
                            Dismiss
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-mashreq-orange to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">
                                    <span className="text-mashreq-orange">NEX</span>US
                                </h1>
                                <p className="text-xs text-slate-500">AI-Powered Social Intelligence & Crisis Navigation</p>
                            </div>
                        </div>

                        {/* Track Selector */}
                        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
                            <button
                                onClick={() => setActiveTrack('crisis')}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${activeTrack === 'crisis'
                                        ? 'bg-white text-red-600 shadow-md'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <AlertTriangle className="w-4 h-4" />
                                Crisis Defense
                            </button>
                            <button
                                onClick={() => setActiveTrack('customer')}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${activeTrack === 'customer'
                                        ? 'bg-white text-mashreq-orange shadow-md'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <Users className="w-4 h-4" />
                                Customer Retention
                            </button>
                        </div>

                        {/* Status Indicators */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span>System Active</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                                <Activity className="w-4 h-4 text-mashreq-orange" />
                                <span className="text-sm font-medium text-slate-700">AI Monitoring</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTrack}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTrack === 'crisis' ? <CrisisTrack /> : <CustomerTrack />}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
                <div className="container mx-auto px-6 text-center text-sm text-slate-500">
                    <p>NEXUS — Built for Mashreq Bank Hackathon 2026 | All data is synthetic</p>
                </div>
            </footer>
        </div>
    );
}
