# Image URL Structure Documentation

## Overview

This document explains the URL structure used for images in our e-commerce application, particularly for content delivered through a CDN like Amplience. It also covers how to organize and display banners by slots using sliders.

## URL Structure

The image URLs follow this pattern:

```
https://{defaultHost}/i/{endpoint}/{name}
```

Where:

- `{defaultHost}`: The CDN host domain (e.g., "media.homecentre.com")
- `/i/`: A fixed path segment that is standard in this URL structure
- `{endpoint}`: The service endpoint or account name (e.g., "homecentre")
- `{name}`: The specific image identifier, which often contains metadata about the image

## Example

Given an image object from the API:

```json
{
  "_meta": {
    "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
  },
  "id": "a23a88be-feff-4443-b856-91c306ccc92f",
  "name": "ROW13-MDB-WEB-KITCHEN-4CTA-01APR24",
  "endpoint": "homecentre",
  "defaultHost": "media.homecentre.com",
  "mimeType": "image/jpeg"
}
```

The resulting URL would be:

```
https://media.homecentre.com/i/homecentre/ROW13-MDB-WEB-KITCHEN-4CTA-01APR24
```

## Usage in Code

We provide utility functions in `src/utils/imageUtils.js` to handle this conversion:

### Using the `getImageUrl` function:

```javascript
import { getImageUrl } from '../utils/imageUtils';

// With an image object from the API
const imageUrl = getImageUrl(imageObject);
// Result: https://media.homecentre.com/i/homecentre/ROW13-MDB-WEB-KITCHEN-4CTA-01APR24

// In JSX
<img src={getImageUrl(banner.desktopImage)} alt="Banner" />
```

### Using the `formatImageUrl` function:

```javascript
import { formatImageUrl } from '../utils/imageUtils';

// With individual parameters
const imageUrl = formatImageUrl('media.homecentre.com', 'homecentre', 'HDB-WEB-EN-NEWARRIVALS-FF-AUG2');
// Result: https://media.homecentre.com/i/homecentre/HDB-WEB-EN-NEWARRIVALS-FF-AUG2
```

### Direct URL Construction (Fallback Method)

If the utility functions don't work for some reason, you can always construct the URL directly:

```javascript
// Direct construction with string template
const imageUrl = `https://media.homecentre.com/i/homecentre/${imageName}`;

// In JSX with fallback
<img
  src={getImageUrl(banner.desktopImage)}
  alt="Banner"
  onError={(e) => {
    // Fallback if the utility function doesn't work
    if (banner.desktopImage && banner.desktopImage.name) {
      e.target.src = `https://media.homecentre.com/i/homecentre/${banner.desktopImage.name}`;
    }
  }}
/>
```

## Handling Different Image Object Structures

Our enhanced `getImageUrl` function can handle various image object structures:

1. **Complete Object** with defaultHost, endpoint, and name:
   ```javascript
   {
     name: "ROW13-MDB-WEB-KITCHEN-4CTA-01APR24",
     endpoint: "homecentre",
     defaultHost: "media.homecentre.com"
   }
   ```

2. **Nested Values Structure** (common in some APIs):
   ```javascript
   {
     values: [
       {
         value: {
           name: "HDB-WEB-EN-NEWARRIVALS-FF-AUG2",
           endpoint: "homecentre",
           defaultHost: "media.homecentre.com"
         }
       }
     ]
   }
   ```
   
   Access in JSX:
   ```javascript
   // Using the utility function (handles the nested structure automatically)
   <img src={getImageUrl(banner.desktopImage)} alt="Banner" />
   
   // Direct access (if needed)
   <img src={`https://media.homecentre.com/i/homecentre/${banner.desktopImage.values[0].value.name}`} alt="Banner" />
   ```

3. **Minimal Object** with just the name (uses default values for host and endpoint):
   ```javascript
   {
     name: "HDB-WEB-EN-NEWARRIVALS-FF-AUG2"
   }
   ```

4. **String URL** (returned as-is):
   ```javascript
   "https://media.homecentre.com/i/homecentre/HDB-WEB-EN-NEWARRIVALS-FF-AUG2"
   ```

5. **Object with URL property**:
   ```javascript
   {
     url: "https://media.homecentre.com/i/homecentre/ROW13-MDB-WEB-KITCHEN-4CTA-01APR24"
   }
   ```

6. **Object with _meta structure** (from Amplience):
   ```javascript
   {
     "_meta": {
       "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
     },
     "id": "a23a88be-feff-4443-b856-91c306ccc92f",
     "name": "ROW13-MDB-WEB-KITCHEN-4CTA-01APR24",
     "endpoint": "homecentre",
     "defaultHost": "media.homecentre.com"
   }
   ```

## Image Name Structure

The image name often follows a pattern that includes information about:

- Type of content (HDB, MDB, WEB)
- Department or category (NEWARRIVALS, KITCHEN)
- Campaign type (FF, 4CTA)
- Date or version information (AUG2, 01APR24)

For example:
- `HDB-WEB-EN-NEWARRIVALS-FF-AUG2`
- `ROW13-MDB-WEB-KITCHEN-4CTA-01APR24`

## Organizing Banners by Slots with Sliders

In the Department.js component, we've implemented a system to organize banners by slots and display them in sliders. This approach:

1. Iterates through all slots in the data structure
2. Identifies banner content in each slot (looking for properties like `trendingBanners`, `banners`, or `sliderBanners`)
3. Creates a separate slider for each slot's banners
4. Applies consistent styling and error handling for each banner
5. Implements automatic sliding functionality for better user experience

### Implementation Example with Sliders

```javascript
// Import required libraries
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  arrows: true
};

