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

### Tools
- **Newsletter Export Tool** - Web-based HTML newsletter generator (live)
  - Location: `tools/newsletter-export-tool/`
  - Generates funding announcement newsletters with founder profiles and connections
  - Integrated with Airtable API for real-time data

- **Research Input Tool** - Interactive form for generating standardized search strategies (live)
  - Location: `tools/research-input-tool/`
  - Automates creation of search query templates for founder research

### Future Components (Planned)
- **Python** - Data entry automation scripts
- **Network visualization** - Graph view of connections

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

## Roadmap

### Completed
- [x] Build HTML newsletter generation tool (Newsletter Export Tool)
- [x] Integrate with Airtable API for programmatic data access
- [x] Create research methodology and search strategy templates

### In Progress
- [ ] Add 10+ tech founder profiles
- [ ] Create Airtable views for different use cases (by company, by relationship type, by industry)

### Future
- [ ] Integrate with Tech in Asia's company database via `tia_company_slug`
- [ ] Add event tracking (conferences, webinars, speaking engagements)
- [ ] Build network visualization (graph view of connections)
- [ ] Email service integration (SendGrid, Mailchimp)
- [ ] Backend API proxy to secure Airtable credentials

## Project Context

**Organization:** Tech in Asia  
**Target Users:** Tech recruiters seeking warm introductions to founders  
**Value Proposition:** Convert funding news into actionable recruitment opportunities by revealing founders' trusted circles

## Contact

For questions or contributions, contact the Tech in Asia data team.

---

**Last Updated:** January 19, 2026
**Version:** 0.2.0 (MVP + Newsletter Tool)
