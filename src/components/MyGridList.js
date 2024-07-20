import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GridList.css';
import { ReactComponent as Arrow1 } from '../Arrow1.svg';

const MyGridList = ({ sortOrder }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/exhibits', {
          params: {
            sort: sortOrder === 'LATEST' ? null : 'POPULARITY',
            number: 10, // 예시로 10개의 전시를 가져옴
            page_number: 1
          }
        });
        setItems(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [sortOrder]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='gridList'>
      <div className='postGrid'>
        {items.map(item => (
          <div key={item.exhibit_id} className='gridItem'>
            <div className='imageContainer'>
              <img 
                className='poster' 
                src={`data:${item.poster.mime_type};base64,${item.poster.base64_image}`} 
                alt='게시물' 
              />
              <div className='overlay'>
                <div>자세히 보기</div>
                <Arrow1 className='arrow' />
                <div className='moreEn'>more</div>
              </div>
            </div>
            <div className='postInfo'>
              <div className='postTitle'>{item.title}</div>
              <div className='postPeriod'>{item.period}</div>
              <div className='postState'>{item.exhibit_status === 'ONGOING' ? '전시중' : item.exhibit_status === 'BEFORE' ? '전시 전' : '전시 종료'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyGridList;
