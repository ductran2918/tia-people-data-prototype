# Architecture Decision Records

All key decisions in chronological order.

---

## ADR-001: Use Airtable for MVP Database
**Date:** 2026-01-13  
**Status:** Accepted

**Context:** Need to store founder profiles and relationships. Considered PostgreSQL, Google Sheets, and Airtable.

**Decision:** Use Airtable with 2 tables (`people_companies`, `people_relationships`).

**Rationale:**
- Built-in relational features (linked records)
- No-code interface for manual data entry
- API available for future automation
- Easy collaboration for team validation

**Trade-offs:** Limited to 1,200 records on free tier, but sufficient for pilot phase.

---

## ADR-002: "Direct Mentions Only" Research Principle
**Date:** 2026-01-13  
**Status:** Accepted

**Context:** Need to ensure relationship data is credible for recruiters.

**Decision:** Only record relationships where Person A explicitly mentions Person B by name in public sources (LinkedIn posts, podcasts, company pages).

**Rationale:**
- Prevents inferred relationships (e.g., "worked at same company" without proof of collaboration)
- Provides verifiable sources for every relationship
- Builds trust with recruiters

**Trade-offs:** Slower data collection, but higher quality.

---

## ADR-003: Tech Founders First
**Date:** 2026-01-14  
**Status:** Accepted

**Context:** Limited time to research. Need to prioritize which founders to profile.

**Decision:** Focus on founders with tech backgrounds (CTO, VP Eng, technical co-founders) rather than business-focused founders.

**Rationale:**
- Tech founders' networks align with Tech in Asia's existing database
- Their connections are more likely to be in tech ecosystem (engineers, product managers)
- Example: Mao Ching Foo (tech) has more valuable connections than Keith Ong (real estate investment)

**Trade-offs:** Miss some valuable business-side networks, but better fit for pilot validation.

---

## ADR-004: Skip Inactive LinkedIn Profiles
**Date:** 2026-01-14  
**Status:** Accepted

**Context:** Some founders have sparse LinkedIn presence, making them low-value for recruiter outreach.

**Decision:** Do not profile founders if their LinkedIn shows: last post > 6 months ago, < 100 connections, or incomplete work history.

**Rationale:**
- Recruiters rely on LinkedIn for outreach
- Inactive profiles = low response rates
- Focus research time on reachable targets

**Trade-offs:** May miss some valuable connections, but optimizes for recruiter success rate.

---

## ADR-005: Use `linkedin_url` as Primary Key
**Date:** 2026-01-14  
**Status:** Accepted

**Context:** Need a unique identifier for people in the database.

**Decision:** Use LinkedIn profile URL as the primary field in `people_companies` table.

**Rationale:**
- Natural starting point for research
- Prevents duplicate entries (URLs are unique)
- Human-readable and clickable
- Aligns with research workflow

**Trade-offs:** If someone changes their LinkedIn custom URL, we'd need to update records. Rare edge case.

---

**Total Decisions:** 5  
**Last Updated:** 2026-01-14
