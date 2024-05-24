import React from 'react'
import './CardBanner.css'
import kmuposter from '../kmuposter.png'

const cardList = [
  {
    poster: kmuposter,
    title: "OVER THE DIMENSION",
    author: "국민대학교 공간 디자인학과",
    content: "23회 졸업 전시회",
    date: "2023. 11. 10 - 11. 19",
    location: "국민대학교 조형관 1F 2F"
  },
]

const CardBanner = () => {
  return (
    <div className='CardBanner'>
        {cardList.map((item, index) => (
            <div className='CardContainer' key={index}>

              <img className='CardPoster' src={item.poster}/>
              <div className='CardInfo'>
                <div className='CardTitle CardRight'>{item.title}</div>
                <div className='CardAuthor CardRight'>{item.author}</div>
                <div className='CardContent CardRight'>{item.content}</div>
                <div className='CardDate CardRight'>{item.date}</div>
                <div className='CardLocation CardLeft'>{item.location}</div>
              </div>

            </div>
          ))}
        
    </div>
  )
}

export default CardBanner