import React, { useState } from 'react'
import './Navbar.css'

function Navbar() {

    const [userName, setUserName] = useState("현솔")

  return (
    <div className='Header'>

        <div className='Hello'>반가워요, <span className='userName'>{userName}</span>님</div>
        <div className='HeaderContents'>
            <div className='NavLeft'></div>
            <div className='NavBar'>
                <div className='NavItem NavMenu NavCategories'>CATEGORIES
                <ul className='NavInner'>
                    <li className='InnerItem'>전시회</li>
                    <li className='InnerItem'>공연</li>
                    <li className='InnerItem'>공모전 및 대회</li>
                    <li className='InnerItem'>성과공유회</li>
                    <li className='InnerItem'>리쿠르팅</li>
                </ul>
                </div>
                <div className='NavItem NavLogo'>OnJeon</div>
                <div className='NavItem NavMenu'>MY PAGE</div>
            </div>
            <div className='NavRight'>
                <span class="material-symbols-outlined">edit_square</span>
                <span class="material-symbols-outlined">notifications</span>
            </div>
            
        </div>
        
    </div>
  )
}

export default Navbar