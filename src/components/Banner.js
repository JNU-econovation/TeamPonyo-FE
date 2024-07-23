import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Banner.css';
import CardBanner from './CardBanner.js';
import { cardList } from '../mokupData/infoData.js';

const Banner = () => {

  return (
    <Swiper
      direction={'horizontal'}
      slidesPerView={3}
      /** spaceBetween={200} **/
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
