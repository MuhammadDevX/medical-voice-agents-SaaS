import Image from 'next/image'
import React from 'react'

const menuOptions = [
  {
    id: 1,
    name: "Home",
    path: "/home"
  },
  {
    id: 2,
    name: 'History',
    path: '/history'
  },
  {
    id: 3,
    name: 'Pricing',
    path: '/pricing'
  },
  {
    id: 4,
    name: 'Profile',
    path: '/profile'
  }
]


function AppHeader() {
  return <div>
    <Image src={"logo.svg"} alt="logo" width={180} height={180} />
    App Header</div>
}

export default AppHeader