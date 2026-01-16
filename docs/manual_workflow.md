# Manual Research Workflow

**Purpose:** Step-by-step guide for researching founders using Manus (AI assistant) without automation.

**Best for:** 10-100 founders, non-technical users, validation phase

**Time per founder:** 10-15 minutes (review only, Manus does the research)

---

## Prerequisites

- ✅ Airtable database set up (people_companies + people_relationships tables)
- ✅ Manus access with Airtable MCP integration
- ✅ Target founder's LinkedIn URL and company name

---

## Step-by-Step Process

### Step 1: Prepare Founder Information

**Gather these details:**
- Full name
- LinkedIn profile URL
- Company name and slug (for Tech in Asia database)
- Current role/title

**Example:**
```
Name: Kelvin Teo
LinkedIn: https://www.linkedin.com/in/tkelvin/
Company: Funding Societies (funding-societies)
Role: Co-founder & CEO
```

---

### Step 2: Request Research from Manus

**Prompt template:**
```
Research [Founder Name] from [Company Name] and populate the Airtable database.

LinkedIn: [URL]
Company slug: [slug]

Find:
- Tier 1 relationships (direct mentions with specific context)
- Tier 2 relationships (investors, board members, advisors)

Use the relationship criteria from research_workflow.md.
```

**Example:**
```
Research Kelvin Teo from Funding Societies and populate the Airtable database.

LinkedIn: https://www.linkedin.com/in/tkelvin/
Company slug: funding-societies

Find:
- Tier 1 relationships (direct mentions with specific context)
- Tier 2 relationships (investors, board members, advisors)

Use the relationship criteria from research_workflow.md.
```

---

### Step 3: Manus Performs Research

**What Manus will do:**
1. Search for founder's LinkedIn posts and activity
2. Analyze comments for specific context
3. Check company pages for team/investor information
4. Search Tech in Asia articles for mentions
5. Look for podcast/event appearances
6. Verify each relationship against quality criteria
7. Create records in Airtable (people_companies + people_relationships)

**Duration:** 30-45 minutes of Manus processing time

---

### Step 4: Review Results in Airtable

**Check people_companies table:**
- Verify founder profile is correct
- Check all related people were added
- Confirm LinkedIn URLs are valid
- Verify roles and companies are accurate

**Check people_relationships table:**
- Read each `relationship_context` - Does it make sense?
- Verify `relationship_type` is appropriate
- Check `source_url` is accessible and relevant
- Confirm relationships meet your quality criteria

---

### Step 5: Quality Control

**For each relationship, ask:**

✅ **Is the context specific?**
- ❌ "Congrats on the funding!" → Too generic
- ✅ "Remember when we built the credit scoring system together at Company X" → Specific

✅ **Is it a direct mention?**
- ❌ Inferred from overlapping job tenure → Not direct
- ✅ Tagged in LinkedIn post with shared story → Direct

✅ **Is the person reachable?**
- ❌ LinkedIn profile inactive (no posts in 6+ months) → Skip
- ✅ Active profile with recent activity → Keep

✅ **Does the source verify the relationship?**
- ❌ Source URL is broken or doesn't mention both people → Remove
- ✅ Source clearly shows both people and their connection → Keep

---

### Step 6: Edit or Remove Low-Quality Relationships

**In Airtable:**
1. Open `people_relationships` table
2. For borderline relationships:
   - Edit `relationship_context` to add more detail
   - Change `relationship_type` if miscategorized
   - Update `source_url` if better source exists
3. For invalid relationships:
   - Delete the record
   - Optionally delete the related person from `people_companies` if they have no other relationships

---

### Step 7: Document Findings (Optional)

**For future reference, note:**
- Total relationships found (Tier 1 vs Tier 2)
- Quality issues encountered
- Patterns observed (e.g., "Most connections from Y Combinator batch")
- Gaps in data (e.g., "No podcast appearances found")

**Save to:** `docs/research_log.md` or create a note in Airtable

---

## Quality Criteria Reference

