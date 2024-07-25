import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Banner.css';
import CardBanner from './CardBanner';
import axios from 'axios';

const Banner = () => {
  const [cardList, setCardList] = useState([]);
  const number = 5;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/exhibits/banners', {
          params: { number }
        });
        setCardList(response.data);
      } catch (error) {
        console.error('Failed to fetch banners', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Swiper
      direction={'horizontal'}
      slidesPerView={3}
      spaceBetween={700} //20
      centeredSlides={true}
      
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      slidesOffsetBefore={745} // 슬라이드 왼쪽 오프셋 조정
      slidesOffsetAfter={0} // 슬라이드 오른쪽 오프셋 조정

      style={{ width: '100%', justifyContent: 'center', marginBottom: '80px' }}
    >
      {cardList.map((item, index) => (
        <SwiperSlide key={index}>
          <CardBanner item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
