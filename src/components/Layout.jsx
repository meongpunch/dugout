import React from 'react'
import { Outlet } from 'react-router-dom'
import Gnb from './Gnb'
import './Layout.css'

const Layout = () => {
  return (
    <div className='layout'>
      <main>
          <Outlet />
      </main>
      <Gnb />
    </div>
  )
}

export default Layout