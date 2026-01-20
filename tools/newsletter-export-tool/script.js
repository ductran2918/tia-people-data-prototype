// Airtable Configuration - Loaded from config.js
// AIRTABLE_CONFIG is defined in config.js which is loaded before this script
// See config.template.js for the structure

// Global Application State
let appState = {
    companies: [],                  // All companies from Airtable
    selectedCompany: null,          // Currently selected company object
    founders: [],                   // Founders of selected company
    foundersWithConnections: [],    // Founders enriched with their connections
    newsletter: {                   // Newsletter content
        title: '',
        content: '',
        link: ''
    },
    htmlOutput: ''                  // Generated HTML for download
};

// Text Formatting Functions - Apply bold/italic to selected text in textarea
function applyFormatting(format) {
    const textarea = document.getElementById('companyNews');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (!selectedText) {
        showToast('Please select text to format', 'error');
        return;
    }

    let formattedText = '';

    // Apply markdown syntax for formatting
    if (format === 'bold') {
        formattedText = `**${selectedText}**`;
    } else if (format === 'italic') {
        formattedText = `*${selectedText}*`;
    }

    // Replace selected text with formatted version
    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    textarea.value = newValue;

    // Set cursor position after the formatted text
    const newCursorPos = start + formattedText.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    textarea.focus();

    showToast(`${format.charAt(0).toUpperCase() + format.slice(1)} formatting applied`, 'success');
}

// Convert markdown formatting to HTML
function markdownToHtml(text) {
    // Convert **text** to <strong>text</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert *text* to <em>text</em> (but avoid converting already processed **)
    text = text.replace(/(?<!\*)\*(?!\*)([^*]+?)\*(?!\*)/g, '<em>$1</em>');

    return text;
}

// Keyboard shortcuts for formatting (Ctrl/Cmd + B for bold, Ctrl/Cmd + I for italic)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('companyNews').addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            applyFormatting('bold');
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
            e.preventDefault();
            applyFormatting('italic');
        }
    });
});

// Company Autocomplete Functions
function setupCompanyAutocomplete() {
    const searchInput = document.getElementById('companySearch');
    const dropdown = document.getElementById('companyDropdown');

    // Show all companies on focus
    searchInput.addEventListener('focus', () => {
        if (!searchInput.value) {
            displayCompanyResults(appState.companies);
        }
    });

    // Filter companies as user types
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (!query) {
            displayCompanyResults(appState.companies);
            return;
        }

        // Filter companies by name (case-insensitive)
        const filtered = appState.companies.filter(company =>
            company.name.toLowerCase().includes(query)
        );

        displayCompanyResults(filtered);
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Handle keyboard navigation (optional enhancement)
    searchInput.addEventListener('keydown', (e) => {
        const items = dropdown.querySelectorAll('.autocomplete-item');
        const activeItem = dropdown.querySelector('.autocomplete-item.active');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!activeItem) {
                items[0]?.classList.add('active');
            } else {
                activeItem.classList.remove('active');
                const next = activeItem.nextElementSibling;
                if (next) next.classList.add('active');
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (activeItem) {
                activeItem.classList.remove('active');
                const prev = activeItem.previousElementSibling;
                if (prev) prev.classList.add('active');
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeItem) {
                activeItem.click();
            }
        }
    });
}

function displayCompanyResults(companies) {
    const dropdown = document.getElementById('companyDropdown');

    if (companies.length === 0) {
        dropdown.innerHTML = '<div class="autocomplete-item no-results">No companies found</div>';
        dropdown.style.display = 'block';
        return;
    }

    dropdown.innerHTML = '';

    companies.forEach(company => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.textContent = company.name;
        item.dataset.slug = company.slug;

        item.addEventListener('click', () => {
            selectCompany(company);
        });

        dropdown.appendChild(item);
    });

    dropdown.style.display = 'block';
}

function selectCompany(company) {
    const searchInput = document.getElementById('companySearch');
    const dropdown = document.getElementById('companyDropdown');

    // Update input with selected company name
    searchInput.value = company.name;

    // Hide dropdown
    dropdown.style.display = 'none';

    // Trigger company selection (simulate event for onCompanySelected)
    onCompanySelected({ target: { value: company.slug } });
}

// Initialize app on page load
document.addEventListener('DOMContentLoaded', async () => {
    await initializeApp();
});

