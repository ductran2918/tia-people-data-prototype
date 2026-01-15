# Airtable Workflow

**Purpose:** How to sync schema changes and query data without screenshots.

---

## Quick Reference

**Base ID:** `appt8YGOz5bOK6RpR`  
**Base Name:** `tia_people_relationship_project`

**Tables:**
- `people_companies` → `tbl2GFODrbUmOjJUY`
- `people_relationships` → `tblBUetr6XUt7lZhl`

---

## Standard Operations

### 1. Check Current Schema

```bash
# Get detailed table structure
manus-mcp-cli tool call describe_table --server airtable \
  --input '{"baseId": "appt8YGOz5bOK6RpR", "tableId": "tbl2GFODrbUmOjJUY"}'
```

### 2. List All Records

```bash
# Get up to 100 records
manus-mcp-cli tool call list_records --server airtable \
  --input '{"baseId": "appt8YGOz5bOK6RpR", "tableId": "tbl2GFODrbUmOjJUY", "maxRecords": 100}'
```

### 3. Search for Specific Person

```bash
# Search by name or company
manus-mcp-cli tool call search_records --server airtable \
  --input '{"baseId": "appt8YGOz5bOK6RpR", "tableId": "tbl2GFODrbUmOjJUY", "searchTerm": "RealVantage"}'
```

### 4. Get Specific Record

```bash
# Fetch by record ID
manus-mcp-cli tool call get_record --server airtable \
  --input '{"baseId": "appt8YGOz5bOK6RpR", "tableId": "tbl2GFODrbUmOjJUY", "recordId": "recMJxKQ2Vg3wJ4Q6"}'
```

---

## When Schema Changes

**New workflow (no screenshots needed):**

1. **User mentions change** → AI immediately queries live database
2. **AI verifies change** → Compares with `database_structure.md`
3. **AI updates docs** → Commits to GitHub with change summary
4. **AI confirms** → Shows before/after comparison

**Example:**
```
User: "I renamed people_relationships to incoming_relationships"
AI: [Queries Airtable] → [Sees new field name] → [Updates docs] → "Confirmed and updated!"
```

---

## Data Quality Checks

### Count Records by Type

```bash
# Filter founders only
manus-mcp-cli tool call list_records --server airtable \
  --input '{"baseId": "appt8YGOz5bOK6RpR", "tableId": "tbl2GFODrbUmOjJUY", "filterByFormula": "{is_founder} = TRUE()"}'
```

### Find Empty Fields

```bash
# Records missing company slug
manus-mcp-cli tool call list_records --server airtable \
  --input '{"baseId": "appt8YGOz5bOK6RpR", "tableId": "tbl2GFODrbUmOjJUY", "filterByFormula": "{current_company_slug} = BLANK()"}'
```

---

## Creating Records

### Add New Person

```bash
manus-mcp-cli tool call create_record --server airtable \
  --input '{
    "baseId": "appt8YGOz5bOK6RpR",
    "tableId": "tbl2GFODrbUmOjJUY",
    "fields": {
      "linkedin_url": "https://www.linkedin.com/in/example/",
      "name": "Jane Doe",
      "role": "Co-founder & CEO",
      "current_company_slug": "example-startup",
      "is_founder": true
    }
  }'
```

### Add Relationship

```bash
manus-mcp-cli tool call create_record --server airtable \
  --input '{
    "baseId": "appt8YGOz5bOK6RpR",
    "tableId": "tblBUetr6XUt7lZhl",
    "fields": {
      "person_id": ["recMJxKQ2Vg3wJ4Q6"],
      "related_person_id": ["recATfLVDeirQhQXQ"],
      "relationship_type": "former_colleague",
      "relationship_context": "Worked together at Goldman Sachs 2015-2018",
      "source_url": "https://www.linkedin.com/in/example/details/experience/"
    }
  }'
```

---

## Best Practices

**Always query Airtable first when user mentions:**
- Schema changes
- Field renames
- New records added
- Data questions

**Only ask for screenshots when:**
- Visual layout matters
- Debugging UI-specific issues
- User explicitly shares one

**After querying, always:**
- Save findings to text files
- Update GitHub docs if schema changed
- Confirm changes with user

---

## Troubleshooting

### Error: "Invalid permissions"
- Verify `baseId` and `tableId` are correct
- Run `list_bases` and `list_tables` to confirm IDs

### Error: "Field not found"
- Run `describe_table` to see current field names
- Check if field was renamed recently

### Empty results
- Check `filterByFormula` syntax
- Try without filters first
- Verify records exist in Airtable UI

---

**Last Updated:** 2026-01-15  
**Source:** Diagnostic testing confirmed MCP works perfectly
