import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Shield, AlertTriangle, Eye, ChevronRight, Clock, UserCheck } from 'lucide-react';
import { useNexusStore } from '../../store/useStore';
import SectionHeader from '../shared/SectionHeader';
import VerificationPanel from '../shared/VerificationPanel';
import { getVerification, getVerificationColor, getVerificationLabel, type PostVerification } from '../../data/verification';

// Mock posts data - in real app would come from API
const posts = [
    {
        id: 'post_001',
        clusterId: 'api_down',
        author: 'Ahmed Al Rashid',
        handle: '@ahmed_rashid',
        avatar: 'AR',
        platform: 'Twitter',
        text: 'Just tried to transfer money via @MashreqBank app - total failure! Anyone else facing this? This is unacceptable for 2024! #BankingFail',
        metrics: { likes: 234, retweets: 89, replies: 45 },
        time: '2h ago',
        sentiment: -0.8,
        narrativeStage: 'ORIGINATOR',
        isVIP: true,
        accountValue: 850000
    },
    {
        id: 'post_002',
        clusterId: 'api_down',
        author: 'Banking UAE',
        handle: '@BankingNewsUAE',
        avatar: 'BU',
        platform: 'Twitter',
        text: 'BREAKING: Multiple reports of Mashreq Bank app issues. Users unable to complete transactions. Stay tuned for updates.',
        metrics: { likes: 567, retweets: 234, replies: 123 },
        time: '1h 30m ago',
        sentiment: -0.3,
        narrativeStage: 'AMPLIFIER',
        isVIP: false,
        followerCount: 45000
    },
    {
        id: 'post_003',
        clusterId: 'api_down',
        author: 'Tech Skeptic',
        handle: '@tech_skeptic_uae',
        avatar: 'TS',
        platform: 'Twitter',
        text: 'I heard Mashreq got hacked and they\'re hiding it. My cousin works in IT and said they lost customer data! 🔓 #DataBreach',
        metrics: { likes: 890, retweets: 445, replies: 234 },
        time: '1h ago',
        sentiment: -0.95,
        narrativeStage: 'MISINFO',
        isVIP: false,
        misinformation: true
    },
    {
        id: 'post_004',
        clusterId: 'api_down',
        author: 'Fatima Mahmoud',
        handle: '@fatima_mbank',
        avatar: 'FM',
        platform: 'Twitter',
        text: 'I\'ve been with Mashreq for 15 years. If they can\'t fix this app thing, I\'m moving my AED 2M to ENBD. Management needs to wake up!',
        metrics: { likes: 456, retweets: 178, replies: 89 },
        time: '45m ago',
        sentiment: -0.85,
        narrativeStage: 'CRITICAL',
        isVIP: true,
        accountValue: 2000000
    },
    {
        id: 'post_005',
        clusterId: 'app_crash',
        author: 'Sara Digital',
        handle: '@sara_digital',
        avatar: 'SD',
        platform: 'Twitter',
        text: 'Mashreq app keeps crashing whenever I try to check my balance. Third time this week! Anyone else? @MashreqBank',
        metrics: { likes: 123, retweets: 34, replies: 22 },
        time: '3h ago',
        sentiment: -0.6,
        narrativeStage: 'ORIGINATOR',
        isVIP: false,
        followerCount: 2500
    },
    {
        id: 'post_006',
        clusterId: 'billing',
        author: 'Mohammed Finance',
        handle: '@mo_finance_uae',
        avatar: 'MF',
        platform: 'Twitter',
        text: 'Charged twice for the same transaction by @MashreqBank. Still waiting for refund after 5 days. This is theft! #CustomerService',
        metrics: { likes: 345, retweets: 112, replies: 67 },
        time: '4h ago',
        sentiment: -0.75,
        narrativeStage: 'CRITICAL',
        isVIP: true,
        accountValue: 500000
    }
];

const getStageColor = (stage: string) => {
    switch (stage) {
        case 'ORIGINATOR': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
        case 'AMPLIFIER': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' };
        case 'MISINFO': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
        case 'CRITICAL': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
        default: return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' };
    }
};