// Initialize the application - fetch companies and populate dropdown
async function initializeApp() {
    try {
        showLoading(true);

        // Fetch all companies from Airtable
        const records = await airtableRequest(AIRTABLE_CONFIG.tables.companies);

        console.log(`Fetched ${records.length} company records from Airtable`);

        // Map and filter companies, logging any that are excluded
        const allMapped = records.map(record => ({
            id: record.id,
            name: record.fields.company_name || '',
            slug: record.fields.company_slug || '',
            website: record.fields.company_website || '',
            country: record.fields.company_location_country || ''
        }));

        const excluded = allMapped.filter(company => !company.name || !company.slug);
        if (excluded.length > 0) {
            console.warn(`Excluding ${excluded.length} companies with missing name or slug:`, excluded);
        }

        appState.companies = allMapped.filter(company => company.name && company.slug);
        console.log(`Loaded ${appState.companies.length} valid companies`);

        // Sort companies alphabetically by name
        appState.companies.sort((a, b) => a.name.localeCompare(b.name));

        // Setup autocomplete for company search
        setupCompanyAutocomplete();

        showLoading(false);
        showToast('Companies loaded successfully!', 'success');
    } catch (error) {
        showLoading(false);
        showToast(`Error loading companies: ${error.message}`, 'error');
        console.error('Initialization error:', error);
    }
}

// Handle company selection from dropdown
async function onCompanySelected(event) {
    const selectedSlug = event.target.value;

    if (!selectedSlug) {
        appState.selectedCompany = null;
        appState.founders = [];
        appState.foundersWithConnections = [];
        return;
    }

    // Find the selected company object
    appState.selectedCompany = appState.companies.find(c => c.slug === selectedSlug);

    // Pre-fetch founders in background (without enriching connections yet)
    try {
        showLoading(true);

        // Fetch founders where current_company_slug matches AND is_founder is TRUE
        const filterFormula = `AND({current_company_slug}="${selectedSlug}", {is_founder}=TRUE())`;
        const founderRecords = await airtableRequest(AIRTABLE_CONFIG.tables.people_companies, filterFormula);

        if (founderRecords.length === 0) {
            showLoading(false);
            showToast('No founders found for this company', 'error');
            appState.founders = [];
            return;
        }

        appState.founders = founderRecords.map(record => ({
            id: record.id,
            name: record.fields.name || '',
            role: record.fields.role || '',
            linkedin_url: record.fields.linkedin_url || '',
            current_company_slug: record.fields.current_company_slug || '',
            outgoing_relationships: record.fields.outgoing_relationships || [],
            incoming_relationships: record.fields.incoming_relationships || []
        }));

        showLoading(false);
        showToast(`Found ${appState.founders.length} founder(s)`, 'success');
    } catch (error) {
        showLoading(false);
        showToast(`Error loading founders: ${error.message}`, 'error');
        console.error('Founder fetch error:', error);
    }
}

// Generate preview - this enriches founders with connections and generates HTML
async function generatePreview() {
    // Validate all required inputs
    const newsTitle = document.getElementById('newsTitle').value.trim();
    const companyNews = document.getElementById('companyNews').value.trim();
    const newsLink = document.getElementById('newsLink').value.trim();

    if (!appState.selectedCompany) {
        showToast('Please select a company', 'error');
        return;
    }

    if (!newsTitle || !companyNews || !newsLink) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    if (appState.founders.length === 0) {
        showToast('No founders found for selected company', 'error');
        return;
    }

    // Update newsletter state
    appState.newsletter = { title: newsTitle, content: companyNews, link: newsLink };

    try {
        showLoading(true);

        // Enrich each founder with their connections
        appState.foundersWithConnections = [];

        for (const founder of appState.founders) {
            const enrichedFounder = { ...founder, connections: [] };

            try {
                // Fetch bidirectional relationships using the founder's relationship IDs
                const relationships = await fetchRelationships(founder);

                // For each relationship, fetch the connected person's details
                const connectionPromises = relationships.map(async (rel) => {
                    try {
                        const connectedPersonId = getConnectionId(rel, founder.id);
                        const personRecord = await airtableRequest(
                            AIRTABLE_CONFIG.tables.people_companies,
                            `RECORD_ID()="${connectedPersonId}"`
                        );

                        if (personRecord.length === 0) return null;

                        const person = personRecord[0].fields;

                        // Fetch the connected person's company details
                        let companyInfo = { name: '', website: '' };
                        if (person.current_company_slug) {
                            // Normalize the slug for case-insensitive comparison with whitespace trimming
                            const normalizedSlug = person.current_company_slug.trim().toLowerCase();
                            console.log(`Looking for company with slug: "${person.current_company_slug}" (normalized: "${normalizedSlug}") for person: ${person.name}`);

                            const companyMatch = appState.companies.find(
                                c => c.slug.trim().toLowerCase() === normalizedSlug
                            );

                            if (companyMatch) {
                                console.log(`Found company: ${companyMatch.name}`);
                                companyInfo = { name: companyMatch.name, website: companyMatch.website };
                            } else {
                                console.warn(`Company not found for slug "${person.current_company_slug}". Available slugs:`, appState.companies.map(c => c.slug));
                            }
                        } else {
                            console.log(`No current_company_slug for person: ${person.name}`);
                        }

                        return {
                            name: person.name || '',
                            linkedin_url: person.linkedin_url || '',
                            role: person.role || '',
                            company_name: companyInfo.name,
                            company_website: companyInfo.website,
                            relationship_context: rel.fields.relationship_context || '',
                            relationship_type: rel.fields.relationship_type || '',
                            source_url: rel.fields.source_url || ''
                        };
                    } catch (err) {
                        console.error('Error fetching connection details:', err);
                        return null;
                    }
                });

                const connections = await Promise.all(connectionPromises);
                enrichedFounder.connections = connections.filter(c => c !== null);

            } catch (err) {
                console.error(`Error fetching relationships for ${founder.name}:`, err);
            }

            appState.foundersWithConnections.push(enrichedFounder);
        }

        // Generate the newsletter HTML
        const html = generateNewsletterHTML(appState);
        appState.htmlOutput = html;

        // Display preview in the preview pane
        document.getElementById('previewPane').innerHTML = html;

        // Enable download button
        document.getElementById('downloadBtn').disabled = false;

        showLoading(false);
        showToast('Newsletter preview generated!', 'success');

    } catch (error) {
        showLoading(false);
        showToast(`Error generating preview: ${error.message}`, 'error');
        console.error('Preview generation error:', error);
    }
}

// Fetch relationships for a founder using their relationship IDs
async function fetchRelationships(founder) {
    try {
        // Combine outgoing and incoming relationship IDs
        const relationshipIds = [
            ...(founder.outgoing_relationships || []),
            ...(founder.incoming_relationships || [])
        ];

        console.log(`Fetching ${relationshipIds.length} relationships for founder: ${founder.name}`);

        if (relationshipIds.length === 0) {
            console.log('No relationships found in founder record');
            return [];
        }

        // Fetch relationship records by OR-ing their IDs
        const orConditions = relationshipIds.map(id => `RECORD_ID()="${id}"`).join(',');
        const filterFormula = `OR(${orConditions})`;

        console.log(`Filter formula: ${filterFormula}`);

        const relationships = await airtableRequest(AIRTABLE_CONFIG.tables.people_relationships, filterFormula);
        console.log(`Successfully fetched ${relationships.length} relationships`);

        return relationships;
    } catch (error) {
        console.error('Error fetching relationships:', error);
        return [];
    }
}

// Determine the connected person's ID based on which field the founder is in
function getConnectionId(relationship, founderRecordId) {
    const fields = relationship.fields;

    console.log(`Getting connection ID for relationship:`, {
        relationshipId: relationship.id,
        person_id: fields.person_id,
        related_person_id: fields.related_person_id,
        founderRecordId: founderRecordId
    });

    // If founder is person_id, return related_person_id
    if (fields.person_id && fields.person_id[0] === founderRecordId) {
        const connId = fields.related_person_id ? fields.related_person_id[0] : null;
        console.log(`Founder is person_id, returning related_person_id: ${connId}`);
        return connId;
    }

    // If founder is related_person_id, return person_id
    if (fields.related_person_id && fields.related_person_id[0] === founderRecordId) {
        const connId = fields.person_id ? fields.person_id[0] : null;
        console.log(`Founder is related_person_id, returning person_id: ${connId}`);
        return connId;
    }

    console.log(`No matching ID found, returning null`);
    return null;
}

