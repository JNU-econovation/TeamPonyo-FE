import React from 'react'
import GridList from '../components/GridList'
import Banner from '../components/Banner'
// import MainSlide from '../components/MainSlide'
import { SearchBox } from '../components/SearchBox'

const Main = () => {
  return (
    <div className='Main'>
      <SearchBox/>
      <Banner />
      <GridList />
    </div>
  )
}

export default Main