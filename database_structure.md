# Database Structure

## Overview

The database consists of two main tables in Airtable that form a relational network of tech founders and their professional connections.

**Airtable Base:** `tia_people_relationship_project`  
**Base ID:** `appt8YGOz5bOK6RpR`

---

## Table 1: people_companies

**Purpose:** Store profiles of tech founders and key executives.

**Table ID:** `tbl2GFODrbUmOjJUY`

### Schema

| Field Name | Field Type | Required | Description | Example |
|------------|-----------|----------|-------------|---------|
| `linkedin_url` | URL | Yes | LinkedIn profile URL. Primary field and main identifier. | `https://www.linkedin.com/in/maochingfoo/` |
| `tia_company_slug` | Single line text | No | Slug identifier linking to Tech in Asia's company database. | `realvantage` |
| `name` | Single line text | Yes | Full name of the person. | `Mao Ching Foo` |
| `role` | Single line text | Yes | Current job title. | `Co-founder & COO` |
| `is_founder` | Checkbox | No | Flag to distinguish founders from executives. Default: unchecked. | `true` |
| `profile_notes` | Long text | No | Markdown-formatted notes including background, education, achievements, decision-making style, hiring patterns. | See format below |
| `outgoing_relationships` | Link to another record | Auto | Reverse link showing relationships where this person is the main subject. Links to `people_relationships` table. | `[rec123, rec456]` |
| `created_at` | Created time | Auto | Timestamp when record was created. | `2026-01-13T10:36:37.000Z` |
| `updated_at` | Last modified time | Auto | Timestamp when record was last modified. | `2026-01-14T03:20:34.000Z` |
| `created_by` | Created by | Auto | Airtable user who created the record. | `Duc Tran` |
| `last_modified_by` | Last modified by | Auto | Airtable user who last modified the record. | `Duc Tran` |

### profile_notes Format

Store in **Markdown** format with these sections:

```markdown
## Experience
- Key roles and achievements
- Quantified impact (e.g., "Built AI model enabling USD 2B+ in loans")

## Education
- Universities and degrees
- Notable programs or certifications

## Decision-Making Style
- Authority level (C-level, VP, etc.)
- Technical vs. business orientation
- Build vs. buy preference

## Hiring Pattern (Optional)
- What they look for in candidates
- Hiring through trusted networks vs. open recruitment
```

### Sample Record

```json
{
  "linkedin_url": "https://www.linkedin.com/in/maochingfoo/",
  "tia_company_slug": "realvantage",
  "name": "Mao Ching Foo",
  "role": "Co-founder & COO",
  "is_founder": true,
  "profile_notes": "## Experience\n- CTO & Chief Data Scientist at Funding Societies (2016-2019)\n## Education\n- Stanford, MSc\n- NUS, BSc"
}
```

---

## Table 2: people_relationships

**Purpose:** Map professional relationships and connections between people, enabling warm introduction paths.

**Table ID:** `tblBUetr6XUt7lZhl`

### Schema

| Field Name | Field Type | Required | Description | Example |
|------------|-----------|----------|-------------|---------|
| `id` | Autonumber | Auto | Auto-incrementing unique identifier for each relationship. Primary field. | `1`, `2`, `3` |
| `person_id` | Link to another record | Yes | The profile owner whose network you're mapping. Links to `people_companies` table. | `[recMJxKQ2Vg3wJ4Q6]` (Mao) |
| `related_person_id` | Link to another record | No | Use this IF the related person is also a target profile in your database. Links to `people_companies` table. | `[recXYZ123]` (Kelvin Teo) |
| `related_person_name` | Single line text | No | Manual entry for people NOT in your main database (investors, advisors, professors). | `Pramodh Rai` |
| `related_person_linkedin_url` | URL | No | LinkedIn URL for non-target profiles. Provides quick reference. | `https://www.linkedin.com/in/pramodh-rai/` |
| `related_person_current_company` | Single line text | No | Current employer of the related person. Provides context. | `Cyber Sierra`, `Google`, `Sequoia Capital` |
| `relationship_type` | Single select | Yes | Predefined category for filtering/querying. | `former_colleague` |
| `relationship_context` | Long text | Yes | **Critical field:** The narrative that makes introductions credible. | See format below |
| `source_url` | URL | Yes | Where you discovered this relationship for verification. | `https://www.linkedin.com/feed/update/...` |
| `created_at` | Created time | Auto | Timestamp when relationship was recorded. | `2026-01-13T10:37:22.000Z` |
| `last_modified_at` | Last modified time | Auto | Timestamp when relationship was last updated. | `2026-01-13T10:37:22.000Z` |
| `created_by` | Created by | Auto | Airtable user who created the relationship record. | `Duc Tran` |
| `last_modified_by` | Last modified by | Auto | Airtable user who last modified the record. | `Duc Tran` |

### relationship_type Options

- `former_colleague` - Worked together at the same company
- `cofounder` - Co-founded a company together
- `advisor` - Advisor/advisee relationship
- `investor` - Investor/founder relationship
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

### Field Usage Rules

**Use `related_person_id` when:**
- The related person has a full profile in `people_companies` table
- You want to enable bidirectional relationship queries
- You want to click through to see their full network

**Use `related_person_name` + `related_person_linkedin_url` when:**
- The related person is just context (not a research target)
- They're external connections (investors, advisors, professors)
- You don't plan to research their network

