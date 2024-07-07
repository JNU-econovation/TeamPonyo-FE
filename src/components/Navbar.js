import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../logo.svg'

function Navbar() {

    const [nickName, setNickrName] = useState("서윤")
    const [isLogin, setIsLogin] = useState(true)
    const [notification, setNotification] = useState(false)


    function isNotification(){

        // 알림 있는지 확인해서 있으면 아래 문장 실행하도록 조건 처리하기
        setNotification(!notification)
    }

  return (
    <div className='Header'>

        <div className='HeaderContents'>

            <div className='NavBar'>
                <div className='NavLogo'><Link to={'/'}><Logo /></Link></div>
                <ul className='NavCategories'>
                        <li className='InnerItem'><Link to={'/category/all'}>전체</Link></li>
                        <li className='InnerItem'><Link to={'/category/exhibition'}>전시회</Link></li>
                        <li className='InnerItem'><Link to={'/category/performance'}>공연</Link></li>
                        <li className='InnerItem'><Link to={'/category/contest'}>공모전 및 대회</Link></li>
                        <li className='InnerItem'><Link to={'/category/event'}>행사</Link></li>
                    </ul>
            </div>
            <div className={`NavRight ${isLogin ? '' : 'hidden'}`}>
                <div className={`Hello ${isLogin ? '' : 'hidden'}`}>
                    <p>반가워요, <span className='nickName'><Link to={'/mypage'}>{nickName}</Link></span>님</p>
                </div>
                <div className='NavIcon'>
                    <span class="material-symbols-outlined" ><Link to={'/edit'}>edit_square</Link></span>
                    <span class="material-symbols-outlined">
                        {notification ? 'notifications_unread' : 'notifications'}
                    </span> 
                    <Link to={isLogin ? '/mypage' : '/login'}>{isLogin ? <span class="material-symbols-outlined">person</span> : 'LOGIN'}</Link>
                </div>
                
                
            </div>
                
            
        </div>
        
    </div>
  )
}
// <Link to={'/'}></Link>
export default Navbar