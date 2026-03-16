import { parseReport, type Section } from './parse-report';

export interface SearchEntry {
  title: string;
  slug: string;
  part: string;
  partTitle: string;
  plaintext: string;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, '')        // headings
    .replace(/\*\*(.+?)\*\*/g, '$1')     // bold
    .replace(/\*(.+?)\*/g, '$1')         // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/`([^`]+)`/g, '$1')         // inline code
    .replace(/\|/g, ' ')                 // table pipes
    .replace(/-{3,}/g, '')               // hr
    .replace(/\n{2,}/g, '\n')            // collapse newlines
    .trim();
}

export function buildSearchIndex(): SearchEntry[] {
  const sections = parseReport();
  return sections.map((s: Section) => ({
    title: s.isAppendix ? s.title : `${s.id}. ${s.title}`,
    slug: s.slug,
    part: s.part,
    partTitle: s.partTitle,
    plaintext: stripMarkdown(s.markdown).slice(0, 2000),
  }));
}