### Sample Record

```json
{
  "id": 3,
  "person_id": ["recMJxKQ2Vg3wJ4Q6"],
  "related_person_name": "Pramodh Rai",
  "related_person_linkedin_url": "https://www.linkedin.com/in/pramodh-rai/",
  "related_person_current_company": "Cyber Sierra",
  "relationship_type": "former_colleague",
  "relationship_context": "Ex-colleagues at Funding Societies. Directly mentioned and tagged together in LinkedIn post by Anthony Poh showing their connection from Funding Societies days.",
  "source_url": "https://www.linkedin.com/feed/update/"
}
```

---

## Relationship Model

### One-to-Many Relationships

```
people_companies (1) ←→ (Many) people_relationships
```

- One person can have many relationships
- Each relationship belongs to one primary person (`person_id`)
- Relationships can optionally link to another person in the database (`related_person_id`)

### Bidirectional Links

When you use `related_person_id`:
- Airtable automatically creates reverse links
- Person A's profile shows: "Outgoing relationships" (people A knows)
- Person B's profile shows: "Incoming relationships" (people who know B)

**Example:**
- Mao → Kelvin Teo (outgoing from Mao's perspective)
- Kelvin's profile automatically shows this as an incoming relationship

---

## Data Entry Workflow

### Adding a New Founder

1. Open `people_companies` table
2. Add new record:
   - `linkedin_url`: Paste LinkedIn profile URL
   - `name`: Full name
   - `role`: Current title
   - `is_founder`: Check if they're a founder
   - `tia_company_slug`: Company identifier (if in TIA database)
   - `profile_notes`: Research and fill in Markdown format
3. Auto-populated fields (`created_at`, `created_by`) fill automatically

### Adding a Relationship

1. Open `people_relationships` table
2. Add new record:
   - `id`: Auto-generated
   - `person_id`: Select the founder from dropdown
   - **If related person is in database:**
     - `related_person_id`: Select from dropdown
     - Leave `related_person_name` and `related_person_linkedin_url` empty
   - **If related person is NOT in database:**
     - `related_person_name`: Type their name
     - `related_person_linkedin_url`: Paste LinkedIn URL
     - `related_person_current_company`: Type company name
   - `relationship_type`: Select from dropdown
   - `relationship_context`: Write the narrative
   - `source_url`: Paste verification link
3. Auto-populated fields fill automatically

---

## Query Examples

### Find all connections for a specific founder

**Filter:** `person_id` = "Mao Ching Foo"

**Returns:** All of Mao's verified relationships

### Find everyone who knows a specific person

**Filter:** `related_person_name` CONTAINS "Kelvin Teo" OR `related_person_id` = [Kelvin's record]

**Returns:** All people who have Kelvin in their network

### Find all former colleagues

**Filter:** `relationship_type` = "former_colleague"

**Returns:** All former colleague relationships across all founders

### Find all Funding Societies connections

**Filter:** `relationship_context` CONTAINS "Funding Societies"

**Returns:** All relationships with Funding Societies context

---

## Data Quality Guidelines

### Source Verification

Every relationship MUST have a `source_url` that shows:
- Direct mention of both people
- Clear indication of their connection
- Public and accessible content

**Valid sources:**
- LinkedIn posts with tags
- Company "Our Team" pages with bios
- Podcast transcripts with guest mentions
- News articles with quotes

**Invalid sources:**
- Inference from overlapping tenure
- Assumptions based on job titles
- Third-party speculation

### "Direct Mentions Only" Principle

Only record relationships where:
1. Person A explicitly mentions Person B by name
2. Person A and Person B are tagged together in a post
3. A company page describes their working relationship
4. A podcast/interview features them discussing their connection

**Do NOT record if:**
- They worked at the same company but never mentioned each other
- You assume they know each other based on roles
- A third party speculates about their relationship

---

## Maintenance

### Regular Updates

- **Quarterly:** Review and update founder profiles with new achievements
- **When funding news breaks:** Add new founders and their networks
- **When people change roles:** Update `role` and `tia_company_slug` fields

### Data Cleanup

- Remove duplicate relationships
- Verify source URLs are still accessible
- Update `related_person_current_company` when people change jobs

---

## API Access

### Airtable API Credentials

- **Base ID:** `appt8YGOz5bOK6RpR`
- **API Key:** Stored in environment variables (not in repo)

### Example API Call (Python)

```python
from airtable import Airtable

base_id = 'appt8YGOz5bOK6RpR'
api_key = os.environ['AIRTABLE_API_KEY']

# Get all founders
people = Airtable(base_id, 'people_companies', api_key)
founders = people.get_all(formula="is_founder=TRUE()")

# Get relationships for a specific founder
relationships = Airtable(base_id, 'people_relationships', api_key)
mao_connections = relationships.get_all(formula="person_id='recMJxKQ2Vg3wJ4Q6'")
```

---

## Version History

- **v0.1.0** (2026-01-14): Initial schema design with 2 tables
  - Added `people_companies` table with 11 fields
  - Added `people_relationships` table with 13 fields
  - Implemented bidirectional relationship links
  - Added timestamp and accountability fields

---

**Last Updated:** January 14, 2026  
**Maintained by:** Tech in Asia Data Team
