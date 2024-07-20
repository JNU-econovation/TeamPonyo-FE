import React from 'react'
import './Footer.css'
import axiosInstance from '../api/axiosInstance'

const footer = () => {

  const handleLogoClick = async () => {
    try {
      const response = await axiosInstance.post('/test/api/v1/auth/signup/team', {
        access_token: "sample"
      })
      const accessToken = response.data.access_token
      console.log('team test accessToken: ', accessToken)
      sessionStorage.setItem('access_token', accessToken)
    } catch (error) {
      console.error ('테스트 팀계정 로그인 에러', error)
    }
  }

  return (
    <div className='Footer'>
        <div className='footerLogo' onClick={handleLogoClick}>서비스 로고</div>
        <div className='footerBottom'>이메일 문의 / 개인정보 처리방침</div>
    </div>
  )
}

export default footer