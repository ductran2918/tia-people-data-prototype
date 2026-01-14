# TIA People Data Prototype

A curated database of tech founders and their professional networks, designed to enable warm introductions for tech recruiters.

## Project Overview

This project focuses on mapping close professional relationships of tech founders in Southeast Asia, starting with verified connections from public sources (LinkedIn posts, podcasts, company websites).

**Goal:** Provide Tech in Asia readers (tech recruiters) with actionable intelligence on how to approach founders through their trusted circles.

## Current Status

**Phase:** MVP - Database Schema Design & Initial Data Collection

**Sample Data:** 
- 1 founder profile (Mao Ching Foo, RealVantage)
- 4 verified relationships (ex-Funding Societies network)

## Tech Stack

### Database
- **Airtable** - Primary data store
  - Base: `tia_people_relationship_project`
  - Base ID: `appt8YGOz5bOK6RpR`
  - Tables: `people_companies`, `people_relationships`

### Future Components (Planned)
- **Python** - Data entry automation & HTML generation
- **Airtable API** - Programmatic data access
- **HTML/CSS** - Newsletter template generation

## Data Sources

All data is sourced from publicly verifiable sources:
- Company websites (team pages)
- LinkedIn posts (direct mentions and tags)
- Podcast interviews (guest mentions)
- News articles (quotes and references)

**Research Principle:** "Direct mentions only" - No inferences based on overlapping tenure or roles.

## Output Format

- **HTML newsletters** featuring:
  - Funding news (e.g., Series A announcements)
  - Founder profiles (background, decision-making style)
  - Trusted circles (verified warm intro paths)
  - Recent events (speaking engagements, awards)

## Key Features

- **Relationship-first approach** - Focus on "who knows who" rather than comprehensive founder profiles
- **Verified sources** - Every relationship includes a source URL for fact-checking
- **Tech-focused** - Prioritize founders with tech backgrounds whose networks align with Tech in Asia's audience
- **Bidirectional links** - Track both outgoing ("I know X") and incoming ("X knows me") relationships

## Database Schema

See [database_structure.md](./database_structure.md) for detailed schema documentation.

## Research Methodology

1. **Identify target founder** - Tech background, recent funding news, or high-profile company
2. **Search for public mentions** - LinkedIn posts, podcasts, interviews, company pages
3. **Extract verified connections** - Only include people directly mentioned or tagged by the founder
4. **Document source** - Record URL where the connection was found
5. **Categorize relationship** - Former colleague, co-founder, advisor, investor, classmate, other

## Future Roadmap

- [ ] Add 10+ tech founder profiles
- [ ] Build Python script for automated HTML newsletter generation
- [ ] Create Airtable views for different use cases (by company, by relationship type, by industry)
- [ ] Integrate with Tech in Asia's company database via `tia_company_slug`
- [ ] Add event tracking (conferences, webinars, speaking engagements)
- [ ] Build network visualization (graph view of connections)

## Project Context

**Organization:** Tech in Asia  
**Target Users:** Tech recruiters seeking warm introductions to founders  
**Value Proposition:** Convert funding news into actionable recruitment opportunities by revealing founders' trusted circles

## Contact

For questions or contributions, contact the Tech in Asia data team.

---

**Last Updated:** January 14, 2026  
**Version:** 0.1.0 (MVP)
