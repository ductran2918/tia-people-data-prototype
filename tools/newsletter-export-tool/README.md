# Newsletter Export Tool

Generate HTML newsletters for fundraising announcements, including company information, founders, and their professional connections.

## Overview

This tool creates formatted HTML newsletters that showcase:
- **Part 1:** Funding news announcement with link to full article
- **Part 2:** Founder profiles with their professional connections (relationship mapping)

## Features

- 📊 **Airtable Integration** - Loads companies, founders, and relationships directly from your database
- 🔍 **Smart Search** - Autocomplete company search with live filtering as you type
- ✍️ **Text Formatting** - Apply bold and italic styling to company news with toolbar buttons or keyboard shortcuts
- 🔗 **Clickable Links** - All names, companies, and sources are underlined and hyperlinked
- 📎 **Source Attribution** - Each connection includes a clickable (Source) link for verification
- 👁️ **Live Preview** - See the newsletter before downloading
- 📱 **Mobile-Friendly** - Responsive design works on all devices
- 📥 **HTML Export** - Download standalone HTML file for email campaigns
- 🔒 **XSS Protection** - Sanitizes user inputs to prevent security issues

## Setup

### Prerequisites

1. Access to Airtable base `appt8YGOz5bOK6RpR`
2. Airtable API key (personal access token)
3. Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

**Step 1: Configure API Key**

```bash
# Navigate to the tool directory
cd tools/newsletter-export-tool

# Copy the config template
cp config.template.js config.js

# Edit config.js and replace YOUR_AIRTABLE_API_KEY_HERE with your actual API key
# You can use any text editor:
nano config.js
# or
code config.js
```

**Important Security Notes:**
- `config.js` contains your API key and is **gitignored** - it won't be committed to GitHub
- Never commit `config.js` or share it publicly
- Only commit `config.template.js` (the template without the key)
- Each developer needs their own `config.js` with their own API key

**Step 2: Open the Tool**

No build process required! Simply open `index.html` in your web browser:

```bash
# Navigate to the tool directory
cd tools/newsletter-export-tool

# Open in default browser (macOS)
open index.html

# Or open in specific browser
open -a "Google Chrome" index.html
```

## Usage

### Step 1: Select Company
- Open the tool in your browser
- Wait for companies to load (toast notification will confirm)
- Type in the search box to filter companies (e.g., type "real" to find RealVantage)
- Click on a company from the filtered results to select it
- **Keyboard Navigation**: Use Arrow Up/Down to navigate results, Enter to select

### Step 2: Fill Newsletter Details
- **News Title**: e.g., "RealVantage Raises $10M Series B"
- **Company News**: Describe the funding announcement (supports multi-line and text formatting)
  - Select text and click **B** for bold or **I** for italic
  - Keyboard shortcuts: Ctrl/Cmd+B (bold), Ctrl/Cmd+I (italic)
  - Formatting uses markdown syntax: `**bold**` and `*italic*`
- **News Link**: URL to the full news article

### Step 3: Generate Preview
- Click "Generate Preview" button
- The tool will:
  - Fetch founders for the selected company
  - Load their professional connections
  - Build the newsletter HTML
  - Display preview in the right pane

### Step 4: Download
- Review the preview
- Click "Download HTML" to save the newsletter
- File will be named: `{company-slug}-newsletter.html`
- **Recommended:** Save to `/docs/newsletters/` folder for centralized storage and easy browsing via `/docs/index.html`

## Newsletter Structure

### Part 1: Funding News
```
[News Title]

[Company News Description]

Read full article on TechInAsia.com → [Link]

─────────────────────────

```

### Part 2: Meet the Founders
```
Meet the founders of [Company Name]
Click names to view LinkedIn profiles

[Founder Name (LinkedIn)]: Role

Want to reach out to this founder? These people can help open doors

• [Connection Name (LinkedIn)]: Role at [Company (Website)] - relationship context (Source)
• [Another Connection]: ...

[Next Founder...]
```

### Fallback for No Connections
If a founder has no connections in the database:
```
We don't have the data on this founder's relationship map at the moment. We will update soon
```

## Technical Details

### Airtable Schema

**Tables Used:**
1. `companies` (tbl6FbkvaaZJHNjlv)
   - company_name, company_slug, company_website, company_location_country

2. `people_companies` (tbl2GFODrbUmOjJUY)
   - linkedin_url, name, role, current_company_slug, is_founder

3. `people_relationships` (tblBUetr6XUt7lZhl)
   - person_id, related_person_id, relationship_type, relationship_context

### Bidirectional Relationship Logic

**Approach:** Use the `outgoing_relationships` and `incoming_relationships` fields that are automatically maintained by Airtable's bidirectional links.

```javascript
// Founder record already contains relationship IDs
{
  "outgoing_relationships": ["rec8xLwdDoS0a58jp", "rectULvmUlIFm6ayE", ...],
  "incoming_relationships": [...]
}

// Fetch these relationships by their record IDs
const relationshipIds = [...outgoing, ...incoming];
const filterFormula = `OR(RECORD_ID()="rec1", RECORD_ID()="rec2", ...)`;
```

Then determines which person is the connection:
- If founder is `person_id[0]` → connection is `related_person_id[0]`
- If founder is `related_person_id[0]` → connection is `person_id[0]`

