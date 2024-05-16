import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {

    const [userName, setUserName] = useState("서윤")
    const [isLogin, setIsLogin] = useState(true)
    const [notification, setNotification] = useState(false)


    function isNotification(){

        // 알림 있는지 확인해서 있으면 아래 문장 실행하도록 조건 처리하기
        setNotification(!notification)
    }

  return (
    <div className='Header'>

        <div className={`Hello ${isLogin ? '' : 'hidden'}`}>
            <p>반가워요, <span className='userName'>{userName}</span>님</p>
        </div>
        <div className='HeaderContents'>
            <div className='NavLeft'></div>
            <div className='NavBar'>
                <div className='NavItem NavMenu NavCategories'>CATEGORIES
                <ul className='NavInner'>
                    <li className='InnerItem'><Link to={'/category/exhibition'}>전시회</Link></li>
                    <li className='InnerItem'><Link to={'/category/performance'}>공연</Link></li>
                    <li className='InnerItem'><Link to={'/category/contest'}>공모전 및 대회</Link></li>
                    <li className='InnerItem'><Link to={'/category/performancesharing'}>성과공유회</Link></li>
                    <li className='InnerItem'><Link to={'/category/recruting'}>리쿠르팅</Link></li>
                </ul>
                </div>
                <div className='NavItem NavLogo'><Link to={'/'}>Onjeon</Link></div>
                <div className='NavItem NavMenu'>
                    <Link to={isLogin ? '/mypage' : '/login'}>{isLogin ? 'MY PAGE' : 'LOGIN'}</Link>
                </div>
            </div>
            <div className={`NavRight ${isLogin ? '' : 'hidden'}`}>
                <span class="material-symbols-outlined"><Link to={'/edit'}>edit_square</Link></span>
                <span class="material-symbols-outlined">
                    {notification ? 'notifications_unread' : 'notifications'}
                </span> 
            </div>
            
        </div>
        
    </div>
  )
}
// <Link to={'/'}></Link>
export default Navbar