export interface HeroStat {
  value: string;
  label: string;
  detail?: string;
  color: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'cyan' | 'orange' | 'slate';
}

export const heroStats: HeroStat[] = [
  {
    value: '€289B',
    label: 'Market Volume (2024)',
    detail: 'Total Italian factoring turnover',
    color: 'blue',
  },
  {
    value: '81%',
    label: 'Non-Recourse Share',
    detail: 'Pro soluto dominance',
    color: 'emerald',
  },
  {
    value: '32,000+',
    label: 'Companies Using Factoring',
    detail: 'Active Italian clients',
    color: 'purple',
  },
  {
    value: '~13%',
    label: 'GDP Penetration',
    detail: 'Factoring turnover / GDP',
    color: 'amber',
  },
  {
    value: '€596B',
    label: 'SCF TAM',
    detail: 'Supply chain finance addressable market',
    color: 'cyan',
  },
  {
    value: '82–85d',
    label: 'Avg. DSO (Private)',
    detail: 'Days sales outstanding',
    color: 'orange',
  },
  {
    value: '137d',
    label: 'PA Payment Terms',
    detail: 'Public administration avg. payment',
    color: 'rose',
  },
  {
    value: '~57%',
    label: 'Top 3 Market Share',
    detail: 'UniCredit + Intesa + BNP',
    color: 'slate',
  },
];
