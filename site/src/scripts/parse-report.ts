import fs from 'node:fs';
import path from 'node:path';

export interface Section {
  id: number;
  part: string;
  partNumber: number;
  partTitle: string;
  title: string;
  slug: string;
  markdown: string;
  headings: { depth: number; text: string; id: string }[];
  isAppendix?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractHeadings(markdown: string): { depth: number; text: string; id: string }[] {
  const headings: { depth: number; text: string; id: string }[] = [];
  const lines = markdown.split('\n');
  for (const line of lines) {
    const match = line.match(/^(#{3,4})\s+(.+)/);
    if (match) {
      const depth = match[1].length;
      const text = match[2].replace(/\*\*/g, '').trim();
      headings.push({ depth, text, id: slugify(text) });
    }
  }
  return headings;
}

const PART_NUMBERS: Record<string, number> = {
  'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
  'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
};

let _cachedSections: Section[] | null = null;

export function parseReport(): Section[] {
  if (_cachedSections) return _cachedSections;

  const reportPath = path.resolve(
    new URL('.', import.meta.url).pathname,
    '../../../Vento_Italian_Factoring_Complete_Report.md'
  );
  const content = fs.readFileSync(reportPath, 'utf-8');
  const lines = content.split('\n');

  const sections: Section[] = [];
  let currentPart = '';
  let currentPartNumber = 0;
  let currentPartTitle = '';
  let currentSectionTitle = '';
  let currentSectionId = 0;
  let currentSectionLines: string[] = [];
  let isAppendix = false;
  let inToc = false;

  function flushSection() {
    if (currentSectionTitle && currentSectionLines.length > 0) {
      const markdown = currentSectionLines.join('\n').trim();
      if (markdown) {
        const slug = isAppendix
          ? slugify(currentSectionTitle)
          : `${currentSectionId}-${slugify(currentSectionTitle)}`;
        sections.push({
          id: currentSectionId,
          part: currentPart,
          partNumber: currentPartNumber,
          partTitle: currentPartTitle,
          title: currentSectionTitle,
          slug,
          markdown,
          headings: extractHeadings(markdown),
          isAppendix,
        });
      }
    }
    currentSectionLines = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip the title and table of contents
    if (line.startsWith('# Vento Italian Factoring')) continue;
    if (line.startsWith('## Table of Contents')) {
      inToc = true;
      continue;
    }

    // Detect end of TOC (first --- after TOC heading, then the PART I heading)
    if (inToc) {
      if (line.startsWith('# PART ')) {
        inToc = false;
        // Fall through to process this PART heading
      } else {
        continue;
      }
    }

    // Part heading: # PART X — Title
    const partMatch = line.match(/^# PART\s+(I{1,3}V?|VI{0,3}|IX|X)\s+[—–-]\s+(.+)/);
    if (partMatch) {
      flushSection();
      currentPart = `Part ${partMatch[1]}`;
      currentPartNumber = PART_NUMBERS[partMatch[1]] || 0;
      currentPartTitle = partMatch[2].trim();
      isAppendix = false;
      continue;
    }

    // Section heading: ## N. Title
    const sectionMatch = line.match(/^## (\d+)\.\s+(.+)/);
    if (sectionMatch) {
      flushSection();
      currentSectionId = parseInt(sectionMatch[1], 10);
      currentSectionTitle = sectionMatch[2].trim();
      isAppendix = false;
      continue;
    }

    // Appendix heading: ## Appendix A: Title
    const appendixMatch = line.match(/^## (Appendix\s+[A-Z])[\s:]+(.+)/);
    if (appendixMatch) {
      flushSection();
      currentSectionId = 100 + appendixMatch[1].charCodeAt(appendixMatch[1].length - 1) - 64;
      currentSectionTitle = `${appendixMatch[1]}: ${appendixMatch[2].trim()}`;
      currentPart = 'Appendices';
      currentPartNumber = 11;
      currentPartTitle = 'Appendices';
      isAppendix = true;
      continue;
    }

    // Skip standalone --- dividers
    if (line.trim() === '---') continue;

    // Accumulate content for current section
    if (currentSectionTitle) {
      currentSectionLines.push(line);
    }
  }

  // Flush last section
  flushSection();

  _cachedSections = sections;
  return sections;
}

export function getSectionsByPart(): Map<string, Section[]> {
  const sections = parseReport();
  const byPart = new Map<string, Section[]>();
  for (const section of sections) {
    const key = section.part;
    if (!byPart.has(key)) byPart.set(key, []);
    byPart.get(key)!.push(section);
  }
  return byPart;
}

export function getPartOrder(): { part: string; partNumber: number; partTitle: string }[] {
  const sections = parseReport();
  const seen = new Set<string>();
  const parts: { part: string; partNumber: number; partTitle: string }[] = [];
  for (const s of sections) {
    if (!seen.has(s.part)) {
      seen.add(s.part);
      parts.push({ part: s.part, partNumber: s.partNumber, partTitle: s.partTitle });
    }
  }
  return parts;
}
