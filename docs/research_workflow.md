# Research Workflow

**Purpose:** Step-by-step process for identifying "door openers" to tech founders.

**Core Principle:** Direct mentions only - relationships must be publicly acknowledged, not inferred.

---

## Overview

**Goal:** Find people who can provide warm introductions to target founders.

**Two-Tier Approach:**
- **Tier 1:** Hidden connections (direct mentions with specific context) - High value, high effort
- **Tier 2:** Official connections (investors, board members, advisors) - Medium value, low effort

**Time Budget:** 1.5-2 hours per founder (manual workflow)

---

## Step 1: Profile Selection

**Target founders:**
- Co-founders or C-suite of startups
- Recently raised funding (Series A-C preferred)
- Active in Southeast Asia tech ecosystem
- Active LinkedIn presence (posted in last 6 months)

**Required information:**
- Full name
- LinkedIn profile URL
- Company name and slug (for Tech in Asia database)
- Current role/title

---

## Step 2: Tier 1 Research (Direct Mentions)

**Time budget:** 45-60 minutes

### 2.1 LinkedIn Posts Analysis

**What to look for:**
- Posts where founder @tags specific people
- Posts mentioning people by name with context
- Posts about shared experiences or achievements

**Quality criteria:**

✅ **INCLUDE:**
- "Thanks to @PersonName for helping us close our first customer"
- "Grateful to work with @PersonName on building this product"
- "Learned so much from @PersonName during our time at CompanyX"
- Posts with specific shared projects, experiences, or history

❌ **EXCLUDE:**
- "Congrats @PersonName on your funding!" (too generic)
- "Great post @PersonName!" (no context)
- "Thanks everyone for the support!" (not specific)

---

### 2.2 LinkedIn Comments Analysis

**What to look for:**

**Comments BY founder:**
- On other people's posts
- Mentioning shared history or experiences
- Showing depth of relationship

**Comments TO founder:**
- On founder's posts
- From people referencing shared work/experiences
- Showing they know each other personally

**Quality criteria:**

✅ **INCLUDE:**
- "Remember when we built the credit scoring system together at CompanyX in 2018"
- "Our time at Y Combinator together was transformative"
- "You helped me close my first customer when I was starting out"
- "I remember the early days at [company], I also received a lot of support from [founder]"

❌ **EXCLUDE:**
- "Congrats on the funding!" (generic)
- "Great achievement!" (no context)
- "Thanks for sharing" (surface-level)

---

### 2.3 Photo Analysis

**What to look for:**
- Small group photos (2-8 people)
- Photos with clear context in caption
- Team photos, award ceremonies, dinners

**Quality criteria:**

✅ **INCLUDE:**
- Team photos with caption "Our founding team at RealVantage"
- Award ceremony photos "Receiving the Startup of the Year award with @PersonName"
- Small dinner photos "Great catching up with @PersonName and @PersonName2"
- Conference photos with specific context "Panel discussion on fintech with @PersonName"

❌ **EXCLUDE:**
- Large conference photos (10+ people, no specific context)
- Generic group shots without captions
- Photos where people aren't tagged or named

**Context matters more than size:** An 8-person team photo is stronger than a 4-person random conference photo.

---

### 2.4 Events & Podcasts

**What to look for:**
- Podcast appearances (as guest)
- Panel discussions
- Conference talks
- Interviews

**Quality criteria:**

✅ **INCLUDE:**
- **Host-guest relationships** (host likely has direct contact with guest)
- **2-3 person podcasts** where guests reference each other
- **Joint interviews** about their collaboration
- **Panels where speakers reference each other's work** during discussion

❌ **EXCLUDE:**
- Large conference panels (5+ speakers, no cross-references)
- Events where they're both attendees but no interaction
- Co-guests at large events who don't reference each other

**Why host-guest counts:** Hosts typically prepare for interviews and have direct contact with guests, making it a stronger relationship signal.

---

## Step 3: Tier 2 Research (Documented Relationships)

**Time budget:** 15-20 minutes

### 3.1 Company Pages

**What to scrape:**
- Team/About page → Co-founders, executives, advisors
- Board page → Board members
- Investors page → Investor firms and partners

**Sources:**
- Company website
- LinkedIn company page
- Crunchbase profile

---

### 3.2 Funding Announcements

**What to look for:**
- Press releases about funding rounds
- Tech in Asia articles about the company
- Investor quotes mentioning specific partners

**Extract:**
- Lead investor firm and partner name
- Participating investors
- Board seats from funding rounds

---

### 3.3 External Databases

**Crunchbase:**
- Funding history
- Investor list
- Board members

**Tech in Asia database:**
- Company profile
- Related articles
- Founder interviews

---

## Step 4: Relationship Validation

**Time budget:** 15-20 minutes

**For each potential connection, verify:**

### 4.1 Person is Reachable

✅ **Active LinkedIn profile:**
- Last post/activity within 6 months
- 100+ connections
- Complete profile (photo, bio, current role)

❌ **Skip if:**
- No LinkedIn activity in 6+ months
- <100 connections (likely inactive)
- Incomplete profile or private account

---

### 4.2 Relationship is Verifiable

✅ **Valid source:**
- Source URL is accessible
- Source clearly shows both people
- Source indicates their connection

❌ **Skip if:**
- Source URL is broken
- Source doesn't mention both people
- Source is too vague or generic

---

### 4.3 Context is Specific

✅ **Specific context:**
- References shared work, projects, or experiences
- Mentions specific companies, dates, or outcomes
- Shows depth of relationship

❌ **Generic context:**
- "Thank you for the support"
- "Great to connect"
- No details about how they know each other

---

### 4.4 Relationship is Relevant

✅ **Useful for warm intros:**
- C-level, VP+, Board member, or Investor
- Currently active in tech/business
- Publicly accessible

❌ **Less useful:**
- Junior employees (unless explicitly credited)
- People outside tech/business context
- No clear path to reach them

---

## Step 5: Data Entry (Airtable)

**Time budget:** 20-25 minutes

### 5.1 Create Person Profiles

**For founder and each validated connection:**

1. Check if person already exists in `people_companies` table
2. If not, create new record:
   - `linkedin_url` (required)
   - `name` (required)
   - `role` (required)
   - `current_company_slug` (if applicable)
   - `is_founder` (check if they're a founder)

---

### 5.2 Create Relationships

**For each validated connection:**

1. Open `people_relationships` table
2. Create new record:
   - `person_id`: Select founder from dropdown
   - `related_person_id`: Select connection from dropdown
   - `relationship_type`: Choose from dropdown (former_colleague, cofounder, investor-investee, classmate, other)
   - `relationship_context`: Write narrative (see format below)
   - `source_url`: Paste verification link

---

### 5.3 Relationship Context Format

**Write a narrative that explains:**
1. Where they worked/studied together
2. What they built/achieved together
3. How long they collaborated
4. Any notable outcomes

**Example:**
```
Worked together at Funding Societies 2016-2019 where Mao was CTO and Andy 
was a senior engineer. They collaborated on building the AI credit scoring 
system that enabled USD 2 billion+ in loans. Andy is now Chief Architect at 
RealVantage, brought over by Mao.
```

**Template:**
```
[Relationship type] at [Company/Institution] [Time period]. [Founder] was 
[Role] and [Connection] was [Role]. [What they did together]. [Current status 
or outcome].
```

---

## Step 6: Quality Check

**Time budget:** 5-10 minutes

**Review checklist:**

- [ ] All relationships have specific context (not generic)
- [ ] All source URLs are accessible and relevant
- [ ] All related persons have active, reachable profiles
- [ ] Relationship types are correctly categorized
- [ ] No duplicate relationships
- [ ] Both Tier 1 and Tier 2 relationships are captured

**Quality standards:**
- Each founder should have 5-10 Tier 1 relationships (if available)
- Tier 2 relationships should include all investors and board members
- No generic "thank you" or "congrats" relationships
- All contexts are specific and verifiable

---

## Total Time Budget

**Manual workflow:**
- Tier 1 research: 45-60 minutes
- Tier 2 research: 15-20 minutes
- Validation: 15-20 minutes
- Data entry: 20-25 minutes
- Quality check: 5-10 minutes
- **Total: 1.5-2 hours per founder**

**If exceeding 2 hours:**
- Founder may not have enough public information
- Consider skipping or flagging for later
- Focus on founders with active LinkedIn presence

---

## Research Tips

### Finding Hidden Connections

**LinkedIn search operators:**
- Search founder's posts: `from:[founder-name]`
- Search mentions: `@[founder-name]`
- Filter by date: Use LinkedIn's date filters for recent activity

**Podcast discovery:**
- Search Google: `"[founder name]" podcast`
- Check company blog for media appearances
- Search YouTube for interviews

**Company page tips:**
- Check "About" page for team bios
- Look for "Advisors" or "Board" sections
- Read founder bios for mentions of mentors/partners

---

### Handling Edge Cases

**Co-founders:**
- Always include as Tier 2 relationships
- Check if they have public interactions (Tier 1)
- Both should be profiles in database

**Investors:**
- Include lead investors and board members
- Skip generic "participated in round" without names
- Try to find specific partner names, not just firm names

**Past relationships:**
- Include even if old (5-10 years ago)
- Note: Past relationships are valuable and hard to find
- Recency doesn't matter as much as depth

**Ambiguous relationships:**
- When in doubt, flag for review
- Better to include with note than to skip
- Can always remove later if not useful

---

## Quality Over Quantity

**Prefer:**
- 5 high-quality relationships with specific context
- Over 20 generic "worked together" relationships

**Focus on:**
- Relationships with clear narratives
- Connections that show depth (multi-year, significant projects)
- People who are currently reachable and active

**Skip:**
- Generic LinkedIn engagement
- Inferred relationships without direct mentions
- Inactive or unreachable people

---

## Next Steps

**After researching 10-20 founders:**
1. Review patterns (which sources are most valuable?)
2. Refine criteria based on learnings
3. Test data with real users (recruiters/sales team)
4. Document insights in `research_log.md`

**After researching 30-50 founders:**
1. Evaluate if automation is needed
2. Review `automation_blueprint.md` if scaling
3. Consider hiring developer or using existing tools

---

## Related Documents

- `manual_workflow.md` - How to use Manus for research
- `automation_blueprint.md` - Technical spec for automation
- `database_structure.md` - Airtable schema reference
- `research_log.md` - Findings from founder research

---

**Last Updated:** 2026-01-16  
**Validated on:** Mao Ching Foo, Keith Ong (RealVantage)  
**Core Principle:** Direct mentions only - no inferred relationships
