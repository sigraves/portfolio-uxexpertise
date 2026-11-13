import { useState, useCallback } from 'react';
import { Play, RotateCcw, ArrowRight, Plus } from 'lucide-react';

type NodeType = 'Start' | 'Screen' | 'Decision' | 'End';

interface FlowNode {
  id: number;
  type: NodeType;
}

const palette: { type: NodeType; color: string; shape: string }[] = [
  { type: 'Start', color: '#059669', shape: 'rounded-full' },
  { type: 'Screen', color: '#0ea5e9', shape: 'rounded-lg' },
  { type: 'Decision', color: '#f97316', shape: 'rounded-lg rotate-45' },
  { type: 'End', color: '#dc2626', shape: 'rounded-full' },
];

const nodeStyle = (type: NodeType) => palette.find((p) => p.type === type)!;

const FlowBuilderDemo = () => {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [running, setRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  const addNode = useCallback((type: NodeType) => {
    setNodes((prev) => [...prev, { id: prev.length + 1, type }]);
    setActiveStep(-1);
  }, []);

  const run = useCallback(() => {
    if (nodes.length === 0) return;
    setRunning(true);
    setActiveStep(0);
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      if (i >= nodes.length) {
        clearInterval(timer);
        setActiveStep(nodes.length - 1);
        setRunning(false);
      } else {
        setActiveStep(i);
      }
    }, 800);
  }, [nodes.length]);

  const reset = useCallback(() => {
    setNodes([]);
    setRunning(false);
    setActiveStep(-1);
  }, []);

  const handlePaletteKey = useCallback((type: NodeType, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addNode(type);
    }
  }, [addNode]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Palette */}
      <div className="sm:w-32 flex-shrink-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Palette</p>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
          {palette.map((p) => (
            <button
              key={p.type}
              onClick={() => addNode(p.type)}
              onKeyDown={(e) => handlePaletteKey(p.type, e)}
              disabled={running}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-40"
              style={{ backgroundColor: `${p.color}10`, border: `2px solid ${p.color}30`, color: p.color }}
            >
              <Plus className="w-3 h-3" />
              {p.type}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Canvas {nodes.length > 0 && `· ${nodes.length} node${nodes.length > 1 ? 's' : ''}`}
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={run}
              disabled={running || nodes.length === 0}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:opacity-40"
            >
              <Play className="w-3 h-3" /> Run
            </button>
            <button
              onClick={reset}
              disabled={running}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-40"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        <div
          className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-3 min-h-[220px] overflow-x-auto"
          aria-label="Flow canvas"
        >
          {nodes.length === 0 ? (
            <div className="h-[200px] flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-400 mb-1">Canvas is empty</p>
              <p className="text-xs text-gray-300">Click a node type to add it</p>
            </div>
          ) : (
            <div className="flex items-center gap-1 flex-wrap min-h-[200px] content-center">
              {nodes.map((n, i) => {
                const st = nodeStyle(n.type);
                const isActive = i === activeStep;
                const isDecision = n.type === 'Decision';
                return (
                  <div key={n.id} className="flex items-center gap-1">
                    <div
                      className={`relative flex items-center justify-center px-4 py-3 text-xs font-black text-white transition-all ${st.shape} ${isActive ? 'scale-110 shadow-lg' : ''}`}
                      style={{
                        backgroundColor: st.color,
                        opacity: activeStep >= 0 && !isActive ? 0.4 : 1,
                        boxShadow: isActive ? `0 0 0 4px ${st.color}40` : 'none',
                      }}
                    >
                      <span className={isDecision ? '-rotate-45 whitespace-nowrap' : 'whitespace-nowrap'}>
                        {n.type}
                      </span>
                      {isActive && (
                        <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                      )}
                    </div>
                    {i < nodes.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {activeStep >= 0 && (
          <p className="text-xs text-gray-500 mt-2 font-bold" aria-live="polite">
            Executing: <span style={{ color: nodeStyle(nodes[activeStep].type).color }}>{nodes[activeStep].type}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default FlowBuilderDemo;
