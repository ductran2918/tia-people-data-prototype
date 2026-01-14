# Product Context

**Paste this to AI tools for instant context**

## What This Is
A database mapping tech founders' professional networks to enable warm introductions for recruiters at Tech in Asia.

## Current Status
- **Phase:** MVP/Pilot
- **Data:** 1 founder profiled (Mao Ching Foo), 4 relationships verified
- **Stack:** Airtable for storage, manual data entry
- **Output:** HTML newsletters pairing funding news with founder networks

## Key Constraints
- **Quality over speed:** "Direct mentions only" - no inferred relationships
- **Target:** Tech founders with active LinkedIn (posted within 6 months)
- **Geography:** Southeast Asia focus
- **Solo project:** Manager validation required before scaling

## Success Metrics (Pilot Phase)
- [ ] 10 founder profiles showing clear recruiting value
- [ ] Minimum 3 warm intro paths per founder
- [ ] Newsletter format is actionable for recruiters
- [ ] Manager validates approach

## Current Open Questions
- How to prioritize which founders to research next?
- Should we track events/conferences for additional context?
- What's the minimum viable relationship strength to include?

## Recent Changes
- **2026-01-14:** Added `related_person_id` field for bidirectional network mapping
- **2026-01-14:** Decided to skip inactive LinkedIn profiles (ADR-004)
- **2026-01-13:** Established "direct mentions only" research principle (ADR-002)

## Quick Links
- [Database Schema](../database_structure.md)
- [Research Workflow](./research_workflow.md)
- [All Decisions](./decisions.md)
- [Research Log](./research_log.md)

---
**Last Updated:** 2026-01-14  
**Word Count:** ~200
