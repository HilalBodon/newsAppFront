import React, { useState, useEffect } from 'react';

const VideoSection = () => {
  const [videoLink, setVideoLink] = useState('');

  const API_URL = 'https://news-webapp-backend.onrender.com';


  const convertToEmbedLink = (youtubeUrl) => {
    const videoId = youtubeUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : null;
  };

  useEffect(() => {
    const fetchVideoLink = async () => {
      try {
        const response = await fetch(`${API_URL}/settings`);
        const settings = await response.json();
        setVideoLink(convertToEmbedLink(settings.videoLink) || '');
      } catch (error) {
        console.error('Error fetching video link:', error);
      }
    };

    fetchVideoLink();
  }, []);

  return (
    <div className="video-section">
      <div className="video-container">
        <iframe
          src={videoLink}
          title="Playing Video From YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
