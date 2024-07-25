import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as Logo } from '../logo.svg'
import axiosInstance from '../api/axiosInstance'
import editIcon from '../edit.png';
import mypageIcon from '../mypage.png';
import notiIcon from '../notification.png';


function Navbar() {
    const [myInfo, setMyInfo] = useState({ user_id: 0, nickname: "" })
    const [isLogin, setIsLogin] = useState(true)
    const [notification, setNotification] = useState(false)

    const accessToken = localStorage.getItem('access_token')

    const location = useLocation()

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const response = await axiosInstance.get('/api/v1/user/my-info', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`  // Authorization 헤더 추가 (토큰 필요)
                    }
                });
                setMyInfo(response.data);
                localStorage.setItem('login_user_id', response.data.user_id)
                setIsLogin(true);
            } catch (error) {
                console.error('Failed to fetch my info:', error);
            }
        };

        fetchMyInfo();
    }, []);

    function isNotification() {
        // 알림 있는지 확인해서 있으면 아래 문장 실행하도록 조건 처리하기
        setNotification(!notification)
    }

    return (
        <div className='Header'>
            <div className='HeaderContents'>
                <div className='NavBar'>
                    <div className='NavLogo'><Link to={'/'}><Logo /></Link></div>
                    <ul className='NavCategories'>
                        <li className={`InnerItem ${location.pathname === '/category/all' ? 'selected' : ''}`}><Link to={'/category/all'}>전체</Link></li>
                        <li className={`InnerItem ${location.pathname === '/category/exhibition' ? 'selected' : ''}`}><Link to={'/category/exhibition'}>전시회</Link></li>
                        <li className={`InnerItem ${location.pathname === '/category/performance' ? 'selected' : ''}`}><Link to={'/category/performance'}>공연</Link></li>
                        <li className={`InnerItem ${location.pathname === '/category/contest' ? 'selected' : ''}`}><Link to={'/category/contest'}>공모전 및 대회</Link></li>
                        <li className={`InnerItem ${location.pathname === '/category/etc' ? 'selected' : ''}`}><Link to={'/category/etc'}>기타</Link></li>
                    </ul>
                </div>
                <div className={`NavRight ${isLogin ? '' : 'hidden'}`}>
                    <div className={`Hello ${isLogin ? '' : 'hidden'}`}>
                        <p>반가워요, <span className='nickName'><Link to={`/mypagegroup/${myInfo.user_id}`}>{myInfo.nickname}</Link></span>님</p>
                    </div>
                    <div className='NavIcon'>
                        <div><Link to={'/create'}><img src={editIcon} className='editIcon' /></Link></div>
                        <div onClick={isNotification}>
                            {notification ? <img src={notiIcon} className='notiIcon' /> : <img src={notiIcon} className='notiIcon' />}
                        </div>
                        <Link to={isLogin ? `/mypagegroup/${myInfo.user_id}` : '/login'}>
                            {isLogin ? <img src={mypageIcon} className='mypageIcon' /> : 'LOGIN'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