### Tier 1: Direct Mentions (High Value)

**LinkedIn posts/comments:**
- ✅ Specific context about shared work/experience
- ✅ Tagged mentions with personal stories
- ✅ Comments referencing specific projects or history
- ❌ Generic congratulations or praise

**Photos:**
- ✅ Small group (2-8 people) with context (team photo, award ceremony)
- ✅ Caption mentions specific event or relationship
- ❌ Large conference photos (10+ people)
- ❌ Generic group shots without context

**Events/Podcasts:**
- ✅ Host-guest relationships
- ✅ 2-3 person panels where they reference each other
- ✅ Joint interviews about their collaboration
- ❌ Large conference panels where they're co-speakers
- ❌ Events where they're both attendees but no interaction

---

### Tier 2: Documented Relationships (Medium Value)

**From company pages:**
- ✅ Co-founders (from team page)
- ✅ Board members (from about page)
- ✅ Advisors (from team/advisory board section)

**From funding announcements:**
- ✅ Lead investors (from press releases)
- ✅ Investor quotes mentioning specific partners
- ✅ Board seats from funding rounds

**From Crunchbase/databases:**
- ✅ Verified investors with firm names
- ✅ Board member listings
- ✅ Previous company co-founders

---

## Troubleshooting

### "Manus found too few relationships"

**Possible reasons:**
- Founder has low LinkedIn activity
- Founder is private/doesn't share much
- Company is very new (no funding/press yet)

**Solutions:**
- Expand search to Twitter/X posts
- Check company blog for team stories
- Search for founder interviews on YouTube
- Look for university/alumni network mentions

---

### "Manus found too many low-quality relationships"

**Possible reasons:**
- Founder is very active on LinkedIn (lots of generic engagement)
- Criteria need refinement

**Solutions:**
- Be stricter in Step 5 review
- Ask Manus to re-research with tighter criteria
- Focus only on Tier 1 relationships with very specific context

---

### "Source URLs are broken or inaccessible"

**Solutions:**
- Use Wayback Machine (archive.org) to find archived versions
- Search for alternative sources mentioning the same relationship
- If no valid source exists, remove the relationship

---

## Tips for Efficiency

**Batch research:**
- Prepare 3-5 founders at once
- Give Manus all the details in one prompt
- Review all results in one sitting

**Focus on high-value founders:**
- Prioritize founders with recent funding (more press coverage)
- Start with founders who are active on LinkedIn
- Skip founders with minimal online presence

**Iterate on criteria:**
- After 5-10 founders, review what's working
- Refine quality criteria based on patterns
- Update this document with learnings

---

## Cost Estimation

**Manus credits per founder:**
- Research: ~30-45 min of processing
- Airtable operations: Minimal
- Estimated cost: $0.50-1.00 per founder (varies by credit pricing)

**For 50 founders:**
- Total cost: ~$25-50 in Manus credits
- Total time: 8-12 hours (review only)

**For 100 founders:**
- Total cost: ~$50-100 in Manus credits
- Total time: 16-25 hours (review only)

---

## When to Consider Automation

**Signals you're ready:**
- ✅ You've researched 20+ founders manually
- ✅ Quality criteria are stable (few changes)
- ✅ You need to scale to 200+ founders
- ✅ You have budget for developer or tools ($500-2000)
- ✅ You have technical support available

**If not ready:**
- Continue with manual workflow
- Manus can handle 50-100 founders efficiently
- Focus on validating the product with users first

---

## Next Steps After Manual Research

**After researching 10-20 founders:**
1. Test with real users (recruiters/sales team)
2. Gather feedback on data quality
3. Refine relationship criteria
4. Document patterns and insights

**After researching 30-50 founders:**
1. Analyze which relationship types are most useful
2. Identify data gaps (what's missing?)
3. Decide if automation is needed
4. Review `docs/automation_blueprint.md` if ready to scale

---

**Last Updated:** 2026-01-16  
**Maintained by:** Tech in Asia Data Team
