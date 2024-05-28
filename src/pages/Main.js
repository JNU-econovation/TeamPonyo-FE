import React from 'react'
import GridList from '../components/GridList'
import Banner from '../components/Banner'
import CardBanner from '../components/CardBanner'
import MainSlide from '../components/MainSlide'

const Main = () => {
  return (
    <div>
      <CardBanner />
      <MainSlide />
      <Banner />
      <GridList />
    </div>
  )
}

export default Main