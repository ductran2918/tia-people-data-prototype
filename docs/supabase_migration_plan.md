# Database Migration Assessment Plan

**Date Created**: 2026-01-21
**Status**: Under Consideration
**Priority**: Future Implementation

---

## Executive Summary

This document provides a comprehensive analysis and recommendation for migrating the TIA People Data Prototype from **Airtable** to **Supabase PostgreSQL** to support the project's evolution from prototype to production-ready external product.

**TL;DR Recommendation**: ✅ **Migrate to Supabase PostgreSQL** (~1.5 weeks effort) to avoid costly future migration when scaling to external users and 10K+ records.

---

## Current State Analysis

### Existing Database Architecture
Based on codebase exploration, the project currently uses:

**Primary Database: Airtable**
- Base: `tia_people_relationship_project` (ID: `appt8YGOz5bOK6RpR`)
- 3 Tables:
  - `companies` - Company reference data
  - `people_companies` - Founder profiles (11 fields)
  - `people_relationships` - Professional connections (10 fields)
- Authentication: Bearer token API access
- Schema Version: v2.1

### Current Tool Dependencies on Airtable

**Newsletter Export Tool** (`tools/newsletter-export-tool/`)
- **Critical dependency**: Requires Airtable API for all operations
- **API Calls**:
  1. Fetches all companies on load
  2. Filters founders by company slug + `is_founder=TRUE` flag
  3. Fetches relationship records using OR formula with multiple record IDs
  4. Fetches individual person details by record ID
- **Data Flow**: Companies → Founders → Relationships → Person Details → Company Enrichment
- **Features dependent on Airtable structure**:
  - Company autocomplete search (uses `company_slug` matching)
  - Bidirectional relationship mapping (uses linked record fields)
  - Rich HTML generation with LinkedIn links and source URLs

**Research Input Tool** (`tools/research-input-tool/`)
- **No Airtable dependency**: Generates markdown search strategies
- Prepares data for manual research (later entered into Airtable)

### Key Airtable Schema Patterns Used

1. **Company Slug Matching**: Exact match between `company_slug` (companies) and `current_company_slug` (people_companies)
2. **Bidirectional Linked Records**: `outgoing_relationships` & `incoming_relationships` auto-populated by Airtable
3. **Linked Record Fields**: `person_id` and `related_person_id` in relationships table
4. **Boolean Filtering**: `is_founder` checkbox field with `TRUE()` formula
5. **Record ID Lookups**: Uses `RECORD_ID()` for individual record queries

### Files Using Airtable API
- `tools/newsletter-export-tool/script.js:657-675` - Main API utility
- `tools/newsletter-export-tool/script.js:194` - Companies fetch
- `tools/newsletter-export-tool/script.js:248-250` - Founders fetch
- `tools/newsletter-export-tool/script.js:320-322` - Person details fetch
- `tools/newsletter-export-tool/script.js:396-425` - Relationships fetch
- `tools/newsletter-export-tool/config.js` - API credentials (gitignored)

---

## User Requirements (Clarified)

### Current Situation
- ✅ **Existing Redshift database** with data related to this founder/people project
- ✅ **Working Airtable prototype** with 3 tables and 2 production tools
- ✅ **Exploring options** for scalable production database
- ✅ **Goal**: Build once with the right architecture (avoid rebuilding later)

### Future Vision (6-12 months)
- 🎯 **Product for external users** (not just internal tool)
- 🎯 **High data volume**: Expecting 10,000+ records
- 🎯 **API/programmatic access** needed for integrations
- 🎯 **Airtable UI**: Nice to have but not essential (can build custom UI)

### Key Constraint
**"Don't want to build a new database from scratch after working on Airtable"**
→ Need production-ready database NOW to avoid future migration

---

## Database Options Analysis

### Option 1: Supabase PostgreSQL ✅ RECOMMENDED

