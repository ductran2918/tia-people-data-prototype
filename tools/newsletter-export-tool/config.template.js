// Airtable Configuration Template
// Copy this file to config.js and add your actual API key

const AIRTABLE_CONFIG = {
    baseId: 'appt8YGOz5bOK6RpR',
    apiKey: 'YOUR_AIRTABLE_API_KEY_HERE',
    tables: {
        companies: 'tbl6FbkvaaZJHNjlv',
        people_companies: 'tbl2GFODrbUmOjJUY',
        people_relationships: 'tblBUetr6XUt7lZhl'
    }
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIRTABLE_CONFIG };
}
