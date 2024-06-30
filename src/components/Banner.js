import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Banner.css';
//import CardBanner from './CardBanner.js';

const Banner = () => {

  return (
    <Swiper
      direction={'horizontal'}
      slidesPerView={5}
      spaceBetween={300}
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
      <SwiperSlide>Slide1</SwiperSlide>
      <SwiperSlide>Slide2</SwiperSlide>
      <SwiperSlide>Slide3</SwiperSlide>
      <SwiperSlide>Slide4</SwiperSlide>
      <SwiperSlide>Slide5</SwiperSlide>
    </Swiper>
  );
};

export default Banner;
