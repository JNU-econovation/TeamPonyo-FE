import React from 'react';
import './CardBanner.css';

const CardBanner = ({ item }) => {
  return (
    <div className='CardBanner'>
      <div className='CardContainer'>
        <img className='CardPoster' src={item.poster} alt="Poster" />
        <div className='CardInfo'>
          <div className='CardTitle CardRight'>{item.title}</div>
          <div className='CardAuthor CardRight'>{item.author}</div>
          <div className='CardContent CardRight'>{item.content}</div>
          <div className='CardDate CardRight'>{item.date}</div>
          <div className='CardLocation CardLeft'>{item.location}</div>
        </div>
      </div>
    </div>
  );
};

export default CardBanner;
