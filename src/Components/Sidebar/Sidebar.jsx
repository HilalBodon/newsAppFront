import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, 
  onCategoryClick, updateCategories,
  onHomePageToggle, onPostComponentToggle,
  onCategoryToggle, onSettingsToggle, isValidToken }) => {

  const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/categories');
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
    
      fetchCategories();
    }, [categories]);
    
    

  const handleOverlayClick = () => {
    if (isOpen) {
      onClose();
    }
  };

  const handleCategoryClick = (category) => {

      onCategoryClick(category.name);
    
  };

  
  return (
    <div>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={handleOverlayClick}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='roaya-name'>مركز زاوية رؤية الثقافية </div> 

      {window.innerWidth < 770 && isValidToken && (
          <ul className='list-styling'>
            <li className="nav-item" onClick={onHomePageToggle}>Home</li>
            <li className="nav-item" onClick={onPostComponentToggle}>Manage Posts</li>
            <li className="nav-item" onClick={onCategoryToggle}>Manage Categories</li>
            <li className="nav-item" onClick={onSettingsToggle}>More Settings</li>
            <hr className="separator"/>
          </ul>
        )}

        <ul className='list-styling'>
          {categories.map((category) => (
            <li key={category._id} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;