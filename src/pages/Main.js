import React from 'react'
import GridList from '../components/GridList'
import Banner from '../components/Banner'
import CardBanner from '../components/CardBanner'
// import MainSlide from '../components/MainSlide'
import { SearchBox } from '../components/SearchBox'

const Main = () => {
  return (
    <div>
      <SearchBox/>
      <CardBanner />
      <Banner />
      <GridList />
    </div>
  )
}

export default Main