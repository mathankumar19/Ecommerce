import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDepartment } from '../actions/departmentActions';
import RotatingSlider from '../components/Slider/RotatingSlider';
import TrendingSlider from '../components/Slider/TrendingSlider';
import '../styles/Department.css';

function Department() {
  const dispatch = useDispatch();
  const { type } = useParams();
  const { loading, data, error } = useSelector(state => state.department);
  
  // Get department type from URL parameter or default to 'baby'
  const departmentType = type || 'baby';
  
  useEffect(() => {
    // Dispatch action to fetch department data
    dispatch(fetchDepartment(departmentType));
  }, [dispatch, departmentType]);
  
  if (loading) {
    return <div className="loading">Loading {departmentType} department data...</div>;
  }
  
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="department-page" style={{ width: '100%' }}>
      {/* Display the rotating banner slider */}
      {data && (
        <div className="department-content" style={{ width: '100%' }}>
          <RotatingSlider data={data} />
          <TrendingSlider data={data} />
        </div>
      )}
    </div>
  );
}

export default Department;
