# TIA People Data Prototype

A curated database of tech founders and their professional networks in Southeast Asia, enabling warm introductions for tech recruiters.

## Quick Start

1. **Browse Newsletters**: Open `/docs/index.html` to view generated newsletters (also hosted on GitHub Pages)
2. **Generate Newsletter**: Open `/tools/newsletter-export-tool/index.html` to create new newsletters
3. **Research Tool**: Use `/tools/research-input-tool/index.html` for search strategy generation
4. **Weekly Updates**: Check `/docs/weekly_updates/` for project progress reports

## Tools

### Newsletter Export Tool
<!-- HTML newsletter generator with Airtable integration -->
Generate HTML newsletters for fundraising announcements with founder profiles and connections.
- **Location**: `tools/newsletter-export-tool/`
- **Features**:
  - **Company Autocomplete Search**: Real-time filtering of Airtable companies
  - **Rich Text Formatting**: Bold/italic formatting with keyboard shortcuts (Ctrl/Cmd+B, Ctrl/Cmd+I)
  - **Enhanced Output**: Underlined links, dynamic company name, source attribution
  - **Security**: API keys stored in gitignored `config.js`
- **Usage**: Search company → Fill details → Preview → Download HTML
- **Output**: Saved to `/docs/newsletters/` and hosted on GitHub Pages

### Research Input Tool
<!-- 4-step wizard for standardized search strategy generation -->
Interactive multi-step form for generating standardized founder research strategies.
- **Location**: `tools/research-input-tool/`
- **Features**:
  - 4-step workflow: LinkedIn URL → Work History → Additional Info → Strategy Review
  - Generates Manus AI search strategies
  - Follows "direct mentions only" research principle
- **Usage**: Input founder LinkedIn → Extract work history → Generate search strategy

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

## Recent Updates

### January 18-21, 2026
- **Newsletter Export Tool**: Added company autocomplete search, rich text formatting (bold/italic), enhanced HTML output with underlined links and source attribution
- **Security**: Moved API keys to gitignored config file
- **GitHub Pages**: Set up public hosting for newsletters at `docs/index.html`
- **Research Input Tool**: Shipped production-ready 4-step wizard for search strategy generation
- **First Newsletter**: Published Saladin fundraising announcement

For detailed weekly updates, see `docs/weekly_updates/`.

## Contact

Tech in Asia Data Team
