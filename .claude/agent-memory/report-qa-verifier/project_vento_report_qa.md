---
name: Vento Factoring Report QA Patterns
description: Common error types and data discrepancies found when verifying the Vento Italian Factoring complete report against its 4 source files
type: project
---

## Key data discrepancies discovered in March 2026 QA pass

1. **SCF TAM internal inconsistency**: File 2 says ~€596B / ~29% served. File 3 says ~€596B / 22% served. File 4 says €505B. The unified report uses €596B/~29% in most places but €505B appears in Section 27.3 (carried verbatim from File 4). The 22% vs 29% discrepancy between File 3 and File 2 was not resolved.

2. **Credimi employees at peak**: File 1 says ~30 employees at peak. File 2 says 90+ employees at peak. The unified report uses 90+ (from File 2), which appears to be the more detailed/accurate source, but the discrepancy in File 1 was not flagged.

3. **Billie founding year**: File 1 says 2017. File 2 says "2016" with additional note. The unified report uses "2016/2017" as a compromise.

4. **Billie funding**: File 1 says $149M total funding. File 2 says $348M (equity + debt). The unified report uses $348M, which is the more comprehensive figure.

5. **UniCredit market share**: File 1 says ~19%. File 2 says ~17%. The unified report uses ~17% (from File 2, the more detailed analyst source), noting the decline from ~19% in earlier periods.

6. **Workinvoice founding date**: File 1 says "2015" in one place and "2014" in another. File 2 says "late 2013." The unified report uses "Late 2013 (operative from 2015)."

7. **"Top 3 = ~57%" vs "top 4 = ~63%"**: These are compatible (different groupings) but can be confusing — File 1 uses "top 4 = ~63%" while File 2 uses "top 3 = ~57%." Both appear in the unified report.

8. **Banca CF+ / Banca Sistema consolidation**: Only mentioned in File 3 and carried into the unified report. Not corroborated in other source files.

## Common patterns
- When source files disagree on a data point, the unified report typically follows File 2 (the analyst overview) which tends to have more precise figures.
- Verbatim passages carried from individual source files sometimes introduce inconsistencies with the unified report's own synthesis (e.g., €505B vs €596B SCF TAM).
