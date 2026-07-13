/**
 * Utility functions for handling image URLs
 */

/**
 * Constructs a CDN image URL from an image object
 *
 * @param {Object|string} imageObj - The image object with CDN details or a direct URL string
 * @param {string} imageObj.defaultHost - The CDN host (e.g., "media.homecentre.com")
 * @param {string} imageObj.endpoint - The endpoint/account (e.g., "homecentre")
 * @param {string} imageObj.name - The image name/identifier
 * @returns {string} The complete image URL
 */
export const getImageUrl = (imageObj) => {
  // Handle null or undefined image object
  if (!imageObj) return '';
  
  // If it's already a string URL, return it as is
  if (typeof imageObj === 'string') return imageObj;
  
  console.log('Image object received:', imageObj);
  
  // Handle the nested values structure (desktopImage.values[0].value)
  if (imageObj.values && Array.isArray(imageObj.values) && imageObj.values.length > 0 && imageObj.values[0].value) {
    console.log('Found nested values structure, extracting value:', imageObj.values[0].value);
    return getImageUrl(imageObj.values[0].value);
  }
  
  // Handle different possible structures
  
  // Case 1: Direct object with defaultHost, endpoint, name
  if (imageObj.defaultHost && imageObj.endpoint && imageObj.name) {
    return `https://${imageObj.defaultHost}/i/${imageObj.endpoint}/${imageObj.name}`;
  }
  
  // Case 2: Nested structure with _meta
  if (imageObj._meta && imageObj.id && imageObj.name) {
    // Try to find endpoint and defaultHost
    const endpoint = imageObj.endpoint || 'homecentre'; // Default if not provided
    const defaultHost = imageObj.defaultHost || 'media.homecentre.com'; // Default if not provided
    return `https://${defaultHost}/i/${endpoint}/${imageObj.name}`;
  }
  
  // Case 3: Simple object with just a URL property
  if (imageObj.url) {
    return imageObj.url;
  }
  
  // Case 4: Simple object with just a src property
  if (imageObj.src) {
    return imageObj.src;
  }
  
  // Case 5: If we have at least a name, try to construct with defaults
  if (imageObj.name) {
    const endpoint = imageObj.endpoint || 'homecentre'; // Default if not provided
    const defaultHost = imageObj.defaultHost || 'media.homecentre.com'; // Default if not provided
    return `https://${defaultHost}/i/${endpoint}/${imageObj.name}`;
  }
  
  // If we can't determine the structure, log a warning and return empty string
  console.warn('Unrecognized image object structure:', imageObj);
  return '';
};

/**
 * Alternative function that accepts individual parameters
 * 
 * @param {string} host - The CDN host (e.g., "media.homecentre.com")
 * @param {string} endpoint - The endpoint/account (e.g., "homecentre")
 * @param {string} name - The image name/identifier
 * @returns {string} The complete image URL
 */
export const formatImageUrl = (host, endpoint, name) => {
  if (!host || !endpoint || !name) return '';
  return `https://${host}/i/${endpoint}/${name}`;
};