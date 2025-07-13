import React from 'react'
import MenuBar from '../Component/MenuBar'
import Header from '../Component/Header'

const Home = () => {
  return (
   <div className='flex flex-col items-center justify-center min-vh-100'>
    <MenuBar/>
    <Header/>
   </div>
  )
}

export default Home
