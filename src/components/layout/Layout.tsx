import React, { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-lg w-full h-full bg-white mx-auto">
      {children}
    </div>
  )
}

export default Layout