**Why Supabase?**
- ✅ **Production-grade**: Built for customer-facing products with external users
- ✅ **Auto-generated REST API + GraphQL**: Similar developer experience to Airtable API
- ✅ **Built-in authentication**: Row-level security (RLS) for multi-tenant data
- ✅ **Scalable**: Handles millions of records, 10K+ easily
- ✅ **Cost-effective**: Generous free tier ($0-25/month to start), scales reasonably (~$25/month for 10GB + 2M API requests)
- ✅ **Redshift integration**: Can sync data bidirectionally via ETL tools (Airbyte, Fivetran) or foreign data wrappers
- ✅ **Modern tooling**: TypeScript client, real-time subscriptions, database webhooks
- ✅ **Admin UI**: Supabase Studio for manual data entry (similar to Airtable's interface)
- ✅ **PostgreSQL features**: Foreign keys, complex queries, JSON columns, full-text search, indexes

**Redshift Integration Strategy**:
- **Option A (Recommended)**: Supabase as primary → Sync to Redshift for analytics (ETL pipeline)
- **Option B**: Bidirectional sync if Redshift already has source-of-truth data
- **Option C**: PostgreSQL Foreign Data Wrappers to query Redshift from Supabase (read-only)

**Migration Complexity**: Medium
- Schema mapping straightforward (PostgreSQL supports relational model better than Airtable)
- One-time data export from Airtable → Supabase
- Refactor Newsletter Export Tool to use Supabase client library (~2-3 days work)
- Linked records become foreign key constraints (cleaner model)

---

### Option 2: Keep Airtable + Integrate with Redshift ❌ NOT RECOMMENDED

**Why NOT Airtable?**
- ❌ **Not built for production products**: Designed for internal teams, not external users
- ❌ **API rate limits**: 5 requests/second per base (will hit limits with external users)
- ❌ **Expensive at scale**: $20/user/month × 10 researchers = $200/month PLUS overage costs
- ❌ **No native authentication**: Can't give external users direct access with row-level security
- ❌ **Hard to integrate with Redshift**: No native sync, would need custom ETL scripts
- ❌ **Limited query capabilities**: Can't do complex JOINs, aggregations efficiently via API
- ❌ **Vendor lock-in**: Proprietary API, hard to migrate later

**When to use Airtable**:
- Internal tools with <10 users
- Rapid prototyping (which you've already completed)
- Non-technical teams who need no-code interface

---

### Option 3: Use Redshift directly ❌ NOT RECOMMENDED

**Why NOT Redshift?**
- ❌ **Wrong use case**: Redshift is a data warehouse for analytics (OLAP), not transactional workloads (OLTP)
- ❌ **Expensive for transactional queries**: Optimized for scanning millions of rows, slow for single-row lookups
- ❌ **No built-in API**: Would need to build REST API layer from scratch (Express.js + pg driver)
- ❌ **No authentication system**: Need to build auth, permissions, RLS manually
- ❌ **Overkill**: Designed for petabyte-scale analytics, not 10K-record apps

**When to use Redshift**:
- Analytics queries across millions/billions of records
- Data warehouse for BI tools (Tableau, Looker)
- As a **secondary** database for analytics (sync from Supabase)

---

## Recommended Architecture

### Primary Database: Supabase PostgreSQL
```
┌─────────────────────────────────────────────────┐
│         SUPABASE POSTGRESQL (Primary)           │
│                                                 │
│  Tables:                                        │
│  ├── companies (reference data)                │
│  ├── people_companies (founder profiles)       │
│  └── people_relationships (connections)        │
│                                                 │
│  Features:                                      │
│  ├── Auto-generated REST API                   │
│  ├── Row-Level Security (RLS)                  │
│  ├── Built-in Auth (external users)            │
│  └── Supabase Studio (admin UI)                │
└─────────────────────────────────────────────────┘
           │                           │
           │ (ETL Sync)               │ (API Access)
           ↓                           ↓
  ┌─────────────────┐       ┌──────────────────────┐
  │    REDSHIFT     │       │   NEWSLETTER TOOL    │
  │  (Analytics)    │       │  (Refactored for     │
  │                 │       │   Supabase API)      │
  └─────────────────┘       └──────────────────────┘
```

### Data Flow
1. **Manual data entry** → Supabase (via Supabase Studio or custom UI)
2. **Newsletter tool** → Queries Supabase API (replaces Airtable API calls)
3. **Analytics** → Daily ETL sync from Supabase → Redshift
4. **External users** → Query Supabase via REST API with auth tokens

---

## Migration Plan Overview

### Phase 1: Supabase Setup (Week 1)
<!-- Set up PostgreSQL database and configure authentication -->
1. Create Supabase project and PostgreSQL database
2. Design schema matching Airtable structure:
   - `companies` table with proper indexes
   - `people_companies` table with foreign keys
   - `people_relationships` table with bidirectional foreign keys
3. Set up Row-Level Security (RLS) policies for future multi-tenant access
4. Configure API authentication

### Phase 2: Data Migration (Week 1-2)
<!-- Export from Airtable and import to Supabase -->
1. Export data from Airtable to CSV/JSON
2. Transform linked records → foreign key IDs
3. Import to Supabase PostgreSQL via SQL scripts or Supabase Studio
4. Validate data integrity (relationship counts, null checks)
5. Keep Airtable as backup during transition

### Phase 3: Tool Refactoring (Week 2-3)
<!-- Refactor Newsletter Export Tool to use Supabase client library -->
1. Replace Airtable API calls with Supabase client library in Newsletter Export Tool
   - Company autocomplete: `supabase.from('companies').select('*')`
   - Founders by company: `supabase.from('people_companies').select('*, companies(*)').eq('current_company_slug', slug)`
   - Relationships: `supabase.from('people_relationships').select('*, person:person_id(*), related:related_person_id(*)')`
2. Update authentication to use Supabase API keys
3. Test all features end-to-end
4. Update documentation

### Phase 4: Redshift Integration (Week 4+, Optional)
<!-- Set up ETL pipeline to sync data to Redshift for analytics -->
1. Set up ETL pipeline (Airbyte/Fivetran or custom Python script)
2. Schedule daily sync: Supabase → Redshift
3. Create Redshift views for analytics queries
4. Connect BI tools to Redshift

---

## Critical Files to Modify

### Database Connection Layer
- `tools/newsletter-export-tool/script.js:657-675` - Replace `airtableRequest()` with `supabaseRequest()`
- `tools/newsletter-export-tool/config.js` - Replace Airtable credentials with Supabase URL + anon key
- `tools/newsletter-export-tool/config.template.js` - Update template

### API Call Sites (Newsletter Export Tool)
- `script.js:194` - Companies fetch (change to Supabase syntax)
- `script.js:248-250` - Founders query (change filter syntax from Airtable formula → Supabase `.eq()`)
- `script.js:320-322` - Person details (change to Supabase `.select()`)
- `script.js:396-425` - Relationships fetch (change to Supabase `.in()` with array)
- `script.js:429-455` - Bidirectional relationship logic (can be simplified with Supabase's JOIN syntax)

### Documentation Updates
- `README.md` - Update "Database" section
- `docs/weekly_updates/` - Document migration
- `.brv/context-tree/structure/database/` - Create `supabase_schema.md`

---

## Effort Estimation

### Development Time
- **Supabase setup + schema**: 1-2 days
- **Data migration script**: 1 day
- **Newsletter tool refactor**: 2-3 days
- **Testing + validation**: 1 day
- **Documentation**: 0.5 days
- **Total**: ~1.5 weeks

### Risk Assessment
- **Low risk**: Schema is simple, tools are internal-only (no production downtime)
- **Rollback plan**: Keep Airtable running in parallel during transition
- **Data validation**: Can compare Airtable vs Supabase counts before switching

---

## Benefits Summary

### Why Supabase over staying with Airtable:
1. **Future-proof**: Won't need to migrate again when building external product
2. **Cost**: ~$25/month vs $200+/month for Airtable at scale
3. **Performance**: Can handle 10K+ records with complex queries
4. **External users**: Built-in auth + RLS for customer-facing features
5. **Redshift integration**: Easier to sync for analytics
6. **Developer experience**: Modern tooling, TypeScript support
7. **No vendor lock-in**: Standard PostgreSQL, can migrate anywhere

### Why Supabase over Redshift:
1. **Right tool for the job**: OLTP (transactional) not OLAP (analytics)
2. **Cost**: $25/month vs $180+/month minimum for Redshift
3. **Performance**: Faster for row-level queries
4. **Built-in features**: API, auth, storage, edge functions
5. **Easier development**: No need to build API layer from scratch

---

## Recommendation

✅ **Migrate from Airtable to Supabase PostgreSQL NOW**

**Reasoning**:
- You're at the perfect inflection point (prototype validated, before scaling)
- Migration cost is ~1.5 weeks now vs 2-3 months if you wait until after building product features
- Supabase gives you production-grade foundation for external product
- Can integrate with Redshift via ETL for analytics needs
- Avoids "building twice" problem you want to prevent

**Next Steps**:
1. Approve this plan
2. Create Supabase account and project
3. Begin schema design matching Airtable structure
4. Export Airtable data for migration
5. Refactor Newsletter Export Tool to use Supabase client

---

## Alternative: Hybrid Approach (If you want to keep Airtable short-term)

If you want to delay migration:
1. Keep Airtable for manual data entry (researchers love the UI)
2. Set up Supabase as read-replica (sync Airtable → Supabase via webhook/cron)
3. Newsletter tool queries Supabase (better performance)
4. Later: Switch data entry from Airtable → Supabase Studio

This adds complexity but preserves familiar UI during transition.

---

## Verification Plan

### After Supabase Setup
1. **Schema validation**:
   ```sql
   -- Verify tables exist
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public';

   -- Check foreign key constraints
   SELECT * FROM information_schema.table_constraints
   WHERE constraint_type = 'FOREIGN KEY';
   ```

2. **API access test**:
   ```javascript
   // Test basic query
   const { data, error } = await supabase
     .from('companies')
     .select('*')
     .limit(5);
   console.log('Companies:', data);
   ```

### After Data Migration
1. **Record count validation**:
   ```sql
   -- Compare counts with Airtable
   SELECT
     (SELECT COUNT(*) FROM companies) as companies_count,
     (SELECT COUNT(*) FROM people_companies) as people_count,
     (SELECT COUNT(*) FROM people_relationships) as relationships_count;
   ```

2. **Relationship integrity check**:
   ```sql
   -- Verify all foreign keys resolve
   SELECT COUNT(*) FROM people_relationships pr
   WHERE NOT EXISTS (
     SELECT 1 FROM people_companies pc
     WHERE pc.id = pr.person_id
   );
   -- Should return 0
   ```

3. **Data sampling**:
   - Export 10 random founders from Airtable
   - Query same founders from Supabase
   - Compare all fields match

### After Tool Refactoring
1. **Newsletter Export Tool end-to-end test**:
   - Open `tools/newsletter-export-tool/index.html`
   - Search for a company (e.g., "RealVantage")
   - Verify company autocomplete shows all companies
   - Select company → Verify founders load correctly
   - Generate preview → Verify all relationships display with correct names, companies, context
   - Download HTML → Verify output matches previous Airtable-generated newsletters

2. **Feature parity checklist**:
   - [ ] Company autocomplete search works
   - [ ] Founders filtered by selected company
   - [ ] Relationships load bidirectionally
   - [ ] Connected person details include name, role, company
   - [ ] LinkedIn URLs are clickable
   - [ ] Source attribution links work
   - [ ] Rich text formatting (bold/italic) preserved
   - [ ] HTML export downloads correctly

3. **Performance testing**:
   - Measure API response times (should be <500ms for typical queries)
   - Test with 100+ companies in autocomplete
   - Test founder with 20+ relationships

### Redshift Integration (Optional Phase 4)
1. **ETL validation**:
   - Verify row counts match between Supabase and Redshift
   - Check data freshness (sync delay should be <24 hours)
   - Test sample queries in Redshift

---

## Success Criteria

Migration is complete when:
- ✅ All Airtable data successfully imported to Supabase with no data loss
- ✅ Newsletter Export Tool generates identical HTML output to Airtable version
- ✅ No references to Airtable API remain in codebase
- ✅ Documentation updated with Supabase setup instructions
- ✅ Weekly update published documenting the migration
