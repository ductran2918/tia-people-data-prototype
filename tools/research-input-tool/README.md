# Founder Research Input Tool

**Version:** 1.0  
**Purpose:** Generate standardized search strategies for founder relationship mapping

---

## Overview

This tool streamlines the process of creating comprehensive search strategies for researching founder relationships. It guides users through a 4-step workflow to collect founder information and automatically generates a detailed markdown search strategy document.

**Key Features:**
- Step-by-step guided input process
- Work history extraction (manual or auto with Manus)
- Tech company filtering for colleague searches
- Comprehensive search query generation
- Editable markdown output
- Download or copy to clipboard

---

## Quick Start

### Running Locally

1. **Open the tool:**
   ```bash
   cd tools/research-input-tool
   open index.html  # macOS
   # or
   start index.html  # Windows
   # or
   xdg-open index.html  # Linux
   ```

2. **Use in browser:**
   - The tool runs entirely in your browser
   - No server or installation required
   - Works offline after first load

---

## Workflow

### Step 1: LinkedIn URL
- Enter the founder's LinkedIn profile URL
- Example: `https://www.linkedin.com/in/username/`

### Step 2: Work History Extraction
**Option A: Manual Input**
- Copy work history from LinkedIn
- Paste in the format: `Company (Years) - Role`
- Tool parses and displays for selection

**Option B: Auto-Extract (Requires Manus)**
- Click "Auto-Extract" button
- Follow instructions to send URL to Manus AI
- Paste extracted data back into manual input

**Select Tech Companies:**
- Check boxes for tech companies only
- Skip traditional industries (banks, consulting, etc.)
- Education currently excluded

### Step 3: Additional Information
Fill in required fields:
- Founder name
- Company name
- Company website
- Founder role

Optional fields:
- Co-founders (comma-separated)
- Search focus (specific areas to prioritize)
- Recent events (paste raw text from news articles)

### Step 4: Review & Edit Strategy
- Generated markdown strategy displayed
- Edit directly in textarea if needed
- Download as `.md` file
- Copy to clipboard for pasting into Manus or other tools

---

## Output Format

The tool generates a comprehensive markdown document containing:

1. **Basic Information** - Founder and company details
2. **Work History** - Selected tech companies for search
3. **Recent Events** - Context from news/announcements
4. **Keyword Map** - Structured keywords for searches
5. **Search Strategy** - Detailed queries organized by phase:
   - LinkedIn posts by founder
   - LinkedIn posts tagging founder
   - Podcast appearances
   - Articles & interviews
   - Conference appearances
   - Co-founder cross-references
   - Former colleague discovery
6. **Tier 2 Sources** - Company website, Crunchbase, databases
7. **Expected Output** - Estimated sources and relationships
8. **Next Steps** - Research execution workflow

---

## Tech Stack

- **HTML5** - Structure and forms
- **Vanilla JavaScript** - Logic and markdown generation
- **CSS3** - Styling and animations
- **No dependencies** - Runs standalone in any modern browser

---

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

---

## Tips for Best Results

### Work History Input
- Use consistent format: `Company (Year-Year) - Role`
- Include department if relevant: `Goldman Sachs (2013-2015) - Associate, Trading Desk`
- One company per line

### Tech Company Selection
**Include:**
- Startups (any stage)
- Tech giants (Google, Meta, Amazon, etc.)
- Regional tech (Grab, Gojek, Sea Group, etc.)
- Tech-enabled companies (Airbnb, Uber, etc.)
- VC firms and accelerators

**Exclude:**
- Traditional banks (unless tech division)
- Manufacturing, retail, real estate
- Law firms, accounting firms
- Government agencies

### Recent Events
- Paste raw text instead of paywalled links
- Include funding announcements, press releases
- Add context about partnerships or milestones

---

## Troubleshooting

### "Please enter a valid LinkedIn URL"
- Ensure URL contains `linkedin.com`
- Format: `https://www.linkedin.com/in/username/`

### Work history not parsing correctly
- Check format: `Company (Years) - Role`
- Ensure one entry per line
- Parentheses and dash are required

### Download not working
- Check browser permissions for downloads
- Try "Copy to Clipboard" instead
- Manually select all text and copy

### Auto-extract not working
- This requires manual coordination with Manus AI
- Use manual input as alternative
- Follow on-screen instructions carefully

---

## Future Enhancements

Potential features for future versions:
- Direct Manus API integration
- LinkedIn API integration (if available)
- Save/load draft strategies
- Multiple founder batch processing
- Export to other formats (PDF, JSON)
- Search result tracking

---

## Related Documentation

- `../../docs/manusai_search_methodology.md` - Complete search methodology
- `../../docs/research_workflow.md` - Overall research process
- `../../docs/manual_workflow.md` - Manual research guide
- `../../docs/automation_blueprint.md` - Automation architecture

---

## Support

For questions or issues:
1. Check the related documentation above
2. Review the search methodology guide
3. Contact project maintainer

---

## License

Internal tool for TIA People Relationship Project.  
Not for public distribution.

---

**Last Updated:** 2026-01-16  
**Maintainer:** Project Team
