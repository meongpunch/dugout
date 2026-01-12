import React from 'react'
import {NavLink} from 'react-router-dom'
import './Gnb.css'

const Gnb = () => {
  return (
    <nav className="gnb">
      <NavLink to="/" className='gnb-item'>
        <div className="icon-box home-icon"></div>
        <span className="text">홈</span>
      </NavLink>
      <NavLink to="/stadium" className='gnb-item'>
        <div className="icon-box stadium-icon"></div>
        <span className="text">스타디움</span>
      </NavLink>
      <NavLink to="/ground" className='gnb-item'>
        <div className="icon-box ground-icon"></div>
        <span className="text">그라운드</span>
      </NavLink>
      <NavLink to="/lockerroom" className='gnb-item'>
        <div className="icon-box lockerroom-icon"></div>
        <span className="text">라커룸</span>
      </NavLink>
    </nav>
  )
}

export default Gnb