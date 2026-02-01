import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useNexusStore } from './store/useStore';

// Section Components
import ClustersSection from './components/sections/ClustersSection';
import PostsSection from './components/sections/PostsSection';
import RCASection from './components/sections/RCASection';
import ExecBriefSection from './components/sections/ExecBriefSection';
import NetworkAnalysisSection from './components/sections/NetworkAnalysisSection';
import CustomersSection from './components/sections/CustomersSection';

// Navigation & shared
import BottomNav, { SideNav } from './components/shared/BottomNav';
import GuardrailsPanel from './components/shared/GuardrailsPanel';

import './index.css';

export default function App() {
    const { activeSection, setActiveSection } = useNexusStore();
    const [guardrailsOpen, setGuardrailsOpen] = useState(false);

    // Intersection Observer to update active section on scroll
    useEffect(() => {
        const sections = ['clusters', 'posts', 'rca', 'brief', 'network', 'customers'];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id.replace('section-', '');
                        if (sections.includes(sectionId)) {
                            setActiveSection(sectionId as any);
                        }
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
        );

        sections.forEach((section) => {
            const element = document.getElementById(`section-${section}`);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [setActiveSection]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-orange-200">
                            N
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-slate-800 tracking-tight">NEXUS</h1>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Crisis Intelligence</p>
                        </div>
                    </div>

                    {/* Desktop Section Tabs */}
                    <nav className="hidden lg:flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                        {[
                            { id: 'clusters', label: 'Clusters' },
                            { id: 'posts', label: 'Posts' },
                            { id: 'rca', label: 'RCA' },
                            { id: 'brief', label: 'Brief' },
                            { id: 'network', label: 'Network' },
                            { id: 'customers', label: 'Customers' }
                        ].map((section) => (
                            <button
                                key={section.id}
                                onClick={() => {
                                    const element = document.getElementById(`section-${section.id}`);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }}
                                className={`
                                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                                    ${activeSection === section.id
                                        ? 'bg-white text-orange-600 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }
                                `}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>

                    {/* Guardrails + Demo Badge */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setGuardrailsOpen(true)}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200 transition-colors"
                            title="AI guardrails & system boundaries"
                        >
                            <Shield className="w-4 h-4" />
                            <span className="hidden sm:inline">Guardrails</span>
                        </button>
                        <span className="hidden sm:inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            DEMO MODE
                        </span>
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                            v4.0
                        </span>
                    </div>
                </div>
            </header>

            <GuardrailsPanel isOpen={guardrailsOpen} onClose={() => setGuardrailsOpen(false)} />

            {/* Side Navigation (Desktop) */}
            <SideNav />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 md:ml-24 lg:ml-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-12 py-8"
                >
                    {/* Section 1: Clusters */}
                    <ClustersSection />

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    {/* Section 2: Posts */}
                    <PostsSection />

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    {/* Section 3: RCA + Strategies */}
                    <RCASection />

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    {/* Section 4: Executive Brief */}
                    <ExecBriefSection />

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    {/* Section 5: Network Analysis */}
                    <NetworkAnalysisSection />

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    {/* Section 6: Customers */}
                    <CustomersSection />
                </motion.div>
            </main>

            {/* Bottom Navigation (Mobile) */}
            <BottomNav />
        </div>
    );
}