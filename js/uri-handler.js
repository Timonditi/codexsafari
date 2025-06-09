/**
 * URI Handler for CodeXSafari
 * This module provides functionality for handling and generating URIs
 */

class URIHandler {
    constructor() {
        this.baseUrl = window.location.origin;
        this.zohoCRMDomain = 'https://js.zoho.com';
    }

    /**
     * Generate a URI with the given path and parameters
     * @param {string} path - The path segment of the URI
     * @param {Object} params - Query parameters as key-value pairs
     * @returns {string} The complete URI
     */
    generateURI(path = '', params = {}) {
        // Remove leading slash if present
        path = path.startsWith('/') ? path.substring(1) : path;
        
        // Create URL object
        const url = new URL(path, this.baseUrl);
        
        // Add query parameters
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        
        return url.toString();
    }

    /**
     * Generate a Zoho CRM JavaScript URL for embedding
     * @param {Object} config - Configuration object
     * @param {string} config.widgetCode - Your Zoho widget code
     * @param {string} [config.environment='production'] - Environment (production/development)
     * @returns {string} The complete Zoho CRM JavaScript URL
     */
    generateZohoCRMJsUrl(config) {
        const environment = config.environment || 'production';
        return `${this.zohoCRMDomain}/crm/javascript/zcga.js`;
    }

    /**
     * Generate Zoho CRM Widget Embed URL
     * @param {Object} config - Configuration object
     * @param {string} config.widgetCode - Your Zoho widget code
     * @returns {string} The complete Zoho CRM Widget URL
     */
    generateZohoCRMWidgetUrl(config) {
        if (!config.widgetCode) {
            throw new Error('Widget code is required');
        }
        return `${this.zohoCRMDomain}/crm/javascript/${config.widgetCode}`;
    }

    /**
     * Parse a URI string into its components
     * @param {string} uri - The URI to parse
     * @returns {Object} An object containing the URI components
     */
    parseURI(uri) {
        const url = new URL(uri);
        return {
            protocol: url.protocol,
            host: url.host,
            pathname: url.pathname,
            search: Object.fromEntries(url.searchParams),
            hash: url.hash
        };
    }

    /**
     * Encode a URI component safely
     * @param {string} component - The URI component to encode
     * @returns {string} The encoded URI component
     */
    encodeURIComponent(component) {
        return encodeURIComponent(component);
    }

    /**
     * Decode a URI component
     * @param {string} component - The URI component to decode
     * @returns {string} The decoded URI component
     */
    decodeURIComponent(component) {
        return decodeURIComponent(component);
    }
}

// Create a singleton instance
const uriHandler = new URIHandler();

// Export for use in other modules
export default uriHandler; 