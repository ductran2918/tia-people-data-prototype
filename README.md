# TIA People Data Prototype

A curated database of tech founders and their professional networks in Southeast Asia, enabling warm introductions for tech recruiters.

## Quick Start

1. **Browse Newsletters**: Open `/docs/index.html` to view generated newsletters
2. **Generate Newsletter**: Open `/tools/newsletter-export-tool/index.html` to create new newsletters
3. **Research Tool**: Use `/tools/research-input-tool/index.html` for search strategy generation

## Tools

### Newsletter Export Tool
Generate HTML newsletters for fundraising announcements with founder profiles and connections.
- **Location**: `tools/newsletter-export-tool/`
- **Usage**: Select company → Fill details → Generate preview → Download HTML
- **Output**: Saved to `/docs/newsletters/`

### Research Input Tool
Interactive form for generating standardized founder research strategies.
- **Location**: `tools/research-input-tool/`
- **Usage**: Input company details → Generate search queries → Copy templates

## Project Structure

```
├── docs/
│   ├── newsletters/          # Exported HTML newsletters
│   ├── index.html           # Newsletter browser
│   ├── weekly_updates/      # Status reports
│   └── research_log.md      # Active research tracking
│
├── tools/
│   ├── newsletter-export-tool/   # HTML newsletter generator
│   └── research-input-tool/      # Search strategy generator
│
└── .brv/context-tree/       # AI agent knowledge base
    ├── product/             # Project overview, tech stack
    ├── structure/           # Database schema, tools
    ├── compliance/          # Workflows, guidelines, decisions
    └── methodology/         # Research processes
```

## Database

**Airtable Base**: `tia_people_relationship_project` (ID: `appt8YGOz5bOK6RpR`)

**Tables**:
- `people_companies` - Founder profiles with LinkedIn URLs, roles, and company affiliations
- `people_relationships` - Verified professional connections with source URLs

**Research Principle**: Direct mentions only - no inferred connections.

## Contact

Tech in Asia Data Team
