import { useState, useEffect, useRef, useCallback } from 'react';
import Fuse from 'fuse.js';

interface SearchEntry {
  title: string;
  slug: string;
  part: string;
  partTitle: string;
  plaintext: string;
}

interface Props {
  searchIndex: SearchEntry[];
}

export default function SearchIsland({ searchIndex }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Fuse.FuseResult<SearchEntry>[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useRef(
    new Fuse(searchIndex, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'plaintext', weight: 0.4 },
        { name: 'part', weight: 0.1 },
        { name: 'partTitle', weight: 0.1 },
      ],
      threshold: 0.3,
      includeMatches: true,
      minMatchCharLength: 2,
    })
  );

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setResults([]);
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open();
      }
    };

    const handleCustomOpen = () => open();

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('open-search', handleCustomOpen);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('open-search', handleCustomOpen);
    };
  }, [open]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      const r = fuse.current.search(query).slice(0, 12);
      setResults(r);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  const navigate = (slug: string) => {
    close();
    window.location.href = `/${slug}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigate(results[selectedIndex].item.slug);
    }
  };

  function getSnippet(item: Fuse.FuseResult<SearchEntry>): string {
    const text = item.item.plaintext;
    const match = item.matches?.find(m => m.key === 'plaintext');
    if (match && match.indices.length > 0) {
      const [start] = match.indices[0];
      const snippetStart = Math.max(0, start - 40);
      const snippetEnd = Math.min(text.length, start + 120);
      let snippet = text.slice(snippetStart, snippetEnd).trim();
      if (snippetStart > 0) snippet = '...' + snippet;
      if (snippetEnd < text.length) snippet = snippet + '...';
      return snippet;
    }
    return text.slice(0, 150) + (text.length > 150 ? '...' : '');
  }

  if (!isOpen) {
    return (
      <button
        onClick={open}
        className="search-trigger flex items-center gap-2 w-full px-3 py-2 text-sm text-navy-500 bg-navy-50 rounded-lg hover:bg-navy-100 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search...</span>
        <kbd className="ml-auto text-xs text-navy-400 bg-white border border-navy-200 px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-navy-200 overflow-hidden">
        <div className="flex items-center px-4 border-b border-navy-100">
          <svg className="w-5 h-5 text-navy-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search sections, topics, data..."
            className="flex-1 px-3 py-4 text-base outline-none bg-transparent text-navy-900 placeholder-navy-400"
          />
          <button onClick={close} className="text-xs text-navy-400 bg-navy-50 border border-navy-200 px-2 py-1 rounded font-mono hover:bg-navy-100">
            ESC
          </button>
        </div>
        {results.length > 0 && (
          <ul className="max-h-[50vh] overflow-y-auto py-2">
            {results.map((r, i) => (
              <li key={r.item.slug}>
                <button
                  onClick={() => navigate(r.item.slug)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    i === selectedIndex ? 'bg-blue-50' : 'hover:bg-navy-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-navy-400 bg-navy-50 px-2 py-0.5 rounded">
                      {r.item.part}
                    </span>
                    <span className="text-sm font-semibold text-navy-900">{r.item.title}</span>
                  </div>
                  <p className="text-xs text-navy-500 mt-1 line-clamp-2">{getSnippet(r)}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
        {query.length >= 2 && results.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-navy-400">No results found</div>
        )}
        {query.length < 2 && (
          <div className="px-4 py-6 text-center text-sm text-navy-400">
            Type at least 2 characters to search across all 64 sections
          </div>
        )}
      </div>
    </div>
  );
}
