import { useState, useCallback, useMemo } from 'react';
import { FolderTree, File, ChevronRight, Search, X } from 'lucide-react';

interface TreeNode {
  id: string;
  label: string;
  type: 'folder' | 'page';
  children?: TreeNode[];
}

const tree: TreeNode[] = [
  {
    id: 'home',
    label: 'Home',
    type: 'folder',
    children: [
      { id: 'hero', label: 'Hero Banner', type: 'page' },
      { id: 'features', label: 'Features Grid', type: 'page' },
      { id: 'testimonials', label: 'Testimonials', type: 'page' },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    type: 'folder',
    children: [
      { id: 'catalog', label: 'Product Catalog', type: 'page' },
      { id: 'detail', label: 'Product Detail', type: 'page' },
      {
        id: 'compare',
        label: 'Compare',
        type: 'folder',
        children: [
          { id: 'compare-table', label: 'Comparison Table', type: 'page' },
          { id: 'compare-guide', label: 'How to Compare', type: 'page' },
        ],
      },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    type: 'folder',
    children: [
      { id: 'faq', label: 'FAQ', type: 'page' },
      { id: 'contact', label: 'Contact Us', type: 'page' },
    ],
  },
  { id: 'about', label: 'About Us', type: 'page' },
];

const DEFAULT_OPEN = new Set(['home', 'products']);

// Recursively collect ids that contain a match (ancestors must stay open)
function matchesQuery(node: TreeNode, q: string): boolean {
  const ql = q.toLowerCase();
  if (node.label.toLowerCase().includes(ql)) return true;
  return (node.children || []).some((c) => matchesQuery(c, ql));
}

function getAncestorIdsWithMatch(node: TreeNode, q: string, path: string[]): string[] {
  const ids: string[] = [];
  const childMatches = (node.children || []).some((c) => matchesQuery(c, q));
  if (childMatches) ids.push(node.id);
  for (const c of node.children || []) {
    ids.push(...getAncestorIdsWithMatch(c, q, [...path, node.id]));
  }
  return ids;
}

const SiteMapDemo = () => {
  const [open, setOpen] = useState<Set<string>>(new Set(DEFAULT_OPEN));
  const [query, setQuery] = useState('');

  const toggle = useCallback((id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const q = query.trim().toLowerCase();
  const ancestorIds = useMemo(
    () => (q ? new Set(tree.flatMap((n) => getAncestorIdsWithMatch(n, q, []))) : null),
    [q]
  );

  const renderNode = (node: TreeNode, depth: number): React.ReactNode => {
    const isFolder = node.type === 'folder';
    const isOpen = open.has(node.id);
    const visible = !q || matchesQuery(node, q);

    if (!visible) return null;

    // Force open when searching and this is an ancestor of a match
    const showChildren = isFolder && (isOpen || (ancestorIds && ancestorIds.has(node.id)));

    return (
      <div key={node.id}>
        <div
          role={isFolder ? 'treeitem' : 'treeitem'}
          aria-expanded={isFolder ? showChildren : undefined}
          tabIndex={0}
          onKeyDown={(e) => {
            if (isFolder && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
              e.preventDefault();
              toggle(node.id);
            }
          }}
          onClick={() => isFolder && toggle(node.id)}
          className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
          style={{ paddingLeft: depth * 18 + 8 }}
        >
          {isFolder ? (
            <>
              <ChevronRight
                className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform ${showChildren ? 'rotate-90' : ''}`}
              />
              <FolderTree className="w-4 h-4 text-amber-600 flex-shrink-0" />
            </>
          ) : (
            <>
              <span className="w-3.5 flex-shrink-0" />
              <File className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </>
          )}
          <span className={`text-sm ${isFolder ? 'font-bold text-gray-800' : 'text-gray-600'}`}>
            {node.label}
          </span>
        </div>
        {isFolder && showChildren && (
          <div>
            {(node.children || []).map((c) => renderNode(c, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter nodes..."
          aria-label="Filter site map nodes"
          className="w-full pl-9 pr-9 py-2 rounded-lg border-2 border-gray-200 text-sm focus:outline-none focus:border-teal-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear filter"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tree */}
      <div role="tree" aria-label="Site map" className="rounded-xl border-2 border-gray-200 bg-white p-2 max-h-[340px] overflow-y-auto">
        {tree.map((n) => renderNode(n, 0))}
        {q && tree.every((n) => !matchesQuery(n, q)) && (
          <p className="text-xs text-gray-400 italic text-center py-6">No matching nodes</p>
        )}
      </div>
      <p className="text-[10px] text-gray-400 italic mt-2">
        {tree.reduce((acc, n) => acc + (n.children?.length || 0) + (n.children?.some(c => c.children?.length) ? 1 : 0), 0) + tree.length} nodes · click folders or press Enter to expand
      </p>
    </div>
  );
};

export default SiteMapDemo;
