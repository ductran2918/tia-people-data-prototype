# Database Structure

## Overview

The database consists of two main tables in Airtable that form a relational network of tech founders and their professional connections.

**Airtable Base:** `tia_people_relationship_project`
**Base ID:** `appt8YGOz5bOK6RpR`

---

## Table 1: people_companies

**Purpose:** Store profiles of tech founders and key executives.

**Table ID:** `tbl2GFODrbUmOjJUY`

### Schema (11 fields)

| Field Name | Field Type | Required | Description | Example |
|------------|-----------|----------|-------------|---------|
| `linkedin_url` | URL | Yes | LinkedIn profile URL. Primary field and main identifier. | `https://www.linkedin.com/in/maochingfoo/` |
| `name` | Single line text | Yes | Full name of the person. | `Mao Ching Foo` |
| `role` | Single line text | Yes | Current job title. | `Co-founder & COO` |
| `current_company_slug` | Single line text | No | Slug identifier linking to Tech in Asia's company database. | `realvantage` |
| `is_founder` | Checkbox | No | Flag to distinguish founders from executives. Default: unchecked. | `true` |
| `outgoing_relationships` | Link to another record | Auto | Reverse link showing relationships where this person is the main subject. Links to `people_relationships` table. | Auto-generated |
| `incoming_relationships` | Link to another record | Auto | Reverse link showing relationships where this person is mentioned. Links to `people_relationships` table. | Auto-generated |
| `updated_at` | Last modified time | Auto | Timestamp when record was last modified. | Auto-generated |
| `created_at` | Created time | Auto | Timestamp when record was created. | Auto-generated |
| `created_by` | Created by | Auto | Airtable user who created the record. | Auto-generated |
| `last_modified_by` | Last modified by | Auto | Airtable user who last modified the record. | Auto-generated |

### Data Entry Rules

- **Required fields:** `linkedin_url`, `name`, `role`
- **LinkedIn URL must be active:** Last post within 6 months
- **Tech background preferred:** CTOs, VPs of Engineering, technical co-founders

### Sample Record

```json
{
  "linkedin_url": "https://www.linkedin.com/in/maochingfoo/",
  "name": "Mao Ching Foo",
  "role": "Co-founder & COO",
  "current_company_slug": "realvantage",
  "is_founder": true
}
```

---

## Table 2: people_relationships

**Purpose:** Map professional relationships and connections between people, enabling warm introduction paths.

**Table ID:** `tblBUetr6XUt7lZhl`

### Schema (10 fields)

| Field Name | Field Type | Required | Description | Example |
|------------|-----------|----------|-------------|---------|
| `id` | Autonumber | Auto | Auto-incrementing unique identifier for each relationship. Primary field. | `1`, `2`, `3` |
| `person_id` | Link to another record | Yes | The profile owner whose network you're mapping. Links to `people_companies` table. | Link to Mao Ching Foo |
| `related_person_id` | Link to another record | Yes | The connection. Both people must exist in `people_companies` table. Links to `people_companies` table. | Link to Andy Kurnia |
| `relationship_type` | Single select | Yes | Predefined category for filtering/querying. | `former_colleague` |
| `relationship_context` | Long text | Yes | **Critical field:** The narrative that makes introductions credible. | See format below |
| `source_url` | URL | Yes | Where you discovered this relationship for verification. | `https://www.realvantage.co/our-team` |
| `created_by` | Created by | Auto | Airtable user who created the relationship record. | Auto-generated |
| `last_modified_by` | Last modified by | Auto | Airtable user who last modified the record. | Auto-generated |
| `created_at` | Created time | Auto | Timestamp when relationship was recorded. | Auto-generated |
| `last_modified_at` | Last modified time | Auto | Timestamp when relationship was last updated. | Auto-generated |

### relationship_type Options
- `former_colleague` - Worked together at the same company
- `cofounder` - Co-founded a company together
- `investor-investee` - Investor/founder relationship
- `classmate` - Studied together (university, MBA, bootcamp)
- `other` - Any other professional connection

### relationship_context Format

Write a **narrative** that explains:
1. Where they worked/studied together
2. What they built/achieved together
3. How long they collaborated
4. Any notable outcomes

**Example:**
```
Worked together at Funding Societies 2016-2019 where Mao was CTO and Andy was a senior engineer. 
They collaborated on building the AI credit scoring system that enabled USD 2 billion+ in loans. 
Andy is now Chief Architect at RealVantage, brought over by Mao.
```

### Sample Record

```json
{
  "id": 1,
  "person_id": ["recMJxKQ2Vg3wJ4Q6"],
  "related_person_id": ["recABC123"],
  "relationship_type": "former_colleague",
  "relationship_context": "Worked together at Funding Societies 2016-2019. Mao was CTO, Andy was Senior Engineer. Built AI credit scoring system together. Andy now at RealVantage as Chief Architect.",
  "source_url": "https://www.realvantage.co/our-team"
}
```

---

## Key Design Change (v2.0)

**Previous (v1.0):** Allowed manual text entries for related people (`related_person_name`, `related_person_linkedin_url`, `related_person_current_company`)

**Current (v2.0):** **All people must be profiles in `people_companies` first.** This ensures:
- Data consistency (no duplicate entries)
- Bidirectional queries ("who knows X?")
- Clickable network navigation
- Higher data quality

**Workflow:** Before creating a relationship, add both people to `people_companies` table.

---

## Relationship Model

### Bidirectional Links

When you create a relationship:
- Person A's profile shows it in `outgoing_relationships`
- Person B's profile shows it in `incoming_relationships`

**Example:**
- Mao → Andy Kurnia (created in `people_relationships` table)
- Mao's profile: Shows Andy in "outgoing_relationships"
- Andy's profile: Shows Mao in "incoming_relationships"

This enables queries like "Show me everyone who knows Andy Kurnia."

---

## Data Entry Workflow

### Step 1: Add Both People to people_companies

1. Add Person A (e.g., Mao Ching Foo)
2. Add Person B (e.g., Andy Kurnia)

### Step 2: Create Relationship

1. Open `people_relationships` table
2. Add new record:
   - `person_id`: Select Person A from dropdown
   - `related_person_id`: Select Person B from dropdown
   - `relationship_type`: Select from dropdown
   - `relationship_context`: Write the narrative
   - `source_url`: Paste verification link

---

## Query Examples

**Find all connections for Mao Ching Foo:**
```
Filter: person_id = "Mao Ching Foo"
```

**Find everyone who knows Andy Kurnia:**
```
Filter: related_person_id = "Andy Kurnia"
```

**Find all former colleagues:**
```
Filter: relationship_type = "former_colleague"
```

---

## Data Quality Guidelines

### "Direct Mentions Only" Principle

Only record relationships where:
1. Person A explicitly mentions Person B by name in public sources
2. Person A and Person B are tagged together in a post
3. A company page describes their working relationship
4. A podcast/interview features them discussing their connection

**Do NOT record if:**
- They worked at the same company but never mentioned each other
- You assume they know each other based on roles
- A third party speculates about their relationship

### Source Verification

Every relationship MUST have a `source_url` that shows:
- Direct mention of both people
- Clear indication of their connection
- Public and accessible content

**Valid sources:**
- LinkedIn posts with tags
- Company "Our Team" pages with bios
- Podcast transcripts with guest mentions
- Funding announcements with quotes

---

## Version History

- **v2.1** (2026-01-19): Schema documentation sync
  - Corrected Base ID to `appt8YGOz5bOK6RpR`
  - Corrected Table IDs: `tbl2GFODrbUmOjJUY` (people_companies), `tblBUetr6XUt7lZhl` (people_relationships)
  - Fixed `people_relationships` field count: 10 fields (not 11)
  - Updated `relationship_type` options: removed `advisor`, changed `investor` to `investor-investee`

- **v2.0** (2026-01-15): Simplified schema
  - Removed `profile_notes` from `people_companies`
  - Removed `related_person_name`, `related_person_linkedin_url`, `related_person_current_company` from `people_relationships`
  - All relationships now require both people to be full profiles
  - Renamed `tia_company_slug` to `current_company_slug`

- **v1.0** (2026-01-14): Initial schema
  - 11 fields in `people_companies`
  - 13 fields in `people_relationships`
  - Supported manual text entries for related people

---

**Last Updated:** January 19, 2026
**Maintained by:** Tech in Asia Data Team
