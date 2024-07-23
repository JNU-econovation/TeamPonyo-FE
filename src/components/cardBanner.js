import React from 'react';
import './CardBanner.css';

const CardBanner = ({ item }) => {

  const isAllEnglish = (text) => {
    // 문자열이 모두 영어 알파벳으로만 구성되어 있는지 검사하는 정규식
    return /^[A-Za-z\s]+$/.test(text);
  };


  return (
    <div className='CardBanner'>
      <div className='CardContainer'>
        <div className='CardPosterContainer'>
          <img className='CardPoster' src={item.poster} alt="Poster" />
        </div>
        <div className='CardInfo'>
          <div className={`CardTitle CardRight ${isAllEnglish(item.title) ? 'Eng' : 'noEng'}`}>{item.title}</div>
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
