/**
 * Utility functions for handling image URLs in sliders
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
export const constructImageUrl = (imageObj) => {
  // Handle null or undefined image object
  if (!imageObj) return '';
  
  // If it's already a string URL, return it as is
  if (typeof imageObj === 'string') return imageObj;
  
  // Handle the nested values structure (desktopImage.values[0].value)
  if (imageObj.values && Array.isArray(imageObj.values) && imageObj.values.length > 0 && imageObj.values[0].value) {
    return constructImageUrl(imageObj.values[0].value);
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
  
  // If we can't determine the structure, return empty string
  return '';
};

/**
 * Extracts image URL from a banner object that might have nested structure
 * 
 * @param {Object} banner - The banner object containing image data
 * @param {Object} banner.desktopImage - The desktop image object or nested structure
 * @returns {string} The image URL
 */
export const extractImageUrl = (banner) => {
  if (!banner || !banner.desktopImage) return '';
  
  const desktopImage = banner.desktopImage;
  
  // Check if it has the nested values structure
  if (desktopImage.values && Array.isArray(desktopImage.values) && 
      desktopImage.values.length > 0 && desktopImage.values[0].value) {
    return constructImageUrl(desktopImage.values[0].value);
  } 
  
  // Otherwise try to construct from the desktopImage directly
  return constructImageUrl(desktopImage);
};