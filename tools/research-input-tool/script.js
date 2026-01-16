// Global state
let formData = {
    linkedinUrl: '',
    workHistory: [],
    selectedCompanies: [],
    founderName: '',
    companyName: '',
    companyWebsite: '',
    founderRole: '',
    coFounders: '',
    searchFocus: '',
    recentEvents: ''
};

// Step navigation
function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });

    // Show target step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update step indicator
    for (let i = 1; i <= stepNumber; i++) {
        document.querySelector(`.step[data-step="${i}"]`).classList.add(i === stepNumber ? 'active' : 'completed');
    }
}

function goToStep2() {
    const linkedinUrl = document.getElementById('linkedinUrl').value.trim();
    if (!linkedinUrl) {
        showToast('Please enter a LinkedIn URL', 'error');
        return;
    }
    if (!linkedinUrl.includes('linkedin.com')) {
        showToast('Please enter a valid LinkedIn URL', 'error');
        return;
    }
    formData.linkedinUrl = linkedinUrl;
    goToStep(2);
}

function goToStep3() {
    if (formData.selectedCompanies.length === 0) {
        showToast('Please select at least one company', 'error');
        return;
    }
    goToStep(3);
}

// Work history extraction
function showManualInput() {
    document.getElementById('manualInputSection').style.display = 'block';
    document.getElementById('autoExtractSection').style.display = 'none';
}

function showAutoExtract() {
    document.getElementById('autoExtractSection').style.display = 'block';
    document.getElementById('manualInputSection').style.display = 'none';
}

function parseWorkHistory() {
    const text = document.getElementById('workHistoryText').value.trim();
    if (!text) {
        showToast('Please enter work history', 'error');
        return;
    }

    // Parse work history
    const lines = text.split('\n').filter(line => line.trim());
    formData.workHistory = lines.map((line, index) => {
        // Try to parse: Company (Years) - Role
        const match = line.match(/^(.+?)\s*\(([^)]+)\)\s*-\s*(.+)$/);
        if (match) {
            return {
                id: index,
                company: match[1].trim(),
                years: match[2].trim(),
                role: match[3].trim(),
                raw: line
            };
        } else {
            return {
                id: index,
                company: line.trim(),
                years: '',
                role: '',
                raw: line
            };
        }
    });

    displayWorkHistorySelection();
}

function requestAutoExtract() {
    const message = `Please send the following to Manus AI:

"Extract work history from this LinkedIn profile: ${formData.linkedinUrl}

Return the work history in this format:
Company Name (Year-Year) - Role
Company Name (Year-Year) - Role
..."

After receiving the response, paste it into the Manual Input section.`;

    alert(message);
    showManualInput();
}

function displayWorkHistorySelection() {
    const container = document.getElementById('companyCheckboxes');
    container.innerHTML = '';

    formData.workHistory.forEach(job => {
        const div = document.createElement('div');
        div.className = 'checkbox-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `company-${job.id}`;
        checkbox.value = job.id;
        checkbox.onchange = updateSelectedCompanies;
        
        const label = document.createElement('label');
        label.htmlFor = `company-${job.id}`;
        label.innerHTML = `<strong>${job.company}</strong> ${job.years ? `(${job.years})` : ''} ${job.role ? `- ${job.role}` : ''}`;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
    });

    document.getElementById('workHistorySelection').style.display = 'block';
}

function updateSelectedCompanies() {
    const checkboxes = document.querySelectorAll('#companyCheckboxes input[type="checkbox"]:checked');
    formData.selectedCompanies = Array.from(checkboxes).map(cb => {
        const jobId = parseInt(cb.value);
        return formData.workHistory.find(job => job.id === jobId);
    });
}

// Generate search strategy
function generateStrategy() {
    // Collect data from Step 3
    formData.founderName = document.getElementById('founderName').value.trim();
    formData.companyName = document.getElementById('companyName').value.trim();
    formData.companyWebsite = document.getElementById('companyWebsite').value.trim();
    formData.founderRole = document.getElementById('founderRole').value.trim();
    formData.coFounders = document.getElementById('coFounders').value.trim();
    formData.searchFocus = document.getElementById('searchFocus').value.trim();
    formData.recentEvents = document.getElementById('recentEvents').value.trim();

    // Validate required fields
    if (!formData.founderName || !formData.companyName || !formData.companyWebsite || !formData.founderRole) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    // Generate markdown
    const markdown = generateMarkdown();
    document.getElementById('strategyOutput').value = markdown;
    
    goToStep(4);
    showToast('Search strategy generated successfully!', 'success');
}

function generateMarkdown() {
    const date = new Date().toISOString().split('T')[0];
    
    let md = `# Founder Research Strategy\n\n`;
    md += `**Generated:** ${date}  \n`;
    md += `**Tool:** Founder Research Input Tool v1.0\n\n`;
    md += `---\n\n`;
    
    // Basic Information
    md += `## Basic Information\n\n`;
    md += `- **Founder Name:** ${formData.founderName}\n`;
    md += `- **Company Name:** ${formData.companyName}\n`;
    md += `- **Company Website:** ${formData.companyWebsite}\n`;
    md += `- **Founder Role:** ${formData.founderRole}\n`;
    md += `- **LinkedIn URL:** ${formData.linkedinUrl}\n`;
    if (formData.coFounders) {
        md += `- **Co-founders:** ${formData.coFounders}\n`;
    }
    if (formData.searchFocus) {
        md += `- **Search Focus:** ${formData.searchFocus}\n`;
    }
    md += `\n---\n\n`;
    
    // Work History
    md += `## Work History (Tech Companies for Search)\n\n`;
    if (formData.selectedCompanies.length > 0) {
        formData.selectedCompanies.forEach(job => {
            md += `- **${job.company}** ${job.years ? `(${job.years})` : ''} ${job.role ? `- ${job.role}` : ''}\n`;
        });
    } else {
        md += `*No previous tech companies selected*\n`;
    }
    md += `\n---\n\n`;
    
    // Recent Events
    if (formData.recentEvents) {
        md += `## Recent Events\n\n`;
        md += `${formData.recentEvents}\n\n`;
        md += `---\n\n`;
    }
    
    // Keyword Map
    md += `## Keyword Map\n\n`;
    md += `### Person Keywords\n`;
    md += `- Full name: "${formData.founderName}"\n`;
    const nameParts = formData.founderName.split(' ');
    if (nameParts.length > 1) {
        md += `- Variations: "${nameParts[0]} ${nameParts[nameParts.length-1][0]}", "${nameParts[0][0]} ${nameParts[nameParts.length-1]}"\n`;
    }
    md += `\n`;
    
    md += `### Company Keywords\n`;
    md += `- Official name: "${formData.companyName}"\n`;
    md += `- Domain: "${formData.companyWebsite}"\n`;
    md += `\n`;
    
    if (formData.selectedCompanies.length > 0) {
        md += `### Previous Tech Company Keywords\n`;
        formData.selectedCompanies.forEach(job => {
            md += `- "${job.company}"\n`;
        });
        md += `\n`;
    }
    
    if (formData.coFounders) {
        md += `### Co-founder Keywords\n`;
        const coFounderList = formData.coFounders.split(',').map(name => name.trim());
        coFounderList.forEach(name => {
            md += `- "${name}"\n`;
        });
        md += `\n`;
    }
    
    md += `---\n\n`;
    
    // Search Strategy
    md += `## Search Strategy\n\n`;
    md += `### Phase 1: LinkedIn Posts BY Founder\n\n`;
    md += `**Search queries:**\n`;
    md += `\`\`\`\n`;
    md += `site:linkedin.com/in/[handle]/\n`;
    md += `site:linkedin.com "${formData.founderName}" "${formData.companyName}"\n`;
    md += `"${formData.founderName}" linkedin post\n`;
    md += `\`\`\`\n\n`;
    
    md += `### Phase 2: LinkedIn Posts TAGGING Founder\n\n`;
    md += `**Search queries:**\n`;
    md += `\`\`\`\n`;
    md += `site:linkedin.com "@${formData.founderName}" OR "${formData.founderName}"\n`;
    md += `"congratulations ${formData.founderName}"\n`;
    md += `"thanks ${formData.founderName}"\n`;
    md += `\`\`\`\n\n`;
    
    md += `### Phase 3: Podcast Appearances\n\n`;
    md += `**Search queries:**\n`;
    md += `\`\`\`\n`;
    md += `"${formData.founderName}" podcast\n`;
    md += `"${formData.founderName}" interview audio\n`;
    md += `"${formData.companyName}" founder podcast\n`;
    md += `site:youtube.com "${formData.founderName}" interview\n`;
    md += `site:spotify.com "${formData.founderName}"\n`;
    md += `\`\`\`\n\n`;
    
    md += `### Phase 4: Articles & Interviews\n\n`;
    md += `**Search queries:**\n`;
    md += `\`\`\`\n`;
    md += `"${formData.founderName}" interview\n`;
    md += `"${formData.founderName}" "${formData.companyName}" TechCrunch OR "Tech in Asia" OR e27\n`;
    md += `"${formData.founderName}" profile\n`;
    md += `"${formData.founderName}" founder story\n`;
    md += `\`\`\`\n\n`;
    
    md += `### Phase 5: Conference & Event Appearances\n\n`;
    md += `**Search queries:**\n`;
    md += `\`\`\`\n`;
    md += `"${formData.founderName}" conference OR event OR panel\n`;
    md += `"${formData.founderName}" speaker\n`;
    md += `site:youtube.com "${formData.founderName}" panel\n`;
    md += `\`\`\`\n\n`;
    
    if (formData.coFounders) {
        md += `### Phase 6: Co-founder Cross-Reference\n\n`;
        md += `**Search queries:**\n`;
        md += `\`\`\`\n`;
        const coFounderList = formData.coFounders.split(',').map(name => name.trim());
        coFounderList.forEach(coFounder => {
            md += `"${formData.founderName}" "${coFounder}"\n`;
        });
        md += `\`\`\`\n\n`;
    }
    
    if (formData.selectedCompanies.length > 0) {
        const phaseNum = formData.coFounders ? 7 : 6;
        md += `### Phase ${phaseNum}: Former Colleague Discovery\n\n`;
        md += `**Search queries for each tech company:**\n\n`;
        formData.selectedCompanies.forEach(job => {
            md += `**${job.company}:**\n`;
            md += `\`\`\`\n`;
            md += `"${formData.founderName}" "${job.company}" colleagues\n`;
            md += `"${formData.founderName}" "${job.company}" team\n`;
            md += `"${formData.founderName}" "${job.company}" worked with\n`;
            md += `"${formData.founderName}" "former ${job.company}"\n`;
            md += `site:linkedin.com "${formData.founderName}" "${job.company}" colleague\n`;
            md += `\`\`\`\n\n`;
        });
    }
    
    // Tier 2 Sources
    md += `---\n\n`;
    md += `## Tier 2 Sources (Documented Relationships)\n\n`;
    
    md += `### Company Website\n`;
    md += `**Pages to check:**\n`;
    md += `- ${formData.companyWebsite}/about\n`;
    md += `- ${formData.companyWebsite}/team\n`;
    md += `- ${formData.companyWebsite}/leadership\n`;
    md += `- ${formData.companyWebsite}/advisors\n\n`;
    
    md += `### Crunchbase\n`;
    md += `**URL:** Search for "${formData.companyName}" on Crunchbase\n\n`;
    
    md += `### Tech in Asia Database\n`;
    md += `**Search queries:**\n`;
    md += `\`\`\`\n`;
    md += `site:techinasia.com "${formData.companyName}"\n`;
    md += `site:techinasia.com "${formData.founderName}"\n`;
    md += `\`\`\`\n\n`;
    
    md += `### Funding Announcements\n`;
    md += `**Search queries:**\n`;
    md += `\`\`\`\n`;
    md += `"${formData.companyName}" "Series A" OR "Series B" OR "Series C"\n`;
    md += `"${formData.companyName}" funding announcement\n`;
    md += `"${formData.companyName}" raises OR raised\n`;
    md += `\`\`\`\n\n`;
    
    // Expected Output
    md += `---\n\n`;
    md += `## Expected Output\n\n`;
    md += `- **Target:** 15-20 sources (Tier 1 + Tier 2)\n`;
    md += `- **Estimated relationships:** 40-60\n`;
    md += `- **Research depth:** Deep (comprehensive search)\n`;
    md += `- **Focus:** Southeast Asia tech community connections\n\n`;
    
    // Next Steps
    md += `---\n\n`;
    md += `## Next Steps\n\n`;
    md += `1. Execute search queries across all platforms\n`;
    md += `2. Collect source URLs with previews\n`;
    md += `3. Score each source (HIGH/MEDIUM/LOW value)\n`;
    md += `4. Present source list for approval\n`;
    md += `5. Read approved sources\n`;
    md += `6. Extract relationships with context\n`;
    md += `7. Populate Airtable database\n\n`;
    
    md += `---\n\n`;
    md += `**Generated by:** Founder Research Input Tool  \n`;
    md += `**For questions:** Refer to docs/manusai_search_methodology.md\n`;
    
    return md;
}

// Download and copy functions
function downloadStrategy() {
    const markdown = document.getElementById('strategyOutput').value;
    const filename = `${formData.founderName.replace(/\s+/g, '-').toLowerCase()}-research-strategy.md`;
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Strategy downloaded successfully!', 'success');
}

function copyStrategy() {
    const markdown = document.getElementById('strategyOutput').value;
    navigator.clipboard.writeText(markdown).then(() => {
        showToast('Strategy copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy to clipboard', 'error');
    });
}

function resetForm() {
    if (confirm('Are you sure you want to start a new research? All current data will be lost.')) {
        formData = {
            linkedinUrl: '',
            workHistory: [],
            selectedCompanies: [],
            founderName: '',
            companyName: '',
            companyWebsite: '',
            founderRole: '',
            coFounders: '',
            searchFocus: '',
            recentEvents: ''
        };
        
        // Clear all inputs
        document.querySelectorAll('input, textarea').forEach(el => el.value = '');
        document.getElementById('workHistorySelection').style.display = 'none';
        document.getElementById('manualInputSection').style.display = 'none';
        document.getElementById('autoExtractSection').style.display = 'none';
        
        goToStep(1);
        showToast('Form reset. Ready for new research!', 'success');
    }
}

// Toast notifications
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
