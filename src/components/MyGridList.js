import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import './GridList.css';

const MyGridList = ({ sortOrder }) => {
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/exhibits', {
          params: { sortOrder }
        });
        setExhibits(response.data);
      } catch (error) {
        console.error('Failed to fetch exhibits:', error);
      }
    };

    fetchExhibits();
  }, [sortOrder]);

  return (
    <div className="my-grid-list">
      {exhibits.map(exhibit => (
        <div key={exhibit.id} className="exhibit-item">
          <img src={exhibit.poster_url} alt={exhibit.title} />
          <div>{exhibit.title}</div>
        </div>
      ))}
    </div>
  );
};

export default MyGridList;
