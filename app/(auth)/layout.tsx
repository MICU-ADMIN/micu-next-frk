'use client'

import React from 'react'
import { Toaster } from 'react-hot-toast'
import LoginPageLayout from '../components/__Layouts/loginpagelayout'

function Layout(props) {
  return (
    <>
      <Toaster />
      <LoginPageLayout>{props.children}</LoginPageLayout>
    </>
  )
}

export default Layout
