import { useState, useCallback, useRef } from 'react';
import { RotateCcw } from 'lucide-react';

interface NodePos {
  id: number;
  label: string;
  x: number;
  y: number;
}

const initialNodes: NodePos[] = [
  { id: 0, label: 'Alpha', x: 150, y: 60 },
  { id: 1, label: 'Beta', x: 280, y: 120 },
  { id: 2, label: 'Gamma', x: 60, y: 160 },
  { id: 3, label: 'Delta', x: 200, y: 200 },
  { id: 4, label: 'Epsilon', x: 340, y: 220 },
  { id: 5, label: 'Zeta', x: 110, y: 280 },
  { id: 6, label: 'Eta', x: 250, y: 300 },
  { id: 7, label: 'Theta', x: 360, y: 60 },
];

const edges: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 3], [1, 4], [2, 3], [2, 5],
  [3, 6], [3, 4], [4, 7], [5, 6], [6, 4],
];

const WIDTH = 420;
const HEIGHT = 340;
const R = 22;

const NodeNetworkDemo = () => {
  const [nodes, setNodes] = useState<NodePos[]>(initialNodes);
  const [selected, setSelected] = useState<number | null>(null);
  const dragging = useRef<number | null>(null);
  const offset = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });

  const connected = (id: number): Set<number> => {
    const set = new Set<number>([id]);
    edges.forEach(([a, b]) => {
      if (a === id) set.add(b);
      if (b === id) set.add(a);
    });
    return set;
  };

  const highlight = selected !== null ? connected(selected) : null;

  const onPointerDown = useCallback((id: number, e: React.PointerEvent<SVGGElement>) => {
    e.stopPropagation();
    dragging.current = id;
    const node = nodes.find((n) => n.id === id)!;
    const svg = e.currentTarget.ownerSVGElement!;
    const rect = svg.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const sy = ((e.clientY - rect.top) / rect.height) * HEIGHT;
    offset.current = { dx: sx - node.x, dy: sy - node.y };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }, [nodes]);

  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (dragging.current === null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const sy = ((e.clientY - rect.top) / rect.height) * HEIGHT;
    const nx = Math.max(R, Math.min(WIDTH - R, sx - offset.current.dx));
    const ny = Math.max(R, Math.min(HEIGHT - R, sy - offset.current.dy));
    setNodes((prev) => prev.map((n) => (n.id === dragging.current ? { ...n, x: nx, y: ny } : n)));
  }, []);

  const onPointerUp = useCallback(() => { dragging.current = null; }, []);

  const reset = useCallback(() => {
    setNodes(initialNodes);
    setSelected(null);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">
          {selected === null
            ? 'Click a node to highlight its connections · Drag to reposition'
            : `Selected: ${nodes.find((n) => n.id === selected)?.label} · ${connected(selected).size - 1} connections`}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto rounded-xl border-2 border-gray-100 bg-gray-50/50 touch-none"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClick={() => setSelected(null)}
      >
        {edges.map(([a, b], i) => {
          const na = nodes[a]; const nb = nodes[b];
          const active = selected !== null && (a === selected || b === selected);
          const dim = highlight && !highlight.has(a) && !highlight.has(b);
          return (
            <line
              key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={active ? '#0ea5e9' : '#cbd5e1'}
              strokeWidth={active ? 2.5 : 1.5}
              strokeOpacity={dim ? 0.15 : 1}
              className="transition-all"
            />
          );
        })}
        {nodes.map((n) => {
          const isSel = n.id === selected;
          const isConnected = highlight?.has(n.id) && !isSel;
          const dim = highlight && !highlight.has(n.id);
          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              onPointerDown={(e) => onPointerDown(n.id, e)}
              onClick={(e) => { e.stopPropagation(); setSelected(n.id); }}
              className="cursor-pointer focus:outline-none"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(n.id); } }}
            >
              <circle
                r={R}
                fill={isSel ? '#0ea5e9' : isConnected ? '#38bdf8' : '#fff'}
                stroke={isSel || isConnected ? '#0284c7' : '#94a3b8'}
                strokeWidth={isSel ? 3 : 2}
                opacity={dim ? 0.25 : 1}
                className="transition-all"
              />
              {isConnected && (
                <circle r={R} fill="none" stroke="#38bdf8" strokeWidth="2">
                  <animate attributeName="r" values={`${R};${R + 8};${R}`} dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
              <text
                textAnchor="middle"
                dy="0.35em"
                className="select-none pointer-events-none fill-gray-700"
                style={{ fontSize: 10, fontWeight: 700 }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default NodeNetworkDemo;