// Function to render banners by slot with sliders
const renderBannersBySlot = () => {
  // Check if data and content slots exist
  if (!data?.content?.slots) {
    return null;
  }
  
  // Create an array to hold all slot banner sections
  const slotSections = [];
  
  // Process each slot
  for (const [slotKey, slotValue] of Object.entries(data.content.slots)) {
    // Skip if no contentTypes or not an array
    if (!slotValue.contentTypes || !Array.isArray(slotValue.contentTypes)) {
      continue;
    }
    
    // Find banner data in this slot
    const bannerContentType = slotValue.contentTypes.find(
      contentType => contentType && typeof contentType === 'object' &&
      (contentType.trendingBanners || contentType.banners || contentType.sliderBanners)
    );
    
    // Extract banner data from whatever property it's in
    let bannerData = null;
    let bannerTitle = "Banners";
    
    if (bannerContentType) {
      if (bannerContentType.trendingBanners) {
        bannerData = bannerContentType.trendingBanners;
        bannerTitle = "Trending Banners";
      } else if (bannerContentType.banners) {
        bannerData = bannerContentType.banners;
        bannerTitle = "Banners";
      } else if (bannerContentType.sliderBanners) {
        bannerData = bannerContentType.sliderBanners;
        bannerTitle = "Slider Banners";
      }
    }
    
    // If we found banner data, create a section for this slot
    if (bannerData && Array.isArray(bannerData) && bannerData.length > 0) {
      // Create a section for this slot's banners with a slider
      slotSections.push(
        <div key={slotKey} className="slot-banners-container">
          <h3>Slot {slotKey}: {bannerTitle}</h3>
          
          {/* Slider for this slot's banners */}
          <div className="slider-container">
            <Slider {...sliderSettings}>
              {bannerData.map((banner, index) => (
                <div key={index} className="banner-slide">
                  <h4>Banner {index + 1}: {banner.title || `Banner ${index + 1}`}</h4>
                  
                  <img
                    src={typeof banner.desktopImage === 'string' ?
                      banner.desktopImage :
                      (banner.desktopImage?.values && banner.desktopImage.values[0]?.value ?
                        getImageUrl(banner.desktopImage.values[0].value) :
                        getImageUrl(banner.desktopImage))}
                    alt={`Slot ${slotKey} Banner ${index + 1}`}
                    className="banner-image"
                    onError={(e) => {
                      // Fallback if the utility function doesn't work
                      if (banner.desktopImage?.values && banner.desktopImage.values[0]?.value?.name) {
                        e.target.src = `https://media.homecentre.com/i/homecentre/${banner.desktopImage.values[0].value.name}`;
                      }
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      );
    }
  }
  
  // If we found any banner sections, return them wrapped in a container
  if (slotSections.length > 0) {
    return (
      <div className="all-slots-banners-container">
        <h2>Banners By Slot</h2>
        {slotSections}
      </div>
    );
  }
  
  // If no banner sections were found, return null
  return null;
};
```

This approach provides a more organized and interactive way to display banners from different slots. Each slot gets its own slider, making it easier for users to navigate through the banners and for developers to understand the structure of the content and debug any issues with image URLs.

### Benefits of Slot-wise Sliders

1. **Better Organization**: Each slot's content is clearly separated and labeled
2. **Enhanced User Experience**: Automatic sliding provides a dynamic and engaging interface
3. **Space Efficiency**: Multiple banners can be displayed in the same space
4. **Consistent Styling**: Each slider follows the same design pattern
5. **Easier Debugging**: Clear separation makes it easier to identify and fix issues with specific slots or banners