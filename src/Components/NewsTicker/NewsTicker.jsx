import React, { useEffect, useState } from 'react';
import './NewsTicker.css';

const NewsTicker = () => {
  const [importantPosts, setImportantPosts] = useState([]);


  const API_URL = 'https://news-webapp-backend.onrender.com';

  useEffect(() => {
    const fetchImportantPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/important-posts`);
        const data = await response.json();
        setImportantPosts(data);
      } catch (error) {
        console.error('Error fetching important posts:', error);
      }
    };

    fetchImportantPosts();
  }, []);

  return (

    <div className="news-ticker">
      <div className="news-container" id="news-container">
        {importantPosts.map((post) => (
            <div className="news-item" key={post._id}>
            | {post.title} |
          </div>
        ))}
      </div>
        <p className='live-word'>آخر المستجدات</p>
    </div>
  );
};

export default NewsTicker;

