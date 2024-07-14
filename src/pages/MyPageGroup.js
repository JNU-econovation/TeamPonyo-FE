import React from 'react'
import Profile from '../components/Profile'
import GridList from '../components/GridList'
import '../design/MyPageGrid.css'
import HorizonLine from '../components/HorizonLine'

const MyPageGroup = () => {
  return (
   
      <div>
      <Profile
              profileImage={null} 
              nickname="ECONOVATION"
              Id="econovation"
              introduction="전남대학교 IT 개발 동아리 에코노베이션입니다."/>
      <HorizonLine/>
        <div className='MyPageContainer'>
          <GridList />
        </div>
      </div>
  )
}

export default MyPageGroup
