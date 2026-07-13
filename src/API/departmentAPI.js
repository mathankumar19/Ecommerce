import axios from 'axios';

// API endpoints for different departments
const DEPARTMENT_ENDPOINTS = {
  baby: 'https://homecentre-development.cdn.content.amplience.net/content/key/homecentreae-babydepartment?depth=all&format=inlined',
  furniture: 'https://homecentre-development.cdn.content.amplience.net/content/key/homecentreae-furnituredepartment?depth=all&format=inlined',
  household: 'https://homecentre-development.cdn.content.amplience.net/content/key/homecentreae-householddepartment?depth=all&format=inlined',
  babyandkids: 'https://homecentre-development.cdn.content.amplience.net/content/key/homecentreae-babyandkidsdepartment?depth=all&format=inlined',
  newarrivals: 'https://homecentre-development.cdn.content.amplience.net/content/key/homecentreae-newarrivalsdepartment?depth=all&format=inlined'
};

// Function to fetch department data
export const fetchDepartmentData = async (departmentType) => {
  try {
    if (!DEPARTMENT_ENDPOINTS[departmentType]) {
      throw new Error(`Invalid department type: ${departmentType}`);
    }
    
    const response = await axios.get(DEPARTMENT_ENDPOINTS[departmentType]);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${departmentType} department data:`, error);
    throw error;
  }
};