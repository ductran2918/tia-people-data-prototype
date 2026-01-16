# Automation Blueprint

**Purpose:** Technical specification for automating founder relationship research at scale.

**Best for:** 200+ founders, technical teams, production deployment

**Complexity:** HIGH - Requires developer with Python, API integration, and scraping experience

---

## System Overview

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Data Collection Layer                    │
├─────────────────────────────────────────────────────────────┤
│  LinkedIn Scraper  │  Company Scraper  │  External APIs      │
│  (Phantombuster)   │  (BeautifulSoup)  │  (Crunchbase, etc) │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Analysis Layer                          │
├─────────────────────────────────────────────────────────────┤
│  Context Analyzer  │  Relationship Scorer  │  Data Validator │
│  (GPT-4 API)       │  (Rule-based + LLM)   │  (Python logic) │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                       Storage Layer                          │
├─────────────────────────────────────────────────────────────┤
│           Airtable Database (via API or MCP)                 │
│     people_companies + people_relationships tables           │
└──────────────┬──────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Review Interface                        │
├─────────────────────────────────────────────────────────────┤
│  Airtable Views  │  Web Dashboard  │  Slack Notifications   │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Data Collection

### Component 1.1: LinkedIn Scraper

**Purpose:** Extract founder's posts, comments, and profile data

**Technology Options:**

**Option A: Phantombuster (Recommended for non-developers)**
- Pre-built LinkedIn scrapers
- Handles anti-bot measures
- Cloud-based (no infrastructure needed)
- Cost: $50-200/month
- Setup: 2-4 hours

**Option B: Apify**
- Similar to Phantombuster
- More customizable
- Cost: $49-499/month
- Setup: 2-4 hours

**Option C: Custom Playwright/Puppeteer**
- Full control
- Requires maintaining browser automation
- Free (except infrastructure)
- Setup: 20-40 hours
- Maintenance: High (LinkedIn changes break it)

**Recommendation:** Start with Phantombuster, migrate to custom if needed after 500+ founders.

---

**What to scrape:**

```python
founder_data = {
    "profile": {
        "name": str,
        "linkedin_url": str,
        "current_role": str,
        "current_company": str,
        "past_experience": [
            {"company": str, "role": str, "start": date, "end": date}
        ],
        "education": [
            {"school": str, "degree": str, "start": date, "end": date}
        ]
    },
    "posts": [
        {
            "text": str,
            "date": date,
            "url": str,
            "mentions": [str],  # @tagged people
            "images": [str],    # URLs
            "likes": int,
            "comments": int
        }
    ],
    "comments_by_founder": [
        {
            "text": str,
            "date": date,
            "post_url": str,
            "post_author": str
        }
    ],
    "comments_on_founder": [
        {
            "text": str,
            "date": date,
            "author": str,
            "author_linkedin": str
        }
    ]
}
```

---

### Component 1.2: Company Page Scraper

**Purpose:** Extract team, investors, board members from company websites

**Technology:**
- Python + BeautifulSoup or Scrapy
- Simple HTTP requests (no anti-bot issues for most sites)

**Target pages:**
- `/team` or `/about-us`
- `/investors` or `/board`
- `/press` or `/news`

**What to extract:**

```python
company_data = {
    "team": [
        {
            "name": str,
            "role": str,
            "linkedin_url": str,  # if available
            "bio": str
        }
    ],
    "investors": [
        {
            "name": str,  # Person or firm
            "type": str,  # "lead", "participant", "board"
            "round": str  # "Series A", "Seed", etc.
        }
    ],
    "board_members": [
        {
            "name": str,
            "affiliation": str,  # Their main company/role
            "linkedin_url": str
        }
    ]
}
```

---

### Component 1.3: External APIs

**Crunchbase API**
- Get funding rounds, investors, board members
- Cost: $29-299/month
- Rate limits: 200 requests/day (basic plan)

**Tech in Asia API (if available)**
- Search for founder mentions in articles
- Get company profiles
- Cost: Internal access (you work there)

**YouTube API (Optional)**
- Search for founder interviews/talks
- Get video transcripts
- Cost: Free (with limits)

---

## Phase 2: Analysis Layer

### Component 2.1: Context Analyzer (LLM)

**Purpose:** Determine if LinkedIn post/comment has specific context or is generic

**Technology:** OpenAI GPT-4 API or Claude API

**Prompt template:**

```python
prompt = f"""
Analyze this LinkedIn comment for relationship quality.

Comment: "{comment_text}"
Commenter: {commenter_name}
Post author: {founder_name}

Determine:
1. Does the comment reference specific shared work, projects, or experiences? (YES/NO)
2. What is the relationship context? (Extract specific details)
3. Confidence score (1-10)

Examples of SPECIFIC context:
- "Remember when we built the credit scoring system at Company X in 2018"
- "Our time at Y Combinator together was transformative"
- "You helped me close my first customer when I was starting out"

Examples of GENERIC context:
- "Congrats on the funding!"
- "Great post!"
- "Thanks for sharing"

Output JSON:
{{
    "has_specific_context": bool,
    "relationship_context": str,
    "confidence": int
}}
"""

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}],
    response_format={"type": "json_object"}
)
```

**Cost:** ~$0.01-0.03 per founder (analyzing 50-100 posts/comments)

---

### Component 2.2: Relationship Scorer

**Purpose:** Classify relationship type and assign confidence score

**Rule-based logic:**

```python
def score_relationship(relationship_data):
    score = 0
    relationship_type = "other"
    
    # Tier 1: Direct mentions
    if relationship_data["has_linkedin_tag"]:
        score += 30
    
    if relationship_data["has_specific_context"]:
        score += 40
    
    if relationship_data["photo_size"] <= 8 and relationship_data["has_photo_context"]:
        score += 20
    
    if relationship_data["is_host_guest"]:
        score += 25
    
    # Tier 2: Documented
    if relationship_data["is_investor"]:
        score += 50
        relationship_type = "investor-investee"
    
    if relationship_data["is_cofounder"]:
        score += 60
        relationship_type = "cofounder"
    
    if relationship_data["is_board_member"]:
        score += 50
        relationship_type = "board_member"
    
    # Classify type from context
    if "worked together" in relationship_data["context"].lower():
        relationship_type = "former_colleague"
    
    if "classmate" in relationship_data["context"].lower():
        relationship_type = "classmate"
    
    # Confidence levels
    if score >= 70:
        confidence = "high"  # Auto-approve
    elif score >= 40:
        confidence = "medium"  # Human review
    else:
        confidence = "low"  # Reject or flag
    
    return {
        "score": score,
        "relationship_type": relationship_type,
        "confidence": confidence
    }
```

---

### Component 2.3: Data Validator

**Purpose:** Check if profiles are active and reachable

**Validation rules:**

```python
def validate_person(linkedin_profile):
    checks = {
        "profile_exists": check_url_accessible(linkedin_profile["url"]),
        "has_recent_activity": linkedin_profile["last_post_date"] > (today - 180_days),
        "has_connections": linkedin_profile["connection_count"] > 100,
        "profile_complete": linkedin_profile["has_photo"] and linkedin_profile["has_bio"]
    }
    
    # Must pass all checks
    is_valid = all(checks.values())
    
    return {
        "is_valid": is_valid,
        "checks": checks,
        "reason": get_failure_reason(checks) if not is_valid else None
    }
```

---

## Phase 3: Storage Layer

### Component 3.1: Airtable Integration

**Technology:** Airtable API or Manus MCP

**Operations:**

```python
# Create person profile
def create_person(person_data):
    # Check if exists first
    existing = airtable.search("people_companies", "linkedin_url", person_data["linkedin_url"])
    
    if existing:
        return existing["id"]
    
    # Create new
    record = airtable.create("people_companies", {
        "linkedin_url": person_data["linkedin_url"],
        "name": person_data["name"],
        "role": person_data["role"],
        "current_company_slug": person_data["company_slug"],
        "is_founder": person_data["is_founder"]
    })
    
    return record["id"]

# Create relationship
def create_relationship(person_id, related_person_id, relationship_data):
    airtable.create("people_relationships", {
        "person_id": [person_id],
        "related_person_id": [related_person_id],
        "relationship_type": relationship_data["type"],
        "relationship_context": relationship_data["context"],
        "source_url": relationship_data["source_url"]
    })
```

---

## Phase 4: Review Interface

### Option A: Airtable Views (Simplest)

**Create filtered views:**
- "High Confidence" (auto-approved)
- "Needs Review" (medium confidence)
- "Rejected" (low confidence, for audit)

**Workflow:**
1. Bot populates all relationships
2. User filters to "Needs Review"
3. User approves or deletes
4. Approved relationships move to "High Confidence"

---

### Option B: Web Dashboard (Better UX)

**Technology:** Flask or Streamlit

**Features:**
- List of pending relationships
- Side-by-side view: Source URL + Relationship context
- Approve/Reject buttons
- Bulk actions
- Stats dashboard (total relationships, approval rate, etc.)

**Example Streamlit app:**

```python
import streamlit as st

st.title("Relationship Review Dashboard")

# Get pending relationships
pending = get_pending_relationships()

for rel in pending:
    with st.container():
        col1, col2 = st.columns([3, 1])
        
        with col1:
            st.write(f"**{rel['person_name']}** → **{rel['related_person_name']}**")
            st.write(f"Type: {rel['relationship_type']}")
            st.write(f"Context: {rel['relationship_context']}")
            st.write(f"[Source]({rel['source_url']})")
        
        with col2:
            if st.button("✅ Approve", key=f"approve_{rel['id']}"):
                approve_relationship(rel['id'])
                st.success("Approved!")
            
            if st.button("❌ Reject", key=f"reject_{rel['id']}"):
                reject_relationship(rel['id'])
                st.warning("Rejected")
```

---

### Option C: Slack Notifications (For Teams)

**Workflow:**
1. Bot finds new relationships
2. Sends Slack message with details
3. User reacts with ✅ or ❌ emoji
4. Bot updates Airtable based on reaction

---

## Implementation Roadmap

### Phase 0: Setup (Week 1)
- [ ] Set up Phantombuster account
- [ ] Get API keys (OpenAI, Crunchbase, Airtable)
- [ ] Set up Python environment
- [ ] Test each API individually

### Phase 1: MVP (Weeks 2-4)
- [ ] Build LinkedIn scraper integration
- [ ] Build company page scraper
- [ ] Implement context analyzer (LLM)
- [ ] Create Airtable integration
- [ ] Test on 5 founders manually

### Phase 2: Automation (Weeks 5-6)
- [ ] Build orchestration script (runs full pipeline)
- [ ] Add error handling and logging
- [ ] Implement relationship scorer
- [ ] Add data validator
- [ ] Test on 20 founders

### Phase 3: Review Interface (Week 7)
- [ ] Build Airtable views OR web dashboard
- [ ] Implement approval workflow
- [ ] Add stats/reporting
- [ ] Test with real users

### Phase 4: Scale (Week 8+)
- [ ] Optimize for batch processing
- [ ] Add monitoring and alerts
- [ ] Implement rate limiting
- [ ] Deploy to production
- [ ] Run on 100+ founders

---

## Cost Breakdown

### Monthly Recurring Costs

| Service | Cost | Purpose |
|---------|------|---------|
| Phantombuster | $50-200 | LinkedIn scraping |
| OpenAI API | $50-200 | Context analysis |
| Crunchbase API | $29-299 | Investor data |
| Server/hosting | $10-50 | Running scripts |
| **Total** | **$139-749/month** | |

### One-Time Costs

| Item | Cost | Purpose |
|------|------|---------|
| Developer (freelance) | $500-2000 | Build system |
| Testing/QA | $200-500 | Validate quality |
| **Total** | **$700-2500** | |

### Per-Founder Costs (After Setup)

| Item | Cost |
|------|------|
| LinkedIn scraping | $0.10-0.50 |
| LLM analysis | $0.01-0.03 |
| Other APIs | $0.05-0.10 |
| **Total per founder** | **$0.16-0.63** |

**For 100 founders:** $16-63  
**For 500 founders:** $80-315

---

## Technical Requirements

### Developer Skills Needed

**Must have:**
- ✅ Python (intermediate level)
- ✅ API integration experience
- ✅ Web scraping (BeautifulSoup/Scrapy)
- ✅ JSON/data manipulation

**Nice to have:**
- ⚠️ Browser automation (Playwright/Puppeteer)
- ⚠️ LLM prompt engineering
- ⚠️ Web development (if building dashboard)

**Estimated skill level:** Mid-level developer (2-4 years experience)

---

### Infrastructure Needs

**Minimal setup:**
- Personal computer running Python scripts
- Cron job for scheduling
- Cost: $0 (use existing hardware)

**Production setup:**
- Cloud server (AWS EC2, DigitalOcean, etc.)
- Task queue (Celery + Redis)
- Monitoring (Sentry, Datadog)
- Cost: $50-200/month

---

## Risks & Mitigation

### Risk 1: LinkedIn Blocking
**Impact:** Can't scrape data  
**Probability:** Medium-High  
**Mitigation:**
- Use Phantombuster (they handle this)
- Rotate accounts if needed
- Add delays between requests
- Have backup manual process

### Risk 2: LLM Misclassification
**Impact:** Low-quality relationships in database  
**Probability:** Medium  
**Mitigation:**
- Human review for medium-confidence relationships
- Continuous tuning of prompts
- A/B test different models
- Track approval rates to measure quality

### Risk 3: API Rate Limits
**Impact:** Slow processing  
**Probability:** High  
**Mitigation:**
- Implement queuing system
- Respect rate limits in code
- Upgrade API plans if needed
- Process in batches overnight

### Risk 4: Maintenance Burden
**Impact:** System breaks, needs fixing  
**Probability:** High  
**Mitigation:**
- Comprehensive error logging
- Monitoring and alerts
- Budget for ongoing developer time
- Document everything thoroughly

---

## Success Metrics

### Data Quality
- **Target:** >80% approval rate on medium-confidence relationships
- **Measure:** Track approvals vs rejections in review interface

### Processing Speed
- **Target:** <15 minutes per founder (end-to-end)
- **Measure:** Log timestamps for each pipeline stage

### Cost Efficiency
- **Target:** <$0.50 per founder (excluding one-time setup)
- **Measure:** Track API usage and costs

### Coverage
- **Target:** Average 5-10 Tier 1 relationships per founder
- **Measure:** Count relationships by tier in database

---

## When NOT to Automate

**Don't build this if:**
- ❌ You need fewer than 50 founders total
- ❌ You don't have technical support available
- ❌ Budget is under $1000 (setup + first 3 months)
- ❌ You haven't validated the product with users yet
- ❌ Relationship criteria are still changing frequently

**Instead:**
- Use manual workflow (see `docs/manual_workflow.md`)
- Validate with 20-30 founders first
- Revisit automation after product-market fit

---

## Alternative: Buy vs Build

### Existing Tools to Consider

**Apollo.io**
- Has relationship data
- Focus on B2B sales
- Cost: $49-149/month
- Pro: No development needed
- Con: Not customized to your criteria

**ZoomInfo**
- Comprehensive contact database
- Enterprise pricing ($10k+/year)
- Pro: Very complete data
- Con: Expensive, overkill for your use case

**LinkedIn Sales Navigator**
- Native LinkedIn tool
- Cost: $79-135/month
- Pro: Official LinkedIn data
- Con: Manual research still needed

**Recommendation:** Test these first before building custom automation. If they provide 60-70% of what you need, supplement with manual research rather than building from scratch.

---

## Next Steps

**Before starting automation:**
1. ✅ Complete 20-30 founders manually (validate workflow)
2. ✅ Get user feedback (is the data useful?)
3. ✅ Finalize relationship criteria (stop changing rules)
4. ✅ Secure budget ($1000-3000 for first 3 months)
5. ✅ Find developer or technical partner

**To begin implementation:**
1. Clone this repo to share with developer
2. Give them this document + `database_structure.md`
3. Start with Phase 0 (setup) and Phase 1 (MVP)
4. Test on 5 founders before scaling

---

**Last Updated:** 2026-01-16  
**Maintained by:** Tech in Asia Data Team  
**Complexity:** HIGH - Requires experienced developer
