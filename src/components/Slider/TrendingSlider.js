import React from 'react';
import Slider from 'react-slick';
import { extractImageUrl } from './imageUtils';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TrendingSlider.css";

/**
 * TrendingSlider component for displaying trending products/banners in a slider
 * 
 * @param {Object} props Component props
 * @param {Object} props.data The data containing slots and content types
 * @returns {JSX.Element} The slider component
 */
const TrendingSlider = ({ data }) => {
  // Function to parse desktop layout name (e.g., "1X5" means 1 row and 5 columns)
  const parseLayoutName = (layoutName) => {
    if (!layoutName || typeof layoutName !== 'string') {
      return { rows: 1, columns: 6 }; // Default to 1X6 based on user feedback
    }
    
    const match = layoutName.match(/(\d+)X(\d+)/i);
    if (match && match.length === 3) {
      return {
        rows: parseInt(match[1], 10) || 1,
        columns: parseInt(match[2], 10) || 6
      };
    }
    
    return { rows: 1, columns: 6 }; // Default to 1X6 based on user feedback
  };
  
  // Default slider settings
  const getSliderSettings = (columns = 4) => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: columns, // Use columns from layout
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(columns, 3),
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(columns, 2),
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Function to extract trending banners from Section3ASlot
  const extractContentTypes = () => {
    if (!data?.content?.slots) {
      return [];
    }

    // Find the Section3ASlot
    let section3ASlot = null;
    
    for (const [, slotValue] of Object.entries(data.content.slots)) {
      if (slotValue.slotId === "Section3ASlot") {
        section3ASlot = slotValue;
        break;
      }
    }

    if (!section3ASlot) {
      console.log("Section3ASlot not found");
      return [];
    }

    // Return all contentTypes that have trendingBanners
    if (section3ASlot.contentTypes && Array.isArray(section3ASlot.contentTypes)) {
      const contentTypesWithBanners = section3ASlot.contentTypes
        .filter(contentType => 
          contentType && 
          typeof contentType === 'object' && 
          contentType.trendingBanners && 
          Array.isArray(contentType.trendingBanners) &&
          contentType.trendingBanners.length > 0
        )
        .map((contentType, index) => {
          // Make sure title is a string, not an object
          let title = `Trending Items ${index + 1}`;
          if (contentType.title) {
            if (typeof contentType.title === 'string') {
              title = contentType.title;
            } else if (typeof contentType.title === 'object') {
              // Handle localized values format
              if (contentType.title.values && Array.isArray(contentType.title.values)) {
                // Try to find English value first
                const englishValue = contentType.title.values.find(val => val.locale === 'en');
                if (englishValue && englishValue.value) {
                  title = englishValue.value;
                } else if (contentType.title.values.length > 0 && contentType.title.values[0].value) {
                  // Fallback to first value if English not found
                  title = contentType.title.values[0].value;
                }
              } else {
                // Fallback to stringified object if not in expected format
                title = JSON.stringify(contentType.title);
              }
            }
          }
          
          // Get layout information
          const desktopLayoutName = contentType.desktopLayoutname || "1X6";
          const { columns } = parseLayoutName(desktopLayoutName);
          console.log("Content Type:", contentType);
          console.log("Desktop Layout Name:", desktopLayoutName);
          return {
            id: `content-type-${index}`,
            title: title,
            banners: contentType.trendingBanners,
            columns: columns,
            desktopLayoutName: desktopLayoutName
          };
        });
      
      console.log(`Found ${contentTypesWithBanners.length} content types with trending banners`);
      return contentTypesWithBanners;
    }

    return [];
  };

  // Get content types with trending banners
  const contentTypes = extractContentTypes();

  // If no content types found, return null
  if (contentTypes.length === 0) {
    return null;
  }

  // Render a separate slider for each content type
  return (
    <div className="trending-sliders-container">
      {contentTypes.map(contentType => (
        <div key={contentType.id} className="trending-slider-section">
          <h2 className="trending-section-title">
            {contentType.title}
          </h2>
          
          <div className="trending-slider">
            <div className="slider-container">
              {/* Use the desktopLayoutName from the contentType */}
              <div className="layout-group">
                <Slider {...getSliderSettings(contentType.columns)}>
                  {contentType.banners.map((item, index) => (
                    <div key={`${contentType.id}-item-${index}`} className="trending-item">
                      <div>
                        <img
                          src={extractImageUrl(item)}
                          alt={typeof item.title === 'string' ? item.title : ''}
                        />
                        <h3>{typeof item.title === 'string' ? item.title : ''}</h3>
                        {typeof item.price === 'string' && <p>{item.price}</p>}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingSlider;