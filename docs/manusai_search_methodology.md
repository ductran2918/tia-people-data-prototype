# Manus AI Search Methodology

**Purpose:** Complete documentation of the search strategy used to discover founder relationships, enabling reproduction with other AI tools or manual processes.

**Last Updated:** 2026-01-16  
**Use Case:** Finding Tier 1 (direct mentions) and Tier 2 (documented) relationships for startup founders

---

## Overview

This document reveals the exact search strategy, queries, and reasoning used to find sources containing founder relationship data. Use this to build your own automated system or train team members for manual research.

---

## Input Requirements

**Minimum needed to start:**
- Founder name
- Company name
- Founder LinkedIn URL (or raw LinkedIn data)

**Recommended for better results:**
- Company website
- Founder role/title
- Co-founder names
- Recent company events (funding, launches)
- Search focus (specific industries or connections to prioritize)

---

## Research Process: 5 Phases

### Phase 1: Profile Discovery
**Goal:** Understand the person's background to build targeted search queries

**What to extract:**
- Education history (schools → classmate connections)
- Work history (companies → colleague connections)
- Location (regional network)
- Industry (peer connections)

**Search queries:**
```
"[Founder Name]" "[Company Name]" LinkedIn
"[Founder Name]" education
"[Founder Name]" Harvard OR Stanford OR MIT OR NUS OR NTU
```

**Tools:** Google search, LinkedIn profile

**Output:** Build a keyword map for targeted searching

---

### Phase 2: Keyword Map Construction

Based on profile discovery, create a comprehensive keyword map:

**Person keywords:**
- Full name: "Kelvin Teo"
- LinkedIn handle: "tkelvin"
- Variations: "K Teo", "Kelvin T."

**Company keywords:**
- Official name: "Funding Societies"
- Alternative names: "Modalku", "FS Modalku"
- Domain: "fundingsocieties.com"

**Industry keywords:**
- Sector: "P2P lending", "fintech", "SME financing"
- Related terms: "peer-to-peer", "alternative finance"

**Education keywords:**
- Schools attended: "Harvard Business School", "HBS"
- Specific details: "Section A 2012", "MBA 2012"

**Previous company keywords:**
- Past employers: "Goldman Sachs", "McKinsey"
- Departments: "trading desk", "investment banking"

**Co-founder keywords:**
- Names: "Reynold Wijaya"
- Combinations: "Kelvin and Reynold", "Reynold and Kelvin"

**Investor keywords:**
- Known investors: "Sequoia", "SoftBank", "Alpha JWC"
- Partner names: "Shailendra Singh"

**Location keywords:**
- Base: "Singapore", "Southeast Asia"
- Expansion: "Indonesia", "Malaysia", "Thailand"

**This keyword map guides all subsequent searches.**

---

## Phase 3: Tier 1 Source Discovery (Direct Mentions)

### 3.1 LinkedIn Posts BY Founder

**Objective:** Find posts where founder mentions or tags other people

**Search queries:**
```
site:linkedin.com/in/[handle]/ 
site:linkedin.com "[Founder Name]" "[Company Name]"
"[Founder Name]" linkedin post
```

**What to look for:**
- Posts with @mentions (tagged people)
- Posts about milestones (funding, awards, hiring)
- Posts with photos (team events, dinners, conferences)
- Posts containing keywords: "co-founder", "team", "advisor", "investor", "mentor"

**Tools:**
- Google with `site:` operator
- LinkedIn search (if direct access available)

**Expected output:** 5-15 posts with relationship mentions

---

### 3.2 LinkedIn Posts TAGGING Founder

**Objective:** Find posts by others mentioning the founder

**Search queries:**
```
site:linkedin.com "@[Founder Name]" OR "[Founder Name]"
"congratulations [Founder Name]"
"thanks [Founder Name]"
"grateful to [Founder Name]"
```

**What to look for:**
- Posts by others tagging the founder
- Thank you posts (indicates founder helped them)
- Celebration posts (indicates relationship depth)
- Comments with context (not just "congrats")

**Expected output:** 3-10 posts from others

---

### 3.3 LinkedIn Comments

**Objective:** Find comments BY founder on others' posts, or comments TO founder

**Search queries:**
```
site:linkedin.com "[Founder Name]" commented
"[Founder Name]" "commented on this"
```

**What to look for:**
- Comments referencing shared history
- Comments mentioning specific projects or experiences
- Multi-paragraph comments (more likely to contain context)

**Note:** This is harder to search systematically; often requires browsing LinkedIn directly

**Expected output:** 2-8 meaningful comment threads

---

### 3.4 Podcast Appearances

**Objective:** Find audio/video interviews where founder discusses relationships

**Search queries:**
```
"[Founder Name]" podcast
"[Founder Name]" interview audio
"[Company Name]" founder podcast
site:youtube.com "[Founder Name]" interview
site:spotify.com "[Founder Name]"
"[Founder Name]" "Tech in Asia" podcast
"[Founder Name]" "e27" podcast
```

**What to look for:**
- Solo interviews (host-guest relationship)
- Joint interviews with co-founder (their dynamic, how they met)
- Panel discussions (co-panelists if they reference each other)
- Mentions of mentors, advisors, investors during conversation

**Tools:**
- Google search
- YouTube search
- Spotify search
- Apple Podcasts, Google Podcasts

**Expected output:** 2-8 podcast appearances

---

### 3.5 Articles & Written Interviews

**Objective:** Find written content with direct quotes mentioning relationships

**Search queries:**
```
"[Founder Name]" interview
"[Founder Name]" "[Company Name]" TechCrunch OR "Tech in Asia" OR e27
"[Founder Name]" profile
"[Founder Name]" founder story
"[Founder Name]" Q&A OR "Q and A"
```

**What to look for:**
- Direct quotes: "We worked with...", "I learned from..."
- Photos with captions naming people
- Mentions of co-founders, mentors, investors
- Origin stories (how the company started, who was involved)

**Tools:**
- Google News search
- Tech in Asia database
- TechCrunch, e27, DealStreetAsia, KrAsia

**Expected output:** 5-12 articles

---

### 3.6 Conference & Event Appearances

**Objective:** Find speaking engagements and event participation

**Search queries:**
```
"[Founder Name]" conference OR event OR panel
"[Founder Name]" speaker
"[Founder Name]" keynote
"[Founder Name]" "Web Summit" OR "TechCrunch Disrupt" OR "Echelon" OR "RISE"
site:youtube.com "[Founder Name]" panel
```

**What to look for:**
- Panel discussions (who else was on the panel?)
- Keynote speeches (who introduced the founder?)
- Fireside chats (who was the interviewer?)
- Event photos (who else attended?)
- Moderator-speaker relationships

**Expected output:** 3-8 event appearances

---

### 3.7 Co-founder Cross-Reference

**Objective:** Find joint appearances or mentions of both founders together

**Search queries:**
```
"[Founder 1 Name]" "[Founder 2 Name]"
"[Founder 1] and [Founder 2]" OR "[Founder 2] and [Founder 1]"
site:linkedin.com "[Founder 1]" "[Founder 2]"
"[Founder 1]" "[Founder 2]" interview OR podcast
```

**What to look for:**
- Joint interviews or podcasts
- Posts mentioning both founders
- How they describe each other
- When/where they met
- Their working relationship

**Expected output:** 2-6 joint appearances

---

### 3.8 Photos & Visual Content

**Objective:** Find photos where founder appears with others

**Search queries:**
```
site:linkedin.com "[Founder Name]" photo
"[Founder Name]" team photo
"[Founder Name]" award ceremony
site:instagram.com "[Founder Name]"
```

**What to look for:**
- Small group photos (2-8 people) with captions
- Team photos with people named in caption
- Award ceremonies (who presented the award?)
- Dinner/social photos with context

**Quality criteria:**
- Photo must have caption naming people
- Group size matters (smaller = stronger connection)
- Context matters (team dinner > random conference photo)

**Expected output:** 3-10 photos with context

---

## Phase 4: Tier 2 Source Discovery (Documented Relationships)

### 4.1 Company Website

**Objective:** Extract structured team and investor data

**Pages to check:**
```
[company-domain]/about
[company-domain]/team
[company-domain]/about-us
[company-domain]/leadership
[company-domain]/advisors
[company-domain]/board
[company-domain]/investors
[company-domain]/our-story
```

**What to extract:**
- Co-founders (names, titles, LinkedIn URLs if available)
- Executive team (C-level executives)
- Advisors (names, bios, credentials)
- Board members (names, affiliations)
- Investors (if publicly listed)

**Tools:**
- Direct website navigation
- Google: `site:[company-domain] team`

**Expected output:** 8-15 documented relationships

---

### 4.2 Crunchbase

**Objective:** Extract funding and investor data

**URL pattern:** `https://crunchbase.com/organization/[company-slug]`

**What to extract:**
- All funding rounds (dates, amounts, series)
- Lead investors (firm names)
- Participating investors
- Specific partner names (if available)
- Board members (if listed)
- Key people (founders, executives)

**Tools:**
- Direct Crunchbase visit
- Crunchbase API (if available, requires paid subscription)

**Expected output:** 10-20 investor relationships

---

### 4.3 Tech in Asia Database

**Objective:** Extract company profile and related content

**Search queries:**
```
site:techinasia.com "[Company Name]"
site:techinasia.com "[Founder Name]"
```

**What to extract:**
- Company profile data
- Related articles about the company
- Funding announcements
- Founder interviews
- Related companies or competitors

**Expected output:** 5-10 documented facts

---

### 4.4 Funding Announcements & Press Releases

**Objective:** Find official announcements naming investors and partners

**Search queries:**
```
"[Company Name]" "Series A" OR "Series B" OR "Series C"
"[Company Name]" funding announcement
"[Company Name]" raises OR raised
"[Company Name]" press release
site:prnewswire.com "[Company Name]"
```

**What to look for:**
- Press releases (often name specific investor partners)
- Quotes from investors (indicates relationship)
- Board seat announcements
- Strategic partnerships

**Expected output:** 3-8 press releases

---

### 4.5 LinkedIn Company Page

**Objective:** Extract team data from LinkedIn's company profile

**URL pattern:** `https://linkedin.com/company/[company-slug]`

**What to check:**
- "People" tab → Filter by C-level, founders, board members
- "About" section → Company description, sometimes lists advisors
- Company posts → Sometimes tag team members or investors

**Expected output:** 5-12 team members

---

### 4.6 Investor Websites

**Objective:** Verify investor relationships and find partner names

**Process:**
1. From Crunchbase, get list of investor firms
2. Visit each firm's website
3. Search their portfolio for the company
4. Extract partner name who led the deal

**Search queries:**
```
site:[investor-domain] "[Company Name]"
"[Investor Firm]" portfolio "[Company Name]"
```

**Expected output:** 5-10 investor-partner names

---

## Phase 5: Source Prioritization & Scoring

After collecting all sources, score each one:

### Scoring Criteria

**HIGH Value (⭐⭐⭐):**
- Contains 3+ relationships with names
- Includes specific context (not generic)
- Has direct quotes or @tags
- Recent content (last 2 years)
- Verifiable (source is credible)

**MEDIUM Value (⭐⭐):**
- Contains 1-2 relationships
- Some context but not detailed
- Older content (2-5 years)
- Less direct (mentioned but not quoted)

**LOW Value (⭐):**
- Generic mentions without names
- No specific context
- Very old (5+ years)
- Unverifiable or low-quality source

### Prioritization Order

**Tier 1 sources (by priority):**
1. Podcasts with transcripts (rich context, multiple relationships)
2. LinkedIn posts with @tags (direct acknowledgment)
3. Joint interviews with co-founders (relationship dynamics)
4. Founder profile articles (often mention origin story)
5. LinkedIn comments with context (shared history)
6. Conference panels with cross-references
7. Photos with detailed captions

**Tier 2 sources (by priority):**
1. Company team page (structured, complete)
2. Crunchbase (comprehensive investor data)
3. Funding press releases (specific partner names)
4. Investor portfolio pages (verification)
5. LinkedIn company page (current team)

---

## Output Format

After completing all searches, organize results as:

```
=== SOURCE DISCOVERY RESULTS ===
Founder: [Name]
Company: [Company]
Search completed: [Date]
Total sources found: [Number]
Estimated total credits to read all: [Number]

---

=== TIER 1 SOURCES (Direct Mentions) ===

[ID] [TYPE] - [Title]
    Platform: [Platform]
    URL: [Link]
    Date: [Date]
    Preview: [1-2 sentence summary of content]
    Estimated relationships: [Number]
    Estimated value: ⭐⭐⭐ HIGH / ⭐⭐ MEDIUM / ⭐ LOW
    Credits to read: [Number]

[Repeat for each source]

---

=== TIER 2 SOURCES (Documented Relationships) ===

[ID] [TYPE] - [Title]
    URL: [Link]
    Preview: [1-2 sentence summary]
    Estimated relationships: [Number]
    Estimated value: [Rating]
    Credits to read: [Number]

---

=== SEARCH STRATEGY USED ===

Google searches:
- [List all search queries used]

LinkedIn searches:
- [List all LinkedIn-specific searches]

YouTube searches:
- [List all YouTube searches]

Other databases:
- [List other sources checked]

---

=== SUMMARY & RECOMMENDATIONS ===

Total sources found: [Number]
- Tier 1 (direct mentions): [Number]
- Tier 2 (documented): [Number]

Estimated total relationships if all sources read: [Range]
Estimated total credits if all sources read: [Number]

MY RECOMMENDATIONS (Top priority sources):
✅ Source [ID] - [Reason]
✅ Source [ID] - [Reason]

If you approve just these [N] sources:
- Estimated relationships: [Range]
- Estimated credits: [Number]
- Coverage: [Assessment]
```

---

## Reproduction Methods

### Method 1: Manual Process (No Coding)

**Tools needed:**
- Google search
- LinkedIn account
- Spreadsheet (Google Sheets or Excel)

**Process:**
1. Copy search queries from this document
2. Run each query manually in Google/LinkedIn
3. Record results in spreadsheet with columns:
   - Source ID
   - Source Type
   - URL
   - Preview/Summary
   - Estimated Value
4. Review and prioritize sources
5. Read approved sources
6. Extract relationships manually

**Time per founder:** 30-45 minutes  
**Cost:** Free (just your time)  
**Skill level:** No technical skills required

---

### Method 2: Semi-Automated (Basic Coding)

**Tools needed:**
- Python 3.x
- Google Custom Search API ($5 per 1,000 queries)
- LinkedIn scraper (Phantombuster $30/month or Apify $49/month)
- Spreadsheet or CSV output

**Process:**
1. Write Python script to run all search queries
2. Use Google Custom Search API for web searches
3. Use LinkedIn scraper for LinkedIn-specific searches
4. Script collects URLs and snippets
5. Script outputs to CSV with all source data
6. You review CSV and mark approved sources
7. Script reads approved sources (or you do manually)
8. Extract relationships (manually or with LLM)

**Setup time:** 4-8 hours (one-time)  
**Time per founder:** 5-10 minutes (after setup)  
**Cost:** $35-54/month + API costs  
**Skill level:** Basic Python knowledge

**Key libraries:**
- `requests` - HTTP requests
- `beautifulsoup4` - HTML parsing
- `google-api-python-client` - Google Custom Search
- `pandas` - Data manipulation
- `csv` - CSV file handling

---

### Method 3: Fully Automated (Advanced)

**Tools needed:**
- Python 3.x
- LLM API (OpenAI GPT-4 or similar, ~$0.01 per 1k tokens)
- Search API (Google Custom Search or SerpAPI)
- LinkedIn scraper
- Web scraper (Scrapy or BeautifulSoup)
- Airtable API (for direct database population)

**Architecture:**
```
Input (founder data)
    ↓
Search Module (runs all queries)
    ↓
Source Discovery Module (collects URLs)
    ↓
LLM Preview Module (generates previews + scores)
    ↓
Output ranked source list
    ↓
Human approval
    ↓
Content Extraction Module (reads approved sources)
    ↓
LLM Analysis Module (extracts relationships)
    ↓
Airtable Population Module
    ↓
Output (populated database)
```

**Process:**
1. Script runs all search queries automatically
2. LLM generates preview for each source (without full read)
3. LLM scores each source (HIGH/MEDIUM/LOW)
4. Script outputs ranked list for human approval
5. Human approves sources (via web interface or CLI)
6. Script reads approved sources
7. LLM extracts relationships with context
8. Script populates Airtable via API
9. Human does final verification in Airtable

**Setup time:** 40-80 hours (full system build)  
**Time per founder:** 2-3 minutes (just approval + verification)  
**Cost:** ~$50-100/month (APIs) + ~$0.50-1.00 per founder  
**Skill level:** Advanced Python, API integration, LLM prompting

**Key components:**
- Search orchestration
- LLM prompt engineering (for preview + extraction)
- Rate limiting and error handling
- Human-in-the-loop approval interface
- Airtable API integration
- Logging and monitoring

---

## Search Query Templates

Use these templates with variable substitution:

### Google Search Templates
```
"[FOUNDER_NAME]" "[COMPANY_NAME]" [KEYWORD]
site:[DOMAIN] "[FOUNDER_NAME]"
"[FOUNDER_NAME]" [EDUCATION_KEYWORD]
"[FOUNDER_NAME]" [PREVIOUS_COMPANY]
"[FOUNDER_NAME]" "[COFOUNDER_NAME]"
```

### LinkedIn Search Templates
```
site:linkedin.com/in/[HANDLE]/
site:linkedin.com "[FOUNDER_NAME]" "[COMPANY_NAME]"
"[FOUNDER_NAME]" linkedin post
"@[FOUNDER_NAME]" OR "[FOUNDER_NAME]"
```

### Podcast Search Templates
```
"[FOUNDER_NAME]" podcast
"[FOUNDER_NAME]" interview audio
site:youtube.com "[FOUNDER_NAME]" interview
site:spotify.com "[FOUNDER_NAME]"
```

### Article Search Templates
```
"[FOUNDER_NAME]" interview
"[FOUNDER_NAME]" profile
"[FOUNDER_NAME]" "[COMPANY_NAME]" [PUBLICATION]
```

---

## Quality Criteria Reference

### For Tier 1 Sources (Direct Mentions)

**INCLUDE if:**
- ✅ Specific names mentioned with context
- ✅ Direct quotes about relationships
- ✅ @tags or explicit acknowledgments
- ✅ Shared experiences described (where, when, what)
- ✅ Photos with captions naming people
- ✅ Host-guest relationships in podcasts
- ✅ Small group interactions (2-8 people)

**EXCLUDE if:**
- ❌ Generic mentions ("thanks everyone")
- ❌ No names provided
- ❌ No context (just "congrats")
- ❌ Large group photos without specific context
- ❌ Inferred relationships (worked at same company but no direct mention)

### For Tier 2 Sources (Documented)

**INCLUDE if:**
- ✅ Official company documentation
- ✅ Verified investor lists
- ✅ Board member listings
- ✅ Press releases with names
- ✅ Crunchbase data

**EXCLUDE if:**
- ❌ Unverified sources
- ❌ Outdated information (verify recency)
- ❌ Generic firm names without partner names

---

## Common Pitfalls & Solutions

### Pitfall 1: LinkedIn Blocking
**Problem:** LinkedIn blocks automated scraping  
**Solution:** Use paid scrapers (Phantombuster, Apify) or manual browsing

### Pitfall 2: Paywalled Content
**Problem:** Articles behind paywalls  
**Solution:** Use Google search snippets, or skip if not critical

### Pitfall 3: Outdated Information
**Problem:** Old sources may have stale relationships  
**Solution:** Prioritize recent content (last 2 years), flag old sources

### Pitfall 4: Name Ambiguity
**Problem:** Common names return wrong people  
**Solution:** Always include company name in queries, verify with LinkedIn URL

### Pitfall 5: Missing Transcripts
**Problem:** Podcasts without transcripts are hard to preview  
**Solution:** Use YouTube auto-transcripts, or flag for manual listening

### Pitfall 6: Private Profiles
**Problem:** Some LinkedIn profiles are private  
**Solution:** Skip if not accessible, focus on public sources

---

## Advanced Techniques

### Technique 1: Reverse Image Search
Use Google Images to find where founder photos appear (events, articles)

### Technique 2: Twitter/X Search
```
from:[FOUNDER_HANDLE] @[OTHER_PERSON]
"[FOUNDER_NAME]" mentioned [OTHER_PERSON]
```

### Technique 3: GitHub (for technical founders)
```
site:github.com "[FOUNDER_NAME]"
```
Check commit history, issues, pull requests for collaborators

### Technique 4: Academic Papers (for research-oriented founders)
```
site:scholar.google.com "[FOUNDER_NAME]"
```
Co-authors = potential relationships

### Technique 5: Patent Search
```
site:patents.google.com "[FOUNDER_NAME]"
```
Co-inventors = potential relationships

---

## Continuous Improvement

### Track Success Metrics
- Sources found per founder
- Relationships extracted per source
- Accuracy of value predictions (HIGH/MEDIUM/LOW)
- Credit efficiency (credits spent vs relationships found)

### Refine Over Time
- Add new search queries that work well
- Remove queries that consistently return low-value results
- Update keyword maps based on regional/industry patterns
- Adjust scoring criteria based on actual relationship quality

---

## Related Documents

- `research_workflow.md` - Overall research process and criteria
- `manual_workflow.md` - How to use Manus for research
- `automation_blueprint.md` - Technical architecture for automation
- `research_input_template.md` - Standardized input format

---

**Questions or improvements?** This methodology evolves based on learnings. Document any new search patterns or techniques that prove effective.
