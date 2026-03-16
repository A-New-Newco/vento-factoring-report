export interface InsightItem {
  headline: string;
  data: string;
  detail: string;
  slug: string;
  sectionLabel: string;
}

export interface EvidenceSection {
  title: string;
  subtitle: string;
  accent: 'blue' | 'rose' | 'emerald';
  bg: string;
  items: InsightItem[];
}

export const evidenceSections: EvidenceSection[] = [
  {
    title: 'The Italian Paradox',
    subtitle: 'Market opportunity hiding in plain sight',
    accent: 'blue',
    bg: 'bg-white',
    items: [
      {
        headline: 'Growth Opportunity',
        data: '+€90B',
        detail:
          'If Italy matched Spain\u2019s 16.7% GDP penetration, the market reaches €378B — a €90B gap waiting to close.',
        slug: '2-market-size-growth-european-standing',
        sectionLabel: '§2',
      },
      {
        headline: 'International Surge',
        data: '+20% Q1 2025',
        detail:
          'Cross-border factoring accelerating at 3\u00D7 the domestic rate, now 25% of total volume.',
        slug: '2-market-size-growth-european-standing',
        sectionLabel: '§2',
      },
      {
        headline: 'SME Penetration Gap',
        data: '32K of 4.3M',
        detail:
          'Only 0.7% of Italian SMEs use factoring; €500B in unpaid invoices outstanding.',
        slug: '61-where-italy-has-potential',
        sectionLabel: '§61',
      },
      {
        headline: 'Critical Infrastructure',
        data: '40%+',
        detail:
          'Factoring exceeds 40% of all short-term corporate credit — unmatched globally.',
        slug: '61-where-italy-has-potential',
        sectionLabel: '§61',
      },
    ],
  },
  {
    title: 'The Fintech Funding Gap',
    subtitle: 'Italy\u2019s invoice-finance fintechs are radically underfunded',
    accent: 'rose',
    bg: 'bg-navy-50/40',
    items: [
      {
        headline: 'Italian Fintechs',
        data: '~€35M raised',
        detail:
          'Lifetime funding across all Italian invoice-finance fintechs combined.',
        slug: '58-funding-comparison-summary',
        sectionLabel: '§58',
      },
      {
        headline: 'vs. European Peers',
        data: '12\u201350\u00D7 gap',
        detail:
          'Germany €500M+, France €400M+, Spain €220M, UK £100M+ — Italy is the outlier.',
        slug: '58-funding-comparison-summary',
        sectionLabel: '§58',
      },
      {
        headline: 'Credimi Post-Mortem',
        data: '€24M \u2192 €5.5M',
        detail:
          'Raised €24M, sold for €5.5M — severe value destruction and a cautionary tale.',
        slug: '50-credimi-italy-post-mortem',
        sectionLabel: '§50',
      },
      {
        headline: 'Defacto Benchmark',
        data: '€1B+ financed',
        detail:
          'Founded 2021, already €1B+ financed, 17K businesses, 8 countries, ACPR-licensed.',
        slug: '55-defacto-france-next-gen-model',
        sectionLabel: '§55',
      },
    ],
  },
  {
    title: 'Structural Tailwinds',
    subtitle: 'Regulatory and infrastructure advantages unique to Italy',
    accent: 'emerald',
    bg: 'bg-white',
    items: [
      {
        headline: 'E-Invoicing Head Start',
        data: '5+ years',
        detail:
          'SDI mandatory since 2019; 2B+ validated invoices/year from 3.9M enterprises.',
        slug: '32-italy-s-e-invoicing-infrastructure-sdi',
        sectionLabel: '§32',
      },
      {
        headline: 'EU Late Payment Directive',
        data: '60-day cap',
        detail:
          'Bans anti-assignment clauses; a direct regulatory tailwind for factoring.',
        slug: '34-eu-late-payment-directive-vida',
        sectionLabel: '§34',
      },
      {
        headline: 'ESG-Linked SCF',
        data: 'Fincantieri + ENI',
        detail:
          'Fincantieri targeting 1,000 suppliers; ENI ~€90M advances in 2024.',
        slug: '59-key-trends-2020-2025',
        sectionLabel: '§59',
      },
      {
        headline: 'Embedded Finance Greenfield',
        data: 'Models 4\u20136 missing',
        detail:
          'B2B BNPL, LaaS, dynamic discounting marketplaces — untouched in Italy.',
        slug: '62-the-embedded-finance-opportunity',
        sectionLabel: '§62',
      },
    ],
  },
];
