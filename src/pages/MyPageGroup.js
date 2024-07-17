import React from 'react'
import Profile from '../components/Profile'
import GridList from '../components/GridList'
import '../design/MyPageGrid.css'
import Follow from '../components/Follow'
import HorizonLine from '../components/HorizonLine'
import '../design/MyPage.css'
const MyPageGroup = () => {
  return (
   
      <div>
        <div className='profile-container'>
      <Profile
              profileImage={null} 
              nickname="ECONOVATION"
              Id="econovation"
              introduction="전남대학교 IT 개발 동아리 에코노베이션입니다."/>
        <Follow
          FollowerNumber={120} // 팔로워 수
          FollowingNumber={150} // 팔로잉 수
        />
        </div>
      <HorizonLine/>
        <div className='MyPageContainer'>
          <GridList />
        </div>
      </div>
  )
}

export default MyPageGroup

