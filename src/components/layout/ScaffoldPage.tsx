import React, { ReactNode } from 'react'

type ScaffoldPageProps = {
  children: ReactNode
  appHeader: ReactNode
}

function ScaffoldPage({ children, appHeader }: ScaffoldPageProps) {
  return (
    <div className="w-full h-screen bg-white">
      {appHeader}
      {children}
    </div>
  )
}

export default ScaffoldPage
