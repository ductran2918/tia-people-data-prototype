# Research Workflow

Step-by-step process for identifying "door openers" to tech founders.

---

## Step 1: Profile Selection

1. They are co-founders or C-suite of startups raising funds recently. I will pick it manually. 

---

## Step 2: Relationship Discovery

**Question:** Who are their potential door openers?

**Source Priority (in order):**
1. **Company "Our Team" page** → Board members, Advisors, Senior team
2. **Founder's LinkedIn posts** → Direct mentions
3. **Podcast appearances** → People mentioned by name, guests and hosts

**Time budget:** 30 minutes

---

## Step 3: Relationship Validation

**Question:** Can this person actually open doors?

**"Door Opener" Criteria:**
- ✅ Direct mentions
- ✅ Founder publicly acknowledges them (tag, mention, credit)
- ✅ Senior enough (C-level, VP+, Board, Investor)
- ✅ Reachable (active LinkedIn account)

**Red Flags (Skip):**
- ❌ Worked at same company but no direct mention
- ❌ Junior employees (unless explicitly credited)
- ❌ Inactive LinkedIn with no posts
- ❌ No mention in 5+ years

**Time budget:** 15 minutes per potential door opener

---

## Step 4: Data Entry

**Add to Airtable:**
1. Founder → `people_companies` table
2. Each validated door opener → `people_relationships` table
   - Use `related_person_id` if they're also a founder in database
   - Use `related_person_name` + `related_person_linkedin_url` if external
3. Fill `relationship_context` with narrative (where worked, what built, how long)
4. Add `source_url` for verification of each relationship, example: LinkedIn post, podcast link

**Time budget:** 20 minutes

---

## Step 5: Quality Check

**Standards:**
- Each relationship has clear context ("worked together on X")
- All source URLs are accessible
- All related persons are reachable

**Time budget:** 5 minutes

---

## Total Time Budget: 1.5-2 hours per founder

**If exceeding 2 hours:** The founder may not have enough public information. Consider skipping.

---

**Last Updated:** 2026-01-14  
**Validated on:** Mao Ching Foo (2 hours, 2 door openers found)