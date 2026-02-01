import { motion } from 'framer-motion';
import { LayoutGrid, MessageSquare, Search, FileText, Network, Users } from 'lucide-react';
import { useNexusStore } from '../../store/useStore';
import type { SectionId } from '../../types';

interface NavItem {
    id: SectionId;
    icon: React.ReactNode;
    label: string;
}

const navItems: NavItem[] = [
    { id: 'clusters', icon: <LayoutGrid className="w-5 h-5" />, label: 'Clusters' },
    { id: 'posts', icon: <MessageSquare className="w-5 h-5" />, label: 'Posts' },
    { id: 'rca', icon: <Search className="w-5 h-5" />, label: 'RCA' },
    { id: 'brief', icon: <FileText className="w-5 h-5" />, label: 'Brief' },
    { id: 'network', icon: <Network className="w-5 h-5" />, label: 'Network' },
    { id: 'customers', icon: <Users className="w-5 h-5" />, label: 'Customers' }
];

export default function BottomNav() {
    const { activeSection, scrollToSection } = useNexusStore();

    return (
        <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50 md:hidden"
        >
            <div className="flex items-center justify-around py-2 px-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`
                            flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all min-w-[56px]
                            ${activeSection === item.id
                                ? 'text-orange-600 bg-orange-50'
                                : 'text-slate-500 hover:text-slate-700'
                            }
                        `}
                    >
                        {item.icon}
                        <span className="text-[10px] font-medium">{item.label}</span>
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="activeNav"
                                className="absolute bottom-0 h-0.5 w-12 bg-orange-500 rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>
        </motion.nav>
    );
}

// Desktop sidebar navigation
export function SideNav() {
    const { activeSection, scrollToSection } = useNexusStore();

    return (
        <nav className="hidden md:flex fixed left-0 top-20 bottom-0 w-20 bg-white border-r border-slate-200 flex-col items-center py-6 gap-2 z-40">
            {navItems.map((item) => (
                <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                        flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all w-16
                        ${activeSection === item.id
                            ? 'text-orange-600 bg-orange-50 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }
                    `}
                >
                    {item.icon}
                    <span className="text-[10px] font-medium">{item.label}</span>
                </motion.button>
            ))}
        </nav>
    );
}