// Generate standalone newsletter HTML with inline styles
function generateNewsletterHTML(appState) {
    const { newsletter, selectedCompany, foundersWithConnections } = appState;

    // Escape HTML entities to prevent XSS
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    const safeTitle = escapeHtml(newsletter.title);
    const safeLink = escapeHtml(newsletter.link);

    // Process company news: escape HTML first, then convert markdown to HTML
    const safeContent = escapeHtml(newsletter.content);
    const formattedContent = markdownToHtml(safeContent);

    let html = `<div class="newsletter-preview">`;

    // Part 1: Funding News Section
    html += `<h1>${safeTitle}</h1>`;
    html += `<p>${formattedContent.replace(/\n/g, '<br>')}</p>`;
    html += `<p><a href="${safeLink}" target="_blank">Read full article on TechInAsia.com</a></p>`;

    // Separator line
    html += `<hr class="separator">`;

    // Part 2: Meet the Founders Section
    html += `<h2>Meet the founders of ${escapeHtml(selectedCompany.name)}</h2>`;
    html += `<p class="linkedin-hint">Click names to view LinkedIn profiles</p>`;

    foundersWithConnections.forEach((founder) => {
        html += `<div class="founder-section">`;

        // Founder name (with LinkedIn link) and role
        if (founder.linkedin_url) {
            html += `<div class="founder-name"><a href="${escapeHtml(founder.linkedin_url)}" target="_blank">${escapeHtml(founder.name)}</a>: ${escapeHtml(founder.role)}</div>`;
        } else {
            html += `<div class="founder-name">${escapeHtml(founder.name)}: ${escapeHtml(founder.role)}</div>`;
        }

        // Connections subsection
        html += `<div class="connections-subsection">`;
        html += `<h3>Want to reach out to this founder? These people can help open doors</h3>`;

        if (founder.connections && founder.connections.length > 0) {
            founder.connections.forEach((connection) => {
                html += `<div class="connection-item">`;

                // Connection name with LinkedIn link
                if (connection.linkedin_url) {
                    html += `<strong><a href="${escapeHtml(connection.linkedin_url)}" target="_blank">${escapeHtml(connection.name)}</a></strong>: `;
                } else {
                    html += `<strong>${escapeHtml(connection.name)}</strong>: `;
                }

                // Role at Company
                html += `${escapeHtml(connection.role)}`;

                if (connection.company_name) {
                    html += ` at `;
                    if (connection.company_website) {
                        html += `<a href="${escapeHtml(connection.company_website)}" target="_blank">${escapeHtml(connection.company_name)}</a>`;
                    } else {
                        html += escapeHtml(connection.company_name);
                    }
                }

                // Relationship context
                if (connection.relationship_context) {
                    html += ` - ${escapeHtml(connection.relationship_context)}`;
                }

                // Source URL link
                if (connection.source_url) {
                    html += ` <a href="${escapeHtml(connection.source_url)}" target="_blank" class="source-link">(Source)</a>`;
                }

                html += `</div>`;
            });
        } else {
            // No connections fallback message
            html += `<p class="no-connections">We don't have the data on this founder's relationship map at the moment. We will update soon.</p>`;
        }

        html += `</div>`; // Close connections-subsection
        html += `</div>`; // Close founder-section
    });

    html += `</div>`; // Close newsletter-preview

    return html;
}

// Download newsletter as HTML file
function downloadNewsletter() {
    if (!appState.htmlOutput) {
        showToast('No newsletter to download. Generate preview first.', 'error');
        return;
    }

    // Create standalone HTML document with inline styles for email compatibility
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${appState.newsletter.title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 16px;
        }
        h2 {
            color: #333;
            font-size: 20px;
            margin: 24px 0 16px;
        }
        h3 {
            color: #555;
            font-size: 16px;
            margin: 16px 0 12px;
        }
        p {
            margin-bottom: 16px;
        }
        a {
            color: #0A66C2;
            text-decoration: underline;
        }
        a:hover {
            opacity: 0.8;
        }
        .separator {
            border: none;
            border-top: 1px solid #ddd;
            margin: 32px 0;
        }
        .linkedin-hint {
            font-size: 14px;
            color: #666;
            font-style: italic;
            margin-top: -8px;
            margin-bottom: 16px;
        }
        .founder-section {
            margin-bottom: 32px;
        }
        .founder-name {
            font-weight: bold;
            margin-bottom: 8px;
        }
        .connections-subsection {
            margin-left: 20px;
            margin-top: 12px;
        }
        .connection-item {
            margin-bottom: 8px;
        }
        .source-link {
            font-size: 12px;
            color: #999;
        }
        .no-connections {
            color: #999;
            font-style: italic;
        }
    </style>
</head>
<body>
    ${appState.htmlOutput.replace('<div class="newsletter-preview">', '').replace(/<\/div>$/, '')}
</body>
</html>`;

    // Create blob and trigger download
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appState.selectedCompany.slug}-newsletter.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Newsletter downloaded successfully!', 'success');
}

// Airtable API Request Utility
async function airtableRequest(tableId, filterFormula = '') {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${tableId}`;
    const params = filterFormula ? `?filterByFormula=${encodeURIComponent(filterFormula)}` : '';

    const response = await fetch(url + params, {
        headers: {
            'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Airtable API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data.records || [];
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Loading spinner control
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    spinner.className = show ? 'loading-spinner show' : 'loading-spinner';
}
