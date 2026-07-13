import React from 'react';
import { getImageUrl, formatImageUrl } from '../utils/imageUtils';

/**
 * Example component demonstrating how to use the image utilities
 */
function ImageExample() {
  // Example image object in the format received from API
  const imageObject = {
    "_meta": {
      "schema": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"
    },
    "id": "a23a88be-feff-4443-b856-91c306ccc92f",
    "name": "ROW13-MDB-WEB-KITCHEN-4CTA-01APR24",
    "endpoint": "homecentre",
    "defaultHost": "media.homecentre.com",
    "mimeType": "image/jpeg"
  };

  // Example using individual parameters
  const host = "media.homecentre.com";
  const endpoint = "homecentre";
  const imageName = "HDB-WEB-EN-NEWARRIVALS-FF-AUG2";
  
  // Examples of different image object structures
  const imageExamples = [
    {
      title: "Complete Object",
      data: {
        name: "ROW13-MDB-WEB-KITCHEN-4CTA-01APR24",
        endpoint: "homecentre",
        defaultHost: "media.homecentre.com"
      }
    },
    {
      title: "Nested Values Structure",
      data: {
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
    },
    {
      title: "Minimal Object",
      data: {
        name: "HDB-WEB-EN-NEWARRIVALS-FF-AUG2"
      }
    },
    {
      title: "String URL",
      data: "https://media.homecentre.com/i/homecentre/HDB-WEB-EN-NEWARRIVALS-FF-AUG2"
    },
    {
      title: "Object with URL property",
      data: {
        url: "https://media.homecentre.com/i/homecentre/ROW13-MDB-WEB-KITCHEN-4CTA-01APR24"
      }
    }
  ];

  return (
    <div className="image-example">
      <h2>Image URL Examples</h2>
      
      <div className="example-section">
        <h3>Using Image Object</h3>
        <p>Original object: </p>
        <pre>{JSON.stringify(imageObject, null, 2)}</pre>
        <p>Generated URL: {getImageUrl(imageObject)}</p>
        <img 
          src={getImageUrl(imageObject)} 
          alt="Kitchen CTA" 
          style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
        />
      </div>

      <div className="example-section">
        <h3>Using Individual Parameters</h3>
        <p>Host: {host}</p>
        <p>Endpoint: {endpoint}</p>
        <p>Image Name: {imageName}</p>
        <p>Generated URL: {formatImageUrl(host, endpoint, imageName)}</p>
        <img 
          src={formatImageUrl(host, endpoint, imageName)} 
          alt="New Arrivals" 
          style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
        />
      </div>
      
      <div className="example-section">
        <h3>Handling Different Image Object Structures</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
          {imageExamples.map((example, index) => (
            <div key={index} style={{border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '300px'}}>
              <h4>{example.title}</h4>
              <p>Input: <pre>{JSON.stringify(example.data, null, 2)}</pre></p>
              <p>Generated URL: {getImageUrl(example.data)}</p>
              
              {/* Direct URL construction examples */}
              {typeof example.data === 'object' && example.data.name && (
                <p>
                  Direct construction:
                  https://media.homecentre.com/i/homecentre/{example.data.name}
                </p>
              )}
              
              {/* Nested values structure */}
              {typeof example.data === 'object' &&
               example.data.values &&
               example.data.values[0]?.value?.name && (
                <p>
                  Nested construction:
                  https://media.homecentre.com/i/homecentre/{example.data.values[0].value.name}
                </p>
              )}
              
              <div style={{marginTop: '10px'}}>
                <p>Image preview:</p>
                <img
                  src={getImageUrl(example.data)}
                  alt={`Example ${index + 1}`}
                  style={{maxWidth: '100%', height: 'auto'}}
                  onError={(e) => {
                    // Fallback for direct construction if utility function fails
                    if (typeof example.data === 'object' && example.data.values && example.data.values[0]?.value?.name) {
                      e.target.src = `https://media.homecentre.com/i/homecentre/${example.data.values[0].value.name}`;
                    } else if (typeof example.data === 'object' && example.data.name) {
                      e.target.src = `https://media.homecentre.com/i/homecentre/${example.data.name}`;
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageExample;