import React from 'react'
import GridList from '../components/GridList'
import Banner from '../components/Banner'
import CardBanner from '../components/CardBanner'


const Main = () => {
  return (
    <div>
      <CardBanner />
      <Banner />
      <GridList />
    </div>
  )
}

export default Main