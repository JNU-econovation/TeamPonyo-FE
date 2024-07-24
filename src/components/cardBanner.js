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
            <img className='CardPoster' src={item.poster_url} alt="Poster" />
          </div>
          <div className='CardInfo'>
            <div className={`CardTitle CardRight ${isAllEnglish(item.title) ? 'Eng' : 'noEng'}`}>{item.title}</div>
            <div className='CardAuthor CardRight'>{item.nickname}</div>
            <div className='CardDate CardRight'>{item.open_times}</div>
            <div className='CardLocation CardLeft'>{item.address}</div>
          </div>
        </div>
      
    </div>
  );
};

export default CardBanner;
