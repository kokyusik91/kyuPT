import React, { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-lg w-full h-full bg-white fixed left-1/2 -translate-x-1/2">
      {children}
    </div>
  )
}

export default Layout