**Why this approach?**
- Airtable's filter formulas on linked record fields are unreliable
- The bidirectional link fields (`outgoing_relationships`, `incoming_relationships`) are automatically maintained
- Direct RECORD_ID() queries are fast and reliable
- No complex string matching needed

### HTML Output

The downloaded HTML file is a standalone document with:
- Inline CSS styles (email-safe, no external stylesheets)
- Mobile-responsive meta viewport tag
- Max-width: 600px (standard email width)
- Semantic HTML structure

## Styling Guidelines

**Design Principles:**
- Clean, minimal design
- No emojis, icons, or decorative elements
- No background colors or gradients
- Thin line separators (1px solid #ddd)
- Professional typography (Arial, sans-serif)

**Color Scheme:**
- Links: #0A66C2 (LinkedIn blue)
- Text: #333 (dark gray)
- Subtle text: #999 (light gray)

## Error Handling

The tool handles these edge cases:

| Scenario | Behavior |
|----------|----------|
| No founders for company | Show error toast, disable preview |
| Founder has no connections | Display fallback message |
| API call fails | Show error toast with message |
| Missing related person data | Skip that connection, continue with others |
| Invalid inputs | Validate and show error before generating |

## Performance

- **Companies**: Fetched once on page load, cached in memory
- **Founders**: Fetched when company is selected
- **Relationships**: Fetched lazily when "Generate Preview" is clicked
- **Parallel Fetches**: Uses `Promise.all()` for multiple connections

## Security Notes

### API Key Management

✅ **Gitignored Config**: API keys are stored in `config.js` which is **gitignored** and never committed to GitHub.

⚠️ **Client-Side Limitation**: This is a client-side JavaScript app, so the API key is visible in the browser's developer tools. This is acceptable for:
- Internal tools used by trusted team members
- Development and prototyping

❌ **Not Suitable For**: Public-facing production websites where anyone can access the key.

**For Production Deployment**, you need to:
1. Build a backend API proxy that holds the key server-side
2. Have the frontend call your backend instead of Airtable directly
3. Or use Airtable's OAuth flow for user-specific authentication

### Input Sanitization

✅ **XSS Protection**: All user inputs are escaped using `textContent` before injecting into HTML to prevent cross-site scripting attacks.

## Troubleshooting

### Companies don't load
- **Check if `config.js` exists** - You must create it from `config.template.js`
- Verify your API key in `config.js` is correct
- Check browser console for API errors (404 means config.js not found)
- Ensure base ID matches your Airtable base

### Founders not found
- Verify `current_company_slug` matches the selected company
- Check `is_founder` field is set to TRUE (checkbox)
- Look for typos in company_slug values

### Connections not showing
- Verify relationships exist in `people_relationships` table
- Check `person_id` and `related_person_id` are linked record fields
- Ensure related person has a record in `people_companies`

### Preview not updating
- Click "Generate Preview" after changing inputs
- Check browser console for JavaScript errors
- Refresh page and try again

## Development

### File Structure
```
newsletter-export-tool/
├── index.html       # UI structure (form + preview pane)
├── script.js        # Business logic (Airtable API, newsletter generation)
├── style.css        # Styling (responsive grid, clean design)
└── README.md        # Documentation (this file)
```

### Key Functions

- `initializeApp()` - Fetch companies, populate dropdown
- `onCompanySelected()` - Load founders for selected company
- `generatePreview()` - Enrich founders with connections, generate HTML
- `fetchRelationships()` - Query bidirectional relationships
- `generateNewsletterHTML()` - Build HTML with inline styles
- `downloadNewsletter()` - Create blob and trigger download
- `airtableRequest()` - Utility for API calls with error handling

## Newsletter Storage & Browsing

**Centralized Storage:**
All exported newsletters are saved to `/docs/newsletters/` for centralized management.

**Browse All Newsletters:**
Open `/docs/index.html` in your browser to see a list of all generated newsletters with quick links to view each one.

**Workflow:**
1. Generate newsletter using this tool
2. Save to `/docs/newsletters/` folder when prompted
3. Update the newsletter list in `/docs/index.html` (line 135-137) to add your new newsletter
4. Open `/docs/index.html` to browse all newsletters

**Example entry in `/docs/index.html`:**
```javascript
{ title: "RealVantage Newsletter", url: "newsletters/realvantage-newsletter.html", date: "Jan 20, 2026" }
```

## Future Enhancements

Potential improvements:
- [ ] Email preview in multiple clients (Gmail, Outlook, etc.)
- [ ] Copy to clipboard button for HTML
- [ ] Save drafts to localStorage
- [ ] Batch export for multiple companies
- [ ] Custom styling options (font size, colors)
- [ ] Backend API proxy to hide credentials
- [ ] Export to Markdown format
- [ ] Integration with email service providers (SendGrid, Mailchimp)

## Support

For questions or issues:
1. Check this README for troubleshooting tips
2. Review `database_structure.md` for Airtable schema details
3. Inspect browser console for error messages
4. Verify data exists in Airtable before reporting bugs

## License

Internal tool for TIA People Data project.

---

**Last Updated:** 2026-01-20
**Version:** 1.0.1
**Tool Type:** Web-based (client-side JavaScript)
