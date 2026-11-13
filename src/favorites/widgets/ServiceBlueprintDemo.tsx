import { useState, useCallback } from 'react';
import { X } from 'lucide-react';

type LaneId = 'user' | 'front' | 'back' | 'systems';

interface Cell {
  label: string;
  detail: string;
}

interface Lane {
  id: LaneId;
  label: string;
  color: string;
}

const lanes: Lane[] = [
  { id: 'user', label: 'User Actions', color: '#0ea5e9' },
  { id: 'front', label: 'Front-Stage', color: '#f97316' },
  { id: 'back', label: 'Back-Stage', color: '#059669' },
  { id: 'systems', label: 'Systems', color: '#8B5CF6' },
];

const steps = ['Discover', 'Purchase', 'Receive', 'Support'];

// grid[laneId][stepIndex]
const grid: Record<LaneId, Cell[]> = {
  user: [
    { label: 'Browses catalog', detail: 'The customer searches and filters products to find what they need.' },
    { label: 'Checks out', detail: 'Customer enters shipping and payment details to complete the order.' },
    { label: 'Receives package', detail: 'Customer unboxes the product and sets it up for first use.' },
    { label: 'Contacts support', detail: 'Customer reaches out with a question or issue about the product.' },
  ],
  front: [
    { label: 'Storefront UI', detail: 'The visible website: product cards, search, and category navigation.' },
    { label: 'Checkout page', detail: 'The form, order summary, and confirmation message the customer sees.' },
    { label: 'Delivery email', detail: 'Shipping confirmation and tracking updates sent to the customer.' },
    { label: 'Help chat widget', detail: 'Live chat interface where the customer describes their problem.' },
  ],
  back: [
    { label: 'Search indexing', detail: 'Staff curate product metadata and maintain the search index.' },
    { label: 'Order processing', detail: 'A team member reviews and packs the order for shipment.' },
    { label: 'Logistics handoff', detail: 'The packed order is handed to the courier for final delivery.' },
    { label: 'Ticket routing', detail: 'Support staff triage and assign the ticket to the right specialist.' },
  ],
  systems: [
    { label: 'Catalog DB', detail: 'The product database serving listings, inventory, and pricing data.' },
    { label: 'Payment gateway', detail: 'Third-party processor that authorizes and captures the charge.' },
    { label: 'Tracking API', detail: 'Courier API providing real-time shipment status updates.' },
    { label: 'Helpdesk tool', detail: 'The ticketing system that stores, routes, and resolves support cases.' },
  ],
};

const ServiceBlueprintDemo = () => {
  const [filter, setFilter] = useState<LaneId | 'all'>('all');
  const [selected, setSelected] = useState<{ lane: LaneId; step: number } | null>(null);

  const visibleLanes = filter === 'all' ? lanes : lanes.filter((l) => l.id === filter);

  const handleCellKey = useCallback((lane: LaneId, step: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelected({ lane, step });
    }
  }, []);

  const selLane = selected ? lanes.find((l) => l.id === selected.lane) : null;

  return (
    <div>
      {/* Lane filter */}
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        <span className="text-xs font-bold text-gray-400 mr-1">Lane:</span>
        <button
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
            filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {lanes.map((l) => (
          <button
            key={l.id}
            onClick={() => setFilter(l.id)}
            aria-pressed={filter === l.id}
            className="px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
            style={
              filter === l.id
                ? { backgroundColor: l.color, color: '#fff' }
                : { backgroundColor: `${l.color}10`, color: l.color }
            }
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="min-w-[480px]">
          {/* step headers */}
          <div className="grid mb-1.5" style={{ gridTemplateColumns: '110px repeat(4, 1fr)' }}>
            <div />
            {steps.map((s) => (
              <div key={s} className="px-2 text-center text-xs font-black text-gray-700">
                {s}
              </div>
            ))}
          </div>

          {/* lane rows */}
          <div className="space-y-1.5">
            {visibleLanes.map((lane) => (
              <div key={lane.id} className="grid gap-1.5" style={{ gridTemplateColumns: '110px repeat(4, 1fr)' }}>
                <div
                  className="rounded-lg flex items-center justify-center px-2 text-[10px] font-black text-white text-center leading-tight"
                  style={{ backgroundColor: lane.color }}
                >
                  {lane.label}
                </div>
                {grid[lane.id].map((cell, i) => {
                  const isSelected = selected?.lane === lane.id && selected?.step === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelected({ lane: lane.id, step: i })}
                      onKeyDown={(e) => handleCellKey(lane.id, i, e)}
                      aria-label={`${lane.label}, ${steps[i]}: ${cell.label}`}
                      className="rounded-lg p-2 text-left text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                      style={{
                        backgroundColor: `${lane.color}08`,
                        border: `2px solid ${isSelected ? lane.color : `${lane.color}25`}`,
                      }}
                    >
                      {cell.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail */}
      {selected && selLane && (
        <div
          className="mt-3 rounded-xl p-3 animate-pmt-reveal flex items-start gap-3"
          style={{ backgroundColor: `${selLane.color}08`, border: `2px solid ${selLane.color}20` }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: selLane.color }}
              >
                {selLane.label}
              </span>
              <span className="text-xs font-bold text-gray-500">{steps[selected.step]}</span>
            </div>
            <p className="text-sm font-bold text-gray-900 mb-1">{grid[selected.lane][selected.step].label}</p>
            <p className="text-xs text-gray-600 leading-relaxed">{grid[selected.lane][selected.step].detail}</p>
          </div>
          <button
            onClick={() => setSelected(null)}
            aria-label="Close detail"
            className="text-gray-300 hover:text-gray-600 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceBlueprintDemo;