export default function PostsSection() {
    const { selectedCluster, postStatuses, updatePostStatus } = useNexusStore();
    const [selectedVerification, setSelectedVerification] = useState<PostVerification | null>(null);

    if (!selectedCluster) {
        return (
            <section id="section-posts" className="py-8">
                <SectionHeader
                    id="posts"
                    icon={<MessageSquare className="w-6 h-6" />}
                    title="Posts"
                    subtitle="Select a cluster first"
                />
                <div className="bg-slate-50 rounded-xl p-12 text-center">
                    <p className="text-slate-500">Please select a cluster to view posts</p>
                </div>
            </section>
        );
    }

    // Filter posts by selected cluster
    const clusterPosts = posts.filter(p => p.clusterId === selectedCluster.id);

    const handleVerifyClick = (postId: string) => {
        const verification = getVerification(postId);
        if (verification) {
            setSelectedVerification(verification);
        }
    };

    const handleApproveVerification = (postId: string) => {
        updatePostStatus(postId, 'verified');
        setSelectedVerification(null);
    };

    // Count verification statuses
    const verifiedFalse = clusterPosts.filter(p => {
        const v = getVerification(p.id);
        return v && (v.status === 'VERIFIED_FALSE' || v.status === 'LIKELY_FALSE');
    }).length;

    const needsReview = clusterPosts.filter(p => {
        const v = getVerification(p.id);
        return v && v.humanReviewRequired;
    }).length;

    return (
        <section id="section-posts" className="py-8">
            <SectionHeader
                id="posts"
                icon={<MessageSquare className="w-6 h-6" />}
                title={`Posts: ${selectedCluster.name}`}
                subtitle={`${clusterPosts.length} posts in this cluster`}
                action={
                    <div className="flex items-center gap-3">
                        {verifiedFalse > 0 && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                {verifiedFalse} Verified False
                            </span>
                        )}
                        {needsReview > 0 && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                                {needsReview} Needs Review
                            </span>
                        )}
                    </div>
                }
            />

            <div className="space-y-4">
                {clusterPosts.length === 0 ? (
                    <div className="bg-slate-50 rounded-xl p-8 text-center">
                        <p className="text-slate-500">No posts found for this cluster</p>
                    </div>
                ) : (
                    clusterPosts.map((post, idx) => {
                        const stageColors = getStageColor(post.narrativeStage);
                        const verification = getVerification(post.id);
                        const verificationColors = verification ? getVerificationColor(verification.status) : null;
                        const status = postStatuses.get(post.id) || 'new';

                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`bg-white rounded-xl border-2 p-5 ${status === 'verified' ? 'border-green-300 bg-green-50' :
                                    status === 'flagged' ? 'border-red-300 bg-red-50' :
                                        'border-slate-200'
                                    }`}
                            >
                                {/* Verification Badge Row */}
                                {verification && (
                                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                                        <button
                                            onClick={() => handleVerifyClick(post.id)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 hover:opacity-80 transition-opacity ${verificationColors?.bg} ${verificationColors?.text}`}
                                        >
                                            <Shield className="w-3.5 h-3.5" />
                                            {getVerificationLabel(verification.status)}
                                            <span className="opacity-70">({verification.confidence}%)</span>
                                        </button>
                                        {verification.humanReviewRequired && (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium flex items-center gap-1">
                                                <UserCheck className="w-3 h-3" />
                                                Human Review Required
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Author Row */}
                                <div className="flex items-start gap-4 mb-3">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${post.sentiment < -0.5 ? 'bg-red-500' :
                                        post.sentiment < 0 ? 'bg-orange-500' : 'bg-green-500'
                                        }`}>
                                        {post.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-slate-800">{post.author}</span>
                                            <span className="text-slate-400 text-sm">{post.handle}</span>
                                            {post.isVIP && (
                                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                                                    VIP
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <Clock className="w-3 h-3" />
                                            {post.time}
                                            <span className="mx-1">•</span>
                                            <span className={`px-2 py-0.5 rounded ${stageColors.bg} ${stageColors.text}`}>
                                                {post.narrativeStage}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <p className="text-slate-700 mb-4">{post.text}</p>

                                {/* Misinformation Warning */}
                                {post.misinformation && (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                                        <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-yellow-800">Potential Misinformation Detected</p>
                                            <p className="text-xs text-yellow-600">AI flagged claims in this post for verification</p>
                                        </div>
                                    </div>
                                )}

                                {/* Metrics & Actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>{post.metrics.likes} likes</span>
                                        <span>{post.metrics.retweets} RTs</span>
                                        <span>{post.metrics.replies} replies</span>
                                    </div>
                                    <button
                                        onClick={() => handleVerifyClick(post.id)}
                                        className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Analysis
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Verification Panel Modal */}
            <AnimatePresence>
                {selectedVerification && (
                    <VerificationPanel
                        verification={selectedVerification}
                        onClose={() => setSelectedVerification(null)}
                        onApprove={handleApproveVerification}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
