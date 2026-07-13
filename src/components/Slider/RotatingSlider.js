import React from 'react';
import Slider from 'react-slick';
import { extractImageUrl } from './imageUtils';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RotatingSlider.css";

/**
 * RotatingSlider component for displaying banner images in a slider
 * 
 * @param {Object} props Component props
 * @param {Array} props.data The data containing slots and content types
 * @returns {JSX.Element} The slider component
 */
const RotatingSlider = ({ data }) => {
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


  // Function to find and extract rotating banner images
  const extractRotatingBannerImages = () => {
    if (!data?.content?.slots) {
      return [];
    }

    // Find the HomePageRotatingBannerSlot
    let rotatingBannerSlot = null;
    
    for (const [, slotValue] of Object.entries(data.content.slots)) {
      if (slotValue.slotId === "HomePageRotatingBannerSlot") {
        rotatingBannerSlot = slotValue;
        break;
      }
    }

    if (!rotatingBannerSlot) {
      return [];
    }

    // Find the contentTypes with rotatingImagesData
    if (!rotatingBannerSlot.contentTypes || !Array.isArray(rotatingBannerSlot.contentTypes)) {
      return [];
    }

    const rotatingImagesContent = rotatingBannerSlot.contentTypes.find(
      contentType => contentType && typeof contentType === 'object' && contentType.rotatingImagesData
    );

    if (!rotatingImagesContent || !rotatingImagesContent.rotatingImagesData) {
      return [];
    }

    const rotatingImages = rotatingImagesContent.rotatingImagesData;
    
    if (!Array.isArray(rotatingImages) || rotatingImages.length === 0) {
      return [];
    }

    // Prepare images for the slider
    return rotatingImages.map((image, index) => {
      // Extract image URL using the utility function
      const imageUrl = extractImageUrl(image);
      
      return {
        index,
        imageUrl,
        title: image.title || `Image ${index + 1}`
      };
    }).filter(item => item.imageUrl); // Filter out items without valid URLs
  };

  // Get the slider images
  const sliderImages = extractRotatingBannerImages();

  // If no images found, return null
  if (sliderImages.length === 0) {
    return null;
  }

  // Render the slider
  return (
    <div className="rotating-banner-slider">
      <div className="slider-container" style={{ width: '100%', margin: 0, padding: 0 }}>
        <Slider {...sliderSettings}>
          {sliderImages.map((item) => (
            <div key={item.index} className="slider-item">
              <div style={{ padding: 0 }}>
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RotatingSlider;