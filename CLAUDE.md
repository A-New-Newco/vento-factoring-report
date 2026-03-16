# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **research repository** containing market intelligence on Italian factoring, invoice finance, and trade finance. There is no code, build system, or test suite.

## Key Files

- `Vento_Italian_Factoring_Complete_Report.md` — The unified, deduplicated master report (2,600+ lines, 62 sections across 10 parts + appendices). This is the authoritative document.
- `Italian_Factoring_Market_Overview.md` — Source file: market overview, players, fintechs, European benchmarks, pricing (File 1)
- `compass_artifact_wf-d84458f6-*.md` — Source file: analyst overview with unique data on DSO, Superbonus, SCF Observatory (File 2)
- `compass_artifact_wf-74237ca6-*.md` — Source file: 16 domestic product types with legal terms, mechanics, pricing (File 3)
- `compass_artifact_wf-a9d9d811-*.md` — Source file: international trade finance toolkit, SACE-SIMEST-CDP, 20 products (File 4)

## Report Structure (Vento_Italian_Factoring_Complete_Report.md)

| Part | Sections | Content |
|------|----------|---------|
| I | 1-3 | Market overview, size, trends |
| II | 4-7 | Players & competitive landscape |
| III | 8-19 | Domestic products (pro soluto, pro solvendo, reverse factoring, SCF, invoice trading, PA factoring, tax credits, B2B BNPL, securitization) |
| IV | 20-29 | International trade finance (export factoring, forfaiting, SACE, L/Cs, documentary collections, buyer credit, FX hedging) |
| V | 30-32 | Institutional ecosystem (SACE-SIMEST-CDP, SDI e-invoicing) |
| VI | 33-36 | Regulatory framework |
| VII | 37-42 | Pricing & economics |
| VIII | 43-49 | European & US benchmarks |
| IX | 50-58 | Fintech deep-dives |
| X | 59-62 | Strategic outlook |
| Appendices | A-B | Exporter decision framework, references |

## Working with This Repo

- The 4 source files (`compass_artifact_*` and `Italian_Factoring_Market_Overview.md`) are the raw inputs that were merged into the complete report. They should be kept for reference but the master report is canonical.
- Data is as of March 2026. Key figures: €289B market (2024), 81% non-recourse, top 3 players = ~57% share, 32,000+ companies using factoring.
- When updating the report, reconcile overlapping data between sources. File 2 generally has the most detailed/recent figures for market data; File 3 has the most detailed product mechanics; File 4 has the most detailed trade finance content.
