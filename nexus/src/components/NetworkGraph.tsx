import { useMemo, useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    type Node,
    type Edge,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { NetworkPersona } from '../types';

interface NetworkGraphProps {
    personas: NetworkPersona[];
    highlightNodes?: string[];
    onNodeClick?: (personaId: string) => void;
}

export default function NetworkGraph({
    personas,
    highlightNodes = [],
    onNodeClick
}: NetworkGraphProps) {

    // Convert personas to React Flow nodes
    const initialNodes: Node[] = useMemo(() => {
        return personas.map(persona => {
            const isHighlighted = highlightNodes.includes(persona.id);

            // Determine color based on sentiment and type
            let bgColor = '#94a3b8'; // slate-400
            let borderColor = '#e2e8f0'; // slate-200

            if (persona.type === 'influencer') {
                bgColor = '#8b5cf6'; // purple
                borderColor = '#c4b5fd';
            } else if (persona.type === 'high_value_customer') {
                bgColor = '#FF6B00'; // mashreq orange
                borderColor = '#ffb380';
            } else if (persona.type === 'journalist') {
                bgColor = '#3b82f6'; // blue
                borderColor = '#93c5fd';
            } else if (persona.sentiment > 0.3) {
                bgColor = '#22c55e'; // green
                borderColor = '#86efac';
            } else if (persona.sentiment < -0.3) {
                bgColor = '#ef4444'; // red
                borderColor = '#fca5a5';
            }

            if (persona.reached_by_crisis) {
                bgColor = '#dc2626'; // darker red
                borderColor = '#fca5a5';
            }

            // Size based on follower count
            const size = Math.max(40, Math.min(persona.followers / 3000, 100));

            return {
                id: persona.id,
                type: 'default',
                position: persona.position,
                data: {
                    label: (
                        <div className="text-center">
                            <div className="font-semibold text-[10px] leading-tight text-white drop-shadow-sm">
                                {persona.name.split(' ')[0]}
                            </div>
                            <div className="text-[8px] text-white/80">
                                {(persona.followers / 1000).toFixed(0)}k
                            </div>
                        </div>
                    )
                },
                style: {
                    background: bgColor,
                    color: 'white',
                    border: isHighlighted ? '3px solid #f59e0b' : `2px solid ${borderColor}`,
                    borderRadius: '50%',
                    width: size,
                    height: size,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    boxShadow: isHighlighted
                        ? '0 0 20px rgba(245, 158, 11, 0.6), 0 4px 12px rgba(0,0,0,0.15)'
                        : '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                }
            };
        });
    }, [personas, highlightNodes]);

    // Convert connections to React Flow edges
    const initialEdges: Edge[] = useMemo(() => {
        const edges: Edge[] = [];
        const addedEdges = new Set<string>();

        personas.forEach(persona => {
            persona.connections.forEach(connId => {
                const edgeId = [persona.id, connId].sort().join('-');
                if (!addedEdges.has(edgeId)) {
                    addedEdges.add(edgeId);

                    const isHighlighted = highlightNodes.includes(persona.id) || highlightNodes.includes(connId);

                    edges.push({
                        id: edgeId,
                        source: persona.id,
                        target: connId,
                        animated: isHighlighted,
                        style: {
                            stroke: isHighlighted ? '#f59e0b' : '#cbd5e1',
                            strokeWidth: isHighlighted ? 2 : 1,
                            opacity: isHighlighted ? 1 : 0.5
                        }
                    });
                }
            });
        });
        return edges;
    }, [personas, highlightNodes]);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
        if (onNodeClick) {
            onNodeClick(node.id);
        }
    }, [onNodeClick]);

    return (
        <div className="h-[500px] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                fitView
                attributionPosition="bottom-left"
                proOptions={{ hideAttribution: true }}
            >
                <Background color="#e2e8f0" gap={20} variant={BackgroundVariant.Dots} />
                <Controls className="bg-white rounded-lg shadow-md border border-slate-200" />
                <MiniMap
                    className="bg-white rounded-lg shadow-md border border-slate-200"
                    nodeColor={(node) => node.style?.background as string || '#94a3b8'}
                    maskColor="rgba(0, 0, 0, 0.1)"
                />
            </ReactFlow>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur p-4 rounded-lg border border-slate-200 shadow-sm text-sm">
                <div className="font-semibold text-slate-700 mb-3">Network Legend</div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-slate-600">Influencer</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-mashreq-orange"></div>
                        <span className="text-slate-600">VIP Customer</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-slate-600">Journalist</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-slate-600">Positive</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-slate-600">Negative/Crisis</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
