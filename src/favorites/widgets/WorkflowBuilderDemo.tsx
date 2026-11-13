import { useState, useCallback } from 'react';
import { Play, RotateCcw, Plus, ArrowDown, Zap, GitBranch, HelpCircle, Send } from 'lucide-react';

type BlockType = 'Trigger' | 'Action' | 'Condition' | 'Output';

interface Block { id: number; type: BlockType; }

const PALETTE: { type: BlockType; color: string; icon: typeof Zap }[] = [
  { type: 'Trigger', color: '#0ea5e9', icon: Zap },
  { type: 'Action', color: '#10b981', icon: GitBranch },
  { type: 'Condition', color: '#f97316', icon: HelpCircle },
  { type: 'Output', color: '#8b5cf6', icon: Send },
];

const styleFor = (t: BlockType) => PALETTE.find((p) => p.type === t)!;

const WorkflowBuilderDemo = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);

  const add = useCallback((type: BlockType) => {
    setBlocks((prev) => [...prev, { id: prev.length + 1, type }]);
    setActive(-1);
  }, []);

  const run = useCallback(() => {
    if (!blocks.length) return;
    setRunning(true);
    setActive(0);
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      if (i >= blocks.length) {
        clearInterval(timer);
        setActive(blocks.length - 1);
        setRunning(false);
      } else {
        setActive(i);
      }
    }, 700);
  }, [blocks.length]);

  const reset = useCallback(() => {
    setBlocks([]); setActive(-1); setRunning(false);
  }, []);

  const onPaletteKey = (type: BlockType, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); add(type); }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* palette */}
      <div className="sm:w-32 flex-shrink-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Palette</p>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
          {PALETTE.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.type}
                onClick={() => add(p.type)}
                onKeyDown={(e) => onPaletteKey(p.type, e)}
                disabled={running}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-40"
                style={{ backgroundColor: `${p.color}12`, border: `2px solid ${p.color}35`, color: p.color }}
              >
                <Icon className="w-3.5 h-3.5" /> {p.type}
              </button>
            );
          })}
        </div>
      </div>

      {/* canvas */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Canvas {blocks.length > 0 && `· ${blocks.length} block${blocks.length > 1 ? 's' : ''}`}
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={run}
              disabled={running || !blocks.length}
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

        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-3 min-h-[240px] overflow-y-auto" aria-label="Workflow canvas">
          {!blocks.length ? (
            <div className="h-[216px] flex flex-col items-center justify-center text-center">
              <Plus className="w-6 h-6 text-gray-300 mb-1" />
              <p className="text-sm text-gray-400">Canvas is empty</p>
              <p className="text-xs text-gray-300">Click a block type to add it</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-0 min-h-[216px] py-2">
              {blocks.map((b, i) => {
                const st = styleFor(b.type);
                const Icon = st.icon;
                const isActive = i === active;
                return (
                  <div key={b.id} className="flex flex-col items-center">
                    {i > 0 && <ArrowDown className="w-4 h-4 text-gray-400 my-0.5" />}
                    <div
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-black text-white transition-all"
                      style={{
                        backgroundColor: st.color,
                        opacity: active >= 0 && !isActive ? 0.4 : 1,
                        boxShadow: isActive ? `0 0 0 4px ${st.color}40` : 'none',
                        transform: isActive ? 'scale(1.06)' : 'scale(1)',
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {b.type}
                      {isActive && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {active >= 0 && blocks[active] && (
          <p className="text-xs text-gray-500 mt-2 font-bold" aria-live="polite">
            Running: <span style={{ color: styleFor(blocks[active].type).color }}>{blocks[active].type}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilderDemo;
